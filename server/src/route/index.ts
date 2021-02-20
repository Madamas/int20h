import Koa from 'koa'
import Router from '@koa/router'
import cors from '@koa/cors'
import Ajv from 'ajv'
import ajvKeywords from 'ajv-keywords';

import ValidationError from '@src/errors/ValidationError'

class RouteHandler {
    private readonly router = new Router()

    private readonly ajv = new Ajv({ coerceTypes: true, useDefaults: true })

    constructor() {
        ajvKeywords(this.ajv, ['transform'])
    }

    set(app: Koa) {
        app.use(this.router.routes())
        app.use(this.router.allowedMethods())
        app.use(cors())
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private handleRoute(route: any): Koa.Middleware {
        const { validationSchema } = route
        const validate = validationSchema && this.ajv.compile({ ...validationSchema, additionalProperties: false })

        return async (ctx, next) => {
            const data: Record<string, unknown> = Object.assign({}, ctx.query, ctx.request.body)
            if (!validate || validate(data)) {
                ctx.response.body = await route.handler({ data })

                return next()
            }

            throw new ValidationError('Request data is not valid', validate.errors)
        }
    }
}

export default new RouteHandler()
