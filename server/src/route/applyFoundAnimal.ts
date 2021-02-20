import { JSONSchemaType } from 'ajv'

import { Route, UserRouteParams } from '@interfaces/route'
import { RouteRequestData, RouteResponse } from '@interfaces/route/applyFoundAnimal'
import { AnimalKind, Color, Sex, Size } from '@interfaces/model/application'

class ApplyFoundAnimalRoute implements Route<RouteRequestData> {
    readonly isAuthProtected: boolean = true

    validationSchema: JSONSchemaType<RouteRequestData> = {
        type: 'object',
        properties: {
            kind: { type: 'string', enum: Object.values(AnimalKind) },
            breed: { type: 'string' },
            color: { type: 'string', enum: Object.values(Color) },
            size: { type: 'string', enum: Object.values(Size) },
            sex: { type: 'string', enum: Object.values(Sex) },
            coordinates: {
                type: 'object',
                properties: {
                    lat: { type: 'number' },
                    lng: { type: 'number' }
                },
                required: ['lat', 'lng']
            },
            special: {
                type: 'array',
                items: { type: 'string' }
            }
        },
        required: ['kind', 'breed', 'color', 'size', 'sex', 'coordinates', 'special'],
    }

    async handler(params: UserRouteParams<RouteRequestData>): Promise<RouteResponse> {
        return { success: true }
    }
}

export default new ApplyFoundAnimalRoute()
