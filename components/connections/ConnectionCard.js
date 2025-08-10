import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { cn } from '../../lib/utils'

export default function ConnectionCard({ person, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      className={cn(
        "relative p-2.5 cursor-pointer w-full",
        "bp2:w-[180px]"
      )}
    >
      {hovered && (
        <motion.span
          layoutId="connectionHover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute top-0 left-0 right-0 bottom-0",
            "bg-hover rounded-md -z-10"
          )}
        />
      )}
      <div className={cn(
        "flex flex-col transition-opacity duration-200 ease-in-out",
        "border-0 p-2.5 rounded-md no-underline w-full",
        "hover:opacity-100"
      )}>
        <div className="flex-1">
          <p className={cn(
            "text-lg font-bold m-0 text-primary"
          )}>
            {person.name}
          </p>
          <p className={cn(
            "text-sm text-secondary m-0"
          )}>
            {person.title}
          </p>
          <p className={cn(
            "text-[13px] text-cyan m-0"
          )}>
            {person.company}
          </p>
          <button className={cn(
            "appearance-none border border-primary rounded",
            "mt-2 py-1 px-3 text-[13px] font-semibold",
            "bg-transparent text-primary cursor-pointer",
            "transition-all duration-200 ease-in-out",
            "hover:bg-primary hover:text-background"
          )}>
            {person.status === 'Met' ? 'Met' : 'Want to Meet'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
