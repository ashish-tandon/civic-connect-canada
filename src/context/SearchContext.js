import React, { createContext, useContext, useReducer } from 'react';

const SearchContext = createContext();

const initialState = {
  searchMethod: 'postal',
  results: null,
  loading: false,
  error: null
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_METHOD':
      return { ...state, searchMethod: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_RESULTS':
      return { ...state, results: action.payload, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, results: null };
    default:
      return state;
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}; 