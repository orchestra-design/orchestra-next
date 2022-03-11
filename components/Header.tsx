import { cva } from 'class-variance-authority'
import Link from 'next/link'
import { state } from 'store/background'
import { useSnapshot } from 'valtio'
import { MetaProps } from 'lib/prismic/getMetaProps'
import { LinkButton } from './Button'
import { Logo } from './Logo'
import { SwitchLang } from './SwitchLang'

const header = cva(
  'fixed inset-0 bottom-auto flex items-center justify-between px-4 py-1 ring-1 transition-colors duration-500',
  {
    variants: {
      theme: {
        transparent: 'bg-transparent ring-transparent text-black',
        white: 'bg-white ring-black/10 text-black',
        black: 'bg-black ring-white/10 text-white',
        colored: 'bg-none ring-white/25 text-white',
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

export function Header({ meta }: Props) {
  const { theme, backgroundColor } = useSnapshot(state)

  return (
    <header className={header({ theme })} style={{ backgroundColor }}>
      <Link href="/" passHref>
        <a className="w-[11rem]">
          <Logo />
        </a>
      </Link>
      <menu className="flex gap-6 ml-auto">
        {meta?.menu.map((item) => (
          <li key={item.uid}>
            <LinkButton href={`/${item.uid}`} passHref>
              {item.title}
            </LinkButton>
          </li>
        ))}
        <li>
          <SwitchLang />
        </li>
      </menu>
    </header>
  )
}
