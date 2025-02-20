import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  background: #f7fafc;
`;

export const Header = styled.header`
  background: #2c5282;
  color: white;
  padding: 3rem 1rem;
  text-align: center;

  h1 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
  }

  p {
    margin: 1rem 0 0;
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

export const Main = styled.main`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`; 