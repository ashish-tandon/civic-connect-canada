import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaSmile, FaMeh, FaFrown } from 'react-icons/fa';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  max-width: 600px;
  margin: 4rem auto;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const RatingButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.textLight};
  font-size: 2rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  min-height: 120px;
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Message = styled(motion.div)`
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  margin-top: 1rem;
  color: ${({ success, theme }) => 
    success ? theme.colors.success : theme.colors.error};
  background: ${({ success, theme }) => 
    success ? `${theme.colors.success}10` : `${theme.colors.error}10`};
`;

const ratings = [
  { icon: FaSmile, value: 'positive', label: 'Positive' },
  { icon: FaMeh, value: 'neutral', label: 'Neutral' },
  { icon: FaFrown, value: 'negative', label: 'Negative' }
];

export default function FeedbackForm() {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!rating) {
      setStatus('error');
      setMessage('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      setStatus('error');
      setMessage('Please provide feedback');
      return;
    }

    setStatus('loading');

    try {
      // Here you would typically make an API call to your feedback endpoint
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      
      setStatus('success');
      setMessage('Thank you for your feedback! We appreciate your input.');
      setRating('');
      setComment('');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <Container>
      <Title>Share Your Feedback</Title>
      <Description>
        Help us improve CivicConnect Canada by sharing your thoughts and suggestions.
      </Description>

      <Form onSubmit={handleSubmit}>
        <RatingContainer>
          {ratings.map(({ icon: Icon, value, label }) => (
            <RatingButton
              key={value}
              type="button"
              active={rating === value}
              onClick={() => setRating(value)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon />
            </RatingButton>
          ))}
        </RatingContainer>

        <TextArea
          placeholder="Tell us what you think..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <Input
          type="email"
          placeholder="Your email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <SubmitButton
          type="submit"
          disabled={status === 'loading'}
          whileTap={{ scale: 0.95 }}
        >
          {status === 'loading' ? 'Sending...' : (
            <>
              Send Feedback <FaPaperPlane />
            </>
          )}
        </SubmitButton>
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