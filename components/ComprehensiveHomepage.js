'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { IconWorld } from '@tabler/icons-react'
import Reveal from './motion/Reveal'
import { Stagger } from './motion/Stagger'
import TextReveal from './motion/TextReveal'
import workData from '../data/work'

export default function ComprehensiveHomepage() {
  const [showPreviousRoles, setShowPreviousRoles] = useState(false)

  // Get current and previous roles
  const currentRole = workData[0] // First item is current
  const previousRoles = workData.slice(1) // Rest are previous

  return (
    <div className="max-w-[760px] mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Photo */}
        <Reveal delay={0.1} y={20} duration={1.2}>
          <div className="md:col-span-1">
            <div className="w-full max-w-[200px] mx-auto md:mx-0">
              <Image
                src="/static/images/avatar.jpg"
                alt="Gangadhar S"
                width={200}
                height={200}
                className="rounded-2xl object-cover w-full aspect-square"
                priority
              />
            </div>
          </div>
        </Reveal>

        {/* Intro Text */}
        <div className="md:col-span-2 space-y-6">
          <Reveal delay={0.3} y={20} duration={1.2}>
            <div className={cn(
              "prose prose-lg dark:prose-invert max-w-none",
              "[&_p]:text-secondary [&_p]:leading-relaxed"
            )}>
              <p className="text-lg">
                Hey, I'm <span className="text-primary font-medium">Gangadhar</span>. By day, I'm a <span className="text-primary font-medium">marketer</span>. By night, I'm busy <span className="text-primary font-medium">building</span>, <span className="text-primary font-medium">tinkering</span>, and <span className="text-primary font-medium">writing</span> about the random things I find cool. I'm probably <span className="text-primary font-medium">lifting</span>, <span className="text-primary font-medium">running</span>, <span className="text-primary font-medium">trekking</span>, <span className="text-primary font-medium">watching movies</span>, or <span className="text-primary font-medium">plotting my next trip</span>.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.5} y={20} duration={1.2}>
            <div className={cn(
              "flex items-center gap-2",
              "text-secondary text-base"
            )}>
              <IconWorld className="h-5 w-5 text-secondary [&>path]:fill-none [&>path]:stroke-current" />
              <span>Bengaluru, India, IST</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Work Section */}
      <section className="space-y-4 mt-2">
        <div className="relative flex items-baseline gap-4">
          <TextReveal
            as="h2"
            text="WORK"
            per="word"
            delay={0.1}
            speed={0.1}
            duration={1.0}
            className="text-xl font-semibold text-gray-400 uppercase tracking-wider flex-shrink-0"
          />
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" style={{ marginTop: '-0.6em' }}></div>
        </div>

        {/* Current Role */}
        <Reveal delay={0.3} y={20} duration={1.2}>
          <div className="border border-black/[0.08] dark:border-white/[0.08] rounded p-6 bg-card transition-colors duration-150">
            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-primary">{currentRole.jobTitle}</h3>
                <p className="text-sm text-secondary">{currentRole.startDate.split('-')[0]} - Present</p>
              </div>
              <div className="md:text-right md:flex-shrink-0">
                <h4 className="text-xl font-semibold text-primary">{currentRole.company}</h4>
                <p className="text-sm text-secondary">{currentRole.location?.split(',')[0] || 'Remote'}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Previous Roles Collapsible */}
        <div>
          <motion.button
            onClick={() => setShowPreviousRoles(!showPreviousRoles)}
            className={cn(
              "flex items-center gap-2 text-left py-2",
              "hover:text-primary transition-colors duration-200"
            )}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={{ rotate: showPreviousRoles ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="h-4 w-4 text-secondary" />
            </motion.div>
            <span className="font-medium text-secondary">Previous roles</span>
            <span className="text-sm text-secondary bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{previousRoles.length}</span>
          </motion.button>
          
          <AnimatePresence>
            {showPreviousRoles && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden mt-4"
              >
                <motion.div
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  exit={{ y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-4"
                >
                  {previousRoles.map((role, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.05,
                        ease: "easeOut" 
                      }}
                      className="border border-black/[0.08] dark:border-white/[0.08] rounded p-6 bg-card transition-colors duration-150"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-primary">{role.jobTitle}</h4>
                          <p className="text-sm text-secondary">
                            {role.startDate.split('-')[0]} - {role.endDate ? role.endDate.split('-')[0] : 'Present'}
                          </p>
                        </div>
                        <div className="md:text-right md:flex-shrink-0">
                          <p className="text-xl font-semibold text-primary">{role.company}</p>
                          <p className="text-sm text-secondary">{role.location?.split(',')[0] || 'Remote'}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="space-y-8 mt-2">
        <div className="relative flex items-baseline gap-4">
          <TextReveal
            as="h2"
            text="WHAT I DO"
            per="word"
            delay={0.1}
            speed={0.1}
            duration={1.0}
            className="text-xl font-semibold text-gray-400 uppercase tracking-wider flex-shrink-0"
          />
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" style={{ marginTop: '-0.6em' }}></div>
        </div>

        <Reveal delay={0.3} y={20} duration={1.2}>
          <div className="border border-black/[0.08] dark:border-white/[0.08] rounded p-6 bg-card transition-colors duration-150">
            <p className="text-lg text-primary leading-relaxed">
              Started out as a growth guy trying to figure things out at my first startup job (flykyk). That chaos gave me exposure to a lot — and somewhere along the way I realized I actually liked marketing. So I leaned in, became a creative strategist, played around with AI tools, taught myself to code, and discovered I could build way beyond basic marketing. These days, I'm building stuff on the internet and gearing up to launch something of my own soon — while documenting the journey in my writing.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  )
}