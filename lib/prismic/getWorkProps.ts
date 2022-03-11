import { asText } from '@prismicio/helpers'
import type {
  ColorField,
  GroupField,
  ImageField,
  KeyTextField,
  LinkField,
  PrismicDocument,
  RichTextField,
  SelectField,
  Slice,
  SliceZone,
  TitleField,
} from '@prismicio/types'
import type { Nullable, PromisedType, Return } from 'tsdef'
import { client } from './client'
import { LANG, Lang } from './constants'
import { parseImageUrl } from './parseImageUrl'

type Work = PrismicDocument<{
  title: KeyTextField
  statement: RichTextField
  image: ImageField
  color: ColorField

  body: SliceZone<
    | Slice<
        'image_caption',
        {
          sicgrid: SelectField<'left' | 'right', 'filled'>
          sicimage: ImageField
          siccaption: KeyTextField
          sicheader: TitleField
        },
        {
          sictextimage: ImageField
          sictext: RichTextField
          sictextlink: LinkField
        }
      >
    | Slice<
        'image',
        {
          imgtext: RichTextField
        },
        {
          imgimage: ImageField
          imgcaption: KeyTextField
          sictextlink: LinkField
        }
      >,
    'filled'
  >

  descriptiontext: RichTextField
  map: ImageField
  location: KeyTextField
  status: KeyTextField
  timeline: KeyTextField
  client: KeyTextField
  customtags: GroupField<{
    tagtitle: KeyTextField
    tagdescription: KeyTextField
  }>
  // context: GroupField<{
  //   link: FilledLinkToDocumentField<'work', 'filled', { image: ImageField }>
  // }>

  seotitle: KeyTextField
  seodescription: KeyTextField
  seokeywords: KeyTextField
  seoimage: ImageField
}>

export async function getWorkProps(uid: string, lang: Lang = LANG.en) {
  const work = await client().getByUID<Work>('work', uid, {
    lang,
  })

  const data = work?.data

  if (!data) return null

  interface Image {
    src: string
    caption: Nullable<string>
  }

  return {
    title: data.title?.trim(),
    statement: asText(data.statement),
    image: data.image?.url ? parseImageUrl(data.image.url) : null,
    color: data.color,
    description: data.descriptiontext,
    map: data.map,
    location: data.location,
    status: data.status,
    timeline: data.timeline,
    client: data.client,
    seotitle: data.seotitle,
    seodescription: data.seodescription,
    seokeywords: data.seokeywords,
    seoimage: data.seoimage?.url ? parseImageUrl(data.seoimage.url) : null,
    body: data.body.reduce<
      (
        | {
            __type: 'image_caption'
            texts: RichTextField[]
          }
        | {
            __type: 'image'
            images: Image[]
          }
      )[]
    >((res, item) => {
      switch (item.slice_type) {
        case 'image_caption':
          res.push({
            __type: item.slice_type,
            texts: item.items.map(({ sictext }) => sictext),
          })
          break
        case 'image':
          res.push({
            __type: item.slice_type,
            images: item.items.reduce<Image[]>(
              (imgs, { imgimage, imgcaption }) => {
                if (imgimage?.url) {
                  imgs.push({
                    src: parseImageUrl(imgimage.url),
                    caption: imgcaption,
                  })
                }
                return imgs
              },
              [],
            ),
          })
          break

        default:
          break
      }
      return res
    }, []),
  }
}

export type WorkProps = PromisedType<Return<typeof getWorkProps>>
