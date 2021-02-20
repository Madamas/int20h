import { DeviceDoc } from "@interfaces/model/device";

export interface DeviceResponse {
    deviceId: string
    coordinates: [Number, Number][]
    lastPathUpdate: Date
    animalName: string
}
