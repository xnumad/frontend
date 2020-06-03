import styled from 'styled-components'

import { makeMargin } from '../../helper/css'

export const Important = styled.div`
  border-left: 6px solid ${(props) => props.theme.colors.brand};
  padding: 10px;
  margin-bottom: ${(props) => props.theme.spacing.mb.block};
  ${makeMargin}
`
