import { model, Schema } from 'mongoose'
import { ObjectId, } from 'mongodb'

import { ApplicationDoc, ApplicationType, GeoType } from '@interfaces/model/application'

const applicationSchema: Schema = new Schema(
    {
        type: { type: String, enum: Object.values(ApplicationType), required: true },
        kind: { type: String, required: true },
        breed: { type: String },
        color: { type: String },
        size: { type: String },
        geo: {
            type: { type: String, default: GeoType.Point },
            coordinates: { type: [Number], default: [0, 0] }
        },
        sex: { type: String },
        userId: { type: ObjectId },
        userTgId: { type: Number },
        image: { type: String },
        special: { type: Array(String) }
    },
    {
        timestamps: true,
    }
)

applicationSchema.index({ coordinates: '2dsphere' })

export default model<ApplicationDoc>('Application', applicationSchema)
