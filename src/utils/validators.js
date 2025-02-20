export const validators = {
  postalCode: (value) => {
    // Canadian postal code format: A1A 1A1
    const regex = /^[A-Za-z][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]$/;
    return regex.test(value?.trim());
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