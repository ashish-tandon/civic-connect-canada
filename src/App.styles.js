import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, #ffffff 100%);
`;

export const Hero = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, #2c5282 100%);
  color: white;
  padding: 6rem 2rem;
  text-align: center;

  h1 {
    margin: 0;
    font-size: 3.5rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    margin-bottom: 1.5rem;
  }

  p {
    margin: 0 auto;
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 800px;
    line-height: 1.6;
  }
`;

export const WelcomeSection = styled.section`
  max-width: 1200px;
  margin: -3rem auto 2rem;
  padding: 3rem;
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.large};
  text-align: center;
  position: relative;
  z-index: 1;

  h2 {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
    margin-bottom: 1.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

export const SearchSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const EducationSection = styled.section`
  background: ${({ theme }) => theme.colors.backgroundDark};
  padding: 4rem 2rem;
  margin-top: 4rem;
`;

export const CardGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const EducationCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
    margin-bottom: 1rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    margin-bottom: 1.5rem;
  }

  a {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    transition: background 0.3s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;

export const SectionTitle = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.xxxl};
  margin-bottom: 2rem;
`; 