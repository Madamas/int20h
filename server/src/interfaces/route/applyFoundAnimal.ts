import { ApplicationRequest } from '@interfaces/service/application'

export type RouteRequestData = ApplicationRequest

export interface RouteResponse {
    similars: string[]
    success: boolean
}
