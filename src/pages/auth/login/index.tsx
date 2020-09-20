import React, { useCallback, useContext, useRef, useState } from 'react'

import {
  Heading,
  Divider,
  Button,
  Flex,
  Grid,
  Link,
  Text
} from '@chakra-ui/core'
import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/web'
import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import * as Yup from 'yup'

import Input from '~/components/input'
import { AuthContext } from '~/contexts/auth'
import { titleBarSpecs } from '~/global/selectors/index'
import { DefaultRequestProps } from '~/services/request'

interface LoginProps {
  user: string;
  pass: string;
}

const Login: React.FC = () => {
  const { signIn } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<DefaultRequestProps>()
  const unformRef = useRef<FormHandles>(null)
  const { height: titleBarSize } = useRecoilValue(titleBarSpecs)
  const history = useHistory()

  const handleSubmit: SubmitHandler<LoginProps> = useCallback(
    async ({ user, pass }) => {
      setLoading(true)
      try {
        if (error) {
          setError(undefined)
        }
        const schema = Yup.object().shape({
          user: Yup.string().required('Digite o usuário de acesso'),
          pass: Yup.string().required('Digite a senha')
        })
        await schema.validate({ user, pass }, { abortEarly: false })
        const response = await signIn(user, pass)
        if (response) {
          setError(response)
          setLoading(false)
        }
      } catch (exception) {
        if (exception instanceof Yup.ValidationError && unformRef.current) {
          setLoading(false)
          for (const { message, path } of exception.inner) {
            unformRef.current.setFieldError(path, message)
          }
        }
      }
    },
    [error, signIn]
  )

  const handlePasswordRecovery = () => {
    history.push('/recuperar')
  }
  const handleSubmitAction = () => unformRef.current?.submitForm()

  return (
    <Grid
      as="main"
      height={`calc(100vh - ${titleBarSize}px)`}
      templateColumns="1fr 400px 1fr 400px 1fr"
      templateRows="1fr 400px 1fr"
      templateAreas="
        '. . . . .'
        '. info . form .'
        '. . . . .'
      "
      justifyContent="center"
      alignItems="center"
    >
      <Flex gridArea="info" flexDir="column" alignItems="flex-start">
        <img src={require('@assets/images/logo@2x.png')} alt="DOC-SYS" />
        <Heading
          size="xl"
          lineHeight="shorter"
          marginTop={5}
          color="orange.500"
        >
          Sistema de assinatura documentos digitais
        </Heading>
      </Flex>
      <Flex
        gridArea="form"
        height="100%"
        flexDir="column"
        alignItems="stretch"
        backgroundColor="gray.700"
        borderRadius="md"
        padding={10}
      >
        <Form ref={unformRef} onSubmit={handleSubmit}>
          <Input
            name="user"
            height="50px"
            placeholder="Usuário de acesso"
            backgroundColor="gray.800"
            focusBorderColor="purple.300"
            borderRadius="sm"
            iconLeft={{
              name: 'at-sign',
              color: 'gray.600'
            }}
          />
          <Input
            name="pass"
            height="50px"
            placeholder="Senha do sistema"
            backgroundColor="gray.800"
            focusBorderColor="purple.300"
            borderRadius="sm"
            type="password"
            containerProps={{ marginTop: 2 }}
            iconLeft={{
              name: 'lock',
              color: 'gray.600'
            }}
          />
          {error && (
            <Text color="red.300" paddingTop={2} textAlign="center">
              {error.nomeSituacao}
            </Text>
          )}
          <Link
            display="block"
            marginTop={2}
            alignItems="flex-start"
            fontSize="sm"
            fontWeight="bold"
            onClick={handlePasswordRecovery}
            color="purple.400"
            _hover={{ color: 'purple.200' }}
          >
            Esqueci minha senha
          </Link>
          <Button
            width="100%"
            height="50px"
            marginY={3}
            fontWeight="bold"
            backgroundColor="purple.500"
            borderRadius="sm"
            marginTop="5"
            onClick={handleSubmitAction}
            _hover={{
              backgroundColor: 'purple.700'
            }}
            isLoading={loading}
            loadingText="Carregando..."
          >
            ENTRAR
          </Button>
          <Divider />
          <Text textAlign="center" fontSize="sm" color="gray.300" marginTop={3}>
            Ainda não possui uma conta ?{' '}
            <Link
              color="purple.400"
              fontWeight="bold"
              _hover={{ color: 'purple.200' }}
            >
              Criar Conta
            </Link>
          </Text>
        </Form>
      </Flex>
    </Grid>
  )
}

export default Login
