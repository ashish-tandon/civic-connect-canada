import React, { useState } from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Card = styled.li`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

const PhotoContainer = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid ${({ theme }) => theme.colors.primary};
  }
`;

const Name = styled.h2`
  margin: 0 0 0.5rem;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const Role = styled.div`
  background: ${({ theme }) => `${theme.colors.primary}10`};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
`;

const Detail = styled.p`
  margin: 0.25rem 0;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
`;

const ResponsibilitiesList = styled.ul`
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};

  li {
    margin-bottom: 0.25rem;
  }
`;

const ContactInfo = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ContactLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
      text-decoration: underline;
    }
  }
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  cursor: pointer;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: underline;
  }
`;

const getRoleDescription = (role) => {
  const roles = {
    'City Councillor': {
      description: 'Your representative at the municipal/city level.',
      responsibilities: [
        'Handles issues related to city services, infrastructure, local governance, public safety, and municipal policies.',
      ],
      matters: [
        'Local roads, sidewalks, and traffic concerns',
        'Garbage collection and recycling programs',
        'Parks, recreation, and city planning',
        'Local by-laws and zoning regulations',
        'Housing and rental concerns',
        'Public transit and transportation within the city',
      ],
    },
    'Mayor': {
      description: 'The leader of the city council and chief executive officer of the city.',
      responsibilities: [
        'Sets the city\'s priorities, oversees municipal operations, and represents the city at official events.',
      ],
      matters: [
        'City-wide policies and governance',
        'Emergency response and city preparedness',
        'Budget allocations and major city projects',
        'Economic development and business incentives',
        'Intergovernmental relations with provincial and federal governments',
      ],
    },
    'MPP': {
      description: 'Your elected representative at the provincial level.',
      responsibilities: [
        'Represents your interests in the provincial legislature and works on laws and policies at the provincial level.',
      ],
      matters: [
        'Health care and hospitals',
        'Education (schools, curriculum, school funding)',
        'Provincial highways and transportation',
        'Social services and public assistance',
        'Environment and natural resources',
        'Business regulations and labor laws',
      ],
    },
    'MP': {
      description: 'Your elected representative in the federal government.',
      responsibilities: [
        'Represents your constituency in the House of Commons and votes on national legislation.',
      ],
      matters: [
        'National policies and federal laws',
        'Immigration and citizenship services',
        'Federal taxes and benefits (e.g., CRA, EI, CPP)',
        'National security and defense',
        'International trade and foreign affairs',
        'Federal infrastructure and funding for local projects',
      ],
    },
  };

  // Handle variations in role names
  const normalizedRole = Object.keys(roles).find(key => 
    role.toLowerCase().includes(key.toLowerCase())
  );

  return roles[normalizedRole] || {
    description: 'Your elected representative.',
    responsibilities: ['Represents constituents and works on policies and legislation.'],
    matters: ['Local and regional matters', 'Policy development', 'Constituent services'],
  };
};

export const RepresentativeList = ({ representatives }) => {
  const [expandedCards, setExpandedCards] = useState(new Set());

  if (!representatives?.length) {
    return <p>No representatives found.</p>;
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
          <Card key={repId}>
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
              
              {rep.offices && rep.offices.length > 0 && (
                <Section>
                  {rep.offices.map((office, i) => (
                    <div key={i}>
                      {office.type && (
                        <Detail><strong>{office.type.charAt(0).toUpperCase() + office.type.slice(1)} Office</strong></Detail>
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
}; 