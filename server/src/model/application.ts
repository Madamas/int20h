import { model, Schema } from 'mongoose'
import { ObjectId, } from 'mongodb'

import { ApplicationDoc } from '@interfaces/model/application'

const applicationSchema: Schema = new Schema(
    {
        type: { type: String, required: true },
        kind: { type: String, required: true },
        breed: { type: String, required: true },
        color: { type: String, required: true },
        size: { type: String, required: true },
        geo: {
            type: { type: String, default: 'Point' },
            coordinates: { type: [Number], default: [0, 0] }
        },
        sex: { type: String, required: true },
        userId: { type: ObjectId, required: true },
        special: { type: Array(String) }
    },
    {
        timestamps: true,
    }
)

applicationSchema.index({ coordinates: '2dsphere' })

export default model<ApplicationDoc>('Application', applicationSchema)
