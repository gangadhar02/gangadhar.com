import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useMatches,
} from 'kbar'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { forwardRef, useRef, useState } from 'react'
import aboutIcon from '../public/static/icons/about.json'
import articlesIcon from '../public/static/icons/articles.json'
import reminderIcon from '../public/static/icons/reminder.json'
import copyLinkIcon from '../public/static/icons/copy-link.json'
import homeIcon from '../public/static/icons/home.json'
import projectsIcon from '../public/static/icons/projects.json'
import sourceIcon from '../public/static/icons/source.json'
import workIcon from '../public/static/icons/work.json'
import { cn } from '../lib/utils'
import Toast from './Toast'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function CommandBar(props) {
  const copyLinkRef = useRef()
  const sourceRef = useRef()
  const homeRef = useRef()
  const aboutRef = useRef()
  const articlesRef = useRef()
  const projectsRef = useRef()
  const workRef = useRef()
  const reminderRef = useRef()
  const router = useRouter()
  const [showToast, setShowToast] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowToast(true)
  }

  const iconSize = { width: 24, height: 24 }

  const actions = [
    {
      id: 'copy',
      name: 'Copy Link',
      shortcut: ['l'],
      keywords: 'copy-link',
      section: 'General',
      perform: copyLink,
      icon: (
        <Lottie
          lottieRef={copyLinkRef}
          style={iconSize}
          animationData={copyLinkIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'source',
      name: 'View Source',
      shortcut: ['s'],
      keywords: 'view-source',
      section: 'General',
      perform: () =>
        window.open('https://github.com/gangadhar/portfolio', '_blank'),
      icon: (
        <Lottie
          lottieRef={sourceRef}
          style={iconSize}
          animationData={sourceIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      keywords: 'go-home',
      section: 'Go To',
      perform: () => router.push('/'),
      icon: (
        <Lottie
          lottieRef={homeRef}
          style={iconSize}
          animationData={homeIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'about',
      name: 'About',
      shortcut: ['g', 'a'],
      keywords: 'go-about',
      section: 'Go To',
      perform: () => router.push('/about'),
      icon: (
        <Lottie
          lottieRef={aboutRef}
          style={iconSize}
          animationData={aboutIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'articles',
      name: 'Articles',
      shortcut: ['g', 'b'],
      keywords: 'go-articles',
      section: 'Go To',
      perform: () => router.push('/articles'),
      icon: (
        <Lottie
          lottieRef={articlesRef}
          style={iconSize}
          animationData={articlesIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['g', 'p'],
      keywords: 'go-projects',
      section: 'Go To',
      perform: () => router.push('/projects'),
      icon: (
        <Lottie
          lottieRef={projectsRef}
          style={iconSize}
          animationData={projectsIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'work',
      name: 'Work',
      shortcut: ['g', 'w'],
      keywords: 'go-work',
      section: 'Go To',
      perform: () => router.push('/work'),
      icon: (
        <Lottie
          lottieRef={workRef}
          style={iconSize}
          animationData={workIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
    {
      id: 'archive',
      name: 'Archive',
      shortcut: ['g', 'r'],
      keywords: 'go-archive',
      section: 'Go To',
      perform: () => router.push('/archive'),
      icon: (
        <Lottie
          lottieRef={reminderRef}
          style={iconSize}
          animationData={reminderIcon}
          loop={false}
          autoplay={false}
        />
      ),
    },
  ]

  return (
    <>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <KBarPositioner className={cn(
            "fixed flex items-start justify-center w-full inset-0",
            "pt-[14vh] px-4 pb-4 bg-black/80 box-border z-[9999]"
          )}>
            <KBarAnimator className={cn(
              "bg-[#1a1c1e] max-w-[600px] w-full text-primary rounded-lg overflow-hidden",
              "supports-[backdrop-filter]:bg-command supports-[backdrop-filter]:backdrop-blur-[25px] supports-[backdrop-filter]:backdrop-saturate-[300%]",
              "[&>div>div::-webkit-scrollbar]:hidden [&>div>div]:[-ms-overflow-style:none] [&>div>div]:[scrollbar-width:none]"
            )}>
              <KBarSearch 
                placeholder="Type a command or search…"
                className={cn(
                  "p-3 text-base w-full box-border outline-none border-none",
                  "m-0 bg-command text-primary"
                )}
              />
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>

        {props.children}
      </KBarProvider>

      <Toast
        title="Copied :D"
        description="You can now share it with anyone."
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  )
}

function RenderResults() {
  const { results } = useMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className={cn(
            "p-2 px-4 text-[10px] uppercase tracking-wide bg-command"
          )}>
            {item}
          </div>
        ) : (
          <ResultItem action={item} active={active} />
        )
      }
    />
  )
}

const ResultItem = forwardRef(({ action, active }, ref) => {
  if (active) {
    action.icon.props.lottieRef.current?.play()
  } else {
    action.icon.props.lottieRef.current?.stop()
  }

  return (
    <div
      ref={ref}
      className={cn(
        "p-3 px-4 flex items-center justify-between m-0 cursor-pointer",
        active 
          ? "bg-white/10 text-primary" 
          : "bg-command text-secondary"
      )}
      onMouseEnter={() => action.icon.props.lottieRef.current?.play()}
      onMouseLeave={() => action.icon.props.lottieRef.current?.stop()}
    >
      <div className="flex gap-2 items-center">
        {action.icon && action.icon}
        <div className="flex flex-col">
          <span>{action.name}</span>
        </div>
      </div>
      {action.shortcut?.length ? (
        <div className="grid grid-flow-col gap-1" aria-hidden>
          {action.shortcut.map(shortcut => (
            <kbd 
              key={shortcut}
              className={cn(
                "bg-white/10 text-secondary px-2 py-1 uppercase"
              )}
            >
              {shortcut}
            </kbd>
          ))}
        </div>
      ) : null}
    </div>
  )
})

ResultItem.displayName = 'ResultItem'

