import { FilterQuery } from 'mongoose'
import { MiddlewareFn } from 'telegraf'

import { Context } from '@interfaces/bot'

class LoggerMiddleware {
    middleware(): MiddlewareFn<Context> {
        return async (ctx: Context, next: () => Promise<void>): Promise<void> => {
            console.log(ctx.message)

            return next()
        }
    }
}

export default new LoggerMiddleware()
