import React, { createContext, useState, useCallback, useEffect } from 'react'

import { Flex, useColorMode } from '@chakra-ui/core'
import Lottie from 'lottie-react-web'
import { useRecoilCallback } from 'recoil'

import { drawerMenuState, windowTitle } from '~/global/atoms'
import { useWindowSize } from '~/hooks/useWindowSize'
import mutate from '~/services/mutate'
import { DefaultRequestProps } from '~/services/request'

export interface UserProps {
  codigoSituacao: number;
  nomeSituacao: string;
  idUsuario: number;
  codigoUsuario: number;
  nomeUsuario: string;
  nomeCargo: string;
  emailUsuario: string;
  codigoUop: number;
  nomeUop: string;
  matricula: number;
  cnpj: string;
  cpf: string;
  tipoCadastro: number;
}

interface AuthContextProps {
  user: UserProps;
  loggedin: boolean;
  signIn(user: string, pass: string): Promise<DefaultRequestProps | void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext({} as AuthContextProps)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProps>()
  const [loading, setLoading] = useState(true)
  const { colorMode } = useColorMode()
  const { width, height } = useWindowSize({ watch: false })

  useEffect(() => {
    const data = localStorage.getItem('@User')
    if (data) {
      setUser(JSON.parse(data))
    }
    setLoading(false)
  }, [])

  const signIn = useCallback(async (usuario, senha) => {
    try {
      const data = await mutate<UserProps>('/wsAutExt.rule?sys=LEG', {
        data: { usuario, senha }
      })
      if (data.cpf || data.cnpj) {
        localStorage.setItem('@User', JSON.stringify(data))
        setUser(data)
      } else if (data.nomeSituacao && data.codigoSituacao) {
        return data as DefaultRequestProps
      }
    } catch (exception) {
      throw new Error(exception)
    }
  }, [])

  const signOut = useRecoilCallback(({ reset }) => async () => {
    localStorage.removeItem('@User')
    setUser(undefined)
    reset(windowTitle)
    reset(drawerMenuState)
  }, [])

  if (loading) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        width={width}
        height={height}
      >
        <Lottie
          width={width * 0.5}
          height={height * 0.5}
          options={{
            loop: true,
            autoplay: true,
            animationData:
              colorMode === 'light'
                ? require('@assets/animations/loading_light.json')
                : require('@assets/animations/loading_dark.json')
          }}
        />
      </Flex>
    )
  }

  return (
    <AuthContext.Provider value={{ user, loggedin: !!user, signIn, signOut } as AuthContextProps}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export { AuthContext }
