import * as React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    default: "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200",
    destructive: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
    outline: "border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800",
    secondary: "bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700",
    ghost: "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
    link: "text-black dark:text-white underline-offset-4 hover:underline",
  }
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }
  
  const combinedClassName = cn(baseClasses, variants[variant], sizes[size], className)
  
  if (asChild) {
    return React.cloneElement(props.children, {
      className: cn(combinedClassName, props.children.props.className),
      ref,
      ...props
    })
  }
  
  return (
    <button
      className={combinedClassName}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = "Button"

export { Button }