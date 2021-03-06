import { faShareAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import { Router } from 'next/router'
import React from 'react'
import styled from 'styled-components'

import { HSpace } from './h-space'
import { LicenseNotice } from '@/components/content/license-notice'
import type { CourseFooterProps } from '@/components/navigation/course-footer'
import type { CourseNavigationProps } from '@/components/navigation/course-navigation'
import { ShareModal } from '@/components/navigation/share-modal'
import { UserToolsMobileButton } from '@/components/navigation/tool-line-button'
import { UserTools } from '@/components/navigation/user-tools'
import { UserToolsMobile } from '@/components/navigation/user-tools-mobile'
import { StyledH1 } from '@/components/tags/styled-h1'
import { useInstanceData } from '@/contexts/instance-context'
import { EntityData, FrontendContentNode } from '@/data-types'
import { entityIconMapping } from '@/helper/icon-by-entity-type'
import { renderArticle } from '@/schema/article-renderer'

const CourseNavigation = dynamic<CourseNavigationProps>(() =>
  import('@/components/navigation/course-navigation').then(
    (mod) => mod.CourseNavigation
  )
)

const CourseFooter = dynamic<CourseFooterProps>(() =>
  import('@/components/navigation/course-footer').then(
    (mod) => mod.CourseFooter
  )
)

export interface EntityProps {
  data: EntityData
}

export function Entity({ data }: EntityProps) {
  // state of the share modal
  const [open, setOpen] = React.useState(false)

  // course
  const [courseNavOpen, setCourseNavOpen] = React.useState(false)
  const openCourseNav = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setCourseNavOpen(true)
  }

  Router.events.on('routeChangeComplete', () => {
    setCourseNavOpen(false)
  })

  const { strings } = useInstanceData()

  return wrapWithSchema(
    <>
      {renderCourseNavigation()}
      {data.trashed && renderTrashedNotice()}
      {renderStyledH1()}
      {renderUserToolsMobile()}
      {data.content && renderContent(data.content)}
      {renderCourseFooter()}
      <HSpace amount={20} />
      {renderUserToolsMobile()}
      {renderUserTools()}
      {renderShareModal()}
      {data.licenseData && <LicenseNotice data={data.licenseData} />}
    </>
  )

  function renderStyledH1() {
    if (!data.title) return null

    return (
      <StyledH1 extraMarginTop itemProp="name">
        {data.title}
        {renderEntityIcon()}
      </StyledH1>
    )
  }

  function renderEntityIcon() {
    if (!data.categoryIcon) return null
    return (
      <span title={strings.entities[data.categoryIcon]}>
        {' '}
        <StyledIcon icon={entityIconMapping[data.categoryIcon]} />{' '}
      </span>
    )
  }

  function wrapWithSchema(comp: JSX.Element) {
    if (data.schemaData) {
      if (data.schemaData.wrapWithItemType) {
        if (data.schemaData.useArticleTag) {
          return (
            <article itemScope itemType={data.schemaData.wrapWithItemType}>
              {comp}
            </article>
          )
        } else {
          return (
            <div itemScope itemType={data.schemaData.wrapWithItemType}>
              {comp}
            </div>
          )
        }
      }
    }
    return comp
  }

  function renderContent(value: FrontendContentNode[]) {
    if (data.schemaData?.setContentAsSection) {
      return <section itemProp="articleBody">{renderArticle(value)}</section>
    }
    return renderArticle(value)
  }

  function renderUserToolsMobile() {
    return (
      <UserToolsMobile>
        <UserToolsMobileButton
          isOnTop
          tabIndex={0}
          onClick={() => setOpen(true)}
        >
          <FontAwesomeIcon icon={faShareAlt} size="1x" /> {strings.share.button}
        </UserToolsMobileButton>
      </UserToolsMobile>
    )
  }

  function renderUserTools() {
    return (
      <UserTools
        onShare={() => setOpen(true)}
        id={data.id}
        hideEdit={!data.inviteToEdit}
        data={{
          type: data.typename,
          id: data.id,
          revisionId: data.revisionId,
          courseId: data.courseData?.id,
        }}
      />
    )
  }

  function renderShareModal() {
    return (
      <ShareModal
        open={open}
        onClose={() => setOpen(false)}
        contentId={data.id}
      />
    )
  }

  function renderCourseNavigation() {
    if (data.courseData) {
      return (
        <CourseNavigation
          open={courseNavOpen}
          onOverviewButtonClick={openCourseNav}
          data={data.courseData}
        />
      )
    } else return null
  }

  function renderCourseFooter() {
    if (data.courseData) {
      return (
        <CourseFooter
          onOverviewButtonClick={openCourseNav}
          nextHref={data.courseData.nextPageUrl ?? ''}
        />
      )
    } else return null
  }

  function renderTrashedNotice() {
    return (
      <TrashNotice>
        <FontAwesomeIcon icon={faTrash} /> {strings.content.trashedNotice}
      </TrashNotice>
    )
  }
}

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.lighterblue};
  font-size: 1.73rem;
`

const TrashNotice = styled.div`
  margin: 50px 0;
  padding: 16px;
  background-color: #ddd;
  border-radius: 20px;
  font-weight: bold;
`
