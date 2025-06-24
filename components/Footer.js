import Link from 'next/link'
import { styled } from '../stitches.config'
import { useTheme } from '../contexts/ThemeContext'

export default function Footer() {
  const { theme, toggleTheme } = useTheme()
  const links = [
    {
      title: 'Email',
      url: '/contact',
      icon: 'ri-mail-line',
    },
    {
      title: 'Twitter',
      url: 'https://x.com/_ParthDesai_',
      icon: 'ri-twitter-line',
    },
    {
      title: 'GitHub',
      url: 'https://github.com/pycoder2000',
      icon: 'ri-github-line',
    },
    {
      title: 'linkedin',
      url: 'https://www.linkedin.com/in/desaiparth2000',
      icon: 'ri-linkedin-line',
    },
    {
      title: 'Medium',
      url: 'https://medium.com/@desaiparth2000',
      icon: 'ri-medium-line',
    },
    {
      title: 'Credits',
      url: '/credits',
      icon: 'ri-award-line',
    },
  ]

  const renderAnchor = (link, index) => {
    if (link.url.startsWith('http')) {
      return (
        <Anchor key={index} href={link.url} target="_blank">
          <Title>{link.title}</Title>
          <Icon className={link.icon} />
        </Anchor>
      )
    }

    return (
      <Link key={index} href={link.url} passHref>
        <Anchor>
          <Title>{link.title}</Title>
          <Icon className={link.icon} />
        </Anchor>
      </Link>
    )
  }

  return (
    <Container>
      <ThemeToggle onClick={toggleTheme}>
        <Title>{theme === 'dark' ? 'Light' : 'Dark'}</Title>
        <Icon className={theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'} />
      </ThemeToggle>
      {links.map(renderAnchor)}
    </Container>
  )
}

const Container = styled('footer', {
  background: '$background',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px 0',
})

const Icon = styled('i', {
  color: '$primary',
  opacity: 1,
  marginLeft: '5px',
  marginTop: '1px',
  fontSize: '24px',
  '@bp2': { opacity: 0, fontSize: '16px' },
})

const Anchor = styled('a', {
  color: '$secondary',
  display: 'flex',
  fontSize: '15px',
  border: 0,
  marginLeft: '20px',
  textDecoration: 'none',
  textTransform: 'lowercase',
  transition: 'color $duration ease-in-out',
  '&:hover, &:focus': {
    color: '$primary',
    opacity: 1,
  },
  [`&:hover ${Icon}`]: {
    transition: 'opacity $duration ease-in-out',
    opacity: 1,
  },
  '&:first-child': { margin: '0' },
})

const Title = styled('span', {
  display: 'none',
  '@bp2': { display: 'block' },
})

const ThemeToggle = styled('button', {
  color: '$secondary',
  display: 'flex',
  alignItems: 'center',
  fontSize: '15px',
  border: 0,
  background: 'none',
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '$borderRadius',
  textDecoration: 'none',
  textTransform: 'lowercase',
  transition: 'all $duration ease-in-out',
  '&:hover, &:focus': {
    color: '$primary',
    background: '$hover',
    opacity: 1,
  },
  [`&:hover ${Icon}`]: {
    transition: 'opacity $duration ease-in-out',
    opacity: 1,
  },
})
