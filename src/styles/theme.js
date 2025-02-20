export const lightTheme = {
  colors: {
    primary: '#0070f3',
    secondary: '#6b7280',
    background: '#ffffff',
    text: '#1a1a1a',
    textLight: '#4a5568',
    cardBg: '#f7f7f7',
    hover: '#f0f0f0',
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 800,
    },
    h2: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  shadows: {
    small: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    medium: '0 4px 6px rgba(0,0,0,0.1)',
    large: '0 10px 20px rgba(0,0,0,0.1)',
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1280px',
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    primary: '#0070f3',
    secondary: '#9ca3af',
    background: '#1a1a1a',
    text: '#ffffff',
    textLight: '#d1d5db',
    cardBg: '#2d2d2d',
    hover: '#3d3d3d',
  },
}; 