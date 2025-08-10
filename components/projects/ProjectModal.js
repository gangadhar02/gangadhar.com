import React from 'react'
import { cn } from '../../lib/utils'
import { Modal } from '../modal/Modal'

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-start mb-[30px] gap-[25px] justify-center">
        <i className={cn(
          "text-[64px] text-center mt-[5px] text-primary",
          project.icon || 'ri-folder-line'
        )} />
      </div>

      <div className="flex-1 min-w-0 text-center">
        <h1 className={cn(
          "text-2xl font-semibold text-primary m-0 mb-1",
          "leading-[1.3] break-words"
        )}>
          {project.title}
        </h1>
        <h2 className={cn(
          "text-lg font-normal text-secondary m-0",
          "leading-[1.4] break-words"
        )}>
          {project.year}
        </h2>
        {project.category && (
          <p className="text-sm italic text-highlight mt-1">
            {project.category}
          </p>
        )}
      </div>

      <div className={cn(
        "flex flex-col justify-between gap-2 p-[10px]",
        "border-t border-b border-hover my-5",
        "text-sm text-secondary leading-[1.5]",
        "bp1:flex-row"
      )}>
        <span>{project.status}</span>
        {project.stats && <span>{project.stats}</span>}
      </div>

      {project.highlights && project.highlights.length > 0 && (
        <div className="bg-hover p-[15px] rounded-lg mb-5">
          {project.highlights.map((item, index) => (
            <p key={index} className="text-sm m-0 mb-2 text-highlight">
              ✨ {item}
            </p>
          ))}
        </div>
      )}

      <div className="text-white text-base leading-[1.7]">
        {project.detailedDescription?.map((item, index) => (
          <p
            key={index}
            className={cn(
              "m-0 mb-3 pl-5 relative",
              "before:content-['•'] before:absolute before:left-0",
              "before:text-primary before:font-bold"
            )}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        )) || (
          <p className={cn(
            "m-0 mb-3 pl-5 relative",
            "before:content-['•'] before:absolute before:left-0",
            "before:text-primary before:font-bold"
          )}>
            {project.description}
          </p>
        )}
      </div>

      {project.technologies && project.technologies.length > 0 && (
        <div className="mt-[30px]">
          <h3 className="text-primary text-base mb-[10px]">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-[10px]">
            {project.technologies.map((tech, idx) => (
              <span 
                key={idx}
                className={cn(
                  "bg-hover text-primary text-[13px]",
                  "py-[6px] px-3 rounded-full"
                )}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-[15px] mt-5 flex-wrap">
        {project.url && (
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn(
              "inline-block text-sm text-primary no-underline font-medium",
              "py-2 px-4 border border-primary rounded transition-all duration-200",
              "hover:bg-primary hover:text-background hover:no-underline"
            )}
          >
            View Project →
          </a>
        )}
        {project.githubUrl && (
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn(
              "inline-block text-sm text-primary no-underline font-medium",
              "py-2 px-4 border border-primary rounded transition-all duration-200",
              "hover:bg-primary hover:text-background hover:no-underline"
            )}
          >
            View Code →
          </a>
        )}
      </div>
    </Modal>
  )
}