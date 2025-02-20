import { apiCache } from './cache';
import environment from '../config/environment';

const { apiUrl, ipApiUrl } = environment;

export class RepresentService {
  static async getByPostalCode(postalCode) {
    const cacheKey = `postal_${postalCode}`;
    const cachedData = apiCache.get(cacheKey);
    if (cachedData) return cachedData;

    try {
      const formattedCode = postalCode.replace(/\s/g, '').toUpperCase();
      const response = await fetch(`${apiUrl}/postcodes/${formattedCode}/`);
      await this._checkRateLimit(response);
      const data = await response.json();

      const result = {
        representatives: this._deduplicateRepresentatives(data),
        boundaries: {
          centroid: data.boundaries_centroid || [],
          concordance: data.boundaries_concordance || []
        }
      };

      apiCache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error fetching postal code data:', error);
      throw error;
    }
  }

  static async getByLocation(lat, lng) {
    const cacheKey = `location_${lat}_${lng}`;
    const cachedData = apiCache.get(cacheKey);
    if (cachedData) return cachedData;

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

      const result = {
        representatives: repData.objects || [],
        boundaries: boundaryData.objects || []
      };

      apiCache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw error;
    }
  }

  static async getLocationFromIP() {
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
  }

  static _checkRateLimit(response) {
    if (response.status === 503) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    return response;
  }

  static _deduplicateRepresentatives(data) {
    const allRepresentatives = [
      ...(data.representatives_centroid || []),
      ...(data.representatives_concordance || [])
    ];

    return Array.from(
      new Map(allRepresentatives.map(rep => [rep.name, rep])).values()
    );
  }
} 