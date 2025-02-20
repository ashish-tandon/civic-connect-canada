import '@testing-library/jest-dom';
import 'jest-styled-components';

// Mock the window.matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
}; 