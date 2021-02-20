import httpStatus from 'http-status'

import ApiError from './ApiError'

export default class UnauthorizedError extends ApiError {
    constructor(msg: string, data?: Record<string, unknown>) {
        super(msg, httpStatus.UNAUTHORIZED, data)
    }
}
