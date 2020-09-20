import React, { useContext } from 'react'

import { DrawerHeader, Text } from '@chakra-ui/core'

import { AuthContext } from '~/contexts/auth'

export const PhysicalPerson: React.FC = () => {
  const { user: { nomeUsuario, nomeUop, nomeCargo, matricula, cpf } } = useContext(AuthContext)
  return (
    <DrawerHeader backgroundColor="gray.900">
      <Text fontFamily="Roboto-Black">{nomeUsuario}</Text>
      <Text fontSize="14px" color="gray.300">{`Cargo: ${nomeCargo}`}</Text>
      <Text fontSize="14px" color="gray.300">{`UOP: ${nomeUop}`}</Text>
      <Text fontSize="14px" color="gray.300">{`CPF: ${cpf.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        '$1.$2.$3-$4'
      )}`}</Text>
      <Text fontSize="14px" color="gray.300">{`Matrícula: ${matricula}`}</Text>
    </DrawerHeader>
  )
}
export const LegalPerson: React.FC = () => {
  const { user: { nomeUsuario, nomeUop, nomeCargo, matricula, cnpj } } = useContext(AuthContext)
  return (
    <DrawerHeader backgroundColor="gray.900">
      <Text fontFamily="Roboto-Black">{nomeUsuario}</Text>
      <Text fontSize="14px" color="gray.300">{`Cargo: ${nomeCargo}`}</Text>
      <Text fontSize="14px" color="gray.300">{`UOP: ${nomeUop}`}</Text>
      <Text fontSize="14px" color="gray.300">{`CNPJ: ${cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
      )}`}</Text>
      <Text fontSize="14px" color="gray.300">{`Matrícula: ${matricula}`}</Text>
    </DrawerHeader>
  )
}
