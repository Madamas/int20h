import { model, Schema } from 'mongoose'

import { TgSessionDoc } from '@interfaces/bot/model/tgSession'

const tgSessionSchema: Schema = new Schema(
    {
        key: { type: String, unique: true, required: true },
        data: { type: {} },
    },
    {
        timestamps: true,
    }
)

export default model<TgSessionDoc>('TgSession', tgSessionSchema)
