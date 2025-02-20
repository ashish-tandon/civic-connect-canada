import environment from '../config/environment';

const { apiUrl, ipApiUrl } = environment;

export const RepresentService = {
  // Search by postal code
  async getByPostalCode(postalCode) {
    try {
      const formattedCode = postalCode.replace(/\s/g, '').toUpperCase();
      const response = await fetch(`${apiUrl}/postcodes/${formattedCode}/`);
      await this._checkRateLimit(response);
      const data = await response.json();
      
      // Combine both centroid and concordance representatives
      const allRepresentatives = [
        ...(data.representatives_centroid || []),
        ...(data.representatives_concordance || [])
      ];
      
      // Remove duplicates based on name
      const uniqueRepresentatives = Array.from(
        new Map(allRepresentatives.map(rep => [rep.name, rep])).values()
      );

      return {
        representatives: uniqueRepresentatives,
        boundaries: {
          centroid: data.boundaries_centroid || [],
          concordance: data.boundaries_concordance || []
        }
      };
    } catch (error) {
      console.error('Error fetching postal code data:', error);
      throw error;
    }
  },

  // Search by lat/long with error handling
  async getByLocation(lat, lng) {
    try {
      const [repResponse, boundaryResponse] = await Promise.all([
        fetch(`${apiUrl}/representatives/?point=${lat},${lng}`),
        fetch(`${apiUrl}/boundaries/?contains=${lat},${lng}`)
      ]);
      
      await Promise.all([
        this._checkRateLimit(repResponse),
        this._checkRateLimit(boundaryResponse)
      ]);

      const [repData, boundaryData] = await Promise.all([
        repResponse.json(),
        boundaryResponse.json()
      ]);

      return {
        representatives: repData.objects || [],
        boundaries: boundaryData.objects || []
      };
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw error;
    }
  },

  // IP geolocation fallback
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

  // Add rate limiting helper
  _checkRateLimit: async (response) => {
    if (response.status === 503) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    return response;
  }
}; 