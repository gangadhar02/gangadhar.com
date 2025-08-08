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
            <GradientTitle>
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
  color: '$primary',
  textAlign: 'center',
  marginBottom: '40px',
  fontSize: '48px',
  fontWeight: '600',
  lineHeight: '1.2',
  fontFamily: '$heading',
  '@bp3': {
    fontSize: '36px',
  },
  '@bp1': {
    fontSize: '32px',
  },
})
