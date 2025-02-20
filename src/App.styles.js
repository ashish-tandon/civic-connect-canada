import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.large} ${({ theme }) => theme.spacing.medium};
  text-align: center;

  h1 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
  }

  p {
    margin: ${({ theme }) => theme.spacing.medium} 0 0;
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

export const Main = styled.main`
  padding: ${({ theme }) => theme.spacing.large} ${({ theme }) => theme.spacing.medium};
  max-width: 1400px;
  margin: 0 auto;
`; 