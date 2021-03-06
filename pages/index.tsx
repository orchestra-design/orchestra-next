import { Projects } from 'components/Projects'
import { Section } from 'components/Section'
import { LANG } from 'lib/prismic/constants'
import { getHomepageProps } from 'lib/prismic/getHomepageProps'
import { getWorksProps } from 'lib/prismic/getWorksProps'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const [homepage, projects] = await Promise.all([
    getHomepageProps(LANG[locale || 'en']),
    getWorksProps(LANG[locale || 'en']),
  ])

  return {
    props: {
      homepage,
      projects,
    },
  }
}

function HomePage({
  homepage,
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="pb-36">
      <Section height="default" theme="transparent" className="h-48" />
      <Section height="fullscreen" className="h-[calc(100vh-12rem)]">
        <div className="w-full grid gap-8 grid-cols-[1fr_86ch_1fr] -translate-y-28">
          <p className="col-[2] font-bold text-heading5 max-w-prose font-plex">
            {homepage?.description}
          </p>
        </div>
      </Section>
      <Section height="fullscreen">
        <Projects projects={projects} />
      </Section>
    </main>
  )
}

export default HomePage
