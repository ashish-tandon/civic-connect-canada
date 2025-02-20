import React from 'react';
import { render, screen } from '@testing-library/react';
import { RepresentativeList } from '../RepresentativeList';

describe('RepresentativeList Component', () => {
  const mockRepresentatives = [
    {
      name: 'John Doe',
      elected_office: 'MP',
      district_name: 'Test District',
      party_name: 'Liberal',
      photo_url: 'https://example.com/photo.jpg',
      email: 'john@example.com',
      url: 'https://example.com',
      offices: [
        {
          type: 'Constituency',
          tel: '123-456-7890',
          postal: '123 Test St'
        }
      ]
    }
  ];

  test('renders representative information correctly', () => {
    render(<RepresentativeList representatives={mockRepresentatives} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('MP')).toBeInTheDocument();
    expect(screen.getByText('Test District')).toBeInTheDocument();
    expect(screen.getByText('Liberal')).toBeInTheDocument();
  });

  test('renders contact information correctly', () => {
    render(<RepresentativeList representatives={mockRepresentatives} />);
    
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Website')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('123 Test St')).toBeInTheDocument();
  });

  test('handles missing data gracefully', () => {
    const minimalRep = [{
      name: 'Jane Smith',
      elected_office: 'MLA',
      district_name: 'Another District'
    }];

    render(<RepresentativeList representatives={minimalRep} />);
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('Email')).not.toBeInTheDocument();
    expect(screen.queryByText('Website')).not.toBeInTheDocument();
  });
}); 