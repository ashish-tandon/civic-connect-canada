import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/router';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textLight};
  pointer-events: none;
`;

const ResultsContainer = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.large};
  max-height: 400px;
  overflow-y: auto;
  z-index: 100;
`;

const ResultItem = styled(motion.div)`
  padding: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ active, theme }) => 
    active ? `${theme.colors.primary}10` : 'transparent'};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}10`};
  }

  h4 {
    margin: 0 0 0.25rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 0.875rem;
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0;
    transition: all 0.2s ease;
  }

  &:hover svg {
    opacity: 1;
    transform: translateX(4px);
  }
`;

const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
`;

// Mock data - replace with actual search functionality
const mockResults = [
  {
    id: 'federal',
    title: 'Federal Government',
    description: 'Learn about Canada\'s federal government structure',
    link: '/learn/federal'
  },
  {
    id: 'provincial',
    title: 'Provincial Government',
    description: 'Understand how provincial governments work',
    link: '/learn/provincial'
  },
  {
    id: 'municipal',
    title: 'Municipal Government',
    description: 'Discover local government operations',
    link: '/learn/municipal'
  },
  {
    id: 'participation',
    title: 'How to Participate',
    description: 'Ways to engage in the democratic process',
    link: '/participate'
  }
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      // Replace with actual search logic
      const filtered = mockResults.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  const handleKeyDown = (e) => {
    if (!showResults) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        if (activeIndex >= 0 && results[activeIndex]) {
          router.push(results[activeIndex].link);
          setShowResults(false);
        }
        break;
      case 'Escape':
        setShowResults(false);
        break;
    }
  };

  const handleResultClick = (link) => {
    router.push(link);
    setShowResults(false);
    setQuery('');
  };

  return (
    <SearchContainer ref={searchRef}>
      <SearchIcon>
        <FaSearch />
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder="Search for topics, guides, and resources..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => query.length >= 2 && setShowResults(true)}
      />

      <AnimatePresence>
        {showResults && (
          <ResultsContainer
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {results.length > 0 ? (
              results.map((result, index) => (
                <ResultItem
                  key={result.id}
                  active={index === activeIndex}
                  onClick={() => handleResultClick(result.link)}
                >
                  <div>
                    <h4>{result.title}</h4>
                    <p>{result.description}</p>
                  </div>
                  <FaArrowRight />
                </ResultItem>
              ))
            ) : (
              <NoResults>No results found</NoResults>
            )}
          </ResultsContainer>
        )}
      </AnimatePresence>
    </SearchContainer>
  );
} 