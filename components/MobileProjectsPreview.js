import Link from 'next/link'
import { cn } from '../lib/utils'
import projectItems from '../data/projects'

export default function MobileProjectsPreview() {
  // Get the 2 most recent projects (from 2025)
  const recentProjects = projectItems[0].projects.slice(0, 2)

  return (
    <div className={cn(
      "hidden bp3:flex bp3:flex-col bp3:gap-4 bp3:mt-12 bp3:w-full"
    )}>
      <h3 className={cn(
        "text-2xl font-semibold text-primary m-0 mb-4 text-left"
      )}>
        Recent Projects
      </h3>
      <div className="flex flex-col gap-3">
        {recentProjects.map((project, index) => (
          <div 
            key={index}
            className={cn(
              "bg-background border border-secondary rounded-xl p-4",
              "flex items-start gap-3 transition-all duration-200",
              "hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            )}
          >
            <i className={cn(
              "text-2xl text-primary bg-hover p-3 rounded-lg flex-shrink-0",
              "w-12 h-12 flex items-center justify-center",
              project.icon
            )} />
            <div className="flex-1 flex flex-col gap-1">
              <h4 className={cn(
                "text-base font-semibold text-primary m-0 leading-[1.3]"
              )}>
                {project.title}
              </h4>
              <p className={cn(
                "text-[0.8rem] text-secondary my-1 mx-0 leading-[1.4]",
                "[-webkit-line-clamp:2] [-webkit-box-orient:vertical]",
                "[display:-webkit-box] overflow-hidden"
              )}>
                {project.description}
              </p>
              <span className={cn(
                "text-[0.75rem] text-green-600 font-medium",
                "bg-green-100 py-0.5 px-2 rounded-xl self-start mt-1"
              )}>
                {project.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Link href="/projects" passHref>
        <a className={cn(
          "bg-hover text-primary border border-secondary rounded-lg",
          "py-3 px-6 no-underline font-medium text-center",
          "transition-all duration-200 cursor-pointer",
          "hover:bg-primary hover:text-background hover:-translate-y-px"
        )}>
          View All Projects
        </a>
      </Link>
    </div>
  )
}

