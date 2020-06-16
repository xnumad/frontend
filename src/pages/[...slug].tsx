import { NextPage } from 'next'
import absoluteUrl from 'next-absolute-url'
import dynamic from 'next/dynamic'
import React from 'react'
import styled, { css } from 'styled-components'

import { CookieBar } from '@/components/content/cookie-bar'
import { Entity, EntityProps } from '@/components/content/entity'
import { ErrorPage } from '@/components/content/error-page'
import { HSpace } from '@/components/content/h-space'
import { Horizon } from '@/components/content/horizon'
import { LicenseNoticeData } from '@/components/content/license-notice'
import { Topic, TopicProp } from '@/components/content/topic'
import type { BreadcrumbsProps } from '@/components/navigation/breadcrumbs'
import { Footer } from '@/components/navigation/footer'
import { Header } from '@/components/navigation/header'
import type { MetaMenuProps } from '@/components/navigation/meta-menu'
import { PrettyLinksProvider } from '@/components/pretty-links-context'
import { SlugHead } from '@/components/slug-head'
import { horizonData } from '@/data/horizon'

const MetaMenu = dynamic<MetaMenuProps>(() =>
  import('@/components/navigation/meta-menu').then((mod) => mod.MetaMenu)
)
const Breadcrumbs = dynamic<BreadcrumbsProps>(() =>
  import('@/components/navigation/breadcrumbs').then((mod) => mod.Breadcrumbs)
)

const NewsletterPopup = dynamic<{}>(
  () =>
    import('@/components/scripts/newsletter-popup').then(
      (mod) => mod.NewsletterPopup
    ),
  {
    ssr: false,
  }
)

export interface PageViewProps {
  fetchedData: {
    contentId: string
    alias: string
    title: string
    horizonIndices: number[]
    breadcrumbs: BreadcrumbsProps['entries']
    contentType: EntityProps['contentType']
    navigation: MetaMenuProps['navigation']
    license: LicenseNoticeData
    prettyLinks: Record<string, { alias: string }>
    error: boolean
    type?: string
    data: EntityProps['data']
  }
  origin: string
}

// TODO: The quest for the correct type continues here
export interface EditorState {
  children: unknown[] | {}
  type?: string
}

const PageView: NextPage<PageViewProps> = (props) => {
  React.useEffect(() => {
    try {
      sessionStorage.setItem(props.fetchedData.alias, JSON.stringify(props))
    } catch (e) {
      //
    }
  }, [props])
  if (!props.fetchedData) return null
  const { fetchedData, origin } = props
  const {
    contentId,
    alias,
    horizonIndices,
    breadcrumbs,
    contentType,
    title,
    navigation,
    license,
    prettyLinks,
    error,
    type,
    data,
  } = fetchedData

  const showNav =
    navigation && !(contentType === 'TaxonomyTerm' && type === 'topicFolder')

  // function isCourse(data: EntityProps['data']): data is CourseData {
  //   return (data as CourseData).pages !== undefined
  // }

  // {
  //   contentType: 'TaxonomyTerm: data: TopicProp } | { contentType: 'Course', data: EntityProps['data']
  // }

  // { contentType: 'TaxonomyTerm: data: TopicProp } | { contentType: 'Course', data: EntityProps['data'] }

  interface IsTaxonomyTermData {
    contentType: 'TaxonomyTerm'
    data: TopicProp
  }

  interface IsNotTaxonomyTermData {
    contentType: string
    data: EntityProps['data']
  }

  function isTaxonomyTerm(
    obj: IsTaxonomyTermData | IsNotTaxonomyTermData
  ): obj is IsTaxonomyTermData {
    const { contentType } = obj
    return contentType === 'TaxonomyTerm'
    // if (contentType === 'TaxonomyTerm') {
    //   return true && (data as TopicProp)
    // } else {
    //   return data as EntityProps['data']
    // }
  }

  return (
    <>
      <SlugHead
        title={title}
        data={data}
        alias={alias}
        contentType={contentType}
        origin={origin}
      />
      <Header />
      {showNav && (
        <MetaMenu pagealias={`/${data.id}`} navigation={navigation} />
      )}
      <RelatveContainer>
        <MaxWidthDiv showNav={!!showNav}>
          <PrettyLinksProvider value={prettyLinks}>
            {error && <ErrorPage alias={alias} />}

            {breadcrumbs && !(contentType === 'Page' && navigation) && (
              <Breadcrumbs entries={breadcrumbs} />
            )}

            <main>
              {isTaxonomyTerm({ contentType, data }) ? (
                <>
                  {/* @ts-expect-error */}
                  <Topic data={data} contentId={contentId} />
                </>
              ) : (
                <Entity
                  data={data}
                  contentId={contentId}
                  contentType={contentType}
                  license={license}
                />
              )}
            </main>

            <HSpace amount={40} />
            {horizonIndices && (
              <Horizon
                entries={horizonIndices.map((index) => horizonData[index])}
              />
            )}
          </PrettyLinksProvider>
        </MaxWidthDiv>
      </RelatveContainer>
      <Footer />
      {contentType === 'Page' && data && <NewsletterPopup />}
      <CookieBar />
    </>
  )
}

const RelatveContainer = styled.div`
  position: relative;
`

const MaxWidthDiv = styled.div<{ showNav?: boolean }>`
  max-width: 800px;
  margin: 0 auto;

  @media (min-width: ${(props) =>
      props.theme.breakpoints.sm}) AND (max-width: ${(props) =>
      props.theme.breakpoints.md}) {
    margin: 0 0 0 51px;
  }

  ${(props) =>
    props.showNav &&
    css`
      @media (min-width: ${(props) =>
          props.theme.breakpoints.md}) AND (max-width: ${(props) =>
          props.theme.breakpoints.lg}) {
        margin: 0 0 0 200px;
      }
    `}
`

// TODO: needs type declaration
PageView.getInitialProps = async (props: any) => {
  if (typeof window === 'undefined') {
    const { origin } = absoluteUrl(props.req)
    const res = await fetch(
      `${origin}/api/frontend/${encodeURIComponent(
        props.query.slug.join('/')
      )}?redirect`
    )
    const fetchedData = await res.json()
    // compat course to first page
    if (fetchedData.redirect) {
      props.res.writeHead(301, {
        Location: encodeURI(fetchedData.redirect),
        // Add the content-type for SEO considerations
        'Content-Type': 'text/html; charset=utf-8',
      })
      props.res.end()
      // compat: return empty props
      return { props: {} }
    }

    if (fetchedData.error) {
      props.res.statusCode = 404
    }

    return { fetchedData, origin }
  } else {
    const url = '/' + (props.query.slug.join('/') as string)
    const googleAnalytics = (window as any).ga
    if (googleAnalytics) {
      googleAnalytics('set', 'page', url)
      googleAnalytics('send', 'pageview')
    }
    try {
      const fromCache = sessionStorage.getItem(url)
      if (fromCache) {
        return JSON.parse(fromCache)
      }
    } catch (e) {
      //
    }
    const origin = window.location.host
    const protocol = window.location.protocol
    const res = await fetch(
      `${protocol}//${origin}/api/frontend${encodeURI(url)}`
    )
    const fetchedData = await res.json()
    // compat: redirect of courses
    if (fetchedData.redirect) {
      const res = await fetch(
        `${protocol}//${origin}/api/frontend${fetchedData.redirect}`
      )
      const fetchedData2 = await res.json()
      return { fetchedData: fetchedData2, origin }
    }
    return { fetchedData, origin }
  }
}

// eslint-disable-next-line import/no-default-export
export default PageView

// const fetchedData = (await res.json()) as PageViewProps['fetchedData'] & {
//   redirect: string
// }
