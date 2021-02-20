import { JSONSchemaType } from 'ajv'

import deviceService from '@src/service/device'

import { Route, UserRouteParams } from '@interfaces/route'
import { RouteRequestData, RouteResponse } from '@interfaces/route/connectDevice'

class ConnectDeviceRoute implements Route<RouteRequestData> {
    readonly isAuthProtected: boolean = true

    validationSchema: JSONSchemaType<RouteRequestData> = {
        type: 'object',
        properties: {
            deviceId: { type: 'string', minLength: 1, transform: ['trim'] },
            animalName: { type: 'string', minLength: 1, transform: ['trim'] },
        },
        required: ['deviceId', 'animalName'],
    }

    async handler(params: UserRouteParams<RouteRequestData>): Promise<RouteResponse> {
        const { data: { deviceId, animalName }, user: { _id: userId } } = params

        await deviceService.connectUser(userId, deviceId, animalName)

        return { success: true }
    }
}

export default new ConnectDeviceRoute()
