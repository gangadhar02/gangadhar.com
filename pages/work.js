import { format, parseISO } from 'date-fns'
import { AnimateSharedLayout } from 'framer-motion'
import Head from 'next/head'
import React from 'react'
import { ExpandableWorkCard } from '../components/work/ExpandableWorkCard'
import awards from '../data/awards'
import items from '../data/work'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'

export async function getStaticProps() {
  const meta = {
    title: 'Work // Gangadhar S',
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

  const { title, image } = props
  const description = `My journey in marketing began with a passion for <strong>Creative Strategy</strong> and <strong>Performance Marketing</strong>. Since then, I've dedicated myself to building AI-powered marketing solutions and driving growth strategies, accumulating <strong>${items.length} roles</strong> of hands-on experience in creative strategy, campaign optimization, and revenue operations. Want to work together? <a href="https://gangadhar.com/contact" target="_blank">Let's connect!</a>`

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
        <ExpandableWorkCard workItems={items} />

        <h2>Awards</h2>
        {renderAwards()}
      </AnimateSharedLayout>
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


Work.Layout = Base

export default Work
