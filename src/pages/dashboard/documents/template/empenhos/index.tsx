import React, { useContext } from 'react'

import { AuthContext } from '~/contexts/auth'
import useFetch from '~/hooks/useFetch'

import { Container } from '../style'

const Empenhos: React.FC = () => {
  const { user: { codigoUsuario } } = useContext(AuthContext)
  const { data } = useFetch('/wsConsEmpPendExt.rule?sys=LEG', {
    data: { codigoCadastroLogado: codigoUsuario }
  })

  return (
    <Container isLoaded={data !== undefined}>

    </Container>
  )
}

export default Empenhos
