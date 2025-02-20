import React, { useState } from 'react';
import { Search } from './components/Search/Search';
import { RepresentativeList } from './components/RepresentativeList/RepresentativeList';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
import { AppContainer, Header, Main } from './App.styles';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleResults = (data) => {
    setSearchResults(data);
  };

  return (
    <AppContainer>
      <Header>
        <h1>CivicConnect Canada</h1>
        <p>Find and connect with your elected representatives across all levels of government</p>
      </Header>

      <Main>
        <Search onResults={handleResults} onLoading={setIsLoading} />
        
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          searchResults?.representatives && (
            <RepresentativeList representatives={searchResults.representatives} />
          )
        )}
      </Main>
    </AppContainer>
  );
}

export default App; 