export const validators = {
  postalCode: (code) => {
    if (!code) return false;
    
    // Remove spaces and convert to uppercase
    const formatted = code.replace(/\s/g, '').toUpperCase();
    
    // Canadian postal code format: A1A1A1 or A1A 1A1
    const regex = /^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$/;
    return regex.test(formatted);
  },

  coordinates: (lat, lng) => {
    return !isNaN(lat) && 
           !isNaN(lng) && 
           lat >= -90 && 
           lat <= 90 && 
           lng >= -180 && 
           lng <= 180;
  }
}; 