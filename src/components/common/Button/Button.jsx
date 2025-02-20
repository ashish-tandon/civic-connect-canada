import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.variant === 'primary' && `
    background: #2c5282;
    color: white;
    
    &:hover {
      background: #1a365d;
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background: white;
    border: 2px solid #2c5282;
    color: #2c5282;
    
    &:hover {
      background: #f7fafc;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Button = ({ children, variant = 'primary', ...props }) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}; 