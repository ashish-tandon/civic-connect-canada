import React, { createContext, useContext, useReducer } from 'react';

const SearchContext = createContext();

const initialState = {
  loading: false,
  error: null,
  results: null,
  searchMethod: 'postal', // 'postal' or 'location'
};

function searchReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_RESULTS':
      return { ...state, results: action.payload, error: null };
    case 'SET_SEARCH_METHOD':
      return { ...state, searchMethod: action.payload, error: null };
    default:
      return state;
  }
}

export function SearchProvider({ children }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 