import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { cn } from '../lib/utils'

import aboutIcon from '../public/static/icons/about.json'
import articlesIcon from '../public/static/icons/articles.json'
import projectsIcon from '../public/static/icons/projects.json'
import workIcon from '../public/static/icons/work.json'
import reminderIcon from '../public/static/icons/reminder.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const navItems = [
  { path: '/about', icon: aboutIcon, label: 'About' },
  { path: '/articles', icon: articlesIcon, label: 'Articles' },
  { path: '/projects', icon: projectsIcon, label: 'Projects' },
  { path: '/work', icon: workIcon, label: 'Work' },
  { path: '/archive', icon: reminderIcon, label: 'Archive' },
]

export default function MobileNavbar() {
  const router = useRouter()

  return (
    <nav className={cn(
      "fixed bottom-5 left-0 right-0 mx-auto w-[92%] max-w-[500px]",
      "bg-[#101111] rounded-2xl z-[999] p-2 bp2:hidden",
      "shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-[10px]"
    )}>
      <div className="flex justify-between items-center gap-[2px]">
        {navItems.map(item => {
          const isActive = router.pathname === item.path
          return (
            <Link href={item.path} passHref key={item.path}>
              <a className={cn(
                "flex justify-center items-center p-[6px] rounded-[10px]",
                "border-none no-underline transition-colors duration-200 ease-in-out",
                isActive ? "bg-[#2a2b2d]" : "bg-transparent"
              )}>
                <Lottie
                  animationData={item.icon}
                  style={{ width: 22, height: 22 }}
                  loop={false}
                  autoplay={isActive}
                />
              </a>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}