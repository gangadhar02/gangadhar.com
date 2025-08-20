'use client'
import React, { useState } from 'react'
import ProjectModal from './ProjectModal'

export default function ProjectGrid({ projects, limit = null }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Apply limit if specified
  const displayProjects = limit ? projects.slice(0, limit) : projects

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 200) // Clear after animation
  }

  return (
    <>
      <div 
        className="grid gap-3 overflow-x-auto pb-2"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, 224px)',
          maxWidth: '100%'
        }}
      >
        {displayProjects.map((project, index) => (
          <div 
            key={index}
            className="border border-black/[0.08] dark:border-[#1d1c1b] rounded-lg p-3 bg-card dark:bg-[#100f0f] transition-colors duration-150 hover:bg-black/[0.02] dark:hover:bg-[#1a1918] cursor-pointer"
            style={{
              width: '224px',
              height: '224px',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={() => handleProjectClick(project)}
          >
            <div className="flex flex-col flex-1">
              <div className="flex items-baseline gap-1.5 mb-2">
                {project.active && <span className="!text-green-500 text-sm leading-none" style={{ color: '#10b981' }}>•</span>}
                {project.url && project.url !== '#' ? (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline transition-all duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-base font-medium text-primary leading-tight">
                      {project.title}
                    </h3>
                  </a>
                ) : (
                  <h3 className="text-base font-medium text-primary leading-tight">
                    {project.title}
                  </h3>
                )}
              </div>
              <p className="text-secondary text-sm leading-relaxed line-clamp-3 flex-1 ml-3">
                {project.description.length > 80 
                  ? project.description.substring(0, 80) + '...' 
                  : project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                <span 
                  key={techIndex} 
                  className="px-2 py-0.5 text-xs border border-black/[0.08] dark:border-[#1d1c1b] rounded bg-black/[0.02] dark:bg-[#1a1918] text-secondary"
                >
                  {tech.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  )
}