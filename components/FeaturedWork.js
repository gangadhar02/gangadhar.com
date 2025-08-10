import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '../lib/utils'

export default function FeaturedWork(props) {
  const { work } = props

  return (
    <div className={cn(
      "mt-5 border-0 no-underline first:ml-0"
    )}>
      <Animation index={props.index}>
        <div className="flex flex-col h-auto">
          <div>
            <h3 className="text-primary text-lg m-0">{work.jobTitle}</h3>
            <p className="text-secondary m-0">{work.company}</p>
          </div>
        </div>
      </Animation>
    </div>
  )
}

function Animation(props) {
  const [hovered, setHovered] = useState('')
  const isHovered = hovered === props.index

  return (
    <motion.div
      onHoverStart={() => setHovered(props.index)}
      onHoverEnd={() => setHovered('')}
      className="p-5 relative w-full"
    >
      {isHovered && (
        <motion.div
          layoutId="featuredwork"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-hover rounded-lg -z-10"
        />
      )}

      {props.children}
    </motion.div>
  )
}

