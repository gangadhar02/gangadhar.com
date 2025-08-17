import Head from 'next/head'
import React, { useEffect } from 'react'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import { cn } from '../lib/utils'
import { motion } from 'framer-motion'
import ClientOnly from '../components/ClientOnly'
import { IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconMail } from '@tabler/icons-react'
import dynamic from 'next/dynamic'
import { getCalApi } from "@calcom/embed-react"
import { useTheme } from '../contexts/ThemeContext'

const Cal = dynamic(() => import("@calcom/embed-react").then(mod => mod.default), { 
  ssr: false 
})

export async function getStaticProps() {
  const meta = {
    title: 'Contact // Gangadhar S',
    tagline: 'Get in Touch',
    image: '/static/images/avatar.jpg',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  }

  return { props: meta }
}

// Cal.com Embed Component using React
function CalEmbed() {
  const [mounted, setMounted] = React.useState(false)
  const { theme } = useTheme()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      (async function () {
        const cal = await getCalApi();
        cal("ui", {
          "theme": theme,
          "styles":{"branding":{"brandColor": theme === 'dark' ? "#ffffff" : "#000000"}},
          "hideEventTypeDetails":false
        });
      })();
    }
  }, [mounted, theme])
  
  if (!mounted) {
    return (
      <div style={{width:'1050px', margin:'0 auto', maxWidth:'100%', height:'680px', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f5f5f5', borderRadius:'8px'}}>
        {/* Loading state */}
      </div>
    )
  }
  
  return (
    <div style={{width:'1050px', margin:'0 auto', maxWidth:'100%', height:'680px', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f5f5f5', borderRadius:'8px'}}>
      <Cal 
        calLink="gangadhar.s/15min"
        style={{width:"100%", height:"100%"}}
        config={{
          "theme": theme
        }}
      />
    </div>
  )
}

function Contact(props) {
  const { title, image } = props
  const description = `Let's connect and start something great, tailored just for you. Select a date and scroll down`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://gangadhar.com/contact" property="og:url" />
        <meta content={`https://gangadhar.com${image}`} property="og:image" />
      </Head>

      {/* Header */}
      <div className="text-center py-8">
        <p className="text-secondary text-base mb-4">
          {description}
        </p>
      </div>

      {/* Calendar Embed - Break out of container */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen mb-12">
        <ClientOnly fallback={<div className="h-[680px] max-w-[1050px] mx-auto bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>}>
          <CalEmbed />
        </ClientOnly>
      </div>

      {/* Contact Info Section */}
      <div className="px-8 py-8">
        <div className="mb-8 max-w-7xl mx-auto">
          <h3 className="text-lg font-medium text-primary mb-6">Contact Info</h3>
          
          {/* Email */}
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=sgangadhar.exe@gmail.com&su=Let's%20Connect%20-%20From%20Portfolio%20Site" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 mb-4 text-secondary hover:text-primary transition-colors no-underline"
          >
            <IconMail className="w-5 h-5 [&>path]:fill-none [&>path]:stroke-current stroke-[1.5]" />
            <span>Email</span>
            <span className="ml-auto text-primary">sgangadhar.exe@gmail.com</span>
          </a>

          {/* Twitter */}
          <a 
            href="https://twitter.com/gangadhar02" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 mb-4 text-secondary hover:text-primary transition-colors no-underline"
          >
            <IconBrandTwitter className="w-5 h-5 [&>path]:fill-none [&>path]:stroke-current stroke-[1.5]" />
            <span>Twitter</span>
            <span className="ml-auto text-primary">@gangadhar02</span>
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/gangadhar__s/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 mb-4 text-secondary hover:text-primary transition-colors no-underline"
          >
            <IconBrandInstagram className="w-5 h-5 [&>path]:fill-none [&>path]:stroke-current stroke-[1.5]" />
            <span>Instagram</span>
            <span className="ml-auto text-primary">@gangadhar__s</span>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://linkedin.com/in/gangadhar02" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 mb-6 text-secondary hover:text-primary transition-colors no-underline"
          >
            <IconBrandLinkedin className="w-5 h-5 [&>path]:fill-none [&>path]:stroke-current stroke-[1.5]" />
            <span>LinkedIn</span>
            <span className="ml-auto text-primary">@gangadhar02</span>
          </a>
        </div>
      </div>
    </>
  )
}


Contact.Layout = Base

export default Contact
