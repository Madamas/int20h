import deviceService from '@src/service/device'

import { Route, UserRouteParams } from '@interfaces/route'
import { RouteRequestData, RouteResponse } from '@interfaces/route/getDevices'
import { DeviceResponse } from '@interfaces/service/device'

class GetDevicesRoute implements Route<RouteRequestData> {
    readonly isAuthProtected: boolean = true

    async handler(params: UserRouteParams<RouteRequestData>): Promise<RouteResponse> {
        const { user: { _id: userId } } = params

        const devices: DeviceResponse[] = await deviceService.getDevices(userId)

        return { devices }
    }
}

export default new GetDevicesRoute()
