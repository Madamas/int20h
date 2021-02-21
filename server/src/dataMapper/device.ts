import { DeviceDoc } from '@interfaces/model/device'
import { DeviceResponse } from '@interfaces/service/device'

class DeviceDataMapper {
    toResponse(model: DeviceDoc): DeviceResponse {
        const { deviceId, lastPathUpdate, animalName, path } = model

        return {
            deviceId,
            lastPathUpdate,
            animalName: <string>animalName,
            coordinates: path.coordinates.map(([a1, a2]) => [a2, a1])
        }
    }
}

export default new DeviceDataMapper()
