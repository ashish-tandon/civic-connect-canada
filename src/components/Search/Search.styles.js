import styled from 'styled-components';

export const SearchContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const SearchMethods = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  button {
    flex: 1;
    padding: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;

    &.active {
      background: #2c5282;
      color: white;
      border-color: #2c5282;
    }

    &:hover:not(.active) {
      background: #f7fafc;
      border-color: #2c5282;
    }
  }
`;

export const SearchForm = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    padding: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #2c5282;
    }
  }

  button {
    padding: 1rem 2rem;
    background: #2c5282;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #1a365d;
    }
  }
`; 