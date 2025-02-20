import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '../Search';
import { RepresentService } from '../../../services/representApi';

// Mock the RepresentService
jest.mock('../../../services/representApi');

describe('Search Component', () => {
  const mockOnResults = jest.fn();
  const mockOnLoading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders postal code search by default', () => {
    render(<Search onResults={mockOnResults} onLoading={mockOnLoading} />);
    
    expect(screen.getByPlaceholder(/enter postal code/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /find representatives/i })).toBeInTheDocument();
  });

  test('handles postal code search', async () => {
    const mockData = {
      representatives: [{ name: 'Test Rep' }],
      boundaries: { centroid: [] }
    };
    
    RepresentService.getByPostalCode.mockResolvedValueOnce(mockData);
    
    render(<Search onResults={mockOnResults} onLoading={mockOnLoading} />);
    
    const input = screen.getByPlaceholder(/enter postal code/i);
    await userEvent.type(input, 'A1A1A1');
    
    fireEvent.submit(screen.getByRole('button', { name: /find representatives/i }));
    
    await waitFor(() => {
      expect(mockOnLoading).toHaveBeenCalledWith(true);
      expect(mockOnResults).toHaveBeenCalledWith(mockData);
      expect(mockOnLoading).toHaveBeenCalledWith(false);
    });
  });

  test('handles location search', async () => {
    const mockData = {
      representatives: [{ name: 'Test Rep' }],
      boundaries: []
    };
    
    const mockGeolocation = {
      getCurrentPosition: jest.fn()
        .mockImplementationOnce((success) => success({
          coords: { latitude: 45.4215, longitude: -75.6972 }
        }))
    };
    global.navigator.geolocation = mockGeolocation;
    
    RepresentService.getByLocation.mockResolvedValueOnce(mockData);
    
    render(<Search onResults={mockOnResults} onLoading={mockOnLoading} />);
    
    fireEvent.click(screen.getByRole('button', { name: /use my location/i }));
    fireEvent.click(screen.getByRole('button', { name: /use current location/i }));
    
    await waitFor(() => {
      expect(mockOnResults).toHaveBeenCalledWith(mockData);
    });
  });

  test('handles errors gracefully', async () => {
    RepresentService.getByPostalCode.mockRejectedValueOnce(
      new Error('Test error')
    );
    
    render(<Search onResults={mockOnResults} onLoading={mockOnLoading} />);
    
    const input = screen.getByPlaceholder(/enter postal code/i);
    await userEvent.type(input, 'A1A1A1');
    
    fireEvent.submit(screen.getByRole('button', { name: /find representatives/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/test error/i)).toBeInTheDocument();
    });
  });
}); 