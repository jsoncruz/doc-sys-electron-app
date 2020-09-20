import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import {
  ModalCloseButton,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  IconButton,
  ModalBody,
  ListItem,
  ListIcon,
  Divider,
  Stack,
  Modal,
  Text,
  List,
  ModalFooter
} from '@chakra-ui/core'
import { AiFillEye } from 'react-icons/ai'

import { AuthContext } from '~/contexts/auth'
import useFetch from '~/hooks/useFetch'
import mutate from '~/services/mutate'

import { Card, Container } from '../style'
import {
  ContextProps,
  DocumentosProps,
  MultiplePendingSubscriptions,
  FetchPendingSubscriptionsProps
} from './types'

const Context = createContext<ContextProps>({} as ContextProps)

const FetchPendingSubscriptions: React.FC<FetchPendingSubscriptionsProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { pending, setPending, document } = useContext(Context)
  const [isLoading, setLoading] = useState(false)

  const rollUp = document?.filter(({ CodigoTramitacao }) => CodigoTramitacao === props.tramite)[0]

  const handleFetcher = useCallback(async () => {
    try {
      setLoading(true)
      const data = await mutate<MultiplePendingSubscriptions>(props.service, {
        data: {
          CodigoTramitacao: props.tramite
        }
      })
      setPending(data)
      onOpen()
      setLoading(false)
    } catch (exception) {
      if (isLoading) {
        setLoading(false)
      }
      throw new Error(exception)
    }
  }, [isLoading, onOpen, props.service, props.tramite, setPending])

  if (isOpen) {
    return (
      <Modal onClose={onClose} isOpen={isOpen} size="md" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="md">
          <ModalHeader>{`${rollUp?.Situacao} - #${props.tramite}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={3}>
              {pending?.map(({ Nome, Cargo, Status }, index, array) => {
                return (
                  <div key={Nome}>
                    <ListItem>
                      <ListIcon
                        icon={Status === 'S' ? 'check-circle' : 'time'}
                        color={`${Status === 'S' ? 'green' : 'yellow'}.500`}
                      />
                      {`${Cargo} ${Nome}`}
                    </ListItem>
                    {index < array.length - 1 && <Divider />}
                  </div>
                )
              })}
            </List>
          </ModalBody>
          <ModalFooter>
            {`${pending?.filter(({ Status }) => Status === 'S').length} / ${pending?.length}`}
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }

  return (
    <IconButton
      position="absolute"
      top={0}
      right={0}
      variant="ghost"
      variantColor="blue"
      color="#4A5568"
      size="md"
      icon={AiFillEye}
      isLoading={isLoading}
      onClick={handleFetcher}
      {...props}
    />
  )
}

const Content: React.FC = () => {
  const { setDocument } = useContext(Context)
  const {
    user: { codigoUsuario }
  } = useContext(AuthContext)

  const { data } = useFetch<Array<DocumentosProps>>('/wsConsDocPendExt.rule?sys=LEG', {
    data: { codigoCadastroLogado: codigoUsuario }
  })

  useEffect(() => {
    if (data) {
      setDocument(data)
    }
  }, [data, setDocument])

  return (
    <Container isLoaded={data !== undefined}>
      {data?.map((props) => (
        <Card key={props.CodigoTramitacao}>
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
        </Card>
      ))}
    </Container>
  )
}

export default function Documentos () {
  const [pending, setPending] = useState<MultiplePendingSubscriptions>()
  const [document, setDocument] = useState<Array<DocumentosProps>>()
  return (
    <Context.Provider value={{ pending, setPending, document, setDocument }}>
      <Content />
    </Context.Provider>
  )
}
