import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { styled } from '../stitches.config'

const navItems = [
  { path: '/about', label: 'About' },
  { path: '/articles', label: 'Articles' },
  { path: '/projects', label: 'Projects' },
  { path: '/work', label: 'Work' },
  { path: '/archive', label: 'Archive' },
  { path: '/contact', label: 'Contact' },
]

export default function MobileHamburgerNav() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <HamburgerButton onClick={toggleMenu} type="button" aria-label="Menu">
        <Icon className="ri-menu-line" />
      </HamburgerButton>

      <AnimatePresence>
        {isOpen && (
          <MenuOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          >
            <MenuContent
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <MenuHeader>
                <CloseButton onClick={closeMenu} type="button" aria-label="Close menu">
                  <Icon className="ri-close-line" />
                </CloseButton>
              </MenuHeader>

              <MenuList>
                {navItems.map((item) => (
                  <MenuItem key={item.path}>
                    <Link href={item.path} passHref>
                      <MenuLink
                        onClick={closeMenu}
                        css={router.pathname === item.path ? { color: '$primary' } : {}}
                      >
                        {item.label}
                      </MenuLink>
                    </Link>
                  </MenuItem>
                ))}
              </MenuList>
            </MenuContent>
          </MenuOverlay>
        )}
      </AnimatePresence>
    </>
  )
}

const HamburgerButton = styled('button', {
  appearance: 'none',
  background: 'transparent',
  border: 'none',
  borderRadius: '$borderRadius',
  color: '$primary',
  cursor: 'pointer',
  height: '34px',
  padding: '0 8px',
  transition: 'background $duration ease-in-out',
  display: 'block',
  '@bp2': { display: 'none' },
  '&:hover': { background: '$hover' },
})

const Icon = styled('i', {
  fontSize: '24px',
  lineHeight: '32px',
})

const MenuOverlay = styled(motion.div, {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  zIndex: 1000,
  backdropFilter: 'blur(10px)',
  '-webkit-backdrop-filter': 'blur(10px)',
})

const MenuContent = styled(motion.div, {
  position: 'relative',
  background: '$background',
  borderRadius: '0 0 16px 16px',
  width: '100%',
  padding: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
})

const MenuHeader = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '20px',
})

const CloseButton = styled('button', {
  appearance: 'none',
  background: 'transparent',
  border: 'none',
  borderRadius: '$borderRadius',
  color: '$secondary',
  cursor: 'pointer',
  height: '34px',
  padding: '0 8px',
  transition: 'background $duration ease-in-out, color $duration ease-in-out',
  '&:hover': { 
    background: '$hover',
    color: '$primary',
  },
})

const MenuList = styled('ul', {
  margin: '0',
  padding: '0',
  listStyle: 'none',
})

const MenuItem = styled('li', {
  margin: '0',
})

const MenuLink = styled('a', {
  display: 'block',
  color: '$secondary',
  textDecoration: 'none',
  fontSize: '18px',
  fontWeight: 500,
  letterSpacing: '1.2px',
  padding: '16px 0',
  textTransform: 'uppercase',
  transition: 'color $duration ease-in-out, background $duration ease-in-out',
  borderRadius: '$borderRadius',
  paddingLeft: '12px',
  paddingRight: '12px',
  '&:hover': {
    color: '$primary',
    background: '$hover',
  },
})