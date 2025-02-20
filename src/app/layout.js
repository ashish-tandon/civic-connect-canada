'use client';

import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from 'next-themes'
import StyledComponentsRegistry from '../lib/registry'
import { GlobalStyles } from '../styles/GlobalStyles'

export const metadata = {
  title: 'CivicConnect Canada',
  description: 'Your gateway to democratic engagement and civic participation in Canada',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <GlobalStyles />
            {children}
            <SpeedInsights />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
} 