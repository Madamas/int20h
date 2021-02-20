import { Document } from 'mongoose'

export interface TgUser {
    tgId: number
}

export interface TgUserDoc extends TgUser, Document { }
