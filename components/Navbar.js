'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import React, { useState, useEffect } from 'react'
import { cn } from '../lib/utils'
import { IconCircleLetterGFilled } from '@tabler/icons-react'
import { useTheme } from '../contexts/ThemeContext'
import { useHasMounted } from '../components/ClientOnly'
import { FunnyGhost } from '@mynaui/icons-react'

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Writings', href: '/writings' },
  { name: 'Clicks', href: '/clicks' },
  { name: 'Resume', href: 'https://drive.google.com/file/d/1_l6dV5NvkmSNBJ8Bmk8CLrTOlRHstcUK/view', external: true },
]

export default function Navbar() {
  const [menuState, setMenuState] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const mounted = useHasMounted()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="fixed z-20 w-full px-2">
        <div
          className={cn(
            'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
            isScrolled &&
              'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
          )}>
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* Logo & Menu Toggle */}
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2">
                <IconCircleLetterGFilled className="h-8 w-8 text-foreground flex-shrink-0" />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                <Menu className={cn(
                  "m-auto size-6 duration-200 transition-all",
                  menuState ? "rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                )} />
                <X className={cn(
                  "absolute inset-0 m-auto size-6 duration-200 transition-all",
                  menuState ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-0 opacity-0"
                )} />
              </button>
            </div>

            {/* Desktop Nav */}
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="navbar-link block duration-150 cursor-pointer transition-colors"
                        style={{ cursor: 'pointer' }}>
                        <span className="text-muted-foreground hover:text-accent-foreground transition-colors duration-150 cursor-pointer" style={{ cursor: 'pointer' }}>{item.name}</span>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="navbar-link block duration-150 cursor-pointer transition-colors"
                        style={{ cursor: 'pointer' }}>
                        <span className="text-muted-foreground hover:text-accent-foreground transition-colors duration-150 cursor-pointer" style={{ cursor: 'pointer' }}>{item.name}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile + Buttons */}
            <div className={cn(
              "bg-background mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent lg:overflow-visible",
              menuState ? "block lg:flex" : "hidden lg:flex"
            )}>
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="navbar-link block duration-150 cursor-pointer transition-colors"
                          style={{ cursor: 'pointer' }}>
                          <span className="text-muted-foreground hover:text-accent-foreground transition-colors duration-150 cursor-pointer" style={{ cursor: 'pointer' }}>{item.name}</span>
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="navbar-link block duration-150 cursor-pointer transition-colors"
                          style={{ cursor: 'pointer' }}>
                          <span className="text-muted-foreground hover:text-accent-foreground transition-colors duration-150 cursor-pointer" style={{ cursor: 'pointer' }}>{item.name}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit items-center">
                <div className="relative group">
                  <button
                    onClick={toggleTheme}
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    aria-label={mounted ? (theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode') : 'Toggle Theme'}
                  >
                    <i 
                      suppressHydrationWarning
                      className={cn(
                        "w-4 h-4 flex-shrink-0",
                        mounted ? (theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line') : 'ri-contrast-2-line'
                      )} 
                      style={{ fontSize: '16px', lineHeight: '1' }}
                    />
                  </button>
                  
                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    <span suppressHydrationWarning>
                      {mounted ? (theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode') : 'Toggle Theme'}
                    </span>
                    {/* Tooltip arrow */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900 dark:border-b-gray-700"></div>
                  </div>
                </div>
                <div className="relative group">
                  <Link href="/contact">
                    <button className="navbar-button inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 h-9 rounded-md px-3 cursor-pointer">
                      Contact
                    </button>
                  </Link>
                  
                  {/* Contact Tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    <div className="flex items-center gap-1.5">
                      <FunnyGhost className="w-3 h-3 [&>path]:fill-none [&>path]:stroke-current" />
                      <span>Say Hello</span>
                    </div>
                    {/* Tooltip arrow */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900 dark:border-b-gray-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}