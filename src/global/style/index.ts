import { theme, DefaultTheme } from '@chakra-ui/core'
import { createGlobalStyle } from 'styled-components'

const RobotoBlack = require('@assets/fonts/Roboto-Black.ttf')
const RobotoRegular = require('@assets/fonts/Roboto-Regular.ttf')

const customTheme: DefaultTheme = {
  ...theme,
  fonts: {
    body: 'Roboto, system-ui, sans-serif',
    heading: 'Roboto-Black, sans-serif',
    mono: 'Menlo, monospace'
  }
}

const GlobalStyles = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #A0AEC0;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #718096;
  }
  @font-face {
    font-family: Roboto;
    src: url(${RobotoRegular});
  }
  @font-face {
    font-family: Roboto-Black;
    src: url(${RobotoBlack});
  }
`

export default customTheme
export { GlobalStyles }
