import { Document } from 'mongoose'

import { Kind } from '@interfaces/model/application';

export interface AnimalRequest {
    kind: Kind
    photo: string
    coordinates: [number, number]
}

export interface TgSessionData {
    username?: string
    request?: Partial<AnimalRequest>
}

export interface TgSession {
    key: string
    data: TgSessionData | null
}

export interface TgSessionDoc extends TgSession, Document { }
