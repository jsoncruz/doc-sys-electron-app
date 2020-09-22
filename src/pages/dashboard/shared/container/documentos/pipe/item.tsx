import React, { useCallback, useContext, useRef, useState } from 'react'

import {
  ModalCloseButton,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  MenuButton,
  ModalBody,
  MenuList,
  MenuItem,
  Divider,
  Button,
  Stack,
  Modal,
  Menu,
  Text
} from '@chakra-ui/core'
import { SubmitHandler, FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import Input from '~/components/input'
import { AuthContext } from '~/contexts/auth'
import mutate from '~/services/mutate'
import axios from '~/services/request'

import { Card } from '../../style'
import { PDFLinkageProps, ResponseOutput, TokenProps } from '../../types'
import { APIProps } from '../types'
import FetchPendingSubscriptions from './subscriptions'

import { PipeContext } from '..'

const Item: React.FC<APIProps> = (props) => {
  const history = useHistory()
  const { onOpen, isOpen, onClose } = useDisclosure()

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
    history.push('/reader', { ...data, document: props.NoProcesso })
  }, [history, props.CodigoTramitacao, props.NoProcesso])

  const SigningPopup: React.FC = () => {
    const { user: { nomeUsuario: nome } } = useContext(AuthContext)
    const { revalidate } = useContext(PipeContext)
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<ResponseOutput>()
    const unformRef = useRef<FormHandles>(null)

    const { NomeMotivoFuturo: futuro, NoProcesso: no, CodigoTramitacao } = props

    const handleSubmit: SubmitHandler<TokenProps> = useCallback(async ({ pass }) => {
      try {
        setLoading(true)
        const schema = Yup.object().shape({
          pass: Yup.string().required('Digite a senha do token')
        })
        await schema.validate({ pass }, { abortEarly: false })
        const { data } = await axios.post<ResponseOutput>('/wsAssDoc.rule?sys=LEG', {
          senha: pass,
          CodigoCadastro: props.CodigoAssinador,
          CodigoMotivo: props.CodigoMotivo,
          multipla: true,
          CodigoTramitacao
        })
        if (data.codigoSituacao === 3) {
          await revalidate()
          onClose()
        } else {
          setLoading(false)
          setResponse(data)
        }
      } catch (exception) {
        if (exception instanceof Yup.ValidationError && unformRef.current) {
          setLoading(false)
          for (const { message, path } of exception.inner) {
            unformRef.current.setFieldError(path, message)
          }
        } else {
          setResponse({ codigoSituacao: 4, nomeSituacao: 'Houve um erro...' })
        }
      }
    }, [CodigoTramitacao, revalidate])

    return (
      <Modal onClose={onClose} isOpen={isOpen} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="md">
          <ModalHeader>Assinatura com certificado digital ICP-Brasil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text marginBottom={3}>
              {`Eu, ${nome}, ${futuro.toLowerCase()}, referente ao processo ${no}, no tramite ${CodigoTramitacao}`}
            </Text>
            <Form ref={unformRef} onSubmit={handleSubmit}>
              <Input
                name="pass"
                height="50px"
                placeholder="Senha do token"
                backgroundColor="gray.800"
                focusBorderColor="purple.300"
                borderRadius="sm"
                type="password"
                iconLeft={{
                  name: 'lock',
                  color: 'gray.600'
                }}
              />
              <Button
                width="100%"
                height="50px"
                marginY={3}
                fontWeight="bold"
                backgroundColor="purple.500"
                borderRadius="sm"
                marginTop="5"
                onClick={() => unformRef.current?.submitForm()}
                _hover={{
                  backgroundColor: 'purple.700'
                }}
                isLoading={loading}
                loadingText="Carregando..."
              >
                ENVIAR
              </Button>
              {response && (
                <>
                  <Divider />
                  <Text paddingBottom={2}>{response.nomeSituacao}</Text>
                </>
              )}
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }

  return (
    <>
      <Menu closeOnSelect closeOnBlur>
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
            current={props}
            aria-label="See More"
          />
        </MenuButton>
        <MenuList
          pos="fixed"
          modifiers={{
            preventOverflow: {
              boundariesElement: 'scrollParent',
              enabled: true
            }
          }}
        >
          <MenuItem onClick={onOpen.bind(this)}>Assinar</MenuItem>
          <MenuItem onClick={handleReadableDocument}>Ver Documento</MenuItem>
        </MenuList>
      </Menu>
      <SigningPopup />
    </>
  )
}

export default Item
