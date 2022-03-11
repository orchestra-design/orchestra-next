import { LANG } from './constants'
import { getHomepageProps } from './getHomepageProps'
import { getMetaProps } from './getMetaProps'
import { getWorkProps } from './getWorkProps'
import { getWorksProps } from './getWorksProps'

describe('Prismic client api', () => {
  jest.setTimeout(20000)

  test.skip('getHomepageProps', async () => {
    const props = await getHomepageProps(LANG.ru)
    const en = await getHomepageProps(LANG.en)

    // console.log(JSON.stringify(props, null, 2))
    expect(props?.title).toEqual('Orchestra Design')
    expect(en).toBeFalsy()
  })

  test.skip('getWorksProps', async () => {
    const props = await getWorksProps(LANG.ru)
    const en = await getWorksProps(LANG.en)

    // console.log(JSON.stringify(props, null, 2))
    // console.log(JSON.stringify(en, null, 2))
    expect(props?.title).toEqual('Проекты')
    expect(en?.works.length).toBeGreaterThanOrEqual(1)
  })

  test.skip('getWorkProps', async () => {
    const props = await getWorkProps('newtorg.ru', LANG.ru)
    // const en = await getWorkProps('newtorg.en', LANG.en)

    console.log(JSON.stringify(props, null, 2))
    // console.log(JSON.stringify(en, null, 2))
    expect(props?.title).toEqual('Концепция развития центра Фурманова')
    // expect(en?.title).toEqual('Концепция развития центра Фурманова')
  })

  test.skip('getMetaProps', async () => {
    const props = await getMetaProps(LANG.ru)
    // const en = await getMetaProps('newtorg.en', LANG.en)

    console.log(JSON.stringify(props, null, 2))
    // console.log(JSON.stringify(en, null, 2))
    expect(props?.title).toEqual('Orchestra Design')
    // expect(en?.title).toEqual('Orchestra Design')
  })
})
