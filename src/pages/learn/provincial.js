import { motion } from 'framer-motion';
import Head from 'next/head';
import Layout from '@/components/Layout';
import LearnLayout from '@/components/learn/LearnLayout';
import styled from 'styled-components';
import { FaLandmark, FaBalanceScale, FaVoteYea, FaUsers, FaBook } from 'react-icons/fa';

const Section = styled(motion.section)`
  margin-bottom: 3rem;
`;

const Process = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const InfoBox = styled(motion.div)`
  background: ${({ theme }) => theme.colors.cardBg};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  
  h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textLight};
    line-height: 1.6;
  }
`;

const sections = [
  { id: 'introduction', title: 'Introduction to Provincial Government' },
  { id: 'structure', title: 'Structure and Powers' },
  { id: 'legislative', title: 'Legislative Process' },
  { id: 'participation', title: 'Public Participation' },
  { id: 'resources', title: 'Additional Resources' }
];

export default function ProvincialGovernment() {
  return (
    <Layout>
      <Head>
        <title>Provincial Government - CivicConnect Canada</title>
        <meta name="description" content="Learn about Canada's provincial governments, their structure, powers, and how they work." />
      </Head>

      <LearnLayout
        title="Provincial Government"
        description="Discover how provincial governments operate in Canada, their responsibilities, and how they serve their residents."
        sections={sections}
      >
        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          id="introduction"
        >
          <h2>Introduction to Provincial Government</h2>
          <p>
            Provincial governments play a crucial role in Canada's federal system, managing key areas of jurisdiction that directly affect citizens' daily lives. Each province has its own unique government structure while following similar democratic principles.
          </p>
          <Process>
            <InfoBox
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4><FaLandmark /> Provincial Authority</h4>
              <p>Provinces have exclusive jurisdiction over areas such as education, healthcare, property rights, and natural resources within their boundaries.</p>
            </InfoBox>
            <InfoBox
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4><FaBalanceScale /> Constitutional Powers</h4>
              <p>The Constitution Act of 1867 defines provincial powers and responsibilities, ensuring a balance between federal and provincial authority.</p>
            </InfoBox>
          </Process>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          id="structure"
        >
          <h2>Structure and Powers</h2>
          <p>
            Provincial governments consist of three main branches: the Executive (Premier and Cabinet), the Legislative Assembly, and the Courts. Each branch has specific roles and responsibilities in governing the province.
          </p>
          <ul>
            <li>Executive Branch: Led by the Premier and Cabinet ministers</li>
            <li>Legislative Assembly: Elected representatives who make laws</li>
            <li>Provincial Courts: Interpret and apply provincial laws</li>
          </ul>
          <Process>
            <InfoBox
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4>Key Responsibilities</h4>
              <ul>
                <li>Healthcare and hospitals</li>
                <li>Education (primary, secondary, post-secondary)</li>
                <li>Property and civil rights</li>
                <li>Natural resources and environment</li>
                <li>Highways and transportation</li>
                <li>Municipal institutions</li>
              </ul>
            </InfoBox>
          </Process>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          id="legislative"
        >
          <h2>Legislative Process</h2>
          <p>
            Provincial laws, called bills, must go through several stages before becoming law. The process ensures thorough debate and consideration of all perspectives.
          </p>
          <Process>
            <InfoBox
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4><FaBook /> Legislative Stages</h4>
              <ol>
                <li>First Reading: Introduction of the bill</li>
                <li>Second Reading: Debate on general principles</li>
                <li>Committee Stage: Detailed examination and amendments</li>
                <li>Third Reading: Final debate and vote</li>
                <li>Royal Assent: Lieutenant Governor's approval</li>
              </ol>
            </InfoBox>
          </Process>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          id="participation"
        >
          <h2>Public Participation</h2>
          <p>
            Citizens can engage with their provincial government in various ways to influence decision-making and policy development.
          </p>
          <Process>
            <InfoBox
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4><FaVoteYea /> Ways to Participate</h4>
              <ul>
                <li>Vote in provincial elections</li>
                <li>Contact your Member of Provincial Parliament (MPP)</li>
                <li>Participate in public consultations</li>
                <li>Join advisory committees</li>
                <li>Submit petitions</li>
              </ul>
            </InfoBox>
            <InfoBox
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4><FaUsers /> Community Engagement</h4>
              <p>Get involved in local community organizations, attend town halls, and participate in public forums to make your voice heard on provincial issues.</p>
            </InfoBox>
          </Process>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          id="resources"
        >
          <h2>Additional Resources</h2>
          <p>
            Explore these resources to learn more about your provincial government and how to get involved:
          </p>
          <ul>
            <li>Provincial Legislature website</li>
            <li>Electoral Commission website</li>
            <li>Provincial Ombudsman's office</li>
            <li>Legislative Assembly education resources</li>
            <li>Provincial ministry websites</li>
          </ul>
        </Section>
      </LearnLayout>
    </Layout>
  );
} 