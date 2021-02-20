import { JSONSchemaType } from 'ajv'
import { get } from 'lodash'

import { Route, UserRouteParams } from '@interfaces/route'
import { RouteRequestData, RouteResponse } from '@interfaces/route/applyFoundAnimal'
import { ApplicationType, Kind, Color, Sex, Size } from '@interfaces/model/application'
import ApplicationService from '@src/service/application'
import InverseIndexService from '@src/service/inverseIndex'

class ApplyFoundAnimalRoute implements Route<RouteRequestData> {
    readonly isAuthProtected: boolean = true

    validationSchema: JSONSchemaType<RouteRequestData> = {
        type: 'object',
        properties: {
            kind: { type: 'string', enum: Object.values(Kind) },
            breed: { type: 'string' },
            color: { type: 'string', enum: Object.values(Color) },
            size: { type: 'string', enum: Object.values(Size) },
            sex: { type: 'string', enum: Object.values(Sex) },
            coordinates: {
                type: 'array',
                items: { type: 'number' }
            },
            special: {
                type: 'array',
                items: { type: 'string' }
            }
        },
        required: ['kind', 'breed', 'color', 'size', 'sex', 'coordinates', 'special'],
    }

    async handler(params: UserRouteParams<RouteRequestData>): Promise<RouteResponse> {
        const application = await ApplicationService.create(params.user._id, ApplicationType.Found, params.data)

        const {
            breed,
            color,
            size,
            sex,
            kind,
        } = params.data;

        const similars = await InverseIndexService.getByTags(breed, color, size, sex, kind)

        const objSim = similars
            ? similars.toObject()
            : null;

        return {
            success: true,
            similars: get(objSim, `${sex}.${kind}.${size}.${color}.${breed}`, [])
        }
    }
}

export default new ApplyFoundAnimalRoute()
