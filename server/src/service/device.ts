import { FilterQuery, UpdateQuery } from 'mongoose'
import { ObjectId } from 'mongodb'

import DeviceModel from '@src/model/device'

import NotFoundError from '@src/errors/NotFoundError'

import { DeviceDoc } from '@interfaces/model/device'

class DeviceService {
    async addCoordinate(deviceId: string, point: [number, number], date: Date): Promise<void> {
        const query: FilterQuery<DeviceDoc> = { deviceId }
        const modifier: UpdateQuery<DeviceDoc> = { 'path.coordinates': { $push: point }, lastPathUpdate: date }

        await DeviceModel.updateOne(query, modifier)
    }

    async connectUser(userId: ObjectId, deviceId: string, animalName: string): Promise<void> {
        const query: FilterQuery<DeviceDoc> = { deviceId }
        const modifier: UpdateQuery<DeviceDoc> = { userId, animalName }

        const device: DeviceDoc | null = await DeviceModel.findOneAndUpdate(query, modifier)
        if (!device) {
            throw new NotFoundError('Could not find device by the provided deviceId', { deviceId })
        }
    }
}

export default new DeviceService()
