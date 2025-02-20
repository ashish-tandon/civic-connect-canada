import React, { useState } from 'react';
import { RepresentService } from '../services/representApi';

export function Search({ onResults }) {
  const [postalCode, setPostalCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchMethod, setSearchMethod] = useState('postal'); // 'postal' or 'location'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const data = await RepresentService.getByPostalCode(postalCode);
      onResults(data);
    } catch (err) {
      setError('Unable to find representatives. Please check your postal code.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const data = await RepresentService.getByLocation(latitude, longitude);
      onResults(data);
    } catch (err) {
      setError('Unable to get your location. Please try postal code search instead.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-methods">
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
      </div>

      {searchMethod === 'postal' ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter postal code (e.g., A1A 1A1)"
            pattern="[A-Za-z][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Find Representatives'}
          </button>
        </form>
      ) : (
        <button 
          onClick={handleLocationSearch} 
          disabled={loading}
          className="location-button"
        >
          {loading ? 'Getting Location...' : 'Use Current Location'}
        </button>
      )}
      
      {error && <div className="error">{error}</div>}
    </div>
  );
} 