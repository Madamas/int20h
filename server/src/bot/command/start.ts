import { Markup } from 'telegraf'

import Utils from '@src/utils'

import config from '@config'

import { CommandHandler, CommandName, CommandHandlerResult } from '@interfaces/bot/command'
import { Button, Context } from '@interfaces/bot';

class Command implements CommandHandler {
    name: CommandName = CommandName.Start;

    private readonly welcomeMessage: string = 'Привіт, <b>firstName</b>!\n\nЯ буду тобі допомагати знаходити загублених звіряток 🐻'

    async handler(ctx: Context): Promise<CommandHandlerResult> {
        const msg: string = ctx.state.sceneMessage || this.welcomeMessage.replace('firstName', Utils.escapeHtml(ctx.from?.first_name))

        Reflect.deleteProperty(ctx.session, 'request')

        await ctx.replyWithAnimation(config.bot.welcomeAnimationId)

        const keyboard = Markup.keyboard(
            [Button.FoundCat, Button.FoundDog, Button.FoundBird],
            { columns: 3 }
        ).resize()

        return { msg, keyboard }
    }
}

export default new Command()
