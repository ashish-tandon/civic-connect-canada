import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  test('renders loading message', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText(/finding your representatives/i)).toBeInTheDocument();
  });

  test('renders spinner element', () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.querySelector('[class*="Spinner"]')).toBeInTheDocument();
  });
}); 