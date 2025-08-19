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
import projectsData from '../data/projects'

export default function ComprehensiveHomepage({ latestPost }) {
  const [showPreviousRoles, setShowPreviousRoles] = useState(false)

  // Get current and previous roles
  const currentRole = workData[0] // First item is current
  const previousRoles = workData.slice(1) // Rest are previous

  // Get all projects flattened from years
  const allProjects = projectsData.flatMap(yearGroup => yearGroup.projects)

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
          <div className="border border-black/[0.08] dark:border-white/[0.08] rounded p-3 bg-card transition-colors duration-150">
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
                      className="border border-black/[0.08] dark:border-white/[0.08] rounded p-3 bg-card transition-colors duration-150"
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
          <div className="border border-black/[0.08] dark:border-white/[0.08] rounded p-3 bg-card transition-colors duration-150">
            <p className="text-lg text-primary leading-relaxed">
              I started out as a growth guy just trying to figure things out at my first startup job (IFYKYK). That chaos gave me exposure to a lot of things, and somewhere along the way I realized I actually liked marketing. So I leaned in, became a creative strategist, experimented with AI tools, taught myself AI Assisted Coding (Vibe Coding), and discovered I could do much more than basic marketing. These days, I'm building random things on the internet and gearing up to launch something of my own soon :)
            </p>
          </div>
        </Reveal>
      </section>

      {/* Newest Writing Section */}
      {latestPost && (
        <section className="space-y-8 mt-2">
          <div className="relative flex items-baseline gap-4">
            <TextReveal
              as="h2"
              text="NEWEST WRITING"
              per="word"
              delay={0.1}
              speed={0.1}
              duration={1.0}
              className="text-xl font-semibold text-gray-400 uppercase tracking-wider flex-shrink-0"
            />
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" style={{ marginTop: '-0.6em' }}></div>
            <Link href="/writings" className="text-lg text-secondary hover:text-primary transition-colors flex-shrink-0">
              → all writing
            </Link>
          </div>

          <Reveal delay={0.3} y={20} duration={1.2}>
            <div className="border border-black/[0.08] dark:border-white/[0.145] rounded-2xl p-8 bg-card/50 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-2xl font-semibold text-primary">
                    {latestPost.title.replace(/"/g, '')}
                  </h3>
                  <time className="text-sm text-secondary/60">
                    {new Date(latestPost.date).toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    }).toLowerCase()}
                  </time>
                </div>
                
                <p className="text-lg text-secondary leading-relaxed">
                  {latestPost.description}
                </p>

                <Link href={`/blog/${latestPost.slug}`} className="inline-block">
                  <button className="px-6 py-2.5 border border-black/[0.08] dark:border-white/[0.145] rounded-lg text-primary hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                    Read post
                  </button>
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Projects Section */}
      <section className="space-y-6 mt-2">
        <div className="relative flex items-baseline gap-4">
          <TextReveal
            as="h2"
            text="PROJECTS"
            per="word"
            delay={0.1}
            speed={0.1}
            duration={1.0}
            className="text-xl font-semibold text-gray-400 uppercase tracking-wider flex-shrink-0"
          />
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" style={{ marginTop: '-0.6em' }}></div>
        </div>

        <Reveal delay={0.3} y={20} duration={1.2}>
          <div 
            className="grid gap-3 overflow-x-auto pb-2"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, 224px)',
              maxWidth: '100%'
            }}
          >
            {allProjects.map((project, index) => (
              <div 
                key={index}
                className="border border-black/[0.08] dark:border-[#1d1c1b] rounded-lg p-3 bg-card dark:bg-[#100f0f] transition-colors duration-150 hover:bg-black/[0.02] dark:hover:bg-[#1a1918]"
                style={{
                  width: '224px',
                  height: '224px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div className="flex flex-col flex-1">
                  <div className="flex items-baseline gap-1.5 mb-2">
                    {project.active && <span className="!text-green-500 text-sm leading-none" style={{ color: '#10b981' }}>•</span>}
                    {project.url && project.url !== '#' ? (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline transition-all duration-200"
                      >
                        <h3 className="text-base font-medium text-primary leading-tight">
                          {project.title}
                        </h3>
                      </a>
                    ) : (
                      <h3 className="text-base font-medium text-primary leading-tight">
                        {project.title}
                      </h3>
                    )}
                  </div>
                  <p className="text-secondary text-sm leading-relaxed line-clamp-3 flex-1 ml-3">
                    {project.description.length > 80 
                      ? project.description.substring(0, 80) + '...' 
                      : project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-2 py-0.5 text-xs border border-black/[0.08] dark:border-[#1d1c1b] rounded bg-black/[0.02] dark:bg-[#1a1918] text-secondary"
                    >
                      {tech.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  )
}