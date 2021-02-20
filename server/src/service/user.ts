import { ObjectId } from 'mongodb'

import UserModel from '@src/model/user'

import { User, UserDoc } from '@interfaces/model/user'
import { FilterQuery } from 'mongoose'
import logger from '@src/logger'

class UserService {
    create(email: string, name: string, password: string): Promise<UserDoc> {
        const user: User = {
            email,
            name,
            password
        }

        return UserModel.create(user)
    }

    async getById(userId: ObjectId): Promise<UserDoc | null> {
        return UserModel.findById(userId)
    }

    async getByCreds(name: string, password: string): Promise<UserDoc | null> {
        const query: FilterQuery<UserDoc> = { name, password }

        return UserModel.findOne(query)
    }
}

export default new UserService()
