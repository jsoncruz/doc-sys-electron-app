import React, { useCallback, useState } from 'react'

import {
  ModalCloseButton,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  IconButton,
  ModalBody,
  ListItem,
  ListIcon,
  Divider,
  Modal,
  List
} from '@chakra-ui/core'
import { AiFillEye } from 'react-icons/ai'

import mutate from '~/services/mutate'

import {
  MultiplePendingSubscriptions,
  FetchPendingSubscriptionsProps
} from '../../types'
import { APIProps } from '../types'

const FetchPendingSubscriptions: React.FC<FetchPendingSubscriptionsProps<APIProps>> = ({ current, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [pending, setPending] = useState<MultiplePendingSubscriptions>()
  const [isLoading, setLoading] = useState(false)

  const handleFetcher = useCallback<((event: React.MouseEvent<any, MouseEvent>) => void)>(async (event) => {
    try {
      event.preventDefault()
      setLoading(true)
      const data = await mutate<MultiplePendingSubscriptions>(props.service, {
        data: {
          NoInstrumento: current.NoInstrumento,
          CodigoTipo: current.CodigoTipo,
          NoContrato: current.Numero,
          AnoContrato: current.Ano
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
  }, [isLoading, onOpen, props.service, current, setPending])

  if (isOpen) {
    return (
      <Modal onClose={onClose} isOpen={isOpen} size="md" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="md">
          <ModalHeader>{`Contrato ${current.NoContrato} - ${current.NoProcesso}`}</ModalHeader>
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
      zIndex="auto"
      {...props}
    />
  )
}

export default FetchPendingSubscriptions
