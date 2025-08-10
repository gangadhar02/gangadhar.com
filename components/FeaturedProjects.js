import { cn } from '../lib/utils'

export const FeaturedProjects = ({ className, ...props }) => (
  <div 
    className={cn(
      "mt-[10px] mb-0 mx-0 ml-[-20px] flex flex-wrap flex-col",
      "bp2:flex-row",
      className
    )}
    {...props}
  />
)
