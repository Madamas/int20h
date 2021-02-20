import { JSONSchemaType } from 'ajv'

import userService from '@src/service/user'
import sessionService from '@src/service/session'

import { Route, RouteParams } from '@interfaces/route'
import { RouteRequestData, RouteResponse } from '@interfaces/route/signIn'
import { UserDoc } from '@interfaces/model/user'
import { SessionDoc } from '@interfaces/model/session'
import UnauthorizedError from '@src/errors/UnauthorizedError'

class SignUpRoute implements Route<RouteRequestData> {
    readonly isAuthProtected: boolean = false

    validationSchema: JSONSchemaType<RouteRequestData> = {
        type: 'object',
        properties: {
            name: { type: 'string', minLength: 1, transform: ['trim'] },
            password: { type: 'string', minLength: 1 }
        },
        required: ['name', 'password'],
    }

    async handler(params: RouteParams<RouteRequestData>): Promise<RouteResponse> {
        const { data: { name, password } } = params

        const user: UserDoc | null = await userService.getByCreds(name, password)
        if (!user) {
            throw new UnauthorizedError('No such user')
        }

        const session: SessionDoc = await sessionService.create(user._id)

        return { token: session.token }
    }
}

export default new SignUpRoute()
