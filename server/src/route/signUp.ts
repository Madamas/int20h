import { JSONSchemaType } from 'ajv'

import userService from '@src/service/user'
import sessionService from '@src/service/session'

import { Route, RouteParams } from '@interfaces/route'
import { RouteRequestData, RouteResponse } from '@interfaces/route/signUp'
import { UserDoc } from '@interfaces/model/user'
import { SessionDoc } from '@interfaces/model/session'

class SignUpRoute implements Route<RouteRequestData> {
    readonly isAuthProtected: boolean = false

    validationSchema: JSONSchemaType<RouteRequestData> = {
        type: 'object',
        properties: {
            email: { type: 'string', minLength: 1, transform: ['trim'] },
            name: { type: 'string', minLength: 1, transform: ['trim'] },
            password: { type: 'string', minLength: 1 }
        },
        required: ['email', 'name', 'password'],
    }

    async handler(params: RouteParams<RouteRequestData>): Promise<RouteResponse> {
        const { data: { email, name, password } } = params

        const user: UserDoc = await userService.create(email, name, password)
        const session: SessionDoc = await sessionService.create(user._id)

        return { token: session.token }
    }
}

export default new SignUpRoute()
