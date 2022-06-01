import { asText } from '@prismicio/helpers'
import type {
  ColorField,
  FilledLinkToDocumentField,
  GroupField,
  ImageField,
  KeyTextField,
  PrismicDocument,
  TitleField,
} from '@prismicio/types'
import type { Nullable, PromisedType, Return } from 'tsdef'
import { client } from './client'
import { LANG, Lang } from './constants'
import { parseImageUrl } from './parseImageUrl'

type Works = PrismicDocument<{
  title: TitleField
  links: GroupField<{
    link: FilledLinkToDocumentField<
      'work',
      'filled',
      {
        image: ImageField
        title: KeyTextField
        statement: TitleField
        color: ColorField
      }
    >
  }>
  // seotitle: KeyTextField
  // seodescription: KeyTextField
  // seokeywords: KeyTextField
  // seoimage: ImageField
}>

export async function getWorksProps(lang: Lang = LANG.en) {
  const works = await client().getByType<Works>('works', {
    lang,
    fetchLinks: ['work.image', 'work.title', 'work.statement', 'work.color'],
  })

  const data = works?.results?.[0]?.data

  if (!data) return null

  return {
    title: asText(data?.title)?.trim(),
    works: (data.links as Works['data']['links'][number][]).reduce<Work[]>(
      (res, { link }) => {
        if (link.isBroken === false && link.uid) {
          res.push({
            id: link.id,
            uid: link.uid?.replace(/\.\w{2}$/, ''),
            title: link.data?.title ?? '',
            statement: asText(link.data?.statement),
            color: (link.data?.color as string) || null,
            tags: link.tags,
            lang: link.lang,
            image: link.data?.image?.url
              ? parseImageUrl(link.data.image.url)
              : null,
          })
        }
        return res
      },
      [],
    ),
  }
}

export type WorksProps = PromisedType<Return<typeof getWorksProps>>
export type Work = {
  id: string
  uid: string
  title: string
  statement: Nullable<string>
  color: string | null
  tags: string[]
  lang: string
  image: Nullable<string>
}
