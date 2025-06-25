import React, { createContext, useContext, useState, useEffect } from 'react'

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
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return

    const PRELOADER_SESSION_KEY = 'preloader-shown'
    
    // Check if preloader was already shown in this session
    const wasPreloaderShown = sessionStorage.getItem(PRELOADER_SESSION_KEY)
    
    // Detect if this is a page refresh
    const isPageRefresh = 
      performance.navigation?.type === 1 || // Navigation type 1 is reload
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
    }
  }, [])

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
  }

  return (
    <PreloadContext.Provider value={value}>
      {children}
    </PreloadContext.Provider>
  )
}