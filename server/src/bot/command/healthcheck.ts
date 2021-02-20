import mongoose from 'mongoose'

import config from '@config'

import { CommandHandler, CommandHandlerResult, CommandName } from '@interfaces/bot/command'
import { Context } from '@interfaces/bot';

class Command implements CommandHandler {
    name: CommandName = CommandName.HealthCheck;

    private readonly dbStateCodeToName: Map<number, string> = new Map([
        [0, 'disconnected'],
        [1, 'connected'],
        [2, 'connecting'],
        [3, 'disconnecting'],
    ])

    async handler(ctx: Context): Promise<CommandHandlerResult> {
        const { package: { name, version } } = config
        const { connection: { readyState } } = mongoose
        const dbStateName: string | number = this.dbStateCodeToName.get(readyState) || readyState

        return { msg: `🤖 <b>${name}</b> v${version} ${ctx.me}\n🌳 <b>${config.getEnv()}</b>\n🗄️ <b>${dbStateName}</b>` }
    }
}

export default new Command()
