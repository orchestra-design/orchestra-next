import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { FullScreenSection } from 'components/FullScreenSection'
import { LANG } from 'lib/prismic/constants'
import { getHomepageProps } from 'lib/prismic/getHomepageProps'
import { getWorksProps } from 'lib/prismic/getWorksProps'

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
    <main>
      <FullScreenSection theme="white">
        <p className="text-3xl font-semibold max-w-prose font-plex">
          {homepage?.description}
        </p>
      </FullScreenSection>
      <FullScreenSection theme="colored" color="#ee77cc">
        <h2>{projects?.title}</h2>
        <div>
          {projects?.works.map((item) => (
            <div key={item.id}>
              <h4>{item.title}</h4>
            </div>
          ))}
        </div>
      </FullScreenSection>
    </main>
  )
}

export default HomePage
