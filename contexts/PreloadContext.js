import React, { createContext, useContext, useState, useEffect } from 'react'
import { useHasMounted, useSafeBrowserAPI } from '../components/ClientOnly'

const PreloadContext = createContext()

export const usePreload = () => {
  const context = useContext(PreloadContext)
  if (!context) {
    throw new Error('usePreload must be used within a PreloadProvider')
  }
  return context
}

export const PreloadProvider = ({ children }) => {
  const [shouldShowPreloader, setShouldShowPreloader] = useState(false)
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(true) // Default to true for SSR
  const mounted = useHasMounted()

  useEffect(() => {
    if (mounted) {
      try {
        const PRELOADER_SESSION_KEY = 'preloader-shown'
        const wasPreloaderShown = sessionStorage.getItem(PRELOADER_SESSION_KEY)
        const isPageRefresh = 
          performance.navigation?.type === 1 || 
          performance.getEntriesByType('navigation')[0]?.type === 'reload' ||
          document.referrer === window.location.href

        // Show preloader if:
        // 1. It hasn't been shown in this session, OR
        // 2. This is a page refresh
        const shouldShow = !wasPreloaderShown || isPageRefresh
        
        setShouldShowPreloader(shouldShow)
        
        // If we're not showing the preloader, mark it as complete immediately
        if (!shouldShow) {
          setIsPreloaderComplete(true)
        } else {
          setIsPreloaderComplete(false)
        }
      } catch (error) {
        console.warn('Preloader initialization failed:', error)
        setIsPreloaderComplete(true)
      }
    }
  }, [mounted])

  const markPreloaderShown = () => {
    // Mark preloader as shown in this session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('preloader-shown', 'true')
    }
    setIsPreloaderComplete(true)
  }

  const value = {
    shouldShowPreloader,
    isPreloaderComplete,
    markPreloaderShown,
    mounted,
  }

  return (
    <PreloadContext.Provider value={value}>
      {children}
    </PreloadContext.Provider>
  )
}