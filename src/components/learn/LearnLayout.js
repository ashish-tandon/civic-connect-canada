import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  h1 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.text} 0%, ${({ theme }) => theme.colors.primary} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.textLight};
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.nav`
  position: sticky;
  top: 7rem;
  background: ${({ theme }) => theme.colors.cardBg};
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.small};

  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: ${({ theme }) => theme.colors.textLight};
    text-decoration: none;
    display: block;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;

    &:hover, &.active {
      background: ${({ theme }) => theme.colors.hover};
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const MainContent = styled.main`
  h2 {
    font-size: 1.8rem;
    margin: 2rem 0 1rem;
    color: ${({ theme }) => theme.colors.text};
  }

  h3 {
    font-size: 1.4rem;
    margin: 1.5rem 0 1rem;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin-bottom: 1.5rem;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.textLight};
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.colors.textLight};
    }
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const Section = styled(motion.section)`
  margin-bottom: 3rem;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export default function LearnLayout({ title, description, children, sections }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Container>
      <Header>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {description}
        </motion.p>
      </Header>

      <Content>
        <Sidebar>
          <h3>Quick Navigation</h3>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ul>
        </Sidebar>

        <MainContent ref={ref}>
          {children}
        </MainContent>
      </Content>
    </Container>
  );
} 