import { ObjectId } from 'mongodb'

import ApplicationModel from '@src/model/application'

import { Application, ApplicationDoc, ApplicationType, GeoType } from '@interfaces/model/application'

import { ApplicationRequest } from '@interfaces/service/application'

class ApplicationService {
    create(userId: ObjectId, type: ApplicationType, data: ApplicationRequest): Promise<ApplicationDoc> {
        const {
            coordinates,
            ...rest
        } = data

        const application: Application = {
            userId,
            type,
            geo: {
                type: GeoType.Point,
                coordinates: [coordinates[0], coordinates[1]]
            },
            ...rest
        }

        return ApplicationModel.create(application)
    }

    async getById(id: ObjectId): Promise<ApplicationDoc | null> {
        return ApplicationModel.findById(id)
    }
}

export default new ApplicationService()
