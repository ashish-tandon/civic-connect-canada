import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled.li`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Name = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: #2d3748;
`;

const Detail = styled.p`
  margin: 0.25rem 0;
  color: #4a5568;
  font-size: 0.9rem;
`;

const PhotoContainer = styled.div`
  margin-bottom: 1rem;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Office = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

const Links = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  
  a {
    color: #3182ce;
    text-decoration: none;
    font-size: 0.9rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const RepresentativeList = ({ representatives }) => {
  if (!representatives?.length) {
    return <p>No representatives found.</p>;
  }

  return (
    <List>
      {representatives.map((rep, index) => (
        <Card key={`${rep.name}-${index}`}>
          {rep.photo_url && (
            <PhotoContainer>
              <img src={rep.photo_url} alt={rep.name} />
            </PhotoContainer>
          )}
          
          <Name>{rep.name}</Name>
          
          {rep.elected_office && (
            <Detail><strong>Office:</strong> {rep.elected_office}</Detail>
          )}
          {rep.district_name && (
            <Detail><strong>District:</strong> {rep.district_name}</Detail>
          )}
          {rep.party_name && (
            <Detail><strong>Party:</strong> {rep.party_name}</Detail>
          )}
          
          {rep.offices && rep.offices.length > 0 && (
            <Office>
              {rep.offices.map((office, i) => (
                <div key={i}>
                  {office.type && <Detail><strong>{office.type.charAt(0).toUpperCase() + office.type.slice(1)} Office</strong></Detail>}
                  {office.tel && <Detail><strong>Tel:</strong> {office.tel}</Detail>}
                  {office.fax && <Detail><strong>Fax:</strong> {office.fax}</Detail>}
                  {office.postal && <Detail><strong>Address:</strong> {office.postal}</Detail>}
                </div>
              ))}
            </Office>
          )}

          <Links>
            {rep.email && (
              <a href={`mailto:${rep.email}`}>Email</a>
            )}
            {rep.url && (
              <a href={rep.url} target="_blank" rel="noopener noreferrer">Official Website</a>
            )}
            {rep.personal_url && (
              <a href={rep.personal_url} target="_blank" rel="noopener noreferrer">Personal Website</a>
            )}
          </Links>
        </Card>
      ))}
    </List>
  );
}; 