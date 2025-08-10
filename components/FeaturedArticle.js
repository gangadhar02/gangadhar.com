import { motion } from 'framer-motion'
import { useState } from 'react'
import readingTime from 'reading-time'
import { cn } from '../lib/utils'

export default function FeaturedArticle(props) {
  const stats = readingTime(props.content)

  return (
    <a 
      href={props.href}
      className={cn(
        "border-0 w-[370px] ml-5 no-underline first:ml-0",
        "hover:opacity-100"
      )}
    >
      <Animation index={props.index}>
        <div className="flex flex-col">
          <div 
            className={cn(
              "rounded-lg w-[370px] h-[180px] mb-5",
              "bg-cover bg-no-repeat bg-center grayscale",
              "max-[600px]:w-full"
            )}
            style={{ backgroundImage: `url(${props.image})` }}
          />
          <div className={cn(
            "max-w-[450px] mr-5",
            "bp2:max-w-full bp2:mr-0"
          )}>
            <h3 className="text-primary m-0">{props.title}</h3>
            <p className={cn(
              "text-secondary block m-0 overflow-hidden",
              "[-webkit-line-clamp:2] [-webkit-box-orient:vertical]",
              "[display:-webkit-box]"
            )}>
              {props.description}
            </p>
            <p className={cn(
              "mt-[5px] mb-0 mx-0 text-primary uppercase inline-block",
              "font-medium tracking-[1.2px] text-xs"
            )}>
              {stats.text}
            </p>
          </div>
        </div>
      </Animation>
    </a>
  )
}

function Animation(props) {
  const [hovered, setHovered] = useState('')
  const isHovered = hovered === props.index

  return (
    <motion.div
      onHoverStart={() => setHovered(props.index)}
      onHoverEnd={() => setHovered('')}
      className={cn(
        "relative w-full p-5 rounded-xl box-border",
        "featured-article-anim"
      )}
    >
      {isHovered && (
        <motion.div
          layoutId="featuredArticles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-0 bg-hover rounded-lg -z-10"
          )}
        />
      )}

      {props.children}
    </motion.div>
  )
}

