import React from 'react';
import {
  ListContainer,
  RepCard,
  RepImage,
  RepInfo,
  ContactInfo,
  PartyTag
} from './RepresentativeList.styles';

export function RepresentativeList({ representatives }) {
  const getPartyColor = (party) => {
    const partyColors = {
      'Liberal': '#d81e3d',
      'Conservative': '#1a4782',
      'NDP': '#f58220',
      'Green': '#3d9b35',
      'Bloc Québécois': '#02819e'
    };
    return partyColors[party] || '#666666';
  };

  return (
    <ListContainer>
      {representatives.map((rep, index) => (
        <RepCard key={`${rep.name}-${index}`}>
          <RepImage>
            {rep.photo_url ? (
              <img src={rep.photo_url} alt={rep.name} />
            ) : (
              <div className="placeholder">
                {rep.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </RepImage>
          
          <RepInfo>
            <h3>{rep.name}</h3>
            <p className="role">{rep.elected_office}</p>
            <p className="district">{rep.district_name}</p>
            
            {rep.party_name && (
              <PartyTag color={getPartyColor(rep.party_name)}>
                {rep.party_name}
              </PartyTag>
            )}
            
            <ContactInfo>
              {rep.email && (
                <a href={`mailto:${rep.email}`} className="contact-button">
                  Email
                </a>
              )}
              {rep.url && (
                <a href={rep.url} target="_blank" rel="noopener noreferrer" className="contact-button">
                  Website
                </a>
              )}
            </ContactInfo>

            {rep.offices && rep.offices.length > 0 && (
              <div className="offices">
                {rep.offices.map((office, i) => (
                  <div key={i} className="office">
                    <p className="office-type">{office.type}</p>
                    {office.tel && <p>Tel: {office.tel}</p>}
                    {office.postal && <p>{office.postal}</p>}
                  </div>
                ))}
              </div>
            )}
          </RepInfo>
        </RepCard>
      ))}
    </ListContainer>
  );
} 