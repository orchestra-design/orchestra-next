import { cva } from 'class-variance-authority'
import { MetaProps } from 'lib/prismic/getMetaProps'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useEffect, useMemo } from 'react'
import { state } from 'store/background'
import { useSnapshot } from 'valtio'
import { LinkButton } from './Button'
import { Logo } from './Logo'

const header = cva(
  'fixed inset-0 bottom-auto flex items-center justify-between px-4 py-1 ring-1 transition-colors duration-500 z-50',
  {
    variants: {
      theme: {
        transparent: 'bg-transparent ring-transparent text-black',
        white: 'bg-white ring-black/10 text-black backdrop-blur-sm',
        black: 'bg-black ring-white/10 text-white backdrop-blur-sm',
        colored: 'bg-none ring-white/25 text-white backdrop-blur-sm',
      },
    },
    defaultVariants: {
      theme: 'transparent',
    },
  },
)

interface Props {
  meta: MetaProps
}

export const Header = memo(function Header({ meta }: Props) {
  const { theme, backgroundColor } = useSnapshot(state)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = backgroundColor || 'white'
    }
  }, [backgroundColor])

  return (
    <header className={header({ theme })} style={{ backgroundColor }}>
      <Link href="/" passHref>
        <a className="w-[11rem]">
          <Logo />
        </a>
      </Link>
      <menu className="flex gap-6 ml-auto">
        {meta?.menu.map((item) =>
          item.uid ? (
            <li key={item.uid}>
              <LinkButton href={`/${item.uid}`} passHref>
                {item.title}
              </LinkButton>
            </li>
          ) : null,
        )}
        <li>
          <SwitchLang />
        </li>
      </menu>
    </header>
  )
})

const SwitchLang = memo(function SwitchLang() {
  const { asPath, locales, locale } = useRouter()
  const nextLocal = useMemo(
    () => locales?.filter((l) => l !== 'default').find((l) => l !== locale),
    [locales, locale],
  )

  return (
    <LinkButton className="uppercase" href={asPath} locale={nextLocal} passHref>
      {nextLocal}
    </LinkButton>
  )
})
