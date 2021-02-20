import { FilterQuery } from 'mongoose'
import { ObjectId } from 'mongodb'
import { v4 as uuid } from 'uuid'

import SessionModel from '@src/model/session'

import { Session, SessionDoc } from '@interfaces/model/session'

class SessionService {
    create(userId: ObjectId): Promise<SessionDoc> {
        const session: Session = {
            userId,
            token: uuid()
        }

        return SessionModel.create(session)
    }

    async getByToken(token: string): Promise<SessionDoc | null> {
        const query: FilterQuery<SessionDoc> = { token }

        return SessionModel.findOne(query)
    }
}

export default new SessionService()
