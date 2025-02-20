import React from 'react';
import { SpinnerContainer, Spinner } from './LoadingSpinner.styles';

export function LoadingSpinner() {
  return (
    <SpinnerContainer>
      <Spinner />
      <p>Finding your representatives...</p>
    </SpinnerContainer>
  );
} 