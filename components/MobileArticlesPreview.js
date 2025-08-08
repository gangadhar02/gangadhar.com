import Link from 'next/link'
import { styled } from '../stitches.config'

export default function MobileArticlesPreview() {
  // Featured articles data - using the most recent/important ones
  const featuredArticles = [
    {
      title: "Made a Email Subject Line Checker",
      description: "Building an AI-powered tool to optimize email subject lines and improve open rates through data-driven insights.",
      date: "Nov 15, 2024",
      slug: "email-subject-line-checker-experiment"
    },
    {
      title: "UTM Generator with Claude",
      description: "How I built a comprehensive UTM parameter generator using Claude AI to streamline marketing campaign tracking.",
      date: "Nov 10, 2024",
      slug: "utm-generator-with-claude"
    }
  ]

  return (
    <PreviewSection>
      <SectionTitle>Recent Articles</SectionTitle>
      <ArticlesGrid>
        {featuredArticles.map((article, index) => (
          <Link href={`/articles/${article.slug}`} key={index} passHref>
            <ArticleCard>
              <ArticleContent>
                <ArticleTitle>{article.title}</ArticleTitle>
                <ArticleDescription>{article.description}</ArticleDescription>
                <ArticleDate>{article.date}</ArticleDate>
              </ArticleContent>
              <ArticleIcon className="ri-arrow-right-line" />
            </ArticleCard>
          </Link>
        ))}
      </ArticlesGrid>
      <Link href="/articles" passHref>
        <ViewAllButton>View All Articles</ViewAllButton>
      </Link>
    </PreviewSection>
  )
}

const PreviewSection = styled('div', {
  display: 'none',
  '@bp3': {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '3rem',
    width: '100%',
  },
})

const SectionTitle = styled('h3', {
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '$primary',
  margin: '0 0 16px 0',
  textAlign: 'left',
})

const ArticlesGrid = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
})

const ArticleCard = styled('a', {
  background: '$background',
  border: '1px solid $secondary',
  borderRadius: '12px',
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderColor: '$primary',
  },
})

const ArticleContent = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const ArticleTitle = styled('h4', {
  fontSize: '1rem',
  fontWeight: '600',
  color: '$primary',
  margin: 0,
  lineHeight: 1.3,
})

const ArticleDescription = styled('p', {
  fontSize: '0.8rem',
  color: '$secondary',
  margin: '4px 0',
  lineHeight: 1.4,
  display: '-webkit-box',
  '-webkit-line-clamp': 2,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
})

const ArticleDate = styled('span', {
  fontSize: '0.75rem',
  color: '$secondary',
  fontWeight: '400',
  marginTop: '4px',
})

const ArticleIcon = styled('i', {
  fontSize: '20px',
  color: '$secondary',
  flexShrink: 0,
  transition: 'all 0.2s ease',
  '&:hover': {
    color: '$primary',
    transform: 'translateX(4px)',
  },
})

const ViewAllButton = styled('a', {
  background: '$hover',
  color: '$primary',
  border: '1px solid $secondary',
  borderRadius: '8px',
  padding: '12px 24px',
  textDecoration: 'none',
  fontWeight: '500',
  textAlign: 'center',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    background: '$primary',
    color: '$background',
    transform: 'translateY(-1px)',
  },
})