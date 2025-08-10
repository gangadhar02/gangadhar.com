import { cn } from '../lib/utils'

export const ListGroup = ({ className, ...props }) => (
  <ul 
    className={cn(
      "list-none mt-[10px] m-0 p-0",
      className
    )}
    {...props}
  />
)