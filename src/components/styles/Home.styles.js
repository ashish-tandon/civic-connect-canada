'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Page = styled.div`
  min-height: 100vh;
  width: 100%;
`;

export const Hero = styled.section`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--bg-gradient);
`;

export const HeroContent = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  text-align: center;
`;

export const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: var(--text-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Subtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  max-width: 800px;
  margin: 0 auto 3rem;
  color: var(--text-secondary);
`;

export const SearchContainer = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
`;

export const CardGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Card = styled(motion.div)`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 2rem;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
  }

  .icon-container {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    background: ${props => props.iconBg};
    
    svg {
      width: 25px;
      height: 25px;
      color: ${props => props.iconColor};
    }
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary);
    font-weight: 500;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }

    svg {
      transition: transform 0.2s ease;
    }

    &:hover svg {
      transform: translateX(5px);
    }
  }
`; 