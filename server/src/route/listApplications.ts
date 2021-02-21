import applicationService from '@src/service/application'

import { Route } from '@interfaces/route'
import { RouteRequestData, RouteResponse } from '@interfaces/route/listApplications'
import { ApplicationDoc } from '@interfaces/model/application'

class ListApplicationsRoute implements Route<RouteRequestData> {
    readonly isAuthProtected: boolean = false

    async handler(): Promise<RouteResponse> {
        const applications: ApplicationDoc[] = await applicationService.listApplications()

        return { applications }
    }
}

export default new ListApplicationsRoute()
