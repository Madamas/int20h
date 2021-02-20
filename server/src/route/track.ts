import { JSONSchemaType } from 'ajv'

import deviceService from '@src/service/device'

import { Route, RouteParams } from '@interfaces/route'
import { RouteRequestData, RouteResponse } from '@interfaces/route/track'

class TrackRoute implements Route<RouteRequestData> {
    readonly isAuthProtected: boolean = false

    validationSchema: JSONSchemaType<RouteRequestData> = {
        type: 'object',
        properties: {
            id: { type: 'string', minLength: 1, transform: ['trim'] },
            lat: { type: 'number' },
            lng: { type: 'number' },
            date: { type: 'string', minLength: 1, transform: ['trim'] }
        },
        required: ['id', 'lat', 'lng', 'date'],
    }

    async handler(params: RouteParams<RouteRequestData>): Promise<RouteResponse> {
        const { data: { id, lat, lng, date } } = params

        await deviceService.addCoordinate(id, [lng, lat], new Date(date))

        return { success: true }
    }
}

export default new TrackRoute()
