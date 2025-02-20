import styled from 'styled-components';

export const SearchContainer = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.large};
  padding: 2.5rem;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export const SearchTitle = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
`;

export const SearchMethods = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const MethodCard = styled.div`
  background: ${({ active, theme }) => active ? `${theme.colors.primary}10` : theme.colors.white};
  border: 2px solid ${({ active, theme }) => active ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 1.5rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  text-align: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  h3 {
    color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.text};
    margin-bottom: 0.5rem;
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  }

  p {
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    margin: 0;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
`;

export const InfoMessage = styled.div`
  background: ${({ theme }) => `${theme.colors.primary}10`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 1.25rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  margin-bottom: 1.5rem;

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  }
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  width: 100%;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  width: 100%;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  margin-top: 1rem;
  padding: 1rem;
  background: ${({ theme }) => `${theme.colors.error}10`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`; 