import { cn } from '../lib/utils'

export const Wrapper = ({ className, ...props }) => (
  <div 
    className={cn(
      "flex flex-col min-h-screen relative z-0",
      className
    )}
    {...props}
  />
)