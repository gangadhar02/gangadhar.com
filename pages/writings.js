import { AnimateSharedLayout, motion } from 'framer-motion'
import Head from 'next/head'
import FeaturedArticle from '../components/FeaturedArticle'
import { ListGroup } from '../components/ListGroup'
import ListItem from '../components/ListItem'
import Base from '../layouts/Base'
import { getAllPosts, getPostBySlug } from '../lib/blog'
import stripHtml from '../lib/strip-html'
import { cn } from '../lib/utils'

export async function getStaticProps() {
  const allPosts = getAllPosts(['date', 'skip', 'slug', 'title'])

  const featuredParams = [
    'date',
    'slug',
    'title',
    'image',
    'content',
    'description',
  ]

  const featuredPosts = [
    getPostBySlug('gpt-to-ads-generative-ai-marketing.md', featuredParams),
    getPostBySlug('mastering-performance-marketing-analytics.md', featuredParams),
  ]

  return {
    props: {
      title: 'Articles // Gangadhar S',
      tagline: 'Marketing. Strategy. AI.',
      image: '/static/images/articles-bw.jpg',
      primaryColor: 'purple',
      secondaryColor: 'orange',
      featuredPosts,
      allPosts,
    },
  }
}

function Articles(props) {
  const renderFeatured = () => {
    return props.featuredPosts.map((post, index) => (
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
        <FeaturedArticle
          index={index}
          href={`/${post.slug}/`}
          title={post.title}
          description={post.description}
          image={post.image}
          stats={post.stats}
          content={post.content}
        />
      </motion.div>
    ))
  }

  const renderAll = () => {
    return props.allPosts.map((post, index) => {
      if (!post.skip) {
        return (
          <ListItem
            index={index}
            href={`/${post.slug}/`}
            title={post.title}
            date={post.date}
            key={index}
            animationIndex={index}
          />
        )
      }
      return null
    })
  }

  const { title, image } = props
  const description = `Here you can find all <strong>${props.allPosts.length} articles</strong> that I've written. My writing primarily covers topics related to performance marketing, generative AI, creative strategy, and digital marketing insights.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://gangadhar.com/articles" property="og:url" />
        <meta content={`https://gangadhar.com${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Featured Articles</h2>
        <FeaturedArticles>{renderFeatured()}</FeaturedArticles>

        <h2>All Articles</h2>
        <ListGroup>{renderAll()}</ListGroup>
      </AnimateSharedLayout>
    </>
  )
}

const FeaturedArticles = ({ className, ...props }) => (
  <div className={cn(
    "m-[10px_0_0_-20px]",
    "bp2:flex bp2:justify-between",
    className
  )} {...props} />
)

Articles.Layout = Base

export default Articles
