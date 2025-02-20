import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { FaSun, FaMoon, FaGithub } from 'react-icons/fa';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Header = styled(motion.header)`
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.headerBg};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const Main = styled.main`
  margin-top: 5rem;
  flex: 1;
`;

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.footerBg};
  padding: 3rem 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  
  h4 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;

      a {
        color: ${({ theme }) => theme.colors.textLight};
        text-decoration: none;
        transition: color 0.2s ease;
        
        &:hover {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`;

export default function Layout({ children }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <LayoutContainer>
      <Header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <Nav>
          <Logo href="/">
            🍁 CivicConnect
          </Logo>
          <NavLinks>
            <a href="/about">About</a>
            <a href="/learn">Learn</a>
            <a href="/contact">Contact</a>
            <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </ThemeToggle>
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
          </NavLinks>
        </Nav>
      </Header>

      <Main>{children}</Main>

      <Footer>
        <FooterContent>
          <div>
            <h4>About</h4>
            <ul>
              <li><a href="/about">Our Mission</a></li>
              <li><a href="/team">Our Team</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li><a href="/learn/federal">Federal Government</a></li>
              <li><a href="/learn/provincial">Provincial Government</a></li>
              <li><a href="/learn/municipal">Municipal Government</a></li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/feedback">Feedback</a></li>
              <li><a href="/help">Help Center</a></li>
            </ul>
          </div>
        </FooterContent>
      </Footer>
    </LayoutContainer>
  );
} 