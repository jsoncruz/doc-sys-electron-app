import { Flex, Stack } from '@chakra-ui/core'
import styled from 'styled-components'

export const Container = styled(Flex)`
  -webkit-user-select: none;
  -webkit-app-region: drag
`
export const TitleBarActions = styled(Stack)`
  -webkit-app-region: no-drag;
`
