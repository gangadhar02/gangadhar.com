import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { ButtonPrimary } from '../components/ButtonPrimary'
import AudioIntro from '../components/AudioIntro'
import Toast from '../components/Toast'
import Toolbox from '../components/Toolbox'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import copyBioIcon from '../public/static/icons/copy-bio.json'
import downloadIcon from '../public/static/icons/download.json'
import { cn } from '../lib/utils'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export async function getStaticProps() {
  const meta = {
    title: 'About // Gangadhar S',
    description:
      "Hello! I'm Gangadhar, a Creative Strategist and Performance Marketer based in Bengaluru. I help scale businesses by producing high performance creatives and leveraging design, digital marketing, creative strategy, and data analytics to drive impact for organisations. My journey began in 2019 with a deep interest in technology and marketing, running campaigns across industries like film, automotive, and politics. Currently, I work at DemandLane, focusing on creative strategy for marketing initiatives that feel native to platforms like TikTok, Reels, and Shorts.",
    tagline: 'Creative. Strategic. Impactful.',
    image: '/static/images/avatar.jpg',
    primaryColor: 'pink',
    secondaryColor: 'purple',
  }

  return { props: meta }
}

function About(props) {
  const { title, description, image } = props
  const [toastTitle, setToastTitle] = React.useState('')
  const [toastDescription, setToastDescription] = React.useState('')
  const [showToast, setShowToast] = React.useState(false)
  const copyBioRef = React.useRef()
  const downloadRef = React.useRef()

  const renderIntro = () => {
    return (
      <Container>
        <Section>
          <Image
            alt="Gangadhar S"
            src="/static/images/avatar.jpg"
            width="336"
            height="336"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
            priority
          />
        </Section>
        <Section>
          <Paragraph
            css={{
              marginTop: '16px',
              '@bp2': { marginTop: '-6px' },
            }}
          >
            <strong>Hey, I'm Gangadhar S</strong>
            <AudioIntro />
            I'm a Creative Strategist and Performance Marketer based in Bengaluru, passionate about digital marketing, creative strategy, and data analytics.
          </Paragraph>
          
          <Paragraph>
            I love{' '}
            <strong>
              <a href="/contact" target="_blank">
                connecting
              </a>
            </strong>{' '}
            with fellow creatives and marketers. When I'm not working, you'll
            find me{' '}
            <strong>
              <a href="https://x.com/gangadhar__s" target="_blank">
                tweeting
              </a>
            </strong>
            , playing badminton, exploring new tools, and diving deep into 
            the latest marketing trends and technologies.
          </Paragraph>
          <Paragraph>
            Currently building{' '}
            <strong>high-performance ad creatives</strong>
            {' '}at DemandLane.
          </Paragraph>
        </Section>
      </Container>
    )
  }

  const renderBio = () => {
    const btnStyle = {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
    const iconStyle = { width: 24, height: 24, marginRight: 8 }

    return (
      <div>
        <p>
          This is my professional bio summarizing my strengths and fields of
          interests.
        </p>
        <blockquote>
          <p>{description}</p>
        </blockquote>
        <ButtonsContainer>
          <ButtonPrimary
            as="button"
            style={btnStyle}
            onClick={copyBio}
            onMouseEnter={() => copyBioRef.current?.play()}
            onMouseLeave={() => copyBioRef.current?.stop()}
          >
            <div className="dark:invert-0 invert">
              <Lottie
                lottieRef={copyBioRef}
                style={iconStyle}
                animationData={copyBioIcon}
                loop={false}
                autoplay={false}
              />
            </div>
            Copy Bio
          </ButtonPrimary>
          <span style={{ margin: '0 20px 0 10px' }}>•</span>
          <ButtonPrimary
            as="a"
            href="https://drive.google.com/file/d/1_l6dV5NvkmSNBJ8Bmk8CLrTOlRHstcUK/view"
            target="_blank"
            rel="noopener noreferrer"
            style={btnStyle}
            onMouseEnter={() => downloadRef.current?.play()}
            onMouseLeave={() => downloadRef.current?.stop()}
          >
            <div className="dark:invert-0 invert">
              <Lottie
                lottieRef={downloadRef}
                style={iconStyle}
                animationData={downloadIcon}
                loop={false}
                autoplay={false}
              />
            </div>
            Resume
          </ButtonPrimary>
        </ButtonsContainer>
      </div>
    )
  }

  const downloadResume = () => {
    setToastTitle('Redirecting...')
    setToastDescription('Let\'s connect and discuss opportunities!')
    setShowToast(true)
  }

  const copyBio = e => {
    e.preventDefault()
    navigator.clipboard.writeText(description)

    setToastTitle('Copied :D')
    setToastDescription('You can now paste it anywhere.')
    setShowToast(true)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://gangadhar.com/about" property="og:url" />
        <meta content={`https://gangadhar.com${image}`} property="og:image" />
      </Head>

      {renderIntro()}

      <h2>Bio</h2>
      {renderBio()}

      <Toast
        title={toastTitle}
        description={toastDescription}
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />

      <Toolbox />
    </>
  )
}

const Container = ({ className, ...props }) => (
  <div className={cn(
    "flex flex-col justify-between",
    "bp2:flex-row",
    className
  )} {...props} />
)

const Paragraph = ({ className, ...props }) => (
  <p className={cn(
    "bp2:my-[15px] bp2:mx-0",
    className
  )} {...props} />
)

const ButtonsContainer = ({ className, ...props }) => (
  <p className={cn(
    "flex items-center",
    className
  )} {...props} />
)

const Section = ({ className, ...props }) => (
  <div className={cn(
    "mt-0 w-auto",
    "bp2:w-[48%]",
    className
  )} {...props} />
)

About.Layout = Base

export default About
