import { motion } from 'framer-motion';
import Head from 'next/head';
import Layout from '@/components/Layout';
import LearnLayout from '@/components/learn/LearnLayout';
import styled from 'styled-components';
import { FaCity, FaRecycle, FaRoad, FaTree, FaUserShield, FaHandshake } from 'react-icons/fa';

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
  { id: 'introduction', title: 'Introduction to Municipal Government' },
  { id: 'structure', title: 'Structure and Functions' },
  { id: 'services', title: 'Municipal Services' },
  { id: 'participation', title: 'Community Participation' },
  { id: 'resources', title: 'Additional Resources' }
];

export default function MunicipalGovernment() {
  return (
    <Layout>
      <Head>
        <title>Municipal Government - CivicConnect Canada</title>
        <meta name="description" content="Learn about municipal governments in Canada, their roles, services, and how they serve local communities." />
      </Head>

      <LearnLayout
        title="Municipal Government"
        description="Discover how municipal governments work in Canada, their responsibilities, and how they serve your local community."
        sections={sections}
      >
        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          id="introduction"
        >
          <h2>Introduction to Municipal Government</h2>
          <p>
            Municipal governments are the level of government closest to citizens, providing essential services and managing local affairs. They are created by provincial governments and derive their powers from provincial legislation.
          </p>
          <Process>
            <InfoBox
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4><FaCity /> Local Authority</h4>
              <p>Municipalities are responsible for local services, infrastructure, and community development within their boundaries.</p>
            </InfoBox>
            <InfoBox
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4><FaHandshake /> Community Focus</h4>
              <p>Municipal governments work directly with residents to address local needs and improve quality of life in the community.</p>
            </InfoBox>
          </Process>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          id="structure"
        >
          <h2>Structure and Functions</h2>
          <p>
            Municipal governments typically consist of an elected council and various departments that manage specific services and programs.
          </p>
          <Process>
            <InfoBox
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4><FaUserShield /> Municipal Council</h4>
              <ul>
                <li>Mayor or Reeve (Head of Council)</li>
                <li>Councillors (Ward or At-Large Representatives)</li>
                <li>Council Committees</li>
                <li>City Manager and Administration</li>
              </ul>
            </InfoBox>
            <InfoBox
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4>Key Functions</h4>
              <ul>
                <li>Policy-making and bylaws</li>
                <li>Budget approval and financial management</li>
                <li>Service delivery oversight</li>
                <li>Community planning and development</li>
                <li>Local emergency management</li>
              </ul>
            </InfoBox>
          </Process>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          id="services"
        >
          <h2>Municipal Services</h2>
          <p>
            Municipalities provide a wide range of services that residents rely on daily. These services are funded through property taxes, user fees, and transfers from other levels of government.
          </p>
          <Process>
            <InfoBox
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4><FaRoad /> Infrastructure</h4>
              <ul>
                <li>Roads and sidewalks</li>
                <li>Public transit</li>
                <li>Water and sewage</li>
                <li>Waste collection</li>
              </ul>
            </InfoBox>
            <InfoBox
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4><FaTree /> Community Services</h4>
              <ul>
                <li>Parks and recreation</li>
                <li>Libraries</li>
                <li>Fire protection</li>
                <li>Local police services</li>
              </ul>
            </InfoBox>
            <InfoBox
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4><FaRecycle /> Environmental Services</h4>
              <ul>
                <li>Recycling programs</li>
                <li>Environmental protection</li>
                <li>Urban forestry</li>
                <li>Climate action initiatives</li>
              </ul>
            </InfoBox>
          </Process>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          id="participation"
        >
          <h2>Community Participation</h2>
          <p>
            Municipal governments offer many opportunities for residents to get involved in local decision-making and community building.
          </p>
          <Process>
            <InfoBox
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4>Ways to Participate</h4>
              <ul>
                <li>Attend council meetings</li>
                <li>Join advisory committees</li>
                <li>Participate in public consultations</li>
                <li>Vote in municipal elections</li>
                <li>Volunteer in community programs</li>
              </ul>
            </InfoBox>
            <InfoBox
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h4>Community Engagement</h4>
              <p>
                Get involved in neighborhood associations, community events, and local improvement projects to help shape your community's future.
              </p>
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
            Learn more about your municipal government through these resources:
          </p>
          <ul>
            <li>Municipal website and social media channels</li>
            <li>Community newsletters and bulletins</li>
            <li>Local library resources</li>
            <li>Municipal associations and organizations</li>
            <li>Community engagement platforms</li>
          </ul>
        </Section>
      </LearnLayout>
    </Layout>
  );
} 