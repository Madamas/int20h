import { JSONSchemaType } from 'ajv'

import { UserDoc } from '@interfaces/model/user';

export interface Route<T> {
    isAuthProtected: boolean
    validationSchema?: JSONSchemaType<T, false>
    handler(params: RouteParams<T>): Promise<unknown>
}

export interface RouteParams<T> {
    data: T
}

export interface UserRouteParams<T> extends RouteParams<T> {
    user: UserDoc
} 
