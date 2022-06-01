import { cva, cx, VariantProps } from 'class-variance-authority'
import { PropsWithChildren, useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'
import { state, Theme } from 'store/background'
import { useSnapshot } from 'valtio'

export const section = cva('absolute top-0 w-full z-[-1]', {
  variants: {
    height: {
      default: 'h-full',
      fullscreen: 'h-screen',
    },
  },
  defaultVariants: {
    height: 'default',
  },
})

export type SectionVariants = VariantProps<typeof section>

export function Section({
  children,
  theme = 'white',
  color,
  height,
  className,
}: PropsWithChildren<{
  theme?: Theme
  color?: string
  height?: SectionVariants['height']
  className?: string
}>) {
  const ref = useRef<HTMLDivElement>(null)
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '100px',
    threshold: 1,
  })
  const { theme: currentTheme, toBeSetted } = useSnapshot(state)

  useEffect(() => {
    if (intersection?.isIntersecting && currentTheme !== theme) {
      state.theme = theme
      state.backgroundColor = theme === 'colored' ? color : undefined
      state.toBeSetted = false
    } else if (!toBeSetted) {
      state.toBeSetted = true
    }
  }, [intersection?.isIntersecting, color, currentTheme, theme, toBeSetted])

  return (
    <section
      className={cx(
        'relative grid w-full gap-8 transition-colors duration-500 place-items-center',
        className,
      )}
    >
      <div ref={ref} className={section({ height })} />
      {children}
    </section>
  )
}
