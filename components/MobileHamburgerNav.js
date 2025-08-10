import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { cn } from '../lib/utils'

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
      <button 
        onClick={toggleMenu} 
        type="button" 
        aria-label="Menu"
        className={cn(
          "appearance-none bg-transparent border-none rounded-lg text-primary cursor-pointer",
          "h-[34px] px-2 transition-colors duration-200 ease-in-out",
          "block bp2:hidden hover:bg-hover"
        )}
      >
        <i className="ri-menu-line text-2xl leading-8" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "fixed inset-0 bg-black/80 z-[1000]",
              "backdrop-blur-[10px]"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          >
            <motion.div
              className={cn(
                "relative bg-background rounded-b-2xl w-full p-5",
                "shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              )}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-5">
                <button 
                  onClick={closeMenu} 
                  type="button" 
                  aria-label="Close menu"
                  className={cn(
                    "appearance-none bg-transparent border-none rounded-lg text-secondary cursor-pointer",
                    "h-[34px] px-2 transition-all duration-200 ease-in-out",
                    "hover:bg-hover hover:text-primary"
                  )}
                >
                  <i className="ri-close-line text-2xl leading-8" />
                </button>
              </div>

              <ul className="m-0 p-0 list-none">
                {navItems.map((item) => {
                  const isActive = router.pathname === item.path
                  return (
                    <li key={item.path} className="m-0">
                      <Link href={item.path} passHref>
                        <a 
                          onClick={closeMenu}
                          className={cn(
                            "block no-underline text-lg font-medium tracking-[1.2px]",
                            "py-4 px-3 uppercase transition-all duration-200 ease-in-out",
                            "rounded-lg hover:bg-hover",
                            isActive ? "text-primary" : "text-secondary hover:text-primary"
                          )}
                        >
                          {item.label}
                        </a>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}