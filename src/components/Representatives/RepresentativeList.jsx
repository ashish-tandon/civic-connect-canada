import React from 'react';
import styled from 'styled-components';
import { RepresentativeCard } from './RepresentativeCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: #4a5568;
`;

export const RepresentativeList = ({ representatives }) => {
  if (!representatives?.length) {
    return (
      <NoResults>
        <h2>No representatives found</h2>
        <p>Try searching with a different postal code or location.</p>
      </NoResults>
    );
  }

  return (
    <Grid>
      {representatives.map((rep, index) => (
        <RepresentativeCard 
          key={`${rep.name}-${rep.district_name}-${index}`}
          representative={rep}
        />
      ))}
    </Grid>
  );
}; 