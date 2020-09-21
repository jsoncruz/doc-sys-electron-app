import React from 'react'

import { PseudoBox, PseudoBoxProps, Skeleton } from '@chakra-ui/core'
import styled from 'styled-components'

interface ContainerProps extends PseudoBoxProps {
  isLoaded: boolean;
}

const Scrollable = styled(PseudoBox)`
  padding: 10px 0;

`

export const Container: React.FC<ContainerProps> = ({ children, isLoaded, ...rest }) => {
  return (
    <Skeleton width="100%" height="100%" isLoaded={isLoaded}>
      <PseudoBox
        position="relative"
        top="0"
        left="0"
        w="100%"
        h="100%"
      >
        <Scrollable
          position="absolute"
          w="100%"
          h="100%"
          backgroundColor="gray.100"
          borderRadius="md"
          overflowY="auto"
          {...rest}
        >
          {children}
        </Scrollable>
      </PseudoBox>
    </Skeleton>
  )
}

export const Card = styled(PseudoBox).attrs({
  position: 'relative',
  w: '90%',
  minH: '70px',
  margin: 'auto',
  cursor: 'pointer',
  borderRadius: 'md',
  backgroundColor: 'white',
  boxShadow: '0 0 30px -15px rgba(0,0,0,.2)',
  transition: 'all 0.1s linear',
  padding: 3,
  _hover: {
    backgroundColor: '#F7FAFC'
  }
})`
  &:nth-child(n+2) {
    margin-top: 10px;
  }
`
