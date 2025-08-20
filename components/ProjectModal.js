import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github } from 'lucide-react'
import { cn } from '../lib/utils'

export default function ProjectModal({ isOpen, onClose, project }) {
  if (!project) return null

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className={cn(
                  "fixed left-[50%] top-[50%] z-50",
                  "w-[90vw] max-w-2xl max-h-[85vh]",
                  "bg-white dark:bg-[#0a0a0a]",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "rounded-2xl shadow-xl",
                  "overflow-hidden"
                )}
                initial={{ 
                  x: '-50%', 
                  y: '-48%',
                  opacity: 0,
                  scale: 0.95
                }}
                animate={{ 
                  x: '-50%', 
                  y: '-50%',
                  opacity: 1,
                  scale: 1
                }}
                exit={{ 
                  x: '-50%', 
                  y: '-48%',
                  opacity: 0,
                  scale: 0.95
                }}
                transition={{ 
                  type: "spring",
                  damping: 25,
                  stiffness: 300
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-black/[0.08] dark:border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <Dialog.Title className="text-2xl font-semibold text-primary m-0">
                      {project.title}
                    </Dialog.Title>
                    {project.active && (
                      <span className={cn(
                        "px-2.5 py-0.5 text-xs",
                        "border border-green-500/30",
                        "rounded-lg",
                        "bg-green-500/10",
                        "text-green-600 dark:text-green-400",
                        "font-medium"
                      )}>
                        Active
                      </span>
                    )}
                  </div>
                  <Dialog.Close asChild>
                    <button
                      className={cn(
                        "rounded-lg p-2",
                        "hover:bg-black/5 dark:hover:bg-white/5",
                        "transition-colors duration-200"
                      )}
                      aria-label="Close"
                    >
                      <X className="h-5 w-5 text-secondary" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">Description</h3>
                      <p className="text-secondary leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className={cn(
                              "px-3 py-1.5 text-sm",
                              "border border-black/[0.08] dark:border-white/[0.08]",
                              "rounded-lg",
                              "bg-black/[0.02] dark:bg-white/[0.02]",
                              "text-secondary"
                            )}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Year if available */}
                    {project.year && (
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-2">Year</h3>
                        <p className="text-secondary">{project.year}</p>
                      </div>
                    )}

                    {/* Highlights if available */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-2">Key Highlights</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {project.highlights.map((highlight, index) => (
                            <li key={index} className="text-secondary">
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-black/[0.08] dark:border-white/[0.08]">
                  <button
                    onClick={onClose}
                    className={cn(
                      "px-4 py-2 rounded-lg",
                      "text-secondary hover:text-primary",
                      "transition-colors duration-200"
                    )}
                  >
                    Close
                  </button>
                  
                  {project.github && project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2",
                        "px-4 py-2 rounded-lg",
                        "border border-black/[0.08] dark:border-white/[0.08]",
                        "text-primary",
                        "hover:bg-black/[0.02] dark:hover:bg-white/[0.02]",
                        "transition-colors duration-200"
                      )}
                    >
                      <Github className="h-4 w-4" />
                      View Code
                    </a>
                  )}
                  
                  {project.url && project.url !== '#' && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2",
                        "px-4 py-2 rounded-lg",
                        "bg-gray-900 dark:bg-gray-100",
                        "hover:opacity-90",
                        "transition-opacity duration-200"
                      )}
                      style={{
                        color: 'white'
                      }}
                    >
                      <ExternalLink className="h-4 w-4 [&>path]:fill-none [&>path]:stroke-current" />
                      View Project
                    </a>
                  )}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}