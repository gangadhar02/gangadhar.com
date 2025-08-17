import Head from 'next/head'
import React from 'react'
import { AnimateSharedLayout } from 'framer-motion'
import { ExpandableProjectCard } from '../components/projects/ExpandableProjectCard'
import items from '../data/projects'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import Reveal from '../components/motion/Reveal'
import TextReveal from '../components/motion/TextReveal'

export async function getStaticProps() {
  const meta = {
    title: 'Projects // Gangadhar S',
    tagline: 'From Idea to Internet: Side Projects',
    image: '/static/images/projects-bw.jpg',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  }

  return { props: meta }
}

function Projects(props) {
  const getTotalProjects = () => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total = total + items[i].projects.length
    }
    return total
  }

  const getAllProjects = () => {
    return items.flatMap(item => item.projects)
  }

  const { title, image } = props
  const description = `I'm obsessed with <strong>turning ideas into things people love</strong>. Here you can explore <strong>${getTotalProjects()} projects</strong> I've built using <strong>AI Assisted Coding [Vibe Coding]</strong>. Some genuinely useful, others are just fun experiments.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://gangadhar.com/projects" property="og:url" />
        <meta content={`https://gangadhar.com${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <Reveal delay={0.1} y={20} duration={1.2}>
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </Reveal>

        <TextReveal
          as="h2"
          text="All Projects"
          per="word"
          delay={0.3}
          speed={0.1}
          duration={1.0}
          className="mb-8"
        />
        <Reveal delay={0.5} y={24} duration={1.3}>
          <ExpandableProjectCard projects={getAllProjects()} />
        </Reveal>
      </AnimateSharedLayout>
    </>
  )
}

Projects.Layout = Base

export default Projects
