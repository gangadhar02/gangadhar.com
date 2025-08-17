import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Preloader from '../components/Preloader'
import ComprehensiveHomepage from '../components/ComprehensiveHomepage'

export default function IndexContent({ title, description }) {
  const [shouldShowPreloader, setShouldShowPreloader] = useState(false)
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(true)
  
  useEffect(() => {
    // Handle preloader logic on client side only - show only once per session
    const wasShown = sessionStorage.getItem('preloader-shown')
    if (!wasShown) {
      setShouldShowPreloader(true)
      setIsPreloaderComplete(false)
    }
  }, [])

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloader-shown', 'true')
    setIsPreloaderComplete(true)
  }

  if (shouldShowPreloader && !isPreloaderComplete) {
    return <Preloader onComplete={handlePreloaderComplete} />
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen pt-20">
        <div className="flex-1">
          <ComprehensiveHomepage />
        </div>
        <Footer />
      </div>
    </>
  )
}