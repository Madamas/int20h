import { Context } from '..';

export enum CommandName {
    HealthCheck = 'healthcheck',
    Start = 'start'
}

export interface CommandHandlerResult {
    msg: string
    keyboard?: any
}

export interface CommandHandler {
    name: CommandName
    handler: (ctx: Context) => Promise<CommandHandlerResult | void>
}
