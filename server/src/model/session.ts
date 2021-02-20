import { model, Schema } from 'mongoose'
import { ObjectId } from 'mongodb'

import { SessionDoc } from '@interfaces/model/session'

const sessionSchema: Schema = new Schema(
    {
        token: { type: String, unique: true, required: true },
        userId: { type: ObjectId, required: true }
    },
    {
        timestamps: true,
    }
)

export default model<SessionDoc>('Session', sessionSchema)
