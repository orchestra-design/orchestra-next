import { asText } from '@prismicio/helpers'
import type {
  FilledLinkToDocumentField,
  GroupField,
  KeyTextField,
  PrismicDocument,
  RichTextField,
  TitleField,
} from '@prismicio/types'
import type { PromisedType, Return } from 'tsdef'
import { client } from './client'
import { LANG, Lang } from './constants'

type Meta = PrismicDocument<{
  title: KeyTextField
  description: RichTextField
  headerlinks: GroupField<{
    linktitle: KeyTextField
    link: FilledLinkToDocumentField<'works' | 'who' | 'what', 'filled'>
  }>
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

export async function getMetaProps(lang: Lang = LANG.en) {
  const home = await client().getByType<Meta>('meta', {
    lang,
  })

  const data = home?.results?.[0]?.data

  if (!data) return null

  return {
    title: data.title?.trim(),
    description: asText(data?.description)?.trim(),
    menu: data.headerlinks.map(({ linktitle, link }) => ({
      title: linktitle,
      uid: link.uid?.replace(/\.\w{2}$/, ''),
    })),
    // data,
  }
}

export type MetaProps = PromisedType<Return<typeof getMetaProps>>
