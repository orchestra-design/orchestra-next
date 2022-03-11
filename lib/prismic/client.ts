import type { CreateClientConfig } from '@prismicio/next'
import { createPrismicClient } from 'lib/prismic/config'

export const client = (config?: CreateClientConfig) =>
  createPrismicClient(
    process.env.PRISMIC_REPOSITORY_NAME!,
    process.env.PRISMIC_TOKEN!,
    config,
  )
