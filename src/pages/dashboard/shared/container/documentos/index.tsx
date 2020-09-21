import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import { AuthContext } from '~/contexts/auth'
import useFetch from '~/hooks/useFetch'

import { Container } from '../style'
import Item from './pipe/item'
import {
  ContextProps,
  DocumentosProps,
  MultiplePendingSubscriptions
} from './typescript'

export const PipeContext = createContext<ContextProps>({} as ContextProps)

const Content: React.FC = () => {
  const { setDocument } = useContext(PipeContext)
  const { user: { codigoUsuario } } = useContext(AuthContext)

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
        <Item key={props.CodigoTramitacao} {...props} />
      ))}
    </Container>
  )
}

export default function Documentos () {
  const [pending, setPending] = useState<MultiplePendingSubscriptions>()
  const [document, setDocument] = useState<Array<DocumentosProps>>()
  return (
    <PipeContext.Provider value={{ pending, setPending, document, setDocument }}>
      <Content />
    </PipeContext.Provider>
  )
}
