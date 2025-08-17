import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { IconMapPin } from '@tabler/icons-react'
import ShortcutHome from '../components/ShortcutHome'
import { cn } from '../lib/utils'
import { Modal } from '../components/modal/Modal'
import Preloader from '../components/Preloader'
import MobileWorkPreview from '../components/MobileWorkPreview'
import MobileProjectsPreview from '../components/MobileProjectsPreview'
import MobileArticlesPreview from '../components/MobileArticlesPreview'

export default function IndexContent({ title, description }) {
  const [modalContent, setModalContent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [shouldShowPreloader, setShouldShowPreloader] = useState(false)
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(true)
  
  useEffect(() => {
    // Handle preloader logic on client side only
    const wasShown = sessionStorage.getItem('preloader-shown')
    const isRefresh = performance.navigation?.type === 1
    if (!wasShown || isRefresh) {
      setShouldShowPreloader(true)
      setIsPreloaderComplete(false)
    }
  }, [])

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloader-shown', 'true')
    setIsPreloaderComplete(true)
  }

  const openModal = (content) => {
    setModalContent(content)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalContent(null)
  }

  const aboutContent = (
    <>
      <h1 className={cn(
        "text-[28px] font-semibold text-primary m-[0_0_8px_0] leading-[1.3]"
      )}>
        About
      </h1>
      <h2 className={cn(
        "text-lg font-normal text-secondary m-[0_0_30px_0] leading-[1.4]"
      )}>
        Who, What, Why
      </h2>
      
      <div className="mb-[30px]">
        <h3 className={cn(
          "text-xl font-semibold text-primary m-[0_0_15px_0] leading-[1.4]"
        )}>
          Who
        </h3>
        <div className={cn(
          "text-secondary text-base leading-[1.7]",
          "[&_p]:m-[0_0_15px_0] [&_p:last-child]:mb-0"
        )}>
          <p>
            I'm Gangadhar, a Creative Strategist from Bangalore. Growing up, I had unusually early access to gadgets, thanks to my dad, who had a bit of an addiction to trying out new smartphones. That curiosity stuck. I think it's what shaped how I see the world today: always exploring, always tweaking. (I might even have a tiny bit of OCD in a good way.)
          </p>
          <p>
            My dad's curiosity rubbed off on me early, and over time, the people around me — offline and online — became my biggest sources of inspiration. I wrote my first blog in 8th grade, recorded YouTube videos using a homemade tripod, and fell down a lifelong rabbit hole of learning, testing, and making.
          </p>
          <p>
            Outside of work, I've been into <span className="text-primary font-medium">Cricket and Volleyball</span>. Cricket was everything growing up and still influences me — and lately, I've discovered that badminton is the perfect stressbuster.
          </p>
        </div>
      </div>

      <div className="mb-[30px]">
        <h3 className={cn(
          "text-xl font-semibold text-primary m-[0_0_15px_0] leading-[1.4]"
        )}>
          What
        </h3>
        <div className={cn(
          "text-secondary text-base leading-[1.7]",
          "[&_p]:m-[0_0_15px_0] [&_p:last-child]:mb-0"
        )}>
          <p>
            Right now, I work as a <span className="text-primary font-medium">Creative Strategist at DemandLane</span>, where I build performance-driven ad creatives that feel native to platforms like TikTok, Reels, and Shorts. I spend most of my time researching human behavior and figuring out what makes people click, literally.
          </p>
          <p>
            Before this, I helped Chumbak scale their digital marketing efforts as a Marketing Manager and ran multiple <span className="text-primary font-medium">0-1 marketing experiments</span> at Sminq (YC W17) as their first marketer. Each role taught me something different about understanding people and driving growth.
          </p>
          <p>
            On the side, I'm working on <span className="text-primary font-medium">creative-strategy-bot</span>, an AI tool that helps marketers generate ad ideas using proven frameworks. It's my way of democratizing creative strategy for everyone.
          </p>
        </div>
      </div>

      <div className="mb-[30px]">
        <h3 className={cn(
          "text-xl font-semibold text-primary m-[0_0_15px_0] leading-[1.4]"
        )}>
          Why
        </h3>
        <div className={cn(
          "text-secondary text-base leading-[1.7]",
          "[&_p]:m-[0_0_15px_0] [&_p:last-child]:mb-0"
        )}>
          <p>
            I'm driven by the rush of creating something from nothing. Whether it's a creative campaign that makes people stop scrolling or a marketing experiment that nobody thought would work, I live for those moments when ideas turn into impact.
          </p>
          <p>
            This portfolio exists because I believe in working out loud. It's where I share what I'm learning, building, and thinking about. Some of it's polished, some of it's raw, but all of it's real.
          </p>
        </div>
      </div>
    </>
  )

  const nowContent = (
    <>
      <h1 className={cn(
        "text-[28px] font-semibold text-primary m-[0_0_8px_0] leading-[1.3]"
      )}>
        Now
      </h1>
      <h2 className={cn(
        "text-lg font-normal text-secondary m-[0_0_30px_0] leading-[1.4]"
      )}>
        Short-term focus
      </h2>
      
      <div className="mb-[30px]">
        <h3 className={cn(
          "text-xl font-semibold text-primary m-[0_0_15px_0] leading-[1.4]"
        )}>
          Building creative-strategy-bot
        </h3>
        <div className={cn(
          "text-secondary text-base leading-[1.7]",
          "[&_p]:m-[0_0_15px_0] [&_p:last-child]:mb-0"
        )}>
          <p>
            I'm developing an AI tool that helps marketers generate ad ideas using proven frameworks. The goal is to make creative strategy accessible to everyone, not just those with years of experience. Currently testing with beta users and refining based on feedback.
          </p>
        </div>
      </div>

      <div className="mb-[30px]">
        <h3 className={cn(
          "text-xl font-semibold text-primary m-[0_0_15px_0] leading-[1.4]"
        )}>
          Mastering Gen AI for marketing
        </h3>
        <div className={cn(
          "text-secondary text-base leading-[1.7]",
          "[&_p]:m-[0_0_15px_0] [&_p:last-child]:mb-0"
        )}>
          <p>
            Deep diving into how AI can enhance creative work without replacing human insight. Experimenting with prompt engineering, automation workflows, and building custom tools that amplify creative output.
          </p>
        </div>
      </div>

      <div className="mb-[30px]">
        <h3 className={cn(
          "text-xl font-semibold text-primary m-[0_0_15px_0] leading-[1.4]"
        )}>
          Creating performance-driven content
        </h3>
        <div className={cn(
          "text-secondary text-base leading-[1.7]",
          "[&_p]:m-[0_0_15px_0] [&_p:last-child]:mb-0"
        )}>
          <p>
            At DemandLane, I'm focused on cracking the code of native social content that drives results. This means understanding platform algorithms, user behavior patterns, and what makes content stop the scroll and drive action.
          </p>
        </div>
      </div>

      <div className="mb-[30px]">
        <div className={cn(
          "text-secondary text-base leading-[1.7]",
          "[&_p]:m-[0_0_15px_0] [&_p:last-child]:mb-0"
        )}>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '20px', fontStyle: 'italic' }}>
            Last updated: December 2024
          </p>
        </div>
      </div>
    </>
  )

  const somedayContent = (
    <>
      <h1 className={cn(
        "text-[28px] font-semibold text-primary m-[0_0_8px_0] leading-[1.3]"
      )}>
        Someday
      </h1>
      <h2 className={cn(
        "text-lg font-normal text-secondary m-[0_0_30px_0] leading-[1.4]"
      )}>
        Long-term aspirations
      </h2>
      
      <div className="mb-[30px]">
        <h3 className={cn(
          "text-xl font-semibold text-primary m-[0_0_15px_0] leading-[1.4]"
        )}>
          Someday, I want to work at my dream company
        </h3>
        <div className={cn(
          "text-secondary text-base leading-[1.7]",
          "[&_p]:m-[0_0_15px_0] [&_p:last-child]:mb-0"
        )}>
          <p>
            I really don't know what my dream company is, but I want to work at a place where I can learn a lot, have fun and be surrounded by great people. I want to be in a place where I can grow and be challenged. In someways my current company matches all of these things, but I'm still early in my career and there are lot of great companies out there.
          </p>
        </div>
      </div>

      <div className="mb-[30px]">
        <h3 className={cn(
          "text-xl font-semibold text-primary m-[0_0_15px_0] leading-[1.4]"
        )}>
          Someday, I want to live abroad
        </h3>
        <div className={cn(
          "text-secondary text-base leading-[1.7]",
          "[&_p]:m-[0_0_15px_0] [&_p:last-child]:mb-0"
        )}>
          <p>
            India is great, has its pros and its cons, like all places. But I would like to try to live abroad sometime, preferably somewhere warmer.
          </p>
        </div>
      </div>

      <div className="mb-[30px]">
        <h3 className={cn(
          "text-xl font-semibold text-primary m-[0_0_15px_0] leading-[1.4]"
        )}>
          Someday, I want to speak at a tech conference
        </h3>
        <div className={cn(
          "text-secondary text-base leading-[1.7]",
          "[&_p]:m-[0_0_15px_0] [&_p:last-child]:mb-0"
        )}>
          <p>
            I have been to a few conferences, and I think it would be fun challenge to speak at one. I have to prepare, practice and do uncomfortable things to get there. It also means I need to know the stuff I will be talking about!
          </p>
        </div>
      </div>

      <div className="mb-[30px]">
        <h3 className={cn(
          "text-xl font-semibold text-primary m-[0_0_15px_0] leading-[1.4]"
        )}>
          Someday, I want to learn to fly
        </h3>
        <div className={cn(
          "text-secondary text-base leading-[1.7]",
          "[&_p]:m-[0_0_15px_0] [&_p:last-child]:mb-0"
        )}>
          <p>
            Not that I want to become a pilot and work as one. Airplanes, flight and the sky has always fascinated me. I think it would be fun to learn to fly.
          </p>
        </div>
      </div>

      <div className="mb-[30px]">
        <h3 className={cn(
          "text-xl font-semibold text-primary m-[0_0_15px_0] leading-[1.4]"
        )}>
          Someday, I want to work because I want to
        </h3>
        <div className={cn(
          "text-secondary text-base leading-[1.7]",
          "[&_p]:m-[0_0_15px_0] [&_p:last-child]:mb-0"
        )}>
          <p>
            I want to be at the place where I work because I do it for fun, not because it pays the salary. Of course the "salary" has to come way, but I want to be in the situation where I can choose where and if I work because I want to, not because I have to.
          </p>
        </div>
      </div>

      <div className="mb-[30px]">
        <div className={cn(
          "text-secondary text-base leading-[1.7]",
          "[&_p]:m-[0_0_15px_0] [&_p:last-child]:mb-0"
        )}>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '20px', fontStyle: 'italic' }}>
            Updated on December 24, 2024
          </p>
        </div>
      </div>
    </>
  )

  return (
    <>
      {shouldShowPreloader && !isPreloaderComplete && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      <Navbar />
      <div className={cn(
        "flex flex-col min-h-screen overflow-hidden pt-20"
      )}>
        <div className={cn(
          "flex flex-col justify-center items-center flex-1 w-full",
          "px-5 box-border relative z-[1]"
        )}>
          <div className={cn(
            "max-w-[760px] w-full text-center"
          )}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={cn(
                "flex flex-col items-center w-full"
              )}
            >
              <motion.h1 className={cn(
                "text-[2.5rem] font-medium mb-0 text-primary"
              )}>
                {title}
              </motion.h1>
              <h2 className={cn(
                "text-2xl font-normal my-6 mx-0 text-secondary leading-[1.4]"
              )}>
                Curious, Tinkerer, Nerd and a Marketer
              </h2>
              <div className={cn(
                "flex items-center justify-center gap-2",
                "text-secondary text-[0.9rem] mt-4"
              )}>
                <IconMapPin className="h-6 w-6 text-secondary [&>path]:fill-none [&>path]:stroke-current" />
                <span>Bangalore, India</span>
              </div>
            </motion.div>

            <div className={cn(
              "grid grid-cols-1 gap-4 mt-8 mb-8",
              "bp2:grid-cols-3 bp2:gap-6"
            )}>
              <button 
                className={cn(
                  "bg-none border border-secondary rounded-lg p-6",
                  "text-left cursor-pointer transition-all duration-200 ease-out",
                  "flex flex-col w-full",
                  "hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                )}
                onClick={() => openModal(aboutContent)}
              >
                <h3 className={cn(
                  "m-[0_0_4px_0] text-xl font-medium text-primary",
                  "bp2:text-2xl bp2:mb-2"
                )}>
                  About
                </h3>
                <p className={cn(
                  "m-0 text-sm text-secondary",
                  "bp2:text-[0.9rem]"
                )}>
                  Who, What, Why
                </p>
              </button>

              <button 
                className={cn(
                  "bg-none border border-secondary rounded-lg p-6",
                  "text-left cursor-pointer transition-all duration-200 ease-out",
                  "flex flex-col w-full",
                  "hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                )}
                onClick={() => openModal(nowContent)}
              >
                <h3 className={cn(
                  "m-[0_0_4px_0] text-xl font-medium text-primary",
                  "bp2:text-2xl bp2:mb-2"
                )}>
                  Now
                </h3>
                <p className={cn(
                  "m-0 text-sm text-secondary",
                  "bp2:text-[0.9rem]"
                )}>
                  Short-term focus
                </p>
              </button>

              <button 
                className={cn(
                  "bg-none border border-secondary rounded-lg p-6",
                  "text-left cursor-pointer transition-all duration-200 ease-out",
                  "flex flex-col w-full",
                  "hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                )}
                onClick={() => openModal(somedayContent)}
              >
                <h3 className={cn(
                  "m-[0_0_4px_0] text-xl font-medium text-primary",
                  "bp2:text-2xl bp2:mb-2"
                )}>
                  Someday
                </h3>
                <p className={cn(
                  "m-0 text-sm text-secondary",
                  "bp2:text-[0.9rem]"
                )}>
                  Long-term focus
                </p>
              </button>
            </div>

            <ShortcutHome />

            {/* Mobile-only content preview sections */}
            <MobileWorkPreview />
            <MobileProjectsPreview />
            <MobileArticlesPreview />
          </div>
        </div>
        <Footer />
      </div>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  )
}