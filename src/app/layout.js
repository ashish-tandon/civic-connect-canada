import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import { GlobalStyles } from '../styles/GlobalStyles'

export const metadata = {
  title: 'CivicConnect Canada',
  description: 'Your gateway to democratic engagement and civic participation in Canada',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
} 