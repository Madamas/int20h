import Koa from 'koa'
import Router from '@koa/router'
import cors from '@koa/cors'
import Ajv from 'ajv'
import ajvKeywords from 'ajv-keywords'

import sessionService from '@src/service/session'
import userService from '@src/service/user'

import signUp from './signUp'
import signIn from './signIn'
import getUser from './getUser'
import applyFoundAnimal from './applyFoundAnimal'
import applyLostAnimal from './applyLostAnimal'

import ValidationError from '@src/errors/ValidationError'
import UnauthorizedError from '@src/errors/UnauthorizedError'
import { SessionDoc } from '@interfaces/model/session'
import { UserDoc } from '@interfaces/model/user'

class RouteHandler {
    private readonly router = new Router()

    private readonly ajv = new Ajv({ coerceTypes: true, useDefaults: true })

    constructor() {
        ajvKeywords(this.ajv, ['transform'])
    }

    set(app: Koa) {
        this.router.post('/api/sign-up', this.handleRoute(signUp))
        this.router.post('/api/sign-in', this.handleRoute(signIn))
        this.router.get('/api/user', this.handleRoute(getUser))
        this.router.post('/api/application-found', this.handleRoute(applyFoundAnimal))
        this.router.post('/api/application-lost', this.handleRoute(applyLostAnimal))

        app.use(this.router.routes())
        app.use(this.router.allowedMethods())
        app.use(cors())
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private handleRoute(route: any): Koa.Middleware {
        const { validationSchema, isAuthProtected } = route
        const validate = validationSchema && this.ajv.compile({ ...validationSchema, additionalProperties: false })

        return async (ctx, next) => {
            let user: UserDoc | null = null
            if (isAuthProtected) {
                if (typeof ctx.headers.token !== 'string') {
                    throw new UnauthorizedError('Bad token type provided')
                }

                user = await this.auth(ctx.headers.token)
            }

            const data: Record<string, unknown> = Object.assign({}, ctx.query, ctx.request.body)
            if (!validate || validate(data)) {
                ctx.response.body = await route.handler({ data, user })

                return next()
            }

            throw new ValidationError('Request data is not valid', validate.errors)
        }
    }

    private async auth(token: string): Promise<UserDoc> {
        const session: SessionDoc | null = await sessionService.getByToken(token)
        if (!session) {
            throw new UnauthorizedError('Bad token provided')
        }

        const user: UserDoc | null = await userService.getById(session.userId)
        if (!user) {
            throw new UnauthorizedError('Session user not found')
        }

        return user;
    }
}

export default new RouteHandler()
