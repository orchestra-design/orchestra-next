import { cva, cx } from 'class-variance-authority'
import { WorksProps } from 'lib/prismic/getWorksProps'
import { useRouter } from 'next/router'
import { useMemo, useRef, useState } from 'react'
import { useClickAway, useToggle } from 'react-use'
import { ValueOf } from 'tsdef'
import { Button } from './Button'
import { Card } from './Card'

const grid = cva('grid', {
  variants: {
    layout: {
      grid: 'grid-cols-1 gap-4 px-8 col-span-full md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4',
      list: 'col-[2] grid-cols-1 gap-8',
    },
  },
  defaultVariants: {
    layout: 'grid',
  },
})

export const LAYOUT = {
  grid: 'grid',
  list: 'list',
} as const

export type Layout = ValueOf<typeof LAYOUT>

interface Props {
  projects: WorksProps
}

export function Projects({ projects }: Props) {
  const [layout, setLayout] = useState<Layout>(LAYOUT.grid)
  const [filter, setFilter] = useState<string>('')
  const filters = useMemo(
    () =>
      (projects?.works || []).reduce<string[]>((res, item) => {
        const notYet = item.tags.filter((t) => !res.includes(t))
        notYet.forEach((tag) => {
          res.push(tag)
        })
        return res
      }, []),
    [projects],
  )
  const filtered = useMemo(
    () =>
      projects?.works.filter((p) => (filter ? p.tags.includes(filter) : true)),
    [projects, filter],
  )

  return (
    <section className="w-full grid gap-12 grid-cols-[1fr_110ch_1fr]">
      <header className="col-[2] grid gap-20">
        <h2 className="text-heading2">{projects?.title}</h2>
        <div className="flex items-center justify-between">
          <FilterSelect
            filters={filters}
            onSelect={setFilter}
            selected={filter}
          />
          <Button
            className="cursor-pointer group"
            onClick={() =>
              setLayout((prev) =>
                prev === LAYOUT.grid ? LAYOUT.list : LAYOUT.grid,
              )
            }
          >
            <SwitchLayout layout={layout} />
          </Button>
        </div>
      </header>
      <div className={grid({ layout })}>
        {filtered?.map((item) => (
          <Card key={item.id} item={item} layout={layout} />
        ))}
      </div>
    </section>
  )
}

const allProjects = cva('', {
  variants: {
    locale: {
      en: 'All projects',
      ru: 'Все проекты',
    },
  },
  defaultVariants: {
    locale: 'en',
  },
})

function FilterSelect({
  selected,
  filters,
  onSelect,
}: {
  selected: string
  filters: string[]
  onSelect: (arg: string) => void
}) {
  const { locale } = useRouter()
  const allProjectsText = allProjects({
    locale: locale as 'en' | 'ru' | undefined,
  })
  const [open, toggle] = useToggle(false)
  const ref = useRef(null)
  useClickAway(ref, toggle)

  const handleSelect = (filter: string) => {
    onSelect(filter)
    toggle(false)
  }

  return (
    <div className="relative">
      <Button
        className="gap-4 grid-cols-[repeat(2,minmax(min-content,max-content))]"
        onClick={toggle}
      >
        {selected || allProjectsText}
        <IconDown open={open} />
      </Button>
      {open && (
        <ul
          ref={ref}
          className="absolute z-10 bg-white top-full shadow-elevate1"
        >
          <Button className="w-full" onClick={() => handleSelect('')}>
            {allProjectsText}
          </Button>
          {filters.map((filter) => (
            <Button
              className="w-full whitespace-nowrap"
              key={filter}
              onClick={() => handleSelect(filter)}
            >
              {filter}
            </Button>
          ))}
        </ul>
      )}
    </div>
  )
}

function IconDown({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(open ? 'rotate-180' : '')}
    >
      <path
        d="M12 0L6 8L0 0H12Z"
        transform="translate(6 8)"
        fill="currentColor"
      />
    </svg>
  )
}

function SwitchLayout({ layout }: { layout: Layout }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform="translate(3 3)"
        stroke="currentColor"
        className="transition-colors duration-150 fill-transparent group-hover:fill-current"
      >
        {layout === LAYOUT.list ? (
          <>
            <path d="M0 7.5H18V10.5H0V7.5Z" />
            <path d="M0 0H18V3H0V0Z" />
            <path d="M0 15H18V18H0V15Z" />
          </>
        ) : (
          <>
            <path d="M0 0H4V4H0V0Z" />
            <path d="M7 0H11V4H7V0Z" />
            <path d="M14 0H18V4H14V0Z" />
            <path d="M0 7H4V11H0V7Z" />
            <path d="M7 7H11V11H7V7Z" />
            <path d="M14 7H18V11H14V7Z" />
            <path d="M0 14H4V18H0V14Z" />
            <path d="M7 14H11V18H7V14Z" />
            <path d="M14 14H18V18H14V14Z" />
          </>
        )}
      </g>
    </svg>
  )
}
