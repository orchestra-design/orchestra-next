import { cva } from 'class-variance-authority'
import Link, { LinkProps } from 'next/link'
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  forwardRef,
  PropsWithChildren,
} from 'react'
import { state } from 'store/background'
import { useSnapshot } from 'valtio'

export const button = cva(
  'inline-grid place-items-center px-3 py-2.5 font-plex font-medium border-none outline-none text-sm cursor-pointer ring-1 shadow-elevate1 shadow-transparent bg-black ring-white/5 text-white transition-colors duration-150 hover:bg-transparent',
  {
    variants: {
      theme: {
        transparent:
          'hover:ring-black/5 hover:text-black hover:shadow-black/25',
        white: 'hover:ring-black/5 hover:text-black hover:shadow-black/25',
        black: 'hover:ring-white/5 hover:text-white hover:shadow-white/25',
        colored: 'hover:ring-white/10 hover:text-white hover:shadow-white/50',
      },
    },
    defaultVariants: {
      theme: 'black',
    },
  },
)

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function Button({ children, className, ...props }, ref) {
  const { theme } = useSnapshot(state)

  return (
    <button
      ref={ref}
      className={button({ theme, class: className })}
      {...props}
    >
      {children}
    </button>
  )
})

export const AnchorButton = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>(function Button({ children, className, ...props }, ref) {
  const { theme } = useSnapshot(state)

  return (
    <a ref={ref} className={button({ theme, class: className })} {...props}>
      {children}
    </a>
  )
})

export function LinkButton({
  children,
  className,
  ...props
}: LinkProps & PropsWithChildren<{ className?: string }>) {
  const { theme } = useSnapshot(state)

  return (
    <Link {...props}>
      <a className={button({ theme, class: className })}>{children}</a>
    </Link>
  )
}
