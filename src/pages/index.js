import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Head from 'next/head';
import { useInView } from 'react-intersection-observer';
import { FaLandmark, FaUniversity, FaCity } from 'react-icons/fa';
import { HiChevronRight } from 'react-icons/hi';
import Layout from '../components/layout/Layout';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Page = styled.div`
  min-height: 100vh;
  background: #fafafa;
`;

const Hero = styled.section`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f6f8fa 0%, #ffffff 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/pattern.svg') repeat;
    opacity: 0.05;
    z-index: 0;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 1200px;
  text-align: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  background: linear-gradient(135deg, #2d3748 0%, #1a365d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #4a5568;
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;

const SearchContainer = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 0 auto;
  transform-origin: top;
`;

const CardGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
`;

const Card = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  }

  .icon-container {
    width: 60px;
    height: 60px;
    background: ${props => props.iconBg || '#ebf8ff'};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    transition: transform 0.3s ease;

    svg {
      width: 30px;
      height: 30px;
      color: ${props => props.iconColor || '#4299e1'};
    }
  }

  &:hover .icon-container {
    transform: scale(1.1);
  }

  h3 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 1rem;
  }

  p {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }

  a {
    display: inline-flex;
    align-items: center;
    color: #4299e1;
    font-weight: 500;
    text-decoration: none;
    gap: 0.5rem;
    
    &:hover {
      color: #2b6cb0;
      
      svg {
        transform: translateX(4px);
      }
    }

    svg {
      transition: transform 0.2s ease;
    }
  }
`;

const cardData = [
  {
    title: "Federal Parliament",
    description: "Understand how laws are created and passed in the Canadian Parliament, and how you can participate in the federal legislative process.",
    icon: FaLandmark,
    link: "/learn/federal",
    iconBg: "#ebf8ff",
    iconColor: "#4299e1"
  },
  {
    title: "Provincial Legislature",
    description: "Discover how your province or territory creates and implements laws that affect your daily life and local communities.",
    icon: FaUniversity,
    link: "/learn/provincial",
    iconBg: "#faf5ff",
    iconColor: "#805ad5"
  },
  {
    title: "Municipal Council",
    description: "Learn about city councils, local bylaws, and how decisions that directly impact your neighborhood are made.",
    icon: FaCity,
    link: "/learn/municipal",
    iconBg: "#f0fff4",
    iconColor: "#48bb78"
  }
];

export default function Home() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <Layout>
      <Page>
        <Head>
          <title>CivicConnect Canada - Democratic Engagement Platform</title>
          <meta name="description" content="Connect with your elected representatives and understand the Canadian democratic process" />
        </Head>

        <Hero>
          <HeroContent
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <Title variants={fadeIn}>
              Your Voice in Canadian Democracy
            </Title>
            <Subtitle variants={fadeIn}>
              Connect with your representatives, understand the democratic process, and make your voice heard at every level of government.
            </Subtitle>
            
            <SearchContainer variants={fadeIn}>
              {/* Search component will go here */}
            </SearchContainer>
          </HeroContent>
        </Hero>

        <CardGrid
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <AnimatePresence>
            {cardData.map((card, index) => (
              <Card
                key={card.title}
                variants={fadeIn}
                iconBg={card.iconBg}
                iconColor={card.iconColor}
              >
                <div className="icon-container">
                  <card.icon />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <a href={card.link}>
                  Learn more <HiChevronRight />
                </a>
              </Card>
            ))}
          </AnimatePresence>
        </CardGrid>
      </Page>
    </Layout>
  );
} 