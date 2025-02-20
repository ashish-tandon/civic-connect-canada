import React from 'react';
import { useSearch } from '../../context/SearchContext';
import { useGeolocation } from '../../hooks/useGeolocation';
import { validators } from '../../utils/validators';
import { RepresentService } from '../../services/representApi';
import {
  SearchContainer,
  SearchTitle,
  SearchMethods,
  MethodCard,
  SearchForm,
  Button,
  Input,
  ErrorMessage,
  InfoMessage
} from './Search.styles';

export const Search = () => {
  const { state, dispatch } = useSearch();
  const { getLocation, loading: geoLoading } = useGeolocation();
  const { searchMethod } = state;

  const handleMethodChange = (method) => {
    dispatch({ type: 'SET_SEARCH_METHOD', payload: method });
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const handlePostalSearch = async (e) => {
    e.preventDefault();
    const postalCode = e.target.postalCode.value;

    if (!validators.postalCode(postalCode)) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Please enter a valid postal code (e.g., A1A 1A1)' 
      });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const data = await RepresentService.getByPostalCode(postalCode);
      dispatch({ type: 'SET_RESULTS', payload: data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleLocationSearch = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const position = await getLocation();
      const data = await RepresentService.getByLocation(
        position.latitude,
        position.longitude
      );
      dispatch({ type: 'SET_RESULTS', payload: data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <SearchContainer>
      <SearchTitle>How would you like to find your representatives?</SearchTitle>
      
      <SearchMethods>
        <MethodCard 
          active={searchMethod === 'postal'}
          onClick={() => handleMethodChange('postal')}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && handleMethodChange('postal')}
        >
          <h3>Postal Code</h3>
          <p>Enter your postal code to find representatives in your area</p>
        </MethodCard>

        <MethodCard
          active={searchMethod === 'location'}
          onClick={() => handleMethodChange('location')}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && handleMethodChange('location')}
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
            aria-label="Postal code input"
            autoFocus
            required
          />
          <Button 
            type="submit" 
            disabled={state.loading}
          >
            {state.loading ? 'Searching...' : 'Find My Representatives'}
          </Button>
        </SearchForm>
      ) : (
        <>
          <InfoMessage>
            <strong>Note:</strong> Your browser will ask for permission to access your location. 
            This helps us find representatives in your area more accurately.
          </InfoMessage>
          <Button 
            onClick={handleLocationSearch}
            disabled={geoLoading || state.loading}
          >
            {geoLoading || state.loading ? 'Getting Location...' : 'Use My Current Location'}
          </Button>
        </>
      )}
      
      {state.error && (
        <ErrorMessage role="alert">
          {state.error}
        </ErrorMessage>
      )}
    </SearchContainer>
  );
}; 