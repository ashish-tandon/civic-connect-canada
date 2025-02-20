import React from 'react';

export function RepresentativeList({ representatives }) {
  return (
    <div className="representatives-grid">
      {representatives.map((rep) => (
        <div key={rep.name} className="representative-card">
          {rep.photo_url && (
            <img src={rep.photo_url} alt={rep.name} className="rep-photo" />
          )}
          <h3>{rep.name}</h3>
          <p>{rep.elected_office}</p>
          <p>{rep.district_name}</p>
          {rep.party_name && <p>Party: {rep.party_name}</p>}
          
          {rep.offices && rep.offices.map((office, index) => (
            <div key={index} className="office-info">
              <p>{office.type}</p>
              {office.tel && <p>Tel: {office.tel}</p>}
              {office.postal && <p>Address: {office.postal}</p>}
            </div>
          ))}
          
          {rep.email && (
            <a href={`mailto:${rep.email}`} className="contact-link">
              Email Representative
            </a>
          )}
        </div>
      ))}
    </div>
  );
} 