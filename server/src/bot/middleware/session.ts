import { FilterQuery, UpdateQuery } from 'mongoose'
import { MiddlewareFn } from 'telegraf'

import TgSessionModel from '@src/bot/model/tgSession'

import logger from '@src/logger'

import { Context } from '@interfaces/bot'
import { TgSessionData, TgSessionDoc } from '@interfaces/bot/model/tgSession'

class SessionMiddleware {
    middleware(): MiddlewareFn<Context> {
        return async (ctx: Context, next: () => Promise<void>): Promise<void> => {
            const key: string | undefined = this.getSessionKey(ctx)
            if (!key) {
                return next()
            }

            const session: TgSessionData | undefined = await this.getSession(key)
            logger.debug({ session }, 'Session')
            if (session) {
                ctx.session = session
            } else {
                ctx.session = {}
            }

            console.log('session before next', ctx.session)
            await next()
            console.log('session after next', ctx.session)
            return this.saveSession(key, ctx.session)
        }
    }

    private getSessionKey(ctx: Context): string | undefined {
        return ctx.from && ctx.chat && `${ctx.from.id}:${ctx.chat.id}`
    }

    private async getSession(key: string): Promise<TgSessionData | undefined> {
        const query: FilterQuery<TgSessionDoc> = { key }
        const session: TgSessionDoc | null = await TgSessionModel.findOne(query)

        return session?.data ? <any>session.toObject().data : undefined
    }

    private async saveSession(key: string, data: TgSessionData | undefined): Promise<void> {
        const query: FilterQuery<TgSessionDoc> = { key }
        const modifier: UpdateQuery<TgSessionDoc> = { data }
        console.log('session modifier', { modifier })

        await TgSessionModel.updateOne(query, modifier, { upsert: true })
    }
}

export default new SessionMiddleware()
