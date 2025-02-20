import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { RepresentService } from '../../services/representApi';

jest.mock('../../services/representApi');

describe('Search Flow Integration', () => {
  const mockRepData = {
    representatives: [
      {
        name: 'John Doe',
        elected_office: 'MP',
        district_name: 'Test District',
        party_name: 'Liberal',
        email: 'john@example.com'
      }
    ],
    boundaries: {
      centroid: ['test-boundary']
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('complete postal code search flow', async () => {
    RepresentService.getByPostalCode.mockResolvedValueOnce(mockRepData);
    
    render(<App />);
    
    // Check initial state
    expect(screen.getByText('CivicConnect Canada')).toBeInTheDocument();
    
    // Enter postal code
    const input = screen.getByPlaceholder(/enter postal code/i);
    await userEvent.type(input, 'A1A1A1');
    
    // Submit search
    fireEvent.submit(screen.getByRole('button', { name: /find representatives/i }));
    
    // Check loading state
    expect(screen.getByText(/finding your representatives/i)).toBeInTheDocument();
    
    // Wait for results
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Test District')).toBeInTheDocument();
    });
  });

  test('complete location search flow', async () => {
    RepresentService.getByLocation.mockResolvedValueOnce(mockRepData);
    
    const mockGeolocation = {
      getCurrentPosition: jest.fn()
        .mockImplementationOnce((success) => success({
          coords: { latitude: 45.4215, longitude: -75.6972 }
        }))
    };
    global.navigator.geolocation = mockGeolocation;
    
    render(<App />);
    
    // Switch to location search
    fireEvent.click(screen.getByRole('button', { name: /use my location/i }));
    
    // Trigger location search
    fireEvent.click(screen.getByRole('button', { name: /use current location/i }));
    
    // Check loading state
    expect(screen.getByText(/finding your representatives/i)).toBeInTheDocument();
    
    // Wait for results
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Test District')).toBeInTheDocument();
    });
  });
}); 