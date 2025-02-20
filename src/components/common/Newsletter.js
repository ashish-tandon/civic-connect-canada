import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: 1rem;
  padding: 2.5rem;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  margin: 4rem auto;
  max-width: 600px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid ${({ theme, error }) => error ? theme.colors.error : theme.colors.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    font-size: 0.9em;
  }
`;

const Message = styled(motion.div)`
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: ${({ success, theme }) => 
    success ? theme.colors.success : theme.colors.error};
  background: ${({ success, theme }) => 
    success ? `${theme.colors.success}10` : `${theme.colors.error}10`};
`;

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      // Here you would typically make an API call to your newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      
      setStatus('success');
      setMessage('Thank you for subscribing! Please check your email to confirm your subscription.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <Container>
      <Title>Stay Updated</Title>
      <Description>
        Get the latest updates about Canadian democracy and civic engagement
        delivered straight to your inbox.
      </Description>

      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={status === 'error'}
          disabled={status === 'loading'}
        />
        <Button
          type="submit"
          disabled={status === 'loading'}
          whileTap={{ scale: 0.95 }}
        >
          {status === 'loading' ? 'Subscribing...' : (
            <>
              Subscribe <FaPaperPlane />
            </>
          )}
        </Button>
      </Form>

      <AnimatePresence>
        {message && (
          <Message
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            success={status === 'success'}
          >
            {message}
          </Message>
        )}
      </AnimatePresence>
    </Container>
  );
} 