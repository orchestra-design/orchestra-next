import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { LinkButton } from './Button'

export function SwitchLang() {
  const { asPath, locales, locale } = useRouter()
  const nextLocal = useMemo(
    () => locales?.filter((l) => l !== 'default').find((l) => l !== locale),
    [locales],
  )

  return (
    <LinkButton className="uppercase" href={asPath} locale={nextLocal} passHref>
      {nextLocal}
    </LinkButton>
  )
}
