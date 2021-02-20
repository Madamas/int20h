import { model, Schema } from 'mongoose'

import { UserDoc } from '@interfaces/model/user'

const userSchema: Schema = new Schema(
    {
        name: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true,
    }
)

export default model<UserDoc>('User', userSchema)
