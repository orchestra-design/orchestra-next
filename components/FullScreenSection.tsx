import { PropsWithChildren, useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'
import { state } from 'store/background'
import { useSnapshot } from 'valtio'

export function FullScreenSection({
  children,
  theme = 'transparent',
  color,
}: PropsWithChildren<{
  theme?: 'transparent' | 'white' | 'black' | 'colored'
  color?: string
}>) {
  const ref = useRef<HTMLElement>(null)
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '200px',
    threshold: 1,
  })
  const { backgroundColor } = useSnapshot(state)

  useEffect(() => {
    if (intersection?.isIntersecting) {
      state.theme = theme
      state.backgroundColor = theme === 'colored' ? color : undefined
    }
  }, [intersection?.isIntersecting])

  return (
    <section
      ref={ref}
      className="grid w-full min-h-screen transition-colors duration-500 place-items-center"
      style={{ backgroundColor }}
    >
      {children}
    </section>
  )
}
