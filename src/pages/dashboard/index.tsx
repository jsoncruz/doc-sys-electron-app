import React, { useCallback, useEffect } from 'react'

import { Grid, Flex, useColorMode, Image, Text, Stack, Box, ButtonGroup, Button } from '@chakra-ui/core'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'

import Menu, { Hamburguer } from '~/components/menu'
import { drawerMenuState, windowTitle } from '~/global/atoms'
import { titleBarSpecs } from '~/global/selectors'

import { Documentos, Contratos, Empenhos, Avulsos, headers } from './shared'

const Dashboard: React.FC = () => {
  const [isDrawerOpen, setDrawerState] = useRecoilState(drawerMenuState)
  const { height: titleBarSize } = useRecoilValue(titleBarSpecs)
  const { colorMode } = useColorMode()
  const setPageTitle = useSetRecoilState(windowTitle)

  useEffect(() => {
    setPageTitle('Dashboard de Assinaturas')
  }, [setPageTitle])

  const handleHamburguer = useCallback(() => {
    setDrawerState(true)
  }, [setDrawerState])

  const handleClose = useCallback(() => {
    setDrawerState(false)
  }, [setDrawerState])

  return (
    <Grid
      height={`calc(100vh - ${titleBarSize}px)`}
      templateColumns="1fr"
      templateRows="50px 1fr"
      templateAreas="
        'header'
        'body'
      "
    >
      <Grid
        gridArea="header"
        as="header"
        height="50px"
        templateColumns="50px 1fr 1fr 1fr"
        templateRows="1fr"
        backgroundColor="gray.900"
        templateAreas="
          'menu quickly . logo'
        "
      >
        <Flex gridArea="menu" justifyContent="center" alignItems="center">
          <Hamburguer onClick={handleHamburguer} size="24px" />
          <Menu
            onClose={handleClose}
            isOpen={isDrawerOpen}
            size="xs"
            placement="left"
          />
        </Flex>
        <Flex gridArea="quickly" justifyContent="flex-start" alignItems="center">
          <ButtonGroup spacing={4}>
            <Button leftIcon="add" variantColor="teal" variant="outline">Solicitar Assinatura</Button>
            <Button rightIcon="arrow-forward" variantColor="teal" variant="solid">Validar</Button>
          </ButtonGroup>
        </Flex>
        <Flex
          gridArea="logo"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Text
            fontFamily="Roboto-Black"
            fontSize="xl"
          >
            Quadro de Pendências
          </Text>
          <Image
            src={
              colorMode === 'dark'
                ? require('@assets/images/atom_light.png')
                : require('@assets/images/atom_dark.png')
            }
            size="40px"
            marginLeft={3}
            marginRight={3}
            alt="Atom"
          />
        </Flex>
      </Grid>
      <Grid
        gridArea="body"
        as="main"
        height="100%"
        gap={0}
        templateColumns="1fr 1fr 1fr 1fr"
        templateRows="40px 1fr"
        templateAreas="
          'titulo-documento titulo-contrato titulo-empenho titulo-avulso'
          'documentos contratos empenhos avulsos'
        "
      >
        {headers.map(({ area, title, icon }) => (
          <Stack key={area} gridArea={area} isInline justifyContent="center" alignItems="center">
            <Box as={icon} />
            <Text fontFamily="Roboto-Black">{title}</Text>
          </Stack>
        ))}
        <Flex gridArea="documentos" padding="0 5px 15px 15px">
          <Documentos />
        </Flex>
        <Flex gridArea="contratos" padding="0 5px 15px 5px">
          <Contratos />
        </Flex>
        <Flex gridArea="empenhos" padding="0 5px 15px 5px">
          <Empenhos />
        </Flex>
        <Flex gridArea="avulsos" padding="0 15px 15px 5px">
          <Avulsos />
        </Flex>
      </Grid>
    </Grid>
  )
}

export default Dashboard
