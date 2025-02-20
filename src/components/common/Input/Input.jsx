import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2c5282;
    box-shadow: 0 0 0 1px #2c5282;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

export const Input = React.forwardRef(({ error, ...props }, ref) => {
  return (
    <div>
      <StyledInput ref={ref} {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}); 