import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { cn } from '../lib/utils'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function FeaturedProject(props) {
  const { project } = props

  const icon = require(`../public/static/icons/${project.icon}.json`)
  const iconRef = useRef()

  return (
    <a
      href={project.url}
      target="_blank"
      onMouseEnter={() => iconRef.current?.play()}
      onMouseLeave={() => iconRef.current?.stop()}
      className={cn(
        "flex transition-opacity duration-200 ease-in-out",
        "border-0 rounded-lg no-underline w-auto hover:opacity-100",
        "bp2:w-[180px]"
      )}
    >
      <Animation index={props.index}>
        <Lottie
          lottieRef={iconRef}
          style={{ width: 24, height: 24, marginBottom: 10 }}
          animationData={icon}
          loop={false}
          autoplay={false}
        />
        <div className="flex-1">
          <p className="text-primary m-0 text-lg">{project.title}</p>
          <p className="m-0 text-secondary leading-6">{project.description}</p>
          {project.stats && (
            <p className={cn(
              "mt-[5px] mb-0 mx-0 text-primary uppercase inline-block",
              "font-medium tracking-[1.2px] text-xs"
            )}>
              {project.stats}
            </p>
          )}
        </div>
      </Animation>
    </a>
  )
}

function Animation(props) {
  const [hovered, setHovered] = useState('')
  const isHovered = hovered === props.index

  return (
    <motion.span
      onHoverStart={() => setHovered(props.index)}
      onHoverEnd={() => setHovered('')}
      className="relative w-full p-5"
    >
      {isHovered && (
        <motion.span
          layoutId="featuredProjects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-hover rounded-lg -z-10"
        />
      )}

      {props.children}
    </motion.span>
  )
}

