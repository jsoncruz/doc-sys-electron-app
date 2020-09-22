import React from 'react'

import { PseudoBox, PseudoBoxProps } from '@chakra-ui/core'
import { useRecoilValue } from 'recoil'

import { titleBarSpecs } from '~/global/selectors'

const Body: React.FC<PseudoBoxProps> = (props) => {
  const { height } = useRecoilValue(titleBarSpecs)
  return (
    <PseudoBox
      {...props}
      overflow="auto"
      position="absolute"
      top={`${height}px`}
      left="0"
      as="div"
      w="100%"
      h={`calc(100% - ${height}px)`}
    />
  )
}

export default Body
