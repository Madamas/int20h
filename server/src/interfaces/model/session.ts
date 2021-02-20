import { Document } from 'mongoose'
import { ObjectId } from 'mongodb'

export interface Session {
    token: string
    userId: ObjectId
}

export interface SessionDoc extends Session, Document { }
