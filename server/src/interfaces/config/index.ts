import { Level } from 'pino'

export enum Env {
    Local = 'local',
    Dev = 'development',
    Prod = 'production'
}

export default interface Config {
    getEnv(): Env
    isLocal(): boolean
    isDev(): boolean
    isProd(): boolean
    package: {
        name: string
        version: string
    }
    port: number
    db: {
        uri: string
    }
    logger: {
        level: Level
    }
    bot: {
        telegramToken: string,
        welcomeAnimationId: string
    }
}
