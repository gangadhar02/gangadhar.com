import { cn } from '../lib/utils'

export const Box = ({ className, ...props }) => (
  <div className={cn(className)} {...props} />
)