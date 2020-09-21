import React from 'react'

import { ThemeProvider as ChakraThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'

import theme, { GlobalStyles } from '~/global/style'

const ThemeContainer: React.FC = ({ children }) => {
  return (
    <ChakraThemeProvider theme={theme}>
      <ColorModeProvider value="dark">
        <EmotionThemeProvider theme={theme}>
          <CSSReset />
          <GlobalStyles />
          {children}
        </EmotionThemeProvider>
      </ColorModeProvider>
    </ChakraThemeProvider>
  )
}

export default ThemeContainer
