'use client';

import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--text-secondary)20;
  border-radius: 8px;
  font-size: 1rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary)20;
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const Input = React.forwardRef((props, ref) => (
  <StyledInput ref={ref} {...props} />
));

Input.displayName = 'Input';

export default Input; 