import Router from 'next/router'
import AnimatedCursor from 'react-animated-cursor'
import { isMobile } from 'react-device-detect'
import 'remixicon/fonts/remixicon.css'
import CommandBar from '../components/CommandBar'
import * as gtag from '../lib/gtag'
import '../public/static/css/prism.css'
import '../styles/globals.css'
import React, { useEffect } from 'react'
import { ThemeProvider, useTheme } from '../contexts/ThemeContext'
import { PreloadProvider } from '../contexts/PreloadContext'
import { cn } from '../lib/utils'
import { Particles } from '../components/Particles'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

const Noop = ({ children }) => children

const AppWrapper = ({ children, className, ...props }) => (
  <div className={cn("relative min-h-screen w-full bg-transparent", className)} {...props}>
    {children}
  </div>
)

function AppContent({ Component, pageProps }) {
  const Layout = Component.Layout || Noop
  const { theme } = useTheme()

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.className = theme === 'dark' ? 'dark' : ''
  }, [theme])

  return (
    <>
      {!isMobile && (
        <Particles 
          quantity={60}
          staticity={50}
          ease={50}
          size={0.4}
        />
      )}
      <AppWrapper>
        <CommandBar>
          {!isMobile && (
            <AnimatedCursor
              key={theme}
              innerSize={13}
              outerSize={25}
              color={theme === 'light' ? "0, 0, 0" : "255, 255, 255"}
              outerAlpha={0.2}
              innerScale={1.2}
              outerScale={1.8}
              trailingSpeed={4}
              outerStyle={{
                zIndex: 10000,
                mixBlendMode: theme === 'light' ? 'normal' : 'normal'
              }}
              innerStyle={{
                zIndex: 10001,
                backgroundColor: theme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)'
              }}
              clickables={[
                'a',
                'button',
                '.link',
                '.link-button',
                '.cursor-pointer',
                '.cursor-text',
                '[tabindex]',
              ]}
            />
          )}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CommandBar>
      </AppWrapper>
    </>
  )
}

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <PreloadProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </PreloadProvider>
    </ThemeProvider>
  )
}