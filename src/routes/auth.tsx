import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from '~/pages/auth/login'
import Register from '~/pages/auth/register'

const AuthRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route to="/">
          <Login />
        </Route>
        <Route to="/registrar">
          <Register />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default AuthRoutes