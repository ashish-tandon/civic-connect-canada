const environment = {
  apiUrl: process.env.REACT_APP_API_URL || 'https://represent.opennorth.ca',
  ipApiUrl: process.env.REACT_APP_IP_API_URL || 'https://ipapi.co/json/',
  rateLimit: process.env.REACT_APP_RATE_LIMIT || 60,
};

export default environment; 