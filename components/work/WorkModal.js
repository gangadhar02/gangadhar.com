import { format, parseISO } from 'date-fns'
import React from 'react'
import { cn } from '../../lib/utils'
import { Modal } from '../modal/Modal'

export default function WorkModal({ work, isOpen, onClose, getDuration }) {
  if (!work) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-start mb-[30px] gap-[25px]">
        <img 
          src={work.companyLogo} 
          alt={`${work.company} logo`}
          className="w-[50px] h-[50px] object-contain flex-shrink-0 mt-[5px]"
        />
      </div>

      <div className="flex-1 min-w-0 text-center">
        <h1 className={cn(
          "text-2xl font-semibold text-primary m-0 mb-1",
          "leading-[1.3] break-words"
        )}>
          {work.jobTitle}
        </h1>
        <h2 className={cn(
          "text-lg font-normal text-secondary m-0",
          "leading-[1.4] break-words"
        )}>
          {work.company}
        </h2>
        {work.roleType && (
          <p className="text-sm italic text-highlight mt-1">
            {work.roleType}
          </p>
        )}
      </div>

      <div className={cn(
        "flex flex-col justify-between gap-2 p-[10px]",
        "border-t border-b border-hover my-5",
        "text-sm text-secondary leading-[1.5]",
        "bp1:flex-row"
      )}>
        <span>
          {format(parseISO(work.startDate), 'MMM yyyy')} -{' '}
          {work.endDate
            ? format(parseISO(work.endDate), 'MMM yyyy')
            : 'Present'}
          {' • '}
          {getDuration(work.startDate, work.endDate)}
        </span>
        <span>{work.location}</span>
      </div>

      {work.highlights && work.highlights.length > 0 && (
        <div className="bg-hover p-[15px] rounded-lg mb-5">
          {work.highlights.map((item, index) => (
            <p key={index} className="text-sm m-0 mb-2 text-highlight">
              ✨ {item}
            </p>
          ))}
        </div>
      )}

      <div className="text-white text-base leading-[1.7]">
        {work.description?.map((item, index) => (
          <p
            key={index}
            className={cn(
              "m-0 mb-3 pl-5 relative",
              "before:content-['•'] before:absolute before:left-0",
              "before:text-primary before:font-bold"
            )}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </div>

      {work.technologies && work.technologies.length > 0 && (
        <div className="mt-[30px]">
          <h3 className="text-primary text-base mb-[10px]">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-[10px]">
            {work.technologies.map((tech, idx) => (
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

      {work.companyUrl && (
        <a 
          href={work.companyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={cn(
            "inline-block text-sm text-primary no-underline",
            "font-medium mt-[10px] hover:underline"
          )}
        >
          Visit Company Website →
        </a>
      )}
    </Modal>
  )
}

