import * as Koa from 'koa'
import koaBodyparser from 'koa-bodyparser'
import koaStatic from 'koa-static'
import cors from '@koa/cors';

import { alsMiddleware } from './als'
import { loggerMiddleware } from './logger'
import { errorHandlerMiddleware } from './errorHandler'

class Middleware {
    set(app: Koa) {
        app.use(koaStatic('./public'))
            .use(alsMiddleware)
            .use(errorHandlerMiddleware)
            .use(koaBodyparser())
            .use(loggerMiddleware)
            .use(cors())
    }
}

export default new Middleware()
