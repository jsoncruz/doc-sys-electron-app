import React, { useCallback } from 'react'

import { PseudoBox, PseudoBoxProps } from '@chakra-ui/core'
import { remote } from 'electron'
import { VscDash, VscChromeClose } from 'react-icons/vsc'
import { useRecoilValue } from 'recoil'

import { titleBarSpecs } from '~/global/selectors'

import { TitleBarActions } from './style'

interface ActionProps {
  platform: NodeJS.Platform
}

interface FrameActions {
  close(): void;
  minimize(): void;
}

export const Item: React.FC<PseudoBoxProps> = ({ children, ...rest }) => {
  const { height: rail } = useRecoilValue(titleBarSpecs)
  return (
    <PseudoBox
      width={rail}
      height={rail}
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...rest}
    >
      {children}
    </PseudoBox>
  )
}

const Default: React.FC<FrameActions> = ({ close, minimize }) => {
  return (
    <>
      <Item onClick={minimize} _hover={{ backgroundColor: 'gray.900' }}>
        <VscDash />
      </Item>
      <Item onClick={close} _hover={{ backgroundColor: 'red.500' }}>
        <VscChromeClose />
      </Item>
    </>
  )
}
const Darwin: React.FC<FrameActions> = ({ close, minimize }) => {
  return (
    <>
      <Item>
        <PseudoBox
          width={4}
          height={4}
          borderRadius="100%"
          backgroundColor="red.400"
          onClick={close}
          _hover={{
            backgroundColor: 'red.300'
          }}
        />
      </Item>
      <Item>
        <PseudoBox
          width={4}
          height={4}
          borderRadius="100%"
          backgroundColor="yellow.400"
          onClick={minimize}
          _hover={{
            backgroundColor: 'yellow.300'
          }}
        />
      </Item>
    </>
  )
}

const Action: React.FC<ActionProps> = ({ platform }) => {
  const handleCloseWindow = useCallback(() => remote.getCurrentWindow().close(), [])
  const handleMinimize = useCallback(() => remote.getCurrentWindow().minimize(), [])
  return (
    <TitleBarActions isInline>
      {(() => {
        switch (platform) {
          case 'darwin':
            return <Darwin close={handleCloseWindow} minimize={handleMinimize} />
          default:
            return <Default close={handleCloseWindow} minimize={handleMinimize} />
        }
      })()}
    </ TitleBarActions>
  )
}

export default Action
