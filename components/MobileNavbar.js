import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { styled } from '../stitches.config'

import aboutIcon from '../public/static/icons/about.json'
import articlesIcon from '../public/static/icons/articles.json'
import projectsIcon from '../public/static/icons/projects.json'
import workIcon from '../public/static/icons/work.json'
import reminderIcon from '../public/static/icons/reminder.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const navItems = [
  { path: '/about', icon: aboutIcon, label: 'About' },
  { path: '/articles', icon: articlesIcon, label: 'Articles' },
  { path: '/projects', icon: projectsIcon, label: 'Projects' },
  { path: '/work', icon: workIcon, label: 'Work' },
  { path: '/archive', icon: reminderIcon, label: 'Archive' },
]

export default function MobileNavbar() {
  const router = useRouter()

  return (
    <NavBarContainer>
      <NavBarInner>
        {navItems.map(item => (
          <Link href={item.path} passHref key={item.path}>
            <NavItem active={router.pathname === item.path}>
              <Lottie
                animationData={item.icon}
                style={{ width: 22, height: 22 }}
                loop={false}
                autoplay={router.pathname === item.path}
              />
            </NavItem>
          </Link>
        ))}
      </NavBarInner>
    </NavBarContainer>
  )
}

const NavBarContainer = styled('nav', {
  position: 'fixed',
  bottom: '20px',
  left: 0,
  right: 0,
  margin: '0 auto',
  width: '92%',
  maxWidth: '500px',
  background: '#101111',
  borderRadius: '16px',
  zIndex: 999,
  padding: '8px 8px',
  '@bp2': { display: 'none' },
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  '-webkit-backdrop-filter': 'blur(10px)',
})

const NavBarInner = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '2px',
})

const NavItem = styled('a', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '6px',
  borderRadius: '10px',
  border: 'none',
  textDecoration: 'none',
  transition: 'background 0.2s ease-in-out',
  variants: {
    active: {
      true: { backgroundColor: '#2a2b2d' },
      false: { backgroundColor: 'transparent' },
    },
  },
})
