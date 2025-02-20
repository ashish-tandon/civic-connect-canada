const BASE_URL = 'https://represent.opennorth.ca';

export const RepresentService = {
  async getByPostalCode(postalCode) {
    try {
      // Format postal code according to API requirements (uppercase, no spaces)
      const formattedCode = postalCode.replace(/\s/g, '').toUpperCase();
      
      const response = await fetch(`${BASE_URL}/postcodes/${formattedCode}/`);
      await this._checkRateLimit(response);
      
      if (!response.ok) {
        throw new Error('Failed to fetch representatives');
      }
      
      const data = await response.json();
      
      // Combine and deduplicate representatives from both centroid and concordance
      const representatives = this._deduplicateRepresentatives(data);
      
      return {
        representatives,
        boundaries: {
          centroid: data.boundaries_centroid || [],
          concordance: data.boundaries_concordance || []
        },
        city: data.city,
        province: data.province
      };
    } catch (error) {
      if (error.message === 'Rate limit exceeded') {
        throw error;
      }
      throw new Error('Unable to find representatives. Please check your postal code.');
    }
  },

  async getByLocation(latitude, longitude) {
    try {
      // Validate coordinates
      if (!this._validateCoordinates(latitude, longitude)) {
        throw new Error('Invalid coordinates provided');
      }

      const response = await fetch(`${BASE_URL}/representatives/?point=${latitude},${longitude}`);
      await this._checkRateLimit(response);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No representatives found for this location');
        }
        throw new Error('Failed to fetch representatives');
      }
      
      const data = await response.json();
      
      // If no representatives found
      if (!data.objects || data.objects.length === 0) {
        throw new Error('No representatives found for this location. Please try a different location or use postal code search.');
      }
      
      return {
        representatives: data.objects,
        meta: {
          next: data.meta?.next,
          previous: data.meta?.previous,
          total_count: data.meta?.total_count,
          boundary_url: data.meta?.boundary_url
        }
      };
    } catch (error) {
      if (error.message === 'Rate limit exceeded') {
        throw error;
      }
      throw new Error(error.message || 'Unable to get representatives for your location.');
    }
  },

  async getLocationFromIP() {
    try {
      const response = await fetch(ipApiUrl);
      const data = await response.json();
      return {
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city,
        region: data.region
      };
    } catch (error) {
      console.error('Error getting location from IP:', error);
      throw error;
    }
  },

  async _checkRateLimit(response) {
    if (response.status === 503) {
      throw new Error('Rate limit exceeded. Please try again later. The API is limited to 60 requests per minute.');
    }
    return response;
  },

  _deduplicateRepresentatives(data) {
    const allRepresentatives = [
      ...(data.representatives_centroid || []),
      ...(data.representatives_concordance || [])
    ];

    // Deduplicate by name since it's one of the guaranteed fields according to the API
    return Array.from(
      new Map(allRepresentatives.map(rep => [rep.name, rep])).values()
    );
  },

  _validateCoordinates(lat, lng) {
    return !isNaN(lat) && 
           !isNaN(lng) && 
           lat >= -90 && 
           lat <= 90 && 
           lng >= -180 && 
           lng <= 180;
  }
}; 