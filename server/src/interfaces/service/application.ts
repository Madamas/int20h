import { Application } from '@interfaces/model/application'

export interface ApplicationRequest extends Omit<Application, 'userId' | 'type' | 'geo'> {
    coordinates: number[]
}