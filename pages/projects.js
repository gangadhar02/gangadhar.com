import { AnimateSharedLayout, motion } from 'framer-motion'
import Head from 'next/head'
import React, { useState } from 'react'
import ProjectItem from '../components/projects/ProjectItem'
import ProjectModal from '../components/projects/ProjectModal'
import items from '../data/projects'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import { styled } from '../stitches.config'

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
  const [selectedProject, setSelectedProject] = useState(null)

  const renderFeatured = () => {
    const featured = ['Email Subject Line Checker', 'UTM Generator Pro']

    return items
      .map(item => {
        return item.projects.filter(project => featured.includes(project.title))
      })
      .filter(item => item.length > 0)
      .flat()
      .map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.08,
            duration: 0.5,
            type: 'spring',
            stiffness: 60,
          }}
        >
          <ProjectItem 
            project={project} 
            onClick={() => setSelectedProject(project)} 
          />
        </motion.div>
      ))
  }

  const renderAllProjects = () => {
    const allProjects = items.flatMap(item => item.projects)
    
    return allProjects.map((project, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.08,
          duration: 0.5,
          type: 'spring',
          stiffness: 60,
        }}
      >
        <ProjectItem 
          project={project} 
          onClick={() => setSelectedProject(project)} 
        />
      </motion.div>
    ))
  }

  const getTotalProjects = () => {
    let total = 0

    for (let i = 0; i < items.length; i++) {
      total = total + items[i].projects.length
    }

    return total
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
        <Grid>{renderFeatured()}</Grid>

        <h2>All Projects</h2>
        <Grid>
          {renderAllProjects()}
        </Grid>
      </AnimateSharedLayout>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px',
  padding: '40px 0',
})

Projects.Layout = Base

export default Projects
