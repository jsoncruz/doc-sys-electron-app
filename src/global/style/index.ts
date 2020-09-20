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

const GlobalFonts = createGlobalStyle`
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
export { GlobalFonts }
