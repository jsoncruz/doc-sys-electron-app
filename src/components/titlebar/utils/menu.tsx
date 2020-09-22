import React from 'react'

import { Box } from '@chakra-ui/core'
import { useHistory } from 'react-router-dom'

import ForthAndBack from './control'
import { TitleBarActions } from './style'

const Menu: React.FC = () => {
  const { length: historyLength } = useHistory()
  return (
    <TitleBarActions isInline>
      <ForthAndBack isVisible={historyLength >= 2} />
    </TitleBarActions>
  )
}

export default Menu
