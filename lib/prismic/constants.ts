import { ValueOf } from 'tsdef'

export const LANG = {
  ru: 'ru',
  en: 'en-us',
} as const

export type Lang = ValueOf<typeof LANG>
