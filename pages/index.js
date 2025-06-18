import { motion } from 'framer-motion'
import Head from 'next/head'
import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { PostContainer, PostContent, PostMain } from '../components/Post'
import ShortcutHome from '../components/ShortcutHome'
import { Wrapper } from '../components/Wrapper'
import { getPersonJsonLd } from '../lib/json-ld'
import { styled } from '../stitches.config'
import { Modal } from '../components/modal/Modal'

export async function getStaticProps() {
  return {
    props: {
      title: 'Gangadhar S',
      description: 'Creative Strategist | Performance Marketing | Gen AI. Passionate about leveraging design, digital marketing, creative strategy, and data analytics to drive impact for organisations.',
      image: '/static/images/avatar.jpg',
    },
  }
}

const Description = styled('h2', {
  fontSize: '1.5rem',
  fontWeight: 'normal',
  margin: '1.5rem 0',
  color: '#888',
  lineHeight: 1.4,
})

const LocationContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  color: '#666',
  fontSize: '0.9rem',
  marginTop: '1rem',
})

const LocationIcon = styled('i', {
  fontSize: '16px',
  color: '#666',
})

const ThreeColumnSection = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '16px',
  marginTop: '2rem',
  marginBottom: '2rem',
  '@bp2': {
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '24px',
  },
})

const Column = styled('button', {
  background: 'none',
  border: '1px solid #333',
  borderRadius: '8px',
  padding: '24px',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
})

const ColumnTitle = styled('h3', {
  margin: '0 0 4px 0',
  fontSize: '1.25rem',
  fontWeight: 500,
  color: '#fff',
  '@bp2': {
    fontSize: '1.5rem',
    marginBottom: '8px',
  },
})

const ColumnSubtitle = styled('p', {
  margin: 0,
  fontSize: '0.875rem',
  color: '#666',
  '@bp2': {
    fontSize: '0.9rem',
    color: '#888',
  },
})

const MainTitle = styled(motion.h1, {
  fontSize: '2.5rem',
  fontWeight: 500,
  marginBottom: '0',
  color: '#fff',
})

const MainContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflow: 'hidden',
})

const CenteredContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  width: '100%',
  padding: '0 20px',
  boxSizing: 'border-box',
  // Account for navbar height
  paddingTop: '$navHeightMobile',
  '@bp2': {
    paddingTop: '$navHeightDesktop',
  },
})

const ContentWrapper = styled('div', {
  maxWidth: '760px',
  width: '100%',
  textAlign: 'center',
})

const ContentBlock = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
})

// Modal content styles
const ModalTitle = styled('h1', {
  fontSize: '28px',
  fontWeight: '600',
  color: '$primary',
  margin: '0 0 8px 0',
  lineHeight: 1.3,
})

const ModalSubtitle = styled('h2', {
  fontSize: '18px',
  fontWeight: '400',
  color: '$secondary',
  margin: '0 0 30px 0',
  lineHeight: 1.4,
})

const Section = styled('div', {
  marginBottom: '30px',
})

const SectionTitle = styled('h3', {
  fontSize: '20px',
  fontWeight: '600',
  color: '$primary',
  margin: '0 0 15px 0',
  lineHeight: 1.4,
})

const SectionContent = styled('div', {
  color: '$secondary',
  fontSize: '16px',
  lineHeight: 1.7,
  '& p': {
    margin: '0 0 15px 0',
  },
  '& p:last-child': {
    marginBottom: '0',
  },
})

const Highlight = styled('span', {
  color: '$primary',
  fontWeight: '500',
})

export default function Index(props) {
  const { title, description, image } = props
  const [modalContent, setModalContent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (content) => {
    setModalContent(content)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalContent(null)
  }

  const aboutContent = (
    <>
      <ModalTitle>About</ModalTitle>
      <ModalSubtitle>Who, What, Why</ModalSubtitle>
      
      <Section>
        <SectionTitle>Who</SectionTitle>
        <SectionContent>
          <p>
            I'm Gangadhar, a Creative Strategist from Bangalore. Growing up, I had unusually early access to gadgets, thanks to my dad, who had a bit of an addiction to trying out new smartphones. That curiosity stuck. I think it's what shaped how I see the world today: always exploring, always tweaking. (I might even have a tiny bit of OCD in a good way.)
          </p>
          <p>
            My dad's curiosity rubbed off on me early, and over time, the people around me — offline and online — became my biggest sources of inspiration. I wrote my first blog in 8th grade, recorded YouTube videos using a homemade tripod, and fell down a lifelong rabbit hole of learning, testing, and making.
          </p>
          <p>
            Outside of work, I've been into <Highlight>Cricket and Volleyball</Highlight>. Cricket was everything growing up and still influences me — and lately, I've discovered that badminton is the perfect stressbuster.
          </p>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>What</SectionTitle>
        <SectionContent>
          <p>
            Right now, I work as a <Highlight>Creative Strategist at DemandLane</Highlight>, where I build performance-driven ad creatives that feel native to platforms like TikTok, Reels, and Shorts. I spend most of my time researching human behavior and figuring out what makes people click, literally.
          </p>
          <p>
            On the side, I freelance as a marketer. I've helped brands with performance marketing, built out AI-driven automations, and acted as a sort of Swiss Army knife for growth. No-code tools and AI have become my playground, and while I haven't shipped many personal projects yet, I'm constantly building, testing, and learning in the background.
          </p>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Why</SectionTitle>
        <SectionContent>
          <p>
            It probably started with LEGO, like a lot of people — but for me, it was smartphones, writing blogs, and making things in my small room. I've always liked making stuff, sharing stuff, and seeing what sticks. And over time, I realized that I don't need to know code to build cool things. I just need obsession.
          </p>
          <p>
            <Highlight>"Obsession beats talent"</Highlight> is a quote I live by. I've seen it play out in real life again and again. Given time, I know I can figure anything out — whether it's how to make a creative that sells or how to automate the un-automatable.
          </p>
          <p>
            I'm in this for the long run. And the more I learn about what makes people tick, the more I want to keep building things that make sense, feel good to use, and actually work.
          </p>
        </SectionContent>
      </Section>
    </>
  )

  const nowContent = (
    <>
      <ModalTitle>Now</ModalTitle>
      <ModalSubtitle>Short-term focus</ModalSubtitle>
      
      <Section>
        <SectionTitle>Current Work</SectionTitle>
        <SectionContent>
          <p>
            Working as a <Highlight>Creative Strategist at DemandLane</Highlight>, focusing on performance-driven ad creatives for TikTok, Reels, and Shorts. Researching human behavior to understand what drives engagement and conversions.
          </p>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Freelance Projects</SectionTitle>
        <SectionContent>
          <p>
            Helping brands with performance marketing, building AI-driven automations, and serving as a growth consultant. Exploring no-code tools and AI to create efficient marketing solutions.
          </p>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Learning & Development</SectionTitle>
        <SectionContent>
          <p>
            Constantly building, testing, and learning in the background. Exploring new marketing strategies, automation tools, and creative approaches to stay ahead of industry trends.
          </p>
        </SectionContent>
      </Section>
    </>
  )

  const somedayContent = (
    <>
      <ModalTitle>Someday</ModalTitle>
      <ModalSubtitle>Long-term focus</ModalSubtitle>
      
      <Section>
        <SectionTitle>Personal Projects</SectionTitle>
        <SectionContent>
          <p>
            Planning to ship more personal projects that combine my interests in marketing, automation, and creative strategy. Building tools and solutions that can help other marketers and creators.
          </p>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Community Building</SectionTitle>
        <SectionContent>
          <p>
            Creating a community around performance marketing and creative strategy. Sharing knowledge, building networks, and helping others grow in their marketing careers.
          </p>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Innovation</SectionTitle>
        <SectionContent>
          <p>
            Exploring the intersection of AI, automation, and creative marketing. Building solutions that make marketing more efficient, effective, and human-centered.
          </p>
        </SectionContent>
      </Section>
    </>
  )

  return (
    <MainContainer>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content="https://gangadhar.com" property="og:url" />
        <meta content={`https://gangadhar.com${image}`} property="og:image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonJsonLd()),
          }}
          key="person-jsonld"
        />
      </Head>
      <Navbar />
      <CenteredContent>
        <ContentWrapper>
          <ContentBlock
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <MainTitle>
              {title}
            </MainTitle>
            <Description>Curious, Tinkerer, Nerd and a Marketer</Description>
            <LocationContainer>
              <LocationIcon className="ri-map-pin-fill" />
              <span>Bangalore, India</span>
            </LocationContainer>
          </ContentBlock>

          <ThreeColumnSection>
            <Column onClick={() => openModal(aboutContent)}>
              <ColumnTitle>About</ColumnTitle>
              <ColumnSubtitle>Who, What, Why</ColumnSubtitle>
            </Column>

            <Column onClick={() => openModal(nowContent)}>
              <ColumnTitle>Now</ColumnTitle>
              <ColumnSubtitle>Short-term focus</ColumnSubtitle>
            </Column>

            <Column onClick={() => openModal(somedayContent)}>
              <ColumnTitle>Someday</ColumnTitle>
              <ColumnSubtitle>Long-term focus</ColumnSubtitle>
            </Column>
          </ThreeColumnSection>

          <ShortcutHome />
        </ContentWrapper>
      </CenteredContent>
      <Footer />
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </MainContainer>
  )
}
