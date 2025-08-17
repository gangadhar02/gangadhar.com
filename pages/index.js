import Head from 'next/head'
import { getPersonJsonLd } from '../lib/json-ld'
import IndexContent from './index-content'

export async function getStaticProps() {
  return {
    props: {
      title: 'Gangadhar S',
      description: 'Creative Strategist | Performance Marketing | Gen AI. Passionate about leveraging design, digital marketing, creative strategy, and data analytics to drive impact for organisations.',
      image: '/static/images/avatar.jpg',
    },
  }
}

export default function Index(props) {
  const { title, description, image } = props

  return (
    <>
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
      <IndexContent title={title} description={description} />
    </>
  )
}