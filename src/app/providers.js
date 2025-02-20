'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import StyledComponentsRegistry from '../lib/registry';
import { GlobalStyles } from '../styles/GlobalStyles';
import { lightTheme, darkTheme } from '../styles/theme';
import { useTheme } from 'next-themes';

function ThemeProviderWrapper({ children }) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <StyledThemeProvider theme={theme}>
      {children}
    </StyledThemeProvider>
  );
}

export function Providers({ children }) {
  return (
    <StyledComponentsRegistry>
      <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ThemeProviderWrapper>
          <GlobalStyles />
          {children}
        </ThemeProviderWrapper>
      </NextThemeProvider>
    </StyledComponentsRegistry>
  );
} 