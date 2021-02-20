import { model, Schema } from 'mongoose'
import { ObjectId } from 'mongodb'

import { DeviceDoc } from '@interfaces/model/device'
import { GeoType } from '@interfaces/model/application'

const deviceSchema: Schema = new Schema(
    {
        deviceId: { type: String, unique: true, required: true },
        path: {
            type: { type: String, default: GeoType.LineString },
            coordinates: { type: [[Number]] }
        },
        lastPathUpdate: { type: Date, required: true },
        animalName: { type: String },
        userId: { type: ObjectId, index: true }
    },
    {
        timestamps: true,
    }
)

deviceSchema.index(
    {
        deviceId: 1,
        animalName: 1
    },
    {
        unique: true
    }
)

deviceSchema.index({ coordinates: '2dsphere' })

export default model<DeviceDoc>('Device', deviceSchema)
