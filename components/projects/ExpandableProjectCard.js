import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { cn } from '../../lib/utils';
import { IconExternalLink } from "@tabler/icons-react";
import { Github } from "lucide-react";
import { Stagger } from '../motion/Stagger';

// Utility function to check if project has a valid URL
const hasValidUrl = (project) => !!project.url && project.url.startsWith("http");

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

              {/* Project Preview Section */}
              <div className="h-80 bg-gray-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
                {hasValidUrl(active) ? (
                  <img
                    src={`https://api.microlink.io/?url=${encodeURIComponent(active.url)}&screenshot=true&meta=false&embed=screenshot.url&colorScheme=light&viewport.isMobile=false&viewport.deviceScaleFactor=2&viewport.width=1200&viewport.height=800`}
                    alt={`Preview of ${active.title}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : active.image ? (
                  <img
                    src={active.image}
                    alt={active.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {active.title?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Content - Entire modal content is scrollable */}
              <div className="flex-1 overflow-y-auto max-h-[calc(90vh-20rem)] md:max-h-96">
                <div className="p-4">
                  <h3 className="font-medium text-neutral-700 dark:text-neutral-200 text-lg">
                    {active.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-base mt-2 mb-4">
                    {active.description}
                  </p>
                  
                  <div className="flex gap-2 mb-6">
                    {active.url && (
                      <a
                        href={active.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 gap-2 no-underline"
                      >
                        <span>Visit Site</span>
                        <IconExternalLink className="h-4 w-4 [&>path]:fill-none [&>path]:stroke-current stroke-[1.5]" />
                      </a>
                    )}
                    {active.githubUrl && (
                      <a
                        href={active.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 gap-2 no-underline"
                      >
                        <Github className="h-4 w-4" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>

                {/* All Content Sections */}
                  {active.detailedDescription && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
                        About This Project
                      </h4>
                      <div className="space-y-3">
                        {active.detailedDescription.map((desc, index) => (
                          <p key={index} className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {desc}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {active.highlights && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
                        Key Features
                      </h4>
                      <div className="space-y-2">
                        {active.highlights.map((feature, index) => (
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
      <Stagger 
        className={cn(
          "w-full gap-6",
          "grid grid-cols-1 md:grid-cols-2"
        )}
        delayChildren={0.2}
        stagger={0.1}
        childProps={{ y: 24, duration: 1.2, blur: 8 }}
      >
        {projects.map((project, index) => {
          // Pattern B: Whole card with LinkPreview (current implementation)
          const CardContent = (
            <div
              onClick={() => setActive(project)}
              className={cn(
                "cursor-pointer relative group",
                "border border-border rounded-lg overflow-hidden",
                "bg-background hover:shadow-lg transition-all duration-300",
                "hover:-translate-y-1 hover:border-neutral-400 dark:hover:border-neutral-500"
              )}
            >
            <div className="flex flex-col h-full">
              {/* Website Preview Section */}
              <div className="h-48 bg-muted flex items-center justify-center overflow-hidden">
                {hasValidUrl(project) ? (
                  <img
                    src={`https://api.microlink.io/?url=${encodeURIComponent(project.url)}&screenshot=true&meta=false&embed=screenshot.url&colorScheme=light&viewport.isMobile=false&viewport.deviceScaleFactor=2&viewport.width=1200&viewport.height=800`}
                    alt={`Preview of ${project.title}`}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
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
          );
          
          // Static preview implementation - no hover needed
          return (
            <div key={`card-${project.title}-${id}`}>
              {CardContent}
            </div>
          );
        })}
      </Stagger>
    </>
  );
}