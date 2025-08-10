import { motion } from 'framer-motion'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { PostContainer, PostContent, PostMain } from '../components/Post'
import ShortcutHome from '../components/ShortcutHome'
import { Wrapper } from '../components/Wrapper'
import { getPersonJsonLd } from '../lib/json-ld'
import { cn } from '../lib/utils'
import { Modal } from '../components/modal/Modal'
import Preloader from '../components/Preloader'
import { Particles } from '../components/Particles'
import { usePreload } from '../contexts/PreloadContext'
import MobileWorkPreview from '../components/MobileWorkPreview'
import MobileProjectsPreview from '../components/MobileProjectsPreview'
import MobileArticlesPreview from '../components/MobileArticlesPreview'

export async function getStaticProps() {
  return {
    props: {
      title: 'Gangadhar S',
      description: 'Creative Strategist | Performance Marketing | Gen AI. Passionate about leveraging design, digital marketing, creative strategy, and data analytics to drive impact for organisations.',
      image: '/static/images/avatar.jpg',
    },
  }
}


export default function Index(props) {
  const { title, description, image } = props
  const [modalContent, setModalContent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { shouldShowPreloader, isPreloaderComplete, markPreloaderShown } = usePreload()

  const openModal = (content) => {
    setModalContent(content)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalContent(null)
  }

  const handlePreloaderComplete = () => {
    markPreloaderShown()
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
            On the side, I freelance as a marketer. I've helped brands with performance marketing, built out AI-driven automations, and acted as a sort of Swiss Army knife for growth. No-code tools and AI have become my playground, and while I haven't shipped many personal projects yet, I'm constantly building, testing, and learning in the background.
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
            It probably started with LEGO, like a lot of people — but for me, it was smartphones, writing blogs, and making things in my small room. I've always liked making stuff, sharing stuff, and seeing what sticks. And over time, I realized that I don't need to know code to build cool things. I just need obsession.
          </p>
          <p>
            <span className="text-primary font-medium">"Obsession beats talent"</span> is a quote I live by. I've seen it play out in real life again and again. Given time, I know I can figure anything out — whether it's how to make a creative that sells or how to automate the un-automatable.
          </p>
          <p>
            I'm in this for the long run. And the more I learn about what makes people tick, the more I want to keep building things that make sense, feel good to use, and actually work.
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
          Current Work
        </h3>
        <div className={cn(
          "text-secondary text-base leading-[1.7]",
          "[&_p]:m-[0_0_15px_0] [&_p:last-child]:mb-0"
        )}>
          <p>
            Working as a <span className="text-primary font-medium">Creative Strategist at DemandLane</span>, focusing on performance-driven ad creatives for TikTok, Reels, and Shorts. Researching human behavior to understand what drives engagement and conversions.
          </p>
        </div>
      </div>

      <div className="mb-[30px]">
        <h3 className={cn(
          "text-xl font-semibold text-primary m-[0_0_15px_0] leading-[1.4]"
        )}>
          Freelance Projects
        </h3>
        <div className={cn(
          "text-secondary text-base leading-[1.7]",
          "[&_p]:m-[0_0_15px_0] [&_p:last-child]:mb-0"
        )}>
          <p>
            Helping brands with performance marketing, building AI-driven automations, and serving as a growth consultant. Exploring no-code tools and AI to create efficient marketing solutions.
          </p>
        </div>
      </div>

      <div className="mb-[30px]">
        <h3 className={cn(
          "text-xl font-semibold text-primary m-[0_0_15px_0] leading-[1.4]"
        )}>
          Learning & Development
        </h3>
        <div className={cn(
          "text-secondary text-base leading-[1.7]",
          "[&_p]:m-[0_0_15px_0] [&_p:last-child]:mb-0"
        )}>
          <p>
            Constantly building, testing, and learning in the background. Exploring new marketing strategies, automation tools, and creative approaches to stay ahead of industry trends.
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
      <div 
        className={cn(
          "flex flex-col min-h-screen overflow-hidden"
        )}
        style={{ opacity: (!shouldShowPreloader || isPreloaderComplete) ? 1 : 0 }}
      >
        <Head>
          <title>{title}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="https://gangadhar.com" property="og:url" />
          <meta content={`https://gangadhar.com${image}`} property="og:image" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(getPersonJsonLd()),
            }}
            key="person-jsonld"
          />
        </Head>
        <Navbar />
        <div className={cn(
          "flex flex-col justify-center items-center flex-1 w-full",
          "px-5 box-border relative z-[1]",
          "pt-[120px] bp2:pt-[100px]"
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
                <i className={cn(
                  "text-base text-secondary ri-map-pin-fill"
                )} />
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
        
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      </div>
    </>
  )
}
