import { AnimateSharedLayout, motion } from 'framer-motion'
import { useKBar } from 'kbar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { cn } from '../lib/utils'
import MobileHamburgerNav from './MobileHamburgerNav'

export default function Navbar() {
  const router = useRouter()
  const pages = [
    'About',
    'Articles', 
    'Projects',
    'Work',
    'Clicks',
    'Contact',
  ]
  const [hovered, setHovered] = useState('')
  const { query } = useKBar()

  return (
    <AnimateSharedLayout>
      <header className={cn(
        "flex items-center justify-between text-primary text-xs min-h-[59px] w-full",
        "absolute top-0 z-10 mt-[13px] bp2:mt-0",
        "px-3"
      )}>
        <Link href="/" passHref>
          <a className={cn(
            "appearance-none bg-transparent border-none rounded-lg text-primary cursor-pointer",
            "h-[34px] px-[10px] transition-colors duration-200 ease-in-out hover:bg-hover",
            "font-bold text-[32px] no-underline font-heading flex items-center"
          )}>
            G
          </a>
        </Link>

        <nav className={cn(
          "absolute left-1/2 transform -translate-x-1/2 hidden",
          "bp2:block",
          "bp3:overflow-x-scroll bp3:overflow-y-hidden"
        )}>
          <ul className={cn(
            "m-0 p-0 list-none inline-flex relative top-[5px]",
            "bp1:justify-around"
          )}>
            {pages.map(page => {
              const path = `/${page.toLowerCase()}`
              const isHovered = hovered === page
              const isActive = router.pathname === path
              
              return (
                <li key={page} className="relative">
                  <Link href={path} passHref>
                    <a className="border-0 relative block hover:opacity-100 focus:opacity-100">
                      {isHovered && (
                        <motion.span
                          className="absolute inset-0 bg-hover rounded-lg"
                          layoutId="nav"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                      <motion.span
                        className={cn(
                          "cursor-pointer inline-block text-xs font-medium tracking-[1.2px]",
                          "px-5 py-[10px] no-underline uppercase transition-colors duration-200 ease-in-out",
                          "relative z-10",
                          isActive ? "text-primary" : "text-secondary hover:text-primary",
                          "after:content-[''] after:absolute after:mx-auto after:bottom-[8px]",
                          "after:left-0 after:right-0 after:h-px after:w-5 after:bg-primary",
                          isActive ? "after:opacity-100" : "after:opacity-0 after:transition-opacity after:duration-200 after:ease-in-out"
                        )}
                        onHoverStart={() => setHovered(page)}
                        onHoverEnd={() => setHovered('')}
                      >
                        {page}
                      </motion.span>
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center">
          <MobileHamburgerNav />
          <button
            type="button"
            aria-label="Command"
            onClick={query.toggle}
            className={cn(
              "appearance-none bg-transparent border-none rounded-lg text-primary cursor-pointer",
              "h-[34px] px-2 transition-colors duration-200 ease-in-out hover:bg-hover",
              "bp3:hidden"
            )}
          >
            <i className="ri-command-line text-2xl leading-8" />
          </button>
        </div>
      </header>
    </AnimateSharedLayout>
  )
}