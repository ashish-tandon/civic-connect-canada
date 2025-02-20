import { motion } from 'framer-motion';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import LearnLayout from '../../components/learn/LearnLayout';
import styled from 'styled-components';

const Section = styled(motion.section)`
  margin-bottom: 3rem;
`;

const Process = styled.div`
  position: relative;
  padding-left: 2rem;
  margin: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.3;
  }

  .step {
    position: relative;
    margin-bottom: 2rem;

    &::before {
      content: '';
      position: absolute;
      left: -2rem;
      top: 0.5rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const InfoBox = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};

  h4 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
  }
`;

const sections = [
  { id: 'introduction', title: 'Introduction to Federal Government' },
  { id: 'structure', title: 'Structure and Roles' },
  { id: 'legislative-process', title: 'Legislative Process' },
  { id: 'participation', title: 'How to Participate' },
  { id: 'resources', title: 'Additional Resources' }
];

export default function FederalGovernment() {
  return (
    <Layout>
      <Head>
        <title>Understanding Federal Government - CivicConnect Canada</title>
        <meta name="description" content="Learn about Canada's federal government, its structure, and how laws are made at the national level." />
      </Head>

      <LearnLayout
        title="Understanding Canada's Federal Government"
        description="Discover how Canada's federal government works, how laws are made, and how you can participate in the democratic process at the national level."
        sections={sections}
      >
        <Section id="introduction">
          <h2>Introduction to Federal Government</h2>
          <p>
            Canada's federal government is responsible for matters of national importance,
            including national defense, foreign policy, criminal law, and economic policy.
            Understanding how it works is crucial for effective civic participation.
          </p>
          
          <InfoBox>
            <h4>Key Facts</h4>
            <p>The federal government consists of three main branches: Executive (Prime Minister and Cabinet),
            Legislative (Parliament), and Judicial (Supreme Court and federal courts).</p>
          </InfoBox>
        </Section>

        <Section id="structure">
          <h2>Structure and Roles</h2>
          <h3>Parliament</h3>
          <p>
            Parliament consists of the Monarch (represented by the Governor General),
            the Senate, and the House of Commons. Each plays a crucial role in creating
            and passing legislation.
          </p>

          <h3>Executive Branch</h3>
          <p>
            Led by the Prime Minister and the Cabinet, the executive branch is responsible
            for implementing laws and managing federal programs and services.
          </p>

          <h3>Judicial Branch</h3>
          <p>
            The Supreme Court of Canada and federal courts interpret laws and ensure
            they comply with the Constitution.
          </p>
        </Section>

        <Section id="legislative-process">
          <h2>Legislative Process</h2>
          <Process>
            <div className="step">
              <h3>1. Bill Introduction</h3>
              <p>A bill is introduced in either the House of Commons or the Senate.</p>
            </div>
            
            <div className="step">
              <h3>2. First Reading</h3>
              <p>The bill is presented and printed for review by members.</p>
            </div>
            
            <div className="step">
              <h3>3. Second Reading</h3>
              <p>Members debate the general principles of the bill.</p>
            </div>
            
            <div className="step">
              <h3>4. Committee Stage</h3>
              <p>Detailed study and possible amendments by a parliamentary committee.</p>
            </div>
            
            <div className="step">
              <h3>5. Report Stage</h3>
              <p>The committee reports back to the House with any recommended changes.</p>
            </div>
            
            <div className="step">
              <h3>6. Third Reading</h3>
              <p>Final debate and vote on the bill.</p>
            </div>
            
            <div className="step">
              <h3>7. Royal Assent</h3>
              <p>The bill becomes law after receiving Royal Assent from the Governor General.</p>
            </div>
          </Process>
        </Section>

        <Section id="participation">
          <h2>How to Participate</h2>
          <p>
            There are many ways to participate in the federal legislative process:
          </p>
          <ul>
            <li>Contact your Member of Parliament</li>
            <li>Participate in committee consultations</li>
            <li>Submit petitions</li>
            <li>Join advocacy groups</li>
            <li>Vote in federal elections</li>
          </ul>

          <InfoBox>
            <h4>Get Involved</h4>
            <p>Visit the Parliament of Canada website to find current consultations
            and opportunities for public participation.</p>
          </InfoBox>
        </Section>

        <Section id="resources">
          <h2>Additional Resources</h2>
          <ul>
            <li><a href="https://www.parl.ca">Parliament of Canada Website</a></li>
            <li><a href="https://www.canada.ca">Government of Canada Portal</a></li>
            <li><a href="https://www.elections.ca">Elections Canada</a></li>
            <li><a href="https://www.ourcommons.ca">House of Commons</a></li>
            <li><a href="https://sencanada.ca">Senate of Canada</a></li>
          </ul>
        </Section>
      </LearnLayout>
    </Layout>
  );
} 