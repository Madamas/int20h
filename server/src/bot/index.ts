import { Telegraf } from 'telegraf'

import config from '@config'

import middlewares from '@src/bot/middleware'
import commands from '@src/bot/command'
import buttons from '@src/bot/button'

import { TelegrafBot } from '@interfaces/bot'

class BotApp {
    private readonly bot: TelegrafBot = new Telegraf(config.bot.telegramToken);

    async launch(): Promise<void> {
        middlewares.set(this.bot)
        await commands.load(this.bot)
        buttons.set(this.bot)

        await this.bot.launch()
    }
}

export const botApp = new BotApp()
