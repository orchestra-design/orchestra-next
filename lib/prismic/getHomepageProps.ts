import { asText } from '@prismicio/helpers'
import type {
  PrismicDocument,
  RichTextField,
  TitleField,
} from '@prismicio/types'
import type { PromisedType, Return } from 'tsdef'
import { client } from './client'
import { LANG, Lang } from './constants'

type Homepage = PrismicDocument<{
  title: TitleField
  description: RichTextField
  // body: SliceZone<
  //   Slice<
  //     'lead',
  //     {
  //       leadimage: ImageField
  //       leadtext: RichTextField
  //     }
  //   >,
  //   'filled'
  // >
  // seotitle: KeyTextField
  // seodescription: KeyTextField
  // seokeywords: KeyTextField
  // seoimage: ImageField
}>

export async function getHomepageProps(lang: Lang = LANG.en) {
  const home = await client().getByType<Homepage>('homepage', {
    lang,
  })

  const data = home?.results?.[0]?.data

  if (!data) return null

  return {
    title: asText(data.title)?.trim(),
    description: asText(data.description)?.trim(),
  }
}

export type HomepageProps = PromisedType<Return<typeof getHomepageProps>>
