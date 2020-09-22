import React, { useCallback } from 'react'

import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc'
import { useHistory } from 'react-router-dom'

import { Item } from './action'

interface ForthAndBackProps {
  isVisible: boolean;
}

const ForthAndBack: React.FC<ForthAndBackProps> = ({ isVisible }) => {
  const history = useHistory()
  const handleForth = useCallback(() => history.goForward(), [history])
  const handleBack = useCallback(() => history.goBack(), [history])
  return (
    <>
      {isVisible && (
        <>
          <Item onClick={handleBack} _hover={{ backgroundColor: 'gray.900' }}>
            <VscChevronLeft />
          </Item>
          <Item onClick={handleForth} _hover={{ backgroundColor: 'gray.900' }}>
            <VscChevronRight />
          </Item>
        </>
      )}
    </>
  )
}

export default ForthAndBack
