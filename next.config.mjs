const ENV_VARS = {}

/**
 * @type {import('next').NextConfig}
 */
const config = {
  swcMinify: true,
  publicRuntimeConfig: ENV_VARS,
  reactStrictMode: true,
  experimental: {
    reactRoot: true,
  },
  images: {
    domains: ['images.prismic.io'],
  },
  i18n: {
    locales: ['default', 'en', 'ru'],
    defaultLocale: 'default',
    localeDetection: false,
  },
}

export default config
