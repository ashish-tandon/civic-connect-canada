'use client';

import styled from 'styled-components';
import Layout from '@/components/Layout';

const LearnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 250px 1fr;
  }
`;

const Sidebar = styled.aside`
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 8px;
`;

const Content = styled.div`
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 8px;
`;

export default function LearnLayout({ children }) {
  return (
    <Layout>
      <LearnContainer>
        <Sidebar>
          {/* Add navigation links here */}
        </Sidebar>
        <Content>
          {children}
        </Content>
      </LearnContainer>
    </Layout>
  );
} 