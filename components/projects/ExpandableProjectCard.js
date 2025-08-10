"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { cn } from '../../lib/utils';

export function ExpandableProjectCard({ projects }) {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Modal Content */}
            <motion.div
              ref={ref}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative w-full max-w-[500px] max-h-[90vh] bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full lg:hidden"
                onClick={() => setActive(null)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Project Image/Icon Section */}
              <div className="h-80 bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
                {active.image ? (
                  <img
                    src={active.image}
                    alt={active.title}
                    className="w-full h-full object-cover"
                  />
                ) : active.icon ? (
                  <i className={cn("text-8xl text-primary", active.icon)} />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {active.title?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col h-[calc(90vh-20rem)] md:h-auto md:max-h-96">
                {/* Header */}
                <div className="flex justify-between items-start p-4 flex-shrink-0">
                  <div className="flex-1">
                    <h3 className="font-medium text-neutral-700 dark:text-neutral-200 text-lg">
                      {active.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-base mt-2">
                      {active.description}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    {active.website && (
                      <a
                        href={active.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm rounded-full font-bold bg-green-500 hover:bg-green-600 text-white"
                      >
                        Visit Site
                      </a>
                    )}
                    {active.github && (
                      <a
                        href={active.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm rounded-full font-bold bg-gray-800 hover:bg-gray-900 text-white"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-4 pb-6">
                  {active.longDescription && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
                        About This Project
                      </h4>
                      <div className="space-y-3">
                        {active.longDescription.map((desc, index) => (
                          <p key={index} className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {desc}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {active.features && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
                        Key Features
                      </h4>
                      <div className="space-y-2">
                        {active.features.map((feature, index) => (
                          <p key={index} className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            • {feature}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {active.technologies && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {active.technologies.slice(0, 8).map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-md text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                        {active.technologies.length > 8 && (
                          <span className="text-neutral-500 text-sm py-1">
                            +{active.technologies.length - 8} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {active.achievements && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
                        Achievements
                      </h4>
                      <div className="space-y-2">
                        {active.achievements.map((achievement, index) => (
                          <p key={index} className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            🎉 {achievement}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Cards */}
      <div className={cn(
        "w-full gap-6",
        "grid grid-cols-1 md:grid-cols-2"
      )}>
        {projects.map((project, index) => (
          <div
            key={`card-${project.title}-${id}`}
            onClick={() => setActive(project)}
            className={cn(
              "cursor-pointer relative group",
              "border border-border rounded-lg overflow-hidden",
              "bg-background hover:shadow-lg transition-all duration-300",
              "hover:-translate-y-1 hover:border-neutral-400 dark:hover:border-neutral-500"
            )}
          >
            <div className="flex flex-col h-full">
              {/* Icon/Logo Section */}
              <div className="h-48 bg-muted flex items-center justify-center">
                {project.icon ? (
                  <i className={cn("text-6xl text-primary", project.icon)} />
                ) : project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-6xl font-bold text-secondary">
                    {project.title?.split(' ').map(word => word[0]).join('').slice(0, 2)}
                  </div>
                )}
              </div>
              
              {/* Content Section */}
              <div className="p-6 flex-grow">
                <h3 className="font-semibold text-lg text-primary mb-2">
                  {project.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                
                {/* Tags Section */}
                {project.technologies && (
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-secondary">
                      {project.technologies[0]}
                    </span>
                    {project.technologies[1] && (
                      <>
                        <span className="text-secondary">•</span>
                        <span className="text-secondary">
                          {project.technologies[1]}
                        </span>
                      </>
                    )}
                    {project.technologies.length > 2 && (
                      <>
                        <span className="text-secondary">•</span>
                        <span className="text-secondary">
                          +{project.technologies.length - 2}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}