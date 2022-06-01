import { Header } from 'components/Header'
import { LANG } from 'lib/prismic/constants'
import { getMetaProps, MetaProps } from 'lib/prismic/getMetaProps'
import { NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import '../styles/index.css'

function MyApp({
  Component,
  pageProps,
  router,
  meta,
}: AppProps & { meta: MetaProps }) {
  return (
    <>
      <Header meta={meta} />
      <Component key={router.route} {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async function getInitialProps({
  ctx,
}: {
  ctx: NextPageContext
}) {
  const meta = await getMetaProps(LANG[ctx.locale || 'en'])
  return {
    meta,
  }
}

export default MyApp
