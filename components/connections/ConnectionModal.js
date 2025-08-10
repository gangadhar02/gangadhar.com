import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import React, { useRef } from 'react'
import linkedinIcon from '../../public/static/icons/linkedin.json'
import tweetsIcon from '../../public/static/icons/tweets.json'
import { cn } from '../../lib/utils'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function ConnectionModal({ person, isOpen, onClose }) {
  const linkedinRef = useRef(null)
  const tweetsRef = useRef(null)
  const iconSize = { width: 24, height: 24 }

  if (!person) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className={cn(
            "fixed top-0 left-0 w-screen h-screen z-[1000]",
            "bg-[rgba(20,20,24,0.85)] flex items-center justify-center",
            "backdrop-blur-md"
          )}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            onClick={e => e.stopPropagation()}
            className={cn(
              "bg-[rgba(24,24,28,0.98)] rounded-[20px] shadow-[0_8px_48px_rgba(0,0,0,0.2)]",
              "pt-10 pb-8 px-8 min-w-[320px] max-w-[400px] w-full",
              "flex flex-col items-center relative"
            )}
          >
            <button 
              onClick={onClose}
              className={cn(
                "absolute top-[18px] right-[22px] bg-none border-none",
                "text-secondary text-[2rem] cursor-pointer z-[2]",
                "transition-colors duration-200",
                "hover:text-primary hover:rotate-[5deg] hover:transition-all hover:duration-300 hover:ease-in-out"
              )}
            >
              &times;
            </button>
            <h2 className={cn(
              "text-2xl font-bold m-0 mb-1 text-primary text-center"
            )}>
              {person.name}
            </h2>
            <div className={cn(
              "text-[17px] text-secondary mb-0.5 text-center"
            )}>
              {person.title}
            </div>
            <div className={cn(
              "text-[15px] text-cyan font-medium mb-[10px] text-center"
            )}>
              {person.company}
            </div>
            {(person.location || person.metOn) && (
              <div className={cn(
                "text-sm text-secondary mb-[10px] text-center",
                "flex items-center justify-center gap-[6px]"
              )}>
                {person.location && <span>{person.location}</span>}
                {person.location && person.metOn && (
                  <span className="text-lg text-secondary mx-0.5">•</span>
                )}
                {person.metOn && (
                  <span>{format(new Date(person.metOn), 'MMM dd, yyyy')}</span>
                )}
              </div>
            )}
            <div className={cn(
              "flex items-center gap-2 text-[13px] text-secondary mb-[10px]"
            )}>
              <span className={cn(
                "py-0.5 px-[10px] rounded-full font-semibold text-xs text-primary",
                person.status === 'Met' 
                  ? "bg-gradient-to-r from-cyan-500/20 to-green-500/20"
                  : "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
              )}>
                {person.status === 'Met' ? 'Met' : 'Want to Meet'}
              </span>
            </div>
            {person.tags?.length > 0 && (
              <div className={cn(
                "flex flex-wrap gap-2 mt-2 mb-0 mx-0 justify-center"
              )}>
                {person.tags.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(
                      "bg-[#232526] text-primary text-xs py-[3px] px-[10px]",
                      "rounded-full font-medium"
                    )}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            )}
            <div className={cn(
              "flex gap-3 mt-3 mb-0 mx-0 no-underline"
            )}>
              {person.linkedin && (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  onMouseEnter={() => linkedinRef.current?.play()}
                  onMouseLeave={() => linkedinRef.current?.stop()}
                  className={cn(
                    "text-secondary transition-colors duration-200 flex items-center",
                    "border-b-0 hover:text-cyan hover:scale-[1.3]",
                    "hover:transition-all hover:duration-300 hover:ease-in-out"
                  )}
                >
                  <Lottie
                    lottieRef={linkedinRef}
                    style={iconSize}
                    animationData={linkedinIcon}
                    loop={true}
                    autoplay={false}
                  />
                </a>
              )}
              {person.twitter && (
                <a
                  href={person.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  onMouseEnter={() => tweetsRef.current?.play()}
                  onMouseLeave={() => tweetsRef.current?.stop()}
                  className={cn(
                    "text-secondary transition-colors duration-200 flex items-center",
                    "border-b-0 hover:text-cyan hover:scale-[1.3]",
                    "hover:transition-all hover:duration-300 hover:ease-in-out"
                  )}
                >
                  <Lottie
                    lottieRef={tweetsRef}
                    style={iconSize}
                    animationData={tweetsIcon}
                    loop={true}
                    autoplay={false}
                  />
                </a>
              )}
            </div>
            {/* {person.notes && <Notes>{person.notes}</Notes>} */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

