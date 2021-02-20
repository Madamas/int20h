import { FilterQuery } from 'mongoose'
import { MiddlewareFn } from 'telegraf'

import TgUserModel from '@src/bot/model/tgUser'

import { Context } from '@interfaces/bot'
import { TgUserDoc } from '@interfaces/bot/model/tgUser'

class UserMiddleware {
    middleware(): MiddlewareFn<Context> {
        return async (ctx: Context, next: () => Promise<void>): Promise<void> => {
            if (!ctx?.from?.id) {
                return next()
            }

            const query: FilterQuery<TgUserDoc> = { tgId: ctx.from.id }
            const user: TgUserDoc | null = await TgUserModel.findOne(query)
            if (user) {
                ctx.user = user
            }

            return next()
        }
    }
}

export default new UserMiddleware()
