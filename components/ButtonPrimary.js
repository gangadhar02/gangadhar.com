import { cn } from '../lib/utils'

export const ButtonPrimary = ({ as: Component = 'div', className, ...props }) => (
  <Component 
    className={cn(
      "appearance-none bg-transparent border-0 rounded-lg text-primary cursor-pointer",
      "inline-block text-base font-semibold leading-6 -ml-[10px] outline-0",
      "px-[10px] py-2 pl-2 no-underline transition-all duration-200 ease-in-out",
      "hover:bg-hover hover:text-primary hover:opacity-100",
      "hover:[&_kbd]:bg-primary",
      className
    )}
    {...props}
  />
)