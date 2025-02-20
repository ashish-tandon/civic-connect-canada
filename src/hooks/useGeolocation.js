'use client';

import { useState } from 'react';

export const useGeolocation = () => {
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      setLoading(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setLoading(false);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error('Please allow access to your location to use this feature'));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error('Location information is unavailable'));
              break;
            case error.TIMEOUT:
              reject(new Error('The request to get your location timed out'));
              break;
            default:
              reject(new Error('An unknown error occurred while getting your location'));
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  return {
    getLocation,
    loading,
  };
}; 