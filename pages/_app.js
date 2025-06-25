import Router from 'next/router'
import AnimatedCursor from 'react-animated-cursor'
import { isMobile } from 'react-device-detect'
import 'remixicon/fonts/remixicon.css'
import CommandBar from '../components/CommandBar'
import * as gtag from '../lib/gtag'
import '../public/static/css/prism.css'
import React, { useEffect } from 'react'
import { ThemeProvider, useTheme } from '../contexts/ThemeContext'
import { PreloadProvider } from '../contexts/PreloadContext'
import { lightTheme, styled } from '../stitches.config'
import { Particles } from '../components/Particles'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

const Noop = ({ children }) => children

const AppWrapper = styled('div', {
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
  background: 'transparent',
})

function AppContent({ Component, pageProps }) {
  const Layout = Component.Layout || Noop
  const { theme } = useTheme()

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.className = theme === 'light' ? lightTheme : ''
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
              innerSize={13}
              outerSize={25}
              color={theme === 'dark' ? "255, 255, 255" : "0, 0, 0"}
              outerAlpha={0.2}
              innerScale={1.2}
              outerScale={1.8}
              trailingSpeed={4}
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
