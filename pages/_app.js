import Router from 'next/router'
import AnimatedCursor from 'react-animated-cursor'
import 'remixicon/fonts/remixicon.css'
import CommandBar from '../components/CommandBar'
import * as gtag from '../lib/gtag'
import '../public/static/css/prism.css'
import '../styles/globals.css'
import React, { useEffect, useState } from 'react'
import { ThemeProvider, useTheme } from '../contexts/ThemeContext'
import { PreloadProvider } from '../contexts/PreloadContext'
import { cn } from '../lib/utils'
import { Particles } from '../components/Particles'
import ClientOnly from '../components/ClientOnly'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

const Noop = ({ children }) => children

const AppWrapper = ({ children, className, ...props }) => (
  <div className={cn("relative min-h-screen w-full bg-transparent", className)} {...props}>
    {children}
  </div>
)

function AppContent({ Component, pageProps }) {
  const Layout = Component.Layout || Noop

  return (
    <>
      <AppWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
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