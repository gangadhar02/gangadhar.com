import Head from 'next/head'
import dynamic from 'next/dynamic'
import { getPersonJsonLd } from '../lib/json-ld'

// Load the entire page content with SSR disabled to avoid hydration errors
const IndexContent = dynamic(() => import('./index-content'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-primary">Loading...</div>
    </div>
  )
})

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