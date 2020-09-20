import React from 'react'

import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'

import AuthProvider from '~/contexts/auth'
import ThemeContainer from '~/contexts/theme'
import TitleBar from '~/global/titlebar'
import Routes from '~/routes'

const root = document.createElement('div')
root.setAttribute('id', 'root')
document.body.appendChild(root)

const App = () => {
  return (
    <RecoilRoot>
      <ThemeContainer>
        <AuthProvider>
          <TitleBar />
          <Routes />
        </AuthProvider>
      </ThemeContainer>
    </RecoilRoot>
  )
}

render(<App />, root)
