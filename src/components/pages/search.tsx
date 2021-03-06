import React from 'react'
import styled from 'styled-components'

import { HeadTags } from '../head-tags'
import { SearchResults } from '@/components/navigation/search-results'
import { useInstanceData } from '@/contexts/instance-context'

interface GoogleSearchGlobal {
  google: {
    search: {
      cse: {
        element: {
          render: (arg0: { div: string; tag: string }) => void
        }
      }
    }
  }
}

export function Search() {
  const { strings } = useInstanceData()

  const renderResults = () => {
    const _window = (window as unknown) as Window & GoogleSearchGlobal
    if (typeof _window.google === 'undefined') {
      setTimeout(() => {
        renderResults()
      }, 100)
      return false
    }

    _window.google.search.cse.element.render({
      div: 'gcs-results',
      tag: 'searchresults-only',
    })
  }

  React.useEffect(() => {
    renderResults()
  })

  return (
    <>
      <HeadTags data={{ title: `Serlo.org - ${strings.header.search}` }} />
      <StyledSearchResults>
        <div id="gcs-results"></div>
      </StyledSearchResults>
    </>
  )
}

const StyledSearchResults = styled(SearchResults)`
  padding: 50px 0;
`
