import { cva } from 'class-variance-authority'
import { Work } from 'lib/prismic/getWorksProps'
import Image from 'next/image'
import Link from 'next/link'
import { Layout } from './Projects'

const card = cva('grid w-full group relative', {
  variants: {
    layout: {
      grid: 'aspect-ratio-card',
      list: 'grid-cols-2 gap-4',
    },
  },
  defaultVariants: {
    layout: 'grid',
  },
})

const captionWrapper = cva('grid items-start', {
  variants: {
    layout: {
      grid: 'absolute inset-0 grid-rows-[1fr,minmax(0,max-content)] opacity-0 transition-opacity duration-300 group-hover:opacity-100',
      list: 'duration-0',
    },
  },
  defaultVariants: {
    layout: 'grid',
  },
})

const backdrop = cva('', {
  variants: {
    layout: {
      grid: 'w-full h-full bg-gradient-to-b from-black/0 via-black/0 to-black/60',
      list: 'hidden',
    },
  },
  defaultVariants: {
    layout: 'grid',
  },
})

const caption = cva('grid', {
  variants: {
    layout: {
      grid: 'grid-cols-2 gap-8 p-2 overflow-hidden align-baseline md:p-4 bg-black/60 text-gray-50',
      list: 'gap-4',
    },
  },
  defaultVariants: {
    layout: 'grid',
  },
})

const heading = cva('block w-full font-bold font-plex', {
  variants: {
    layout: {
      grid: 'text-heading6',
      list: 'text-heading2',
    },
  },
  defaultVariants: {
    layout: 'grid',
  },
})

type Props = {
  item: Work
  layout?: Layout
}

export function Card({ item, layout }: Props) {
  if (!item) return null

  return (
    <>
      <Link href={`/projects/${item.uid}`} passHref>
        <a className={card({ layout })}>
          <div
            className="grid object-cover w-full overflow-hidden aspect-ratio-card"
            style={{ backgroundColor: item.color || undefined }}
          >
            <Image
              src={`${item.image}?fit=clamp&lossless=1&w=480`}
              blurDataURL={`${item.image}?fit=clamp&w=32`}
              alt={item.title ?? ''}
              objectFit="cover"
              placeholder="blur"
              width={480}
              height={300}
              quality={90}
            />
          </div>
          <div className={captionWrapper({ layout })}>
            <div className={backdrop({ layout })} />
            <div className={caption({ layout })}>
              <h3 className={heading({ layout })}>{item.statement}</h3>
              <div className="font-sans font-semibold leading-snug text-description">
                {item.title}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </>
  )
}
