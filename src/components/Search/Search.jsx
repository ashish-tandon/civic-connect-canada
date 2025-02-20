import React from 'react';
import { SearchContainer, SearchMethods, SearchForm } from './Search.styles';
import { Button } from '../common/Button/Button';
import { Input } from '../common/Input/Input';
import { useSearch } from '../../context/SearchContext';
import { useGeolocation } from '../../hooks/useGeolocation';
import { validators } from '../../utils/validators';
import { RepresentService } from '../../services/representApi';

export const Search = () => {
  const { state, dispatch } = useSearch();
  const { getLocation, loading: geoLoading } = useGeolocation();
  const { searchMethod } = state;

  const handleMethodChange = (method) => {
    dispatch({ type: 'SET_SEARCH_METHOD', payload: method });
  };

  const handlePostalSearch = async (e) => {
    e.preventDefault();
    const postalCode = e.target.postalCode.value;

    if (!validators.postalCode(postalCode)) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Please enter a valid postal code' 
      });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
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
            required
          />
          <Button type="submit">
            Find Representatives
          </Button>
        </SearchForm>
      ) : (
        <Button 
          onClick={handleLocationSearch}
          disabled={geoLoading}
          className="location-button"
          aria-busy={geoLoading}
        >
          {geoLoading ? 'Getting Location...' : 'Use Current Location'}
        </Button>
      )}

      {state.error && (
        <div className="error" role="alert">
          {state.error}
        </div>
      )}
    </SearchContainer>
  );
}; 