import { Document } from 'mongoose'

export interface User {
    name: string
    email: string
    password: string
}

export interface UserDoc extends User, Document { }
