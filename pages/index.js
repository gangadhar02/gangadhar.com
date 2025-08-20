import Head from 'next/head'
import { getPersonJsonLd } from '../lib/json-ld'
import IndexContent from './index-content'
import { getAllPosts } from '../lib/blog'

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'description'])
  const latestPost = allPosts[0] || null

  return {
    props: {
      title: 'Gangadhar S',
      description: 'Creative Strategist | Performance Marketing | Gen AI. Passionate about leveraging design, digital marketing, creative strategy, and data analytics to drive impact for organisations.',
      image: '/static/images/avatar.jpg',
      latestPost,
    },
  }
}

export default function Index(props) {
  const { title, description, image, latestPost } = props

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content="https://bengaluruboy.in" property="og:url" />
        <meta content={`https://bengaluruboy.in${image}`} property="og:image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonJsonLd()),
          }}
          key="person-jsonld"
        />
      </Head>
      <IndexContent title={title} description={description} latestPost={latestPost} />
    </>
  )
}