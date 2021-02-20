/* eslint-disable @typescript-eslint/no-var-requires */
import { promises as fs } from 'fs'

import logger from '@src/logger'

import { TelegrafBot } from '@interfaces/bot'
import { CommandHandler, CommandHandlerResult } from '@interfaces/bot/command'
import { Context } from '@interfaces/bot'

class Commands {
    private readonly logger = logger.child({ class: this.constructor.name })

    private readonly commandsDirPath: string = 'dist/bot/command'

    private readonly indexFile: string = 'index.js'

    private readonly extension: string = '.js'

    async load(bot: TelegrafBot): Promise<void> {
        const commandFiles: string[] = await fs.readdir(this.commandsDirPath)

        commandFiles
            .filter(fileName => fileName !== this.indexFile && fileName.endsWith(this.extension))
            .forEach(fileNmae => this.loadCommand(bot, fileNmae))
    }

    private loadCommand(bot: TelegrafBot, fileName: string): void {
        const command: CommandHandler = require(`./${fileName}`).default
        const { name } = command

        bot.command(name, async ctx => {
            const { message } = ctx

            const t0: number = Date.now()
            this.logger.info(`->IN command [${name}]`)

            try {
                const result: CommandHandlerResult | void = await this.handleCommand(command, ctx)
                if (result) {
                    await ctx.replyWithHTML(result.msg, result.keyboard)
                }

                this.logger.info(`<-OUT command [${name}] in ${Date.now() - t0}ms`)
            } catch (err) {
                this.logger.fatal({ err }, `<-FAILED to handle command [${name}] in ${Date.now() - t0}ms`)
            }
        })
    }

    private async handleCommand(command: CommandHandler, ctx: Context): Promise<CommandHandlerResult | void> {
        return command.handler(ctx)
    }
}

export default new Commands()
