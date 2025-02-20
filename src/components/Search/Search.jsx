'use client';

import React, { useState } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { RepresentService } from '@/services/representApi';
import { validators } from '@/utils/validators';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import RepresentativeList from '@/components/Representatives/RepresentativeList';
import styled from 'styled-components';

const SearchContainer = styled.div`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  margin-bottom: 2rem;
`;

const SearchTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-primary);
`;

const SearchMethods = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const MethodCard = styled.div`
  background: ${({ active }) => active ? 'var(--primary)10' : 'var(--bg-secondary)'};
  border: 2px solid ${({ active }) => active ? 'var(--primary)' : 'var(--text-secondary)20'};
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
  }

  h3 {
    color: ${({ active }) => active ? 'var(--primary)' : 'var(--text-primary)'};
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid var(--text-secondary)20;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  background: var(--bg-primary);
  color: var(--text-primary);

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Button = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  text-align: center;
  margin-top: 1rem;
  padding: 1rem;
  background: #e53e3e10;
  border-radius: 8px;
`;

const InfoMessage = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--primary)10;
  border-radius: 8px;
  color: var(--text-primary);

  strong {
    color: var(--primary);
  }
`;

export default function Search() {
  const [searchMethod, setSearchMethod] = useState('postal');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const { getLocation, loading: geoLoading } = useGeolocation();

  const handleMethodChange = (method) => {
    setSearchMethod(method);
    setError(null);
  };

  const handlePostalSearch = async (e) => {
    e.preventDefault();
    const postalCode = e.target.postalCode.value;

    if (!validators.postalCode(postalCode)) {
      setError('Please enter a valid postal code (e.g., A1A 1A1)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await RepresentService.getByPostalCode(postalCode);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const position = await getLocation();
      const data = await RepresentService.getByLocation(
        position.latitude,
        position.longitude
      );
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchContainer>
        <SearchTitle>Find Your Representatives</SearchTitle>
        
        <SearchMethods>
          <MethodCard 
            active={searchMethod === 'postal'}
            onClick={() => handleMethodChange('postal')}
          >
            <h3>Postal Code</h3>
            <p>Enter your postal code to find representatives in your area</p>
          </MethodCard>

          <MethodCard
            active={searchMethod === 'location'}
            onClick={() => handleMethodChange('location')}
          >
            <h3>Current Location</h3>
            <p>Use your device's location to find representatives near you</p>
          </MethodCard>
        </SearchMethods>

        {searchMethod === 'postal' ? (
          <SearchForm onSubmit={handlePostalSearch}>
            <Input
              name="postalCode"
              placeholder="Enter postal code (e.g., A1A 1A1)"
              pattern="[A-Za-z][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]"
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Find Representatives'}
            </Button>
          </SearchForm>
        ) : (
          <>
            <InfoMessage>
              <strong>Note:</strong> Your browser will ask for permission to access your location.
            </InfoMessage>
            <Button 
              onClick={handleLocationSearch}
              disabled={loading || geoLoading}
            >
              {loading || geoLoading ? 'Getting Location...' : 'Use My Location'}
            </Button>
          </>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {loading && <LoadingSpinner />}
      </SearchContainer>

      {results?.representatives && (
        <RepresentativeList representatives={results.representatives} />
      )}
    </div>
  );
} 