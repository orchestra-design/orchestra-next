import { proxy } from 'valtio'
import { devtools } from 'valtio/utils'

export const state = proxy<{
  theme: 'transparent' | 'white' | 'black' | 'colored'
  backgroundColor: string | undefined
}>({
  theme: 'transparent',
  backgroundColor: undefined,
})
export const unsub = devtools(state, 'background')
