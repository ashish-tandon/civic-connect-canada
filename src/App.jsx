import React from 'react';
import { SearchProvider, useSearch } from './context/SearchContext';
import { Search } from './components/Search/Search';
import { RepresentativeList } from './components/Representatives/RepresentativeList';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { AppContainer, Header, Main } from './App.styles';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <SearchProvider>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <h1>CivicConnect Canada</h1>
          <p>Find and connect with your elected representatives across all levels of government</p>
        </Header>

        <Main>
          <Search />
          <ResultsSection />
        </Main>
      </AppContainer>
    </SearchProvider>
  );
}

const ResultsSection = () => {
  const { state } = useSearch();
  const { loading, results } = state;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (results?.representatives) {
    return <RepresentativeList representatives={results.representatives} />;
  }

  return null;
};

export default App; 