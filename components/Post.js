import { cn } from '../lib/utils'

export const PostMain = ({ className, ...props }) => (
  <main 
    className={cn(
      "overflow-hidden flex-1",
      className
    )}
    {...props}
  />
)

export const Post = ({ className, ...props }) => (
  <main 
    className={cn(
      "overflow-hidden flex-1",
      className
    )}
    {...props}
  />
)

export const PostContainer = ({ className, ...props }) => (
  <div 
    className={cn(
      "mx-auto max-w-[760px] px-5",
      className
    )}
    {...props}
  />
)

export const PostContent = ({ className, ...props }) => (
  <div 
    className={cn(
      "text-base leading-8 text-secondary relative z-10 h-full py-[60px_0_20px_0]",
      // iframe-wrap
      "[&_.iframe-wrap]:h-0 [&_.iframe-wrap]:mb-5 [&_.iframe-wrap]:overflow-hidden",
      "[&_.iframe-wrap]:pb-[56.25%] [&_.iframe-wrap]:pt-[30px] [&_.iframe-wrap]:relative",
      // iframe-wrap iframe
      "[&_.iframe-wrap_iframe]:border-0 [&_.iframe-wrap_iframe]:h-full [&_.iframe-wrap_iframe]:left-0",
      "[&_.iframe-wrap_iframe]:absolute [&_.iframe-wrap_iframe]:top-0 [&_.iframe-wrap_iframe]:w-full",
      // post-image-caption
      "[&_.post-image-caption]:text-secondary [&_.post-image-caption]:text-center",
      "[&_.post-image-caption]:italic [&_.post-image-caption]:text-sm",
      // post-image-full
      "[&_.post-image-full]:mt-5 [&_.post-image-full]:mb-0 [&_.post-image-full]:mx-0",
      "[&_.post-image-full]:max-w-none [&_.post-image-full]:w-[70vw]",
      "bp2:[&_.post-image-full]:ml-[calc(-1*(70vw-760px)/2)]",
      "bp4:[&_.post-image-full]:ml-0",
      // side-by-side
      "[&_.side-by-side]:flex [&_.side-by-side]:w-[90vw] [&_.side-by-side]:my-10 [&_.side-by-side]:mx-0",
      "[&_.side-by-side]:flex-row bp2:[&_.side-by-side]:ml-[calc(-1*(90vw-760px)/2)]",
      "bp4:[&_.side-by-side]:ml-0 bp4:[&_.side-by-side]:flex-col",
      // side-by-side-img
      "[&_.side-by-side-img]:min-w-[50%] bp2:[&_.side-by-side-img]:min-w-full",
      // side-by-side-caption
      "[&_.side-by-side-caption]:text-secondary [&_.side-by-side-caption]:text-center",
      "[&_.side-by-side-caption]:italic [&_.side-by-side-caption]:text-sm [&_.side-by-side-caption]:-mt-[30px]",
      className
    )}
    {...props}
  />
)
