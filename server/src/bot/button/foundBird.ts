import { Markup } from 'telegraf'

import { Button, Context } from '@interfaces/bot';
import { Kind } from '@interfaces/model/application';

function foundBird(ctx: Context) {
    ctx.session.request = { kind: Kind.Bird }

    const keyboard = Markup.keyboard([Button.Cancel], { columns: 1 }).resize()

    return ctx.reply('Тепер скинь фото звірятки 📷', keyboard)
}

export default foundBird
