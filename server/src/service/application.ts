import { ObjectId } from 'mongodb'
import { FilterQuery } from 'mongoose'

import UserService from '@src/service/user'
import MailService from '@src/service/email'
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

    async listApplications(): Promise<ApplicationDoc[]> {
        return ApplicationModel.find({}).limit(100).sort({ _id: -1 })
    }

    async createFromTelegram(application: Application): Promise<void> {
        await ApplicationModel.create(application)

        const { geo: { coordinates } } = application
        const spatialSimilars = await this.getBySpatial(coordinates[0], coordinates[1])

        for (const doc of spatialSimilars) {
            const docObj = doc.toObject()
            const user = await UserService.getById(docObj.userId)

            const body = `Ladies and gentleman. We got him. You can write to author here -> ${application.tgUsername}`
            await MailService.sendMail(user?.email!, body)
        }
    }

    async getById(id: ObjectId): Promise<ApplicationDoc | null> {
        return ApplicationModel.findById(id)
    }

    async getByIds(ids: ObjectId[]): Promise<ApplicationDoc[]> {
        const query: FilterQuery<ApplicationDoc> = {
            _id: {
                $in: ids
            }
        }

        return ApplicationModel.find(query)
    }

    async getBySpatial(lon: number, lat: number): Promise<ApplicationDoc[]> {
        const query: FilterQuery<ApplicationDoc> = {
            type: ApplicationType.Lost,
            geo: {
                $geoWithin: {
                    $centerSphere: [[lon, lat], 500]
                }
            }
        }

        return ApplicationModel.find(query)
    }
}

export default new ApplicationService()
