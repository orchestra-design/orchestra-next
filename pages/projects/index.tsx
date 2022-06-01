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
      <Section height="fullscreen">
        <Projects projects={projects} />
      </Section>
    </main>
  )
}

export default HomePage
