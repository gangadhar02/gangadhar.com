import { styled } from '../stitches.config'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PostMain, PostContent, PostContainer } from '../components/Post'
import { Wrapper } from '../components/Wrapper'

export default function Base({ children }) {
  const { title, tagline, primaryColor, secondaryColor } = children.props

  return (
    <Wrapper>
      <Navbar />
      <PostMain
        css={{
          '& ::selection': {
            background: `$${primaryColor}`,
            color: '#000',
            WebkitTextFillColor: '#000',
          },
        }}
      >
        <PostContent>
          <PostContainer>
            <GradientTitle
              css={{
                backgroundImage: `linear-gradient(
                135deg,
                $${primaryColor} 0%,
                $${secondaryColor} 100%
              );`,
              }}
            >
              {tagline ? tagline : title}
            </GradientTitle>
            {children}
          </PostContainer>
        </PostContent>
      </PostMain>
      <Footer />
    </Wrapper>
  )
}

const GradientTitle = styled('h1', {
  backgroundSize: '100%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  MozBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozTextFillColor: 'transparent',
  WebkitBoxDecorationBreak: 'clone',
  marginBottom: '40px',
  fontSize: '48px',
  fontWeight: '600',
  lineHeight: '1.2',
  '@bp3': {
    fontSize: '36px',
  },
  '@bp1': {
    fontSize: '32px',
  },
})
