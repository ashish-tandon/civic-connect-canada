import styled from 'styled-components';

export const ListContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
`;

export const RepCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const RepImage = styled.div`
  height: 200px;
  overflow: hidden;
  background: #f0f0f0;

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
    font-size: 2rem;
    color: #666;
    background: #e0e0e0;
  }
`;

export const RepInfo = styled.div`
  padding: 1.5rem;

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    color: #2d3748;
  }

  .role {
    color: #4a5568;
    font-weight: 500;
    margin: 0.25rem 0;
  }

  .district {
    color: #718096;
    font-size: 0.9rem;
    margin: 0.25rem 0 1rem;
  }

  .offices {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;

    .office {
      margin-bottom: 0.75rem;

      .office-type {
        font-weight: 500;
        color: #4a5568;
        margin-bottom: 0.25rem;
      }

      p {
        margin: 0.25rem 0;
        font-size: 0.9rem;
        color: #718096;
      }
    }
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;

  .contact-button {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    text-decoration: none;
    font-size: 0.9rem;
    background: #edf2f7;
    color: #2d3748;
    transition: all 0.2s ease;

    &:hover {
      background: #e2e8f0;
    }
  }
`;

export const PartyTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
  background: ${props => props.color};
`; 