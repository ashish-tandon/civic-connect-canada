import React from 'react';
import { SearchProvider, useSearch } from './context/SearchContext';
import { Search } from './components/Search/Search';
import { RepresentativeList } from './components/Representatives/RepresentativeList';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import {
  AppContainer,
  Hero,
  WelcomeSection,
  SearchSection,
  EducationSection,
  CardGrid,
  EducationCard,
  SectionTitle
} from './App.styles';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <SearchProvider>
      <GlobalStyles />
      <AppContainer>
        <Hero>
          <h1>Welcome to CivicConnect Canada</h1>
          <p>Your gateway to democratic engagement and civic participation in Canada</p>
        </Hero>

        <WelcomeSection>
          <h2>Connect with Your Government</h2>
          <p>
            In a democracy, your voice matters. CivicConnect Canada bridges the gap between citizens
            and their elected representatives across all levels of government. We believe that
            accessible communication with your representatives is fundamental to a thriving democracy.
          </p>
        </WelcomeSection>

        <SearchSection>
          <Search />
          <ResultsSection />
        </SearchSection>

        <EducationSection>
          <SectionTitle>Learn About Canadian Government</SectionTitle>
          <CardGrid>
            <EducationCard>
              <h3>Federal Bill Creation</h3>
              <p>Understand how laws are made in Parliament and how you can participate in the legislative process.</p>
              <a href="/federal-process" target="_blank" rel="noopener noreferrer">Learn More</a>
            </EducationCard>

            <EducationCard>
              <h3>Provincial Legislature</h3>
              <p>Discover how your province creates and implements laws that affect your daily life.</p>
              <a href="/provincial-process" target="_blank" rel="noopener noreferrer">Learn More</a>
            </EducationCard>

            <EducationCard>
              <h3>Municipal Government</h3>
              <p>Learn about city councils, local bylaws, and how decisions are made in your community.</p>
              <a href="/municipal-process" target="_blank" rel="noopener noreferrer">Learn More</a>
            </EducationCard>
          </CardGrid>
        </EducationSection>
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