import { JSONSchemaType } from 'ajv'
import { get } from 'lodash'
import { ObjectId } from 'mongodb'

import applicationService from '@src/service/application'
import inverseIndexService from '@src/service/inverseIndex'
import emailService from '@src/service/email'
import userService from '@src/service/user'

import { Route, UserRouteParams } from '@interfaces/route'
import { RouteRequestData, RouteResponse } from '@interfaces/route/applyFoundAnimal'
import { ApplicationType, Kind, Color, Sex, Size, ApplicationDoc } from '@interfaces/model/application'
import { UserDoc } from '@interfaces/model/user'

class ApplyFoundAnimalRoute implements Route<RouteRequestData> {
    readonly isAuthProtected: boolean = true

    validationSchema: JSONSchemaType<RouteRequestData> = {
        type: 'object',
        properties: {
            kind: { type: 'string', enum: Object.values(Kind) },
            breed: { type: 'string', nullable: true },
            color: { type: 'string', enum: Object.values(Color), nullable: true },
            size: { type: 'string', enum: Object.values(Size), nullable: true },
            sex: { type: 'string', enum: Object.values(Sex), nullable: true },
            coordinates: {
                type: 'array',
                items: { type: 'number' }
            },
            special: {
                type: 'array',
                items: { type: 'string' },
            },
        },
        required: ['kind']
    }

    async handler(params: UserRouteParams<RouteRequestData>): Promise<RouteResponse> {
        const { user: { _id: userId, email: founderEmail } } = params
        await applicationService.create(userId, ApplicationType.Found, params.data)

        const {
            breed,
            color,
            size,
            sex,
            kind,
            coordinates,
        } = params.data;

        const similars = await inverseIndexService.getByTags(breed, color, size, sex, kind)

        let objSim = similars
            ? similars.toObject()
            : null;

        let objArr: ObjectId[] = get(objSim, `${sex}.${kind}.${size}.${color}.${breed}`, [])
        let objSet = new Set<string>(objArr.map((id: ObjectId) => id.toHexString()))

        if (coordinates) {
            const spatialSimilars: ApplicationDoc[] = await applicationService.getBySpatial(coordinates[0], coordinates[1], kind)
            spatialSimilars.forEach((value) => {
                objSet.add(value._id.toHexString())
            })
        }

        const ids: ObjectId[] = [...objSet].map((id: string) => new ObjectId(id))
        const applications: ApplicationDoc[] = await applicationService.getByIds(ids)
        const tasks: Promise<unknown>[] = applications.map(async ({ userId }: ApplicationDoc) => {
            if (!userId) {
                return
            }

            const user: UserDoc | null = await userService.getById(userId)
            if (!user) {
                return
            }

            return emailService.sendMail(user.email, `Ми знайшли вашу собаку. Пишіть на емейл знахіднику: ${founderEmail}`)
        })
        await Promise.all(tasks)


        return {
            success: true,
            similars: [...objSet]
        }
    }
}

export default new ApplyFoundAnimalRoute()
