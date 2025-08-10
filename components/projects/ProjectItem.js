import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { cn } from '../../lib/utils'

export default function ProjectItem({ project, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "flex cursor-pointer transition-opacity duration-200 ease-in-out",
        "border-0 rounded-lg no-underline w-auto hover:opacity-100"
      )}
    >
      <motion.div
        className={cn(
          "relative w-full flex flex-col items-center mt-3 mb-3 p-[5px]",
          "transition-all duration-[250ms] [transition-timing-function:cubic-bezier(.4,2,.6,1)]",
          "hover:opacity-100 hover:-translate-y-3 hover:scale-[1.07]",
          "hover:shadow-[0_20px_48px_0_rgba(31,38,135,0.28)]",
          "[&:hover_.project-icon]:scale-110 [&:hover_.project-icon]:text-highlight"
        )}
      >
        {isHovered && (
          <motion.span
            layoutId="sharedHover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-hover rounded-lg z-0"
          />
        )}

        <i className={cn(
          "project-icon text-[48px] mb-[10px] mt-[10px] relative z-[1]",
          "text-center text-primary transition-all duration-200 ease-in-out",
          project.icon || 'ri-folder-line'
        )} />
        
        <div className="flex-1 text-center relative z-[1]">
          <p className="text-primary text-lg m-0 font-bold">
            {project.title}
          </p>
          <p className={cn(
            "text-secondary text-sm mt-[5px] mb-0 mx-0 leading-[1.4]"
          )}>
            {project.description}
          </p>
          <div className={cn(
            "flex flex-wrap justify-center gap-[6px] mt-[10px]"
          )}>
            {project.technologies?.slice(0, 3).map((tech, index) => (
              <span 
                key={index}
                className={cn(
                  "bg-hover text-primary text-xs py-1 px-2 rounded-full"
                )}
              >
                {tech}
              </span>
            ))}
            {project.technologies?.length > 3 && (
              <span className="text-secondary text-xs self-center">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
          {project.stats && (
            <p className={cn(
              "text-highlight text-[13px] mt-2 mb-0 mx-0",
              "italic font-bold"
            )}>
              {project.stats}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}