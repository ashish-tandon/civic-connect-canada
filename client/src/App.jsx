import React, { useState } from 'react';
import { Search } from './components/Search';
import { RepresentativeList } from './components/RepresentativeList';
import './styles/Search.css';

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const handleResults = (data) => {
    setSearchResults(data);
  };

  return (
    <div className="app">
      <header>
        <h1>Find Your Representatives</h1>
        <p>Enter your postal code or use your location to find your representatives</p>
      </header>

      <main>
        <Search onResults={handleResults} />
        
        {searchResults && searchResults.representatives && (
          <RepresentativeList 
            representatives={searchResults.representatives} 
          />
        )}
      </main>
    </div>
  );
}

export default App; 