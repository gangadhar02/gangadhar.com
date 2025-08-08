import Head from 'next/head'
import React from 'react'
import { AnimateSharedLayout } from 'framer-motion'
import { ExpandableProjectCard } from '../components/projects/ExpandableProjectCard'
import items from '../data/projects'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'

export async function getStaticProps() {
  const meta = {
    title: 'Projects // Gangadhar Srinivas',
    tagline: 'AI-Powered Marketing Solutions.',
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

  const getFeaturedProjects = () => {
    const featured = ['Email Subject Line Checker', 'UTM Generator Pro']
    return items
      .map(item => item.projects.filter(project => featured.includes(project.title)))
      .filter(item => item.length > 0)
      .flat()
  }

  const getAllProjects = () => {
    return items.flatMap(item => item.projects)
  }

  const { title, image } = props
  const description = `I specialize in creating <strong>AI-powered marketing solutions</strong> using modern AI platforms. Here you can explore all <strong>${getTotalProjects()} marketing tools</strong> that demonstrate my expertise in leveraging AI for performance marketing and campaign optimization.`

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
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Featured Projects</h2>
        <ExpandableProjectCard projects={getFeaturedProjects()} />

        <h2>All Projects</h2>
        <ExpandableProjectCard projects={getAllProjects()} />
      </AnimateSharedLayout>
    </>
  )
}

Projects.Layout = Base

export default Projects
