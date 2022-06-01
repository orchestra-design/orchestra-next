import { ValueOf } from 'tsdef'
import { proxy } from 'valtio'
import { devtools } from 'valtio/utils'

export const state = proxy<{
  theme: Theme
  backgroundColor: string | undefined
  toBeSetted: boolean
}>({
  theme: 'transparent',
  backgroundColor: undefined,
  toBeSetted: true,
})
export const unsub = devtools(state, 'background')

export const THEME = {
  transparent: 'transparent',
  white: 'white',
  black: 'black',
  colored: 'colored',
} as const

export type Theme = ValueOf<typeof THEME>
