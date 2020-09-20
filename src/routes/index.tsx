import React, { useContext } from 'react'

import { AuthContext } from '~/contexts/auth'

import AppRoutes from './app'
import AuthRoutes from './auth'

const Routes: React.FC = () => {
  const { loggedin } = useContext(AuthContext)
  return loggedin ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
