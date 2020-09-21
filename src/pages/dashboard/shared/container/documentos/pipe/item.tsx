import React, { useCallback, useState } from 'react'

import {
  Menu,
  MenuButton,
  Stack,
  MenuList,
  MenuItem,
  Text
} from '@chakra-ui/core'
import { useHistory } from 'react-router-dom'

import mutate from '~/services/mutate'

import { Card } from '../../style'
import { DocumentosProps } from '../typescript'
import FetchPendingSubscriptions from './subscriptions'

interface PDFLinkageProps {
  LinkDocumento: string
}

const Item: React.FC<DocumentosProps> = (props) => {
  const history = useHistory()
  const handleSigning = useCallback(() => { /** */ }, [])

  const handleReadableDocument = useCallback(async () => {
    const data = await mutate<PDFLinkageProps>('/wsVerDoc.rule?sys=LEG', {
      data: {
        TpDocumento: 'D',
        CodigoTramitacao: props.CodigoTramitacao
      },
      transformResponse: (response) => {
        response = JSON.parse(response)
        if (Array.isArray(response)) {
          response = response[0]
        }
        return response
      }
    })
    history.push('/reader', data)
  }, [history, props.CodigoTramitacao])

  return (
    <Menu closeOnSelect closeOnBlur autoSelect>
      <MenuButton as={Card}>
        <Stack isInline alignItems="center">
          <Text fontFamily="Roboto-Black" color="gray.900" fontSize="xs">
            {`${props.Situacao}: ${props.NoDocumento}`}
          </Text>
        </Stack>
        <Text color="gray.900" fontSize="xs">
          {`${props.NoProcesso} - #${props.CodigoTramitacao}`}
        </Text>
        <Text color="gray.900" fontSize="xs">
          {`Motivo: ${props.NomeMotivo}`}
        </Text>
        <Text color="gray.900" fontSize="xs">
          {`Solicitado em: ${props.DtSolicitacao}`}
        </Text>
        <FetchPendingSubscriptions
          service="/wsConsAssDocPend.rule?sys=LEG"
          tramite={props.CodigoTramitacao}
          aria-label="See More"
        />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleSigning}>Assinar</MenuItem>
        <MenuItem onClick={handleReadableDocument}>Ver Documento</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default Item
