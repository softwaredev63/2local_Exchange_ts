import styled from 'styled-components'
import { Box } from 'rebass/styled-components'

const Row = styled(Box)<{ align?: string; padding?: string; border?: string; borderRadius?: string }>`
  width: 100%;
  display: flex;
  padding: 0;
  align-items: ${({ align }) => align || 'center'};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`

export const RowBetween = styled(Row)`
  justify-content: space-between;
`

export const RowFlat = styled.div`
  display: flex;
  align-items: flex-end;
`

export const AutoRow = styled(Row)<{ gap?: string; justify?: string }>`
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify && justify};

  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`

export const SwapRow = styled(Row)<{ gap?: string; justify?: string }>`
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify && justify};
  align-items: flex-start;

  & > * {
    margin: ${({ gap }) => gap} !important;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: column;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }

`

export const RowFixed = styled(Row)<{ gap?: string; justify?: string }>`
  width: fit-content;
  margin: ${({ gap }) => gap && `-${gap}`};
`

export default Row
