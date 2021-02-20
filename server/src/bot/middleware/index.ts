import { TelegrafBot } from '@interfaces/bot'

import session from './session'
import user from './user'
import logger from './logger'

class InitMiddleware {
    set(bot: TelegrafBot): void {
        bot.use(
            logger,
            session,
            user
        )
    }
}

export default new InitMiddleware()
