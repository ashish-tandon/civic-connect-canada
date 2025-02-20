import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { SearchProvider } from './context/SearchContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { ErrorBoundary } from './components/common/ErrorBoundary/ErrorBoundary';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <SearchProvider>
          <GlobalStyles />
          <App />
        </SearchProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
); 