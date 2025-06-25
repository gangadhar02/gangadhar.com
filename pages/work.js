import { differenceInMonths, format, parseISO } from 'date-fns'
import { motion, AnimateSharedLayout } from 'framer-motion'
import Head from 'next/head'
import React, { useState } from 'react'
import WorkItem from '../components/work/WorkItem'
import WorkModal from '../components/work/WorkModal'
import awards from '../data/awards'
import items from '../data/work'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import { styled } from '../stitches.config'

export async function getStaticProps() {
  const meta = {
    title: 'Work // Gangadhar Srinivas',
    tagline: 'Create. Strategize. Convert.',
    image: '/static/images/work-bw.jpg',
    primaryColor: 'purple',
    secondaryColor: 'cyan',
  }

  return { props: meta }
}

function Work(props) {
  const renderAwards = () => {
    return awards.map((item, index) => {
      return (
        <div key={index}>
          <h3>{item.year}</h3>
          {item.award.map((award, tIndex) => {
            return <AwardItem key={tIndex} item={award} />
          })}
        </div>
      )
    })
  }

  const getDuration = (start, end) => {
    const startDate = parseISO(start)
    const endDate = end ? parseISO(end) : new Date()
    const months = differenceInMonths(endDate, startDate)
    const decimalYears = Math.ceil((months / 12) * 10) / 10

    if (decimalYears >= 1) {
      return `${decimalYears.toFixed(1)} yr${decimalYears !== 1 ? 's' : ''}`
    }
    return `${months + 1} mos`
  }

  const { title, image } = props
  const description = `My journey in marketing began with a passion for <strong>Creative Strategy</strong> and <strong>Performance Marketing</strong>. Since then, I've dedicated myself to building AI-powered marketing solutions and driving growth strategies, accumulating <strong>${items.length} roles</strong> of hands-on experience in creative strategy, campaign optimization, and revenue operations. Want to work together? <a href="https://gangadhar.com/contact" target="_blank">Let's connect!</a>`

  const [selectedWork, setSelectedWork] = useState(null)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://gangadhar.com/work" property="og:url" />
        <meta content={`https://gangadhar.com${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Work Experience</h2>
        <Grid>
          {items.map((work, index) => (
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
              <WorkItem work={work} onClick={() => setSelectedWork(work)} />
            </motion.div>
          ))}
        </Grid>

        <h2>Awards</h2>
        {renderAwards()}
      </AnimateSharedLayout>

      <WorkModal
        work={selectedWork}
        isOpen={!!selectedWork}
        onClose={() => setSelectedWork(null)}
        getDuration={getDuration}
      />
    </>
  )
}

function AwardItem(props) {
  const { item } = props

  return (
    <div>
      <h3>
        <a href={item.url} target="_blank">
          {item.title}
        </a>
      </h3>
      <ul>
        <li>When: {format(parseISO(item.date), 'LLLL, d')}</li>
        <li>By: {item.by}</li>
        <li>Summary: {item.summary}</li>
      </ul>
    </div>
  )
}

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px',
  padding: '40px 0',
})

Work.Layout = Base

export default Work
