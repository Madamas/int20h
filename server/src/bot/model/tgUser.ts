import { model, Schema } from 'mongoose'

import { TgUserDoc } from '@interfaces/bot/model/tgUser'

const tgUserSchema: Schema = new Schema(
    {
        tgId: { type: Number, unique: true, required: true },
    },
    {
        timestamps: true,
    }
)

export default model<TgUserDoc>('TgUser', tgUserSchema)
