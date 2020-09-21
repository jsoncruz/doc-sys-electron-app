import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '~/pages/dashboard'
import Reader from '~/pages/dashboard/shared/util/reader'
import History from '~/pages/history'
import TokenConfiguration from '~/pages/token'

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/reader">
          <Reader />
        </Route>
        <Route path="/tokens">
          <TokenConfiguration />
        </Route>
        <Route path="/history">
          <History />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default AppRoutes
