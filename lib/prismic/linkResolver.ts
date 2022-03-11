import { PrismicDocument } from '@prismicio/types'

export function linkResolver(document: PrismicDocument) {
  if (document.type === 'work') {
    return '/projects/' + document.uid?.replace(/\.\w{2}$/, '')
  }

  return '/'
}
