import { ObjectId } from 'mongodb'
import { FilterQuery, UpdateQuery } from 'mongoose'

import { Breed, Color, Size, Sex, Kind } from '@interfaces/model/application'
import { InverseIndexDoc } from '@interfaces/model/inverseIndex'
import InverseIndexModel from '@src/model/inverseIndex'
import { timeStamp } from 'console'

class InverseIndexService {
    private cache: InverseIndexDoc[]
    private cacheTs: number
    private cacheTTL: number = 1000 * 60 * 5

    constructor() {
        this.cache = []
        this.cacheTs = Date.now()
    }

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

    async getByTagsSparse(breed?: Breed, color?: Color, size?: Size, sex?: Sex, kind?: Kind): Promise<InverseIndexDoc | null> {
        if (!breed && !color && !size && !sex && !kind) {
            return null
        }

        if (!breed || !color || !size || !sex || !kind) {
            await this.updateCache()


            return null
        }

        const query: FilterQuery<InverseIndexDoc> = {
            [`${sex}.${kind}.${size}.${color}`]: breed
        }

        return InverseIndexModel.findOne(query)
    }

    private async updateCache() {
        if ((this.cacheTs - Date.now()) < this.cacheTTL) {
            return
        }

        this.cache = await InverseIndexModel.find()
    }

    private async getSparseFromCache(kind: Kind, breed?: Breed, color?: Color, size?: Size, sex?: Sex) {
        // this.cache.filter((doc) => {
        //     let flag = true
        //     flag = sex ? doc[sex]
        // })
    }
}

export default new InverseIndexService()
