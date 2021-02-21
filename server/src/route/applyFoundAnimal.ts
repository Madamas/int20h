import { JSONSchemaType } from 'ajv'
import { get } from 'lodash'

import { Route, RouteParams, UserRouteParams } from '@interfaces/route'
import { RouteRequestData, RouteResponse } from '@interfaces/route/applyFoundAnimal'
import { ApplicationType, Kind, Color, Sex, Size } from '@interfaces/model/application'
import ApplicationService from '@src/service/application'
import InverseIndexService from '@src/service/inverseIndex'
import { ApplicationRequest } from '@interfaces/service/application'

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
        await ApplicationService.create(params.user._id, ApplicationType.Found, params.data)

        const {
            breed,
            color,
            size,
            sex,
            kind,
            coordinates,
        } = params.data;

        const similars = await InverseIndexService.getByTags(breed, color, size, sex, kind)

        let objSim = similars
            ? similars.toObject()
            : null;

        let objArr = get(objSim, `${sex}.${kind}.${size}.${color}.${breed}`, [])
        let objSet = new Set<string>(objArr)

        if (coordinates) {
            const spatialSimilars = await ApplicationService.getBySpatial(coordinates[0], coordinates[1])
            spatialSimilars.forEach((value) => {
                objSet.add(value._id)
            })
        }

        return {
            success: true,
            similars: [...objSet]
        }
    }
}

export default new ApplyFoundAnimalRoute()
