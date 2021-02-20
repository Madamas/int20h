import { Document } from 'mongoose'
import { ObjectId } from "mongodb"
import { Kind, Breed, Color, Sex, Size } from './application'

export type InverseIndex = Partial<
    Partial<Record<Sex,
        Partial<Record<Kind,
            Partial<Record<Size,
                Partial<Record<Color,
                    Partial<Record<Breed, ObjectId[]>
                    >
                >
                >
            >
            >
        >
        >
    >
    >
>

export interface InverseIndexDoc extends InverseIndex, Document { }
