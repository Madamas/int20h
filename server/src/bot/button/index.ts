import { URL } from 'url'

import { Markup } from 'telegraf'

import foundCat from './foundCat'
import foundDog from './foundDog'
import foundBird from './foundBird'

import { Button, TelegrafBot } from '@interfaces/bot'

class ButtonListener {
    set(bot: TelegrafBot): void {
        bot.hears(Button.FoundCat, foundCat)
        bot.hears(Button.FoundDog, foundDog)
        bot.hears(Button.FoundBird, foundBird)
        bot.hears(Button.Cancel, ctx => {
            const keyboard = Markup.keyboard(
                [Button.FoundCat, Button.FoundDog, Button.FoundBird],
                { columns: 3 }
            ).resize()

            ctx.session.request = undefined

            return ctx.reply('👌', keyboard)
        })

        bot.on('photo', async ctx => {
            if (!ctx.session.request) {
                return ctx.reply('Чудове фото')
            }

            const photoId: string = ctx.message.photo[ctx.message.photo.length - 1].file_id
            const link: URL = await ctx.telegram.getFileLink(photoId)

            ctx.session.request.photo = link.href
            const keyboard = Markup.keyboard([Button.Cancel], { columns: 1 }).resize()

            return ctx.reply('Тепер скинь свої координати 🗺️', keyboard)
        })

        bot.on('location', async ctx => {
            if (!ctx.session.request) {
                return ctx.reply('Тепер я знаю де ти, дякую :)')
            }

            ctx.session.request.coordinates = [ctx.message.location.longitude, ctx.message.location.latitude]
            const keyboard = Markup.keyboard(
                [Button.FoundCat, Button.FoundDog, Button.FoundBird],
                { columns: 3 }
            ).resize()

            return ctx.reply('Дякую за допомогу! Ти надкрутий 🦸', keyboard)
        })
    }
}

export default new ButtonListener()
