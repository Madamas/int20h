import { Document } from 'mongoose'
import { ObjectId } from 'mongodb'

import { GeoType } from './application';

export interface DeviceCoordinates {
    type: GeoType
    coordinates: [number, number][]
}

export interface Device {
    deviceId: string
    path: DeviceCoordinates
    lastPathUpdate: Date
    animalName?: string
    userId?: ObjectId
}

export interface DeviceDoc extends Device, Document { }
