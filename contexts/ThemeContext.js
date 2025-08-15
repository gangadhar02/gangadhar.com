import React, { createContext, useContext, useEffect, useState } from 'react'
import { useHasMounted, useSafeBrowserAPI } from '../components/ClientOnly'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark')
  const mounted = useHasMounted()

  useEffect(() => {
    if (mounted) {
      // Only access browser APIs after mounting
      try {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
          setTheme(savedTheme)
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          setTheme(prefersDark ? 'dark' : 'light')
        }
      } catch (error) {
        console.warn('Theme initialization failed:', error)
        setTheme('dark') // fallback
      }
    }
  }, [mounted])

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      // Apply theme to document
      document.documentElement.className = theme
      localStorage.setItem('theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}