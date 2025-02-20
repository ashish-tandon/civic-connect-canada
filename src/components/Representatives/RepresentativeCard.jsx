import React from 'react';
import styled from 'styled-components';
import { Button } from '../common/Button/Button';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  background: #f7fafc;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: #718096;
    background: #edf2f7;
  }
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const PartyTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background: ${props => props.color};
  margin-top: 0.5rem;
`;

const ContactSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;

  .contact-buttons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

export const RepresentativeCard = ({ representative }) => {
  const getPartyColor = (party) => {
    const colors = {
      'Liberal': '#d81e3d',
      'Conservative': '#1a4782',
      'NDP': '#f58220',
      'Green': '#3d9b35',
      'Bloc Québécois': '#02819e'
    };
    return colors[party] || '#718096';
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <Card>
      <ImageContainer>
        {representative.photo_url ? (
          <img src={representative.photo_url} alt={representative.name} />
        ) : (
          <div className="placeholder">
            {getInitials(representative.name)}
          </div>
        )}
      </ImageContainer>

      <Content>
        <h3>{representative.name}</h3>
        <p>{representative.elected_office}</p>
        <p>{representative.district_name}</p>

        {representative.party_name && (
          <PartyTag color={getPartyColor(representative.party_name)}>
            {representative.party_name}
          </PartyTag>
        )}

        <ContactSection>
          <div className="contact-buttons">
            {representative.email && (
              <Button 
                as="a" 
                href={`mailto:${representative.email}`}
                variant="secondary"
              >
                Email
              </Button>
            )}
            {representative.url && (
              <Button 
                as="a" 
                href={representative.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                Website
              </Button>
            )}
          </div>

          {representative.offices?.map((office, index) => (
            <div key={index} className="office">
              <strong>{office.type}</strong>
              {office.tel && <p>Tel: {office.tel}</p>}
              {office.postal && <p>{office.postal}</p>}
            </div>
          ))}
        </ContactSection>
      </Content>
    </Card>
  );
}; 