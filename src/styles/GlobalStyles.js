'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --bg-gradient: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.cardBg} 100%)`};
    --text-gradient: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.text} 0%, ${theme.colors.primary} 100%)`};
    --primary: ${({ theme }) => theme.colors.primary};
    --secondary: ${({ theme }) => theme.colors.secondary};
    --bg-primary: ${({ theme }) => theme.colors.background};
    --bg-secondary: ${({ theme }) => theme.colors.cardBg};
    --text-primary: ${({ theme }) => theme.colors.text};
    --text-secondary: ${({ theme }) => theme.colors.textLight};
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    line-height: 1.2;
  }

  p {
    line-height: ${({ theme }) => theme.typography.body.lineHeight};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    html {
      font-size: 14px;
    }
  }

  .error {
    color: #e53e3e;
    margin-top: 0.5rem;
    text-align: center;
  }
`; 