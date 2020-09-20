import React, { useCallback, useContext } from 'react'

import {
  IDrawer,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Text,
  Box,
  BoxProps,
  PseudoBoxProps,
  PseudoBox,
  Divider
} from '@chakra-ui/core'
import { AiOutlineFall } from 'react-icons/ai'
import { BiUsb } from 'react-icons/bi'
import { FiMenu } from 'react-icons/fi'
import { IoIosLogOut } from 'react-icons/io'
import { IconType } from 'react-icons/lib'
import { useHistory } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { AuthContext } from '~/contexts/auth'
import { drawerMenuState } from '~/global/atoms'

import { LegalPerson, PhysicalPerson } from './header'

type MenuDrawerProps = Omit<IDrawer, 'children'>;

interface HamburguerBoxProps extends BoxProps {
  onClick(): void;
}

interface ItemProps extends PseudoBoxProps {
  icon: IconType;
  children: string;
  to: string;
}

const Item: React.FC<ItemProps> = ({ children, icon, to, ...rest }) => {
  const history = useHistory()
  const setDrawerState = useSetRecoilState(drawerMenuState)

  const handleClickAction = useCallback(() => {
    history.push(to)
    setDrawerState((old) => !old)
  }, [history, setDrawerState, to])

  return (
    <>
      <PseudoBox
        alignItems="center"
        display="flex"
        onClick={handleClickAction}
        justifyContent="flex-start"
        flexDirection="row"
        padding="12px 10px"
        transition="background-color 0.15s linear"
        userSelect="none"
        _hover={{
          cursor: 'pointer',
          backgroundColor: 'orange.500'
        }}
        {...rest}
      >
        <Box as={icon} size="20px" />
        <Text fontSize="14px" marginLeft={4} fontFamily="Roboto-Black">
          {children}
        </Text>
      </PseudoBox>
      <Divider />
    </>
  )
}

const Menu: React.FC<MenuDrawerProps> = (props) => {
  const { user: { tipoCadastro }, signOut } = useContext(AuthContext)
  return (
    <Drawer {...props}>
      <DrawerOverlay />
      <DrawerContent>
        {tipoCadastro === 2 ? <PhysicalPerson /> : <LegalPerson />}
        <DrawerBody padding="0">
          <Item icon={AiOutlineFall} to="/">Dashboard</Item>
          <Item icon={BiUsb} to="/tokens">Configuração de Token</Item>
          <Box
            onClick={signOut}
            position="absolute"
            size="24px"
            bottom="10px"
            right="10px"
            as={IoIosLogOut}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export const Hamburguer: React.FC<HamburguerBoxProps> = (props) => (
  <Box as={FiMenu} {...props} />
)

export default Menu
