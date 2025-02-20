import React from 'react';
import { useSearch } from '../../context/SearchContext';
import { useGeolocation } from '../../hooks/useGeolocation';
import { validators } from '../../utils/validators';
import { RepresentService } from '../../services/representApi';
import {
  SearchContainer,
  SearchMethods,
  SearchForm,
  Button,
  Input,
  ErrorMessage
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
      <SearchMethods>
        <Button
          variant={searchMethod === 'postal' ? 'primary' : 'secondary'}
          onClick={() => handleMethodChange('postal')}
          aria-pressed={searchMethod === 'postal'}
        >
          Search by Postal Code
        </Button>
        <Button
          variant={searchMethod === 'location' ? 'primary' : 'secondary'}
          onClick={() => handleMethodChange('location')}
          aria-pressed={searchMethod === 'location'}
        >
          Use My Location
        </Button>
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
            variant="primary"
            disabled={state.loading}
          >
            {state.loading ? 'Searching...' : 'Find Representatives'}
          </Button>
        </SearchForm>
      ) : (
        <Button 
          onClick={handleLocationSearch}
          disabled={geoLoading || state.loading}
          variant="primary"
          style={{ margin: '0 auto', display: 'block' }}
        >
          {geoLoading || state.loading ? 'Getting Location...' : 'Use Current Location'}
        </Button>
      )}
      
      {state.error && (
        <ErrorMessage role="alert">
          {state.error}
        </ErrorMessage>
      )}
    </SearchContainer>
  );
}; 