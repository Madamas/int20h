import { Route, UserRouteParams } from '@interfaces/route'
import { RouteRequestData, RouteResponse } from '@interfaces/route/getUser'

class SignUpRoute implements Route<RouteRequestData> {
    readonly isAuthProtected: boolean = true

    async handler(params: UserRouteParams<RouteRequestData>): Promise<RouteResponse> {
        const { user } = params

        return { name: user.name, email: user.email }
    }
}

export default new SignUpRoute()
