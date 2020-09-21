import React from 'react'

import { Text } from '@chakra-ui/core'
import os from 'os'
import { useRecoilValue } from 'recoil'

import { windowTitle } from '../atoms/index'
import { titleBarSpecs } from '../selectors/index'
import Action from './utils/action'
import Menu from './utils/menu'
import { Container } from './utils/style'

const TitleBar: React.FC = () => {
  const title = useRecoilValue(windowTitle)
  const { height } = useRecoilValue(titleBarSpecs)
  return (
    <Container
      width="100%"
      height={height}
      justifyContent="space-between"
      alignItems="center"
      flexDirection={os.platform() === 'darwin' ? 'row-reverse' : 'row'}
    >
      <Menu />
      <Text fontFamily="Roboto-Black">{title}</Text>
      <Action platform={os.platform()} />
    </Container>
  )
}

export default TitleBar
