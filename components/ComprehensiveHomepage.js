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
import ProjectGrid from './ProjectGrid'
import workData from '../data/work'
import { SimpleWorkCard } from './work/SimpleWorkCard'
import projectsData from '../data/projects'

export default function ComprehensiveHomepage({ latestPost }) {
  // Removed showPreviousRoles state - no longer needed with SimpleWorkCard

  // Get current and previous roles
  // Work data is now handled directly by SimpleWorkCard component

  // Get all projects flattened from years
  const allProjects = projectsData.flatMap(yearGroup => yearGroup.projects)

  return (
    <div className="max-w-[760px] mx-auto px-6 py-6">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
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
        <div className="md:col-span-2 space-y-2 text-center md:text-left">
          <Reveal delay={0.3} y={20} duration={1.2}>
            <div className={cn(
              "prose prose-lg dark:prose-invert max-w-none",
              "[&_p]:text-secondary [&_p]:leading-relaxed"
            )}>
              <p className="text-lg !mt-0">
                Hey, I'm <span className="text-primary font-medium">Gangadhar</span>. By day, I'm a <span className="text-primary font-medium">marketer</span>. By night, I'm busy <span className="text-primary font-medium">building</span>, <span className="text-primary font-medium">exploring</span>, and <span className="text-primary font-medium">writing</span> about the random things I find cool. When I'm not in my hustle mode, I'm probably <span className="text-primary font-medium">lifting</span>, <span className="text-primary font-medium">running</span>, <span className="text-primary font-medium">trekking</span>, <span className="text-primary font-medium">watching movies</span>, or <span className="text-primary font-medium">plotting my next trip</span>.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.5} y={20} duration={1.2}>
            <div className={cn(
              "flex items-center gap-2 justify-center md:justify-start",
              "text-secondary text-base"
            )}>
              <IconWorld className="h-5 w-5 text-secondary [&>path]:fill-none [&>path]:stroke-current" />
              <span>Bengaluru, India, IST</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Work Section */}
      <section className="space-y-2 mt-0">
        <div className="relative flex items-baseline gap-4">
          <TextReveal
            as="h2"
            text="WORK EXPERIENCE"
            per="word"
            delay={0.1}
            speed={0.1}
            duration={1.0}
            className="text-xl font-semibold text-gray-400 uppercase tracking-wider flex-shrink-0 !mt-[30px]"
          />
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" style={{ marginTop: '-0.6em' }}></div>
        </div>

        {/* Work Cards */}
        <Reveal delay={0.3} y={20} duration={1.2}>
          <SimpleWorkCard workItems={workData} />
        </Reveal>

      </section>

      {/* What I Do Section */}
      <section className="space-y-8 mt-0">
        <div className="relative flex items-baseline gap-4">
          <TextReveal
            as="h2"
            text="WHAT I DO"
            per="word"
            delay={0.1}
            speed={0.1}
            duration={1.0}
            className="text-base md:text-xl font-semibold text-gray-400 uppercase tracking-wider flex-shrink-0 !mt-[30px]"
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
        <section className="space-y-8 mt-1">
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
            <div className="border border-black/[0.08] dark:border-white/[0.145] rounded p-8 bg-card/50 backdrop-blur-sm">
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
      <section className="space-y-6 mt-1">
        <div className="relative flex items-baseline gap-4">
          <TextReveal
            as="h2"
            text="LATEST PROJECTS"
            per="word"
            delay={0.1}
            speed={0.1}
            duration={1.0}
            className="text-xl font-semibold text-gray-400 uppercase tracking-wider flex-shrink-0"
          />
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" style={{ marginTop: '-0.6em' }}></div>
          <Link href="/projects" className="text-lg text-secondary hover:text-primary transition-colors flex-shrink-0">
            → all projects
          </Link>
        </div>

        <Reveal delay={0.3} y={20} duration={1.2}>
          <ProjectGrid projects={allProjects} limit={3} />
        </Reveal>
      </section>

    </div>
  )
}