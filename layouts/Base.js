import { cn } from '../lib/utils'
import { SidebarNav } from '../components/SidebarNav'
import Footer from '../components/Footer'
import { PostMain, PostContent, PostContainer } from '../components/Post'
import { Wrapper } from '../components/Wrapper'

export default function Base({ children }) {
  const { title, tagline, primaryColor, secondaryColor } = children.props

  return (
    <SidebarNav>
      <div className="flex flex-col min-h-screen">
        <PostMain
          className={cn(
            "pt-24",
            primaryColor && `[&_::selection]:bg-[var(--${primaryColor})] [&_::selection]:text-black [&_::selection]:[-webkit-text-fill-color:black]`
          )}
        >
          <PostContent>
            <PostContainer>
              <h1 className={cn(
                "text-primary text-center mb-10 text-5xl font-semibold",
                "leading-[1.2] font-heading",
                "bp3:text-4xl bp1:text-[2rem]"
              )}>
                {tagline ? tagline : title}
              </h1>
              {children}
            </PostContainer>
          </PostContent>
        </PostMain>
        <Footer />
      </div>
    </SidebarNav>
  )
}
