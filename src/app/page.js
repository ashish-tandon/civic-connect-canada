'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLandmark, FaUniversity, FaCity } from 'react-icons/fa';
import { HiChevronRight } from 'react-icons/hi';
import {
  Page,
  Hero,
  HeroContent,
  Title,
  Subtitle,
  SearchContainer,
  CardGrid,
  Card
} from '../components/styles/Home.styles';

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
    <Page>
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
  );
} 