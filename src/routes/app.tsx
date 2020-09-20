import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '~/pages/dashboard'
import TokenConfiguration from '~/pages/token'

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route to="/">
          <Dashboard />
        </Route>
        <Route to="/tokens">
          <TokenConfiguration />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default AppRoutes
