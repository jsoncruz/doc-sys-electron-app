import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import { AuthContext } from '~/contexts/auth'
import useFetch from '~/hooks/useFetch'

import { DashboardContext } from '../../../context'
import { Container } from '../style'
import Item from './pipe/item'
import {
  ContextProps,
  APIProps
} from './types'

export const PipeContext = createContext<ContextProps>({} as ContextProps)

const Content: React.FC = () => {
  const { dispatch } = useContext(DashboardContext)
  const { documents, error } = useContext(PipeContext)

  useEffect(() => {
    if (documents && !error) {
      dispatch({ type: 'avulsos', value: documents.length })
    }
  }, [documents, dispatch, error])

  return (
    <Container isLoaded={documents !== undefined}>
      {documents?.map((props, n) => (
        <Item key={`k_${n}`} {...props} />
      ))}
    </Container>
  )
}

export default function Avulsos () {
  const { user: { codigoUsuario } } = useContext(AuthContext)
  const [documents, setDocuments] = useState<Array<APIProps>>()

  const { data, error, revalidate } = useFetch<Array<APIProps>>('/wsConsAvuPendExt.rule?sys=LEG', {
    data: { codigoCadastroLogado: codigoUsuario }
  }, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
    revalidateOnReconnect: true
  })

  useEffect(() => {
    if (data) {
      setDocuments(data)
    }
  }, [data, setDocuments])

  return (
    <PipeContext.Provider value={{ documents, setDocuments, error, revalidate }}>
      <Content />
    </PipeContext.Provider>
  )
}
