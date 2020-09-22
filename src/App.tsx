import React from 'react'

import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import Body from '~/components/body'
import TitleBar from '~/components/titlebar'
import AuthProvider from '~/contexts/auth'
import ThemeContainer from '~/contexts/theme'
import Routes from '~/routes'

const root = document.createElement('div')
root.setAttribute('id', 'root')
document.body.appendChild(root)

const App = () => {
  return (
    <RecoilRoot>
      <ThemeContainer>
        <AuthProvider>
          <BrowserRouter>
            <TitleBar />
            <Body>
              <Routes />
            </Body>
          </BrowserRouter>
        </AuthProvider>
      </ThemeContainer>
    </RecoilRoot>
  )
}

render(<App />, root)
