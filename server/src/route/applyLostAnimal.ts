import { JSONSchemaType } from 'ajv'

import { Route, UserRouteParams } from '@interfaces/route'
import { RouteRequestData, RouteResponse } from '@interfaces/route/applyFindAnimal'
import { ApplicationType, Kind, Color, Sex, Size } from '@interfaces/model/application'
import ApplicationService from '@src/service/application'
import InverseIndexService from '@src/service/inverseIndex'

class ApplyFindAnimalRoute implements Route<RouteRequestData> {
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
        const application = await ApplicationService.create(params.user._id, ApplicationType.Lost, params.data)

        await InverseIndexService.create(application._id, params.data.breed, params.data.color, params.data.size, params.data.sex, params.data.kind)

        return { success: true }
    }
}

export default new ApplyFindAnimalRoute()
