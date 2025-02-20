import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, #ffffff 100%);
`;

export const Header = styled.header`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, #2c5282 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0;
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    margin-bottom: 1rem;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

export const Main = styled.main`
  max-width: 1200px;
  margin: -3rem auto 2rem;
  padding: 0 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 1rem;
    margin-top: -2rem;
  }
`; 