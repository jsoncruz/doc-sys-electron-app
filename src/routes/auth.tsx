import React from 'react'

import { Switch, Route } from 'react-router-dom'

import Login from '~/pages/auth/login'
import Register from '~/pages/auth/register'

const AuthRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/registrar">
        <Register />
      </Route>
    </Switch>
  )
}

export default AuthRoutes
