import { Level } from 'pino'

import Config, { Env } from '@interfaces/config'

const config: Config = {
    getEnv() {
        return <Env>process.env.NODE_ENV
    },

    isLocal() {
        return this.getEnv() === Env.Local
    },

    isDev() {
        return this.getEnv() === Env.Dev
    },

    isProd() {
        return this.getEnv() === Env.Prod
    },

    package: {
        name: <string>process.env.npm_package_name,
        version: <string>process.env.npm_package_version,
    },

    port: parseInt(<string>process.env.PORT, 10),

    db: {
        uri: <string>process.env.MONGODB_URI,
    },

    logger: {
        level: <Level>process.env.LOG_LEVEL,
    },

    bot: {
        telegramToken: <string>process.env.TELEGRAM_BOT_TOKEN,
        welcomeAnimationId: 'CgACAgIAAxkBAAMOYDFPL-We7yRY22ZOCjoGNcekb0sAAqEOAAKlNohJKelouBRZ30ceBA'
    },
}

export default config
