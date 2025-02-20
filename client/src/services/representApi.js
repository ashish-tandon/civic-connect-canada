const BASE_URL = 'https://represent.opennorth.ca';

export const RepresentService = {
  // Search by postal code
  async getByPostalCode(postalCode) {
    const formattedCode = postalCode.replace(/\s/g, '').toUpperCase();
    const response = await fetch(`${BASE_URL}/postcodes/${formattedCode}/`);
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
  },

  // Search by lat/long
  async getByLocation(lat, lng) {
    try {
      // Get representatives
      const repResponse = await fetch(
        `${BASE_URL}/representatives/?point=${lat},${lng}`
      );
      const repData = await repResponse.json();

      // Get boundaries
      const boundaryResponse = await fetch(
        `${BASE_URL}/boundaries/?contains=${lat},${lng}`
      );
      const boundaryData = await boundaryResponse.json();

      return {
        representatives: repData.objects || [],
        boundaries: boundaryData.objects || []
      };
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw error;
    }
  },

  // Get boundary information
  async getBoundaries(lat, lng) {
    const response = await fetch(
      `${BASE_URL}/boundaries/?contains=${lat},${lng}`
    );
    return response.json();
  },

  // Add IP geolocation fallback
  async getLocationFromIP() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        latitude: data.latitude,
        longitude: data.longitude
      };
    } catch (error) {
      console.error('Error getting location from IP:', error);
      throw error;
    }
  }
}; 