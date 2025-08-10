import { cn } from '../lib/utils'

export const Icon = ({ className, ...props }) => (
  <i className={cn(className)} {...props} />
)