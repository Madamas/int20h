import { Telegraf, Context as TelegrafContext } from 'telegraf'

import { TgSessionData } from './model/tgSession'
import { TgUserDoc } from './model/tgUser'

export interface Context extends TelegrafContext {
    session: TgSessionData
    user: TgUserDoc
}

export type TelegrafBot = Telegraf<Context>

export enum ActionId {
    AddDirection = 'addDirection',
}

export enum Button {
    FoundCat = 'Знайшов кітика 🐈',
    FoundDog = 'Знайшов собачку 🐶',
    FoundBird = 'Знайшов птичку 🐦',
    Cancel = 'кенсел 🚫'
}
