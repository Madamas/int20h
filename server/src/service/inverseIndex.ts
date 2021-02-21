import { ObjectId } from 'mongodb'
import { FilterQuery, UpdateQuery } from 'mongoose'

import { Breed, Color, Size, Sex, Kind } from '@interfaces/model/application'
import { InverseIndexDoc } from '@interfaces/model/inverseIndex'
import InverseIndexModel from '@src/model/inverseIndex'

class InverseIndexService {
    async create(applicationId: ObjectId, breed: Breed, color: Color, size: Size, sex: Sex, kind: Kind): Promise<void> {
        const query: FilterQuery<InverseIndexDoc> = {
            [`${sex}.${kind}.${size}.${color}.${breed}`]: {
                $nin: ['asd']
            }
        }

        const modifier: UpdateQuery<InverseIndexDoc> = {
            $addToSet: {
                [`${sex}.${kind}.${size}.${color}.${breed}`]: applicationId
            }
        }

        await InverseIndexModel.updateOne(query, modifier, { upsert: true })
    }

    async getByTags(breed: Breed, color: Color, size: Size, sex: Sex, kind: Kind): Promise<InverseIndexDoc | null> {
        const query: FilterQuery<InverseIndexDoc> = {
            [`${sex}.${kind}.${size}.${color}.${breed}`]: {
                $nin: ["asd"]
            }
        }

        return InverseIndexModel.findOne(query)
    }
}

export default new InverseIndexService()
