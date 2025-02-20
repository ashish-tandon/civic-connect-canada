const API_BASE_URL = 'https://represent.opennorth.ca/representatives';

class RepresentativeService {
  async getByPostalCode(postalCode) {
    try {
      const formattedPostalCode = postalCode.replace(/\s/g, '');
      const response = await fetch(`${API_BASE_URL}/postcode/${formattedPostalCode}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No representatives found for this postal code');
        }
        throw new Error('Failed to fetch representatives');
      }

      const data = await response.json();
      return this.processApiResponse(data);
    } catch (error) {
      throw new Error(error.message || 'Error fetching representatives by postal code');
    }
  }

  async getByLocation(latitude, longitude) {
    try {
      const response = await fetch(`${API_BASE_URL}/point/${latitude},${longitude}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No representatives found for this location');
        }
        throw new Error('Failed to fetch representatives');
      }

      const data = await response.json();
      return this.processApiResponse(data);
    } catch (error) {
      throw new Error(error.message || 'Error fetching representatives by location');
    }
  }

  processApiResponse(data) {
    if (!data || !Array.isArray(data.objects)) {
      throw new Error('Invalid response format from the API');
    }

    // Sort representatives by level of government and role
    const sortOrder = {
      'Federal': 1,
      'Provincial': 2,
      'Municipal': 3,
    };

    const representatives = data.objects
      .sort((a, b) => {
        // First sort by level of government
        const levelDiff = (sortOrder[a.representative_set_name] || 4) - 
                         (sortOrder[b.representative_set_name] || 4);
        
        if (levelDiff !== 0) return levelDiff;
        
        // Then sort by role (Mayor first, then councillors)
        if (a.elected_office.toLowerCase().includes('mayor')) return -1;
        if (b.elected_office.toLowerCase().includes('mayor')) return 1;
        
        // Finally sort alphabetically by name
        return a.name.localeCompare(b.name);
      });

    return {
      representatives,
      total: representatives.length,
      boundary_set_name: data.meta?.boundary_set_name,
    };
  }
}

export const RepresentService = new RepresentativeService(); 