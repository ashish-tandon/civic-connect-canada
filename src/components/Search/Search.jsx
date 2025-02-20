import React, { useState } from 'react';
import { SearchContainer, SearchMethods, SearchForm } from './Search.styles';
import { RepresentService } from '../../services/representApi';

export function Search({ onResults, onLoading }) {
  const [postalCode, setPostalCode] = useState('');
  const [searchMethod, setSearchMethod] = useState('postal');
  const [error, setError] = useState(null);

  const handlePostalSearch = async (e) => {
    e.preventDefault();
    setError(null);
    onLoading(true);

    try {
      const data = await RepresentService.getByPostalCode(postalCode);
      onResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      onLoading(false);
    }
  };

  const handleLocationSearch = async () => {
    setError(null);
    onLoading(true);

    try {
      // Try browser geolocation first
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const data = await RepresentService.getByLocation(latitude, longitude);
      onResults(data);
    } catch (geoError) {
      try {
        // Fallback to IP-based location
        const ipLocation = await RepresentService.getLocationFromIP();
        const data = await RepresentService.getByLocation(
          ipLocation.latitude,
          ipLocation.longitude
        );
        onResults(data);
      } catch (err) {
        setError('Unable to determine your location. Please try postal code search.');
      }
    } finally {
      onLoading(false);
    }
  };

  return (
    <SearchContainer>
      <SearchMethods>
        <button
          className={searchMethod === 'postal' ? 'active' : ''}
          onClick={() => setSearchMethod('postal')}
        >
          Search by Postal Code
        </button>
        <button
          className={searchMethod === 'location' ? 'active' : ''}
          onClick={() => setSearchMethod('location')}
        >
          Use My Location
        </button>
      </SearchMethods>

      {searchMethod === 'postal' ? (
        <SearchForm onSubmit={handlePostalSearch}>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
            placeholder="Enter postal code (e.g., A1A 1A1)"
            pattern="[A-Za-z][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]"
            required
          />
          <button type="submit">Find Representatives</button>
        </SearchForm>
      ) : (
        <button onClick={handleLocationSearch} className="location-button">
          Use Current Location
        </button>
      )}

      {error && <div className="error">{error}</div>}
    </SearchContainer>
  );
} 