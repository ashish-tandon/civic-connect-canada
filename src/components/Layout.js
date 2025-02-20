'use client';

import styled from 'styled-components';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export default function Layout({ children }) {
  return (
    <LayoutContainer>
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
} 