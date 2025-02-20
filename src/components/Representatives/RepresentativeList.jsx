'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled(motion.div)`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PhotoContainer = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--primary);
  }
`;

const Name = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  text-align: center;
`;

const Role = styled.div`
  background: var(--primary)10;
  color: var(--primary);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h4`
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const Detail = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0.25rem 0;
`;

const ResponsibilitiesList = styled.ul`
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;

  li {
    margin-bottom: 0.25rem;
  }
`;

const ContactInfo = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--text-secondary)20;
`;

const ContactLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  a {
    color: var(--primary);
    text-decoration: none;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;

  &:hover {
    text-decoration: underline;
  }
`;

const getRoleDescription = (role) => {
  const roles = {
    'City Councillor': {
      description: 'Your representative at the municipal/city level.',
      responsibilities: [
        'Handles local services and infrastructure',
        'Makes decisions about city planning and development',
        'Manages municipal budgets and services',
      ],
      matters: [
        'Local roads and transportation',
        'Parks and recreation',
        'Waste management',
        'Local bylaws',
        'Property development',
      ],
    },
    'Mayor': {
      description: 'The head of your municipal government.',
      responsibilities: [
        'Leads city council',
        'Represents the city officially',
        'Sets strategic direction',
      ],
      matters: [
        'City-wide policies',
        'Economic development',
        'Emergency management',
        'Intergovernmental relations',
      ],
    },
    'MPP': {
      description: 'Your representative in the provincial legislature.',
      responsibilities: [
        'Represents constituents at the provincial level',
        'Participates in legislative debates',
        'Advocates for local interests',
      ],
      matters: [
        'Healthcare',
        'Education',
        'Transportation',
        'Natural resources',
        'Property and civil rights',
      ],
    },
    'MP': {
      description: 'Your representative in the federal Parliament.',
      responsibilities: [
        'Represents constituents in Parliament',
        'Participates in federal legislation',
        'Advocates for constituency interests',
      ],
      matters: [
        'Immigration',
        'National defense',
        'Foreign policy',
        'Criminal law',
        'Banking and currency',
      ],
    },
  };

  const normalizedRole = Object.keys(roles).find(key => 
    role?.toLowerCase().includes(key.toLowerCase())
  );

  return roles[normalizedRole] || {
    description: 'Your elected representative.',
    responsibilities: ['Represents constituents', 'Works on legislation and policies'],
    matters: ['Local and regional matters', 'Policy development'],
  };
};

export default function RepresentativeList({ representatives }) {
  const [expandedCards, setExpandedCards] = useState(new Set());

  if (!representatives?.length) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        No representatives found for this location.
      </div>
    );
  }

  const toggleCard = (repId) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(repId)) {
        newSet.delete(repId);
      } else {
        newSet.add(repId);
      }
      return newSet;
    });
  };

  return (
    <List>
      {representatives.map((rep, index) => {
        const repId = `${rep.name}-${index}`;
        const isExpanded = expandedCards.has(repId);
        const roleInfo = getRoleDescription(rep.elected_office);

        return (
          <Card
            key={repId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {rep.photo_url && (
              <PhotoContainer>
                <img src={rep.photo_url} alt={rep.name} />
              </PhotoContainer>
            )}
            
            <Name>{rep.name}</Name>
            
            {rep.elected_office && (
              <Role>{rep.elected_office}</Role>
            )}

            <Section>
              <SectionTitle>About This Role</SectionTitle>
              <Detail>{roleInfo.description}</Detail>
              
              {isExpanded && (
                <>
                  <SectionTitle>Key Responsibilities</SectionTitle>
                  <ResponsibilitiesList>
                    {roleInfo.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ResponsibilitiesList>

                  <SectionTitle>Contact For</SectionTitle>
                  <ResponsibilitiesList>
                    {roleInfo.matters.map((matter, i) => (
                      <li key={i}>{matter}</li>
                    ))}
                  </ResponsibilitiesList>
                </>
              )}

              <ExpandButton onClick={() => toggleCard(repId)}>
                {isExpanded ? 'Show Less' : 'Learn More About This Role'}
              </ExpandButton>
            </Section>

            {rep.district_name && (
              <Section>
                <SectionTitle>District</SectionTitle>
                <Detail>{rep.district_name}</Detail>
              </Section>
            )}

            {rep.party_name && (
              <Section>
                <SectionTitle>Party Affiliation</SectionTitle>
                <Detail>{rep.party_name}</Detail>
              </Section>
            )}

            <ContactInfo>
              <SectionTitle>Contact Information</SectionTitle>
              
              {rep.offices?.length > 0 && (
                <Section>
                  {rep.offices.map((office, i) => (
                    <div key={i}>
                      {office.type && (
                        <Detail><strong>{office.type} Office</strong></Detail>
                      )}
                      {office.tel && <Detail>Tel: {office.tel}</Detail>}
                      {office.fax && <Detail>Fax: {office.fax}</Detail>}
                      {office.postal && <Detail>Address: {office.postal}</Detail>}
                    </div>
                  ))}
                </Section>
              )}

              <ContactLinks>
                {rep.email && (
                  <a href={`mailto:${rep.email}`}>
                    ✉️ Email
                  </a>
                )}
                {rep.url && (
                  <a href={rep.url} target="_blank" rel="noopener noreferrer">
                    🔗 Official Website
                  </a>
                )}
                {rep.personal_url && (
                  <a href={rep.personal_url} target="_blank" rel="noopener noreferrer">
                    👤 Personal Website
                  </a>
                )}
              </ContactLinks>
            </ContactInfo>
          </Card>
        );
      })}
    </List>
  );
} 