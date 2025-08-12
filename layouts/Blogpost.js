import { cn } from '../lib/utils'
import { SidebarNav } from '../components/SidebarNav'
import Footer from '../components/Footer'
import BlogDate from '../components/BlogDate'
import { Post, PostMain, PostContent, PostContainer } from '../components/Post'
import { Wrapper } from '../components/Wrapper'

export default function Blogpost({ children }) {
  const { title, image, date, views } = children.props

  return (
    <SidebarNav>
      <div className="flex flex-col min-h-screen">
        <div className="pt-24">
          <Main image={image}>
          {image && (
            <div className={cn(
              "bg-[#141618] min-h-[600px] h-screen w-full",
              "flex items-center justify-center relative flex-col -z-10"
            )}>
              <h1 className={cn(
                "text-white my-[59px_auto_0] relative z-[3]",
                "text-4xl leading-[48px] px-3 text-center",
                "bp2:text-[60px] bp2:leading-[80px] bp2:max-w-[60%]"
              )}>
                {title}
              </h1>
              <div
                className={cn(
                  "bg-[#141618] bg-no-repeat bg-center bg-cover",
                  "fixed opacity-40 w-full h-full top-0 left-0 z-[1]",
                  "will-change-transform bp4:absolute",
                  "after:content-[''] after:absolute after:w-full after:h-full",
                  "after:top-0 after:left-0 after:z-[2] after:will-change-transform",
                  "after:bg-gradient-to-b after:from-[rgba(0,0,0,0.8)]",
                  "after:via-transparent after:to-[rgba(0,0,0,0.8)]"
                )}
                style={image ? { backgroundImage: `url(${image})` } : {}}
              />
              <h2 className={cn(
                "text-white text-base font-medium text-center",
                "absolute bottom-5 z-[2] m-0 w-full"
              )}>
                <BlogDate dateString={date} />
              </h2>
            </div>
          )}
          <PostContent
            className={cn(
              "[&_::selection]:bg-[#ff80bf] [&_::selection]:text-black [&_::selection]:[-webkit-text-fill-color:black]"
            )}
          >
            <PostContainer>
              {!image && (
                <div>
                  <h1 className={cn(
                    "text-primary mt-8 mx-auto max-w-none",
                    "text-5xl leading-[60px] text-center",
                    "bp2:mt-8 bp2:text-[72px] bp2:leading-[90px] bp2:max-w-[60%]"
                  )}>
                    {title}
                  </h1>
                  <h2 className={cn(
                    "text-secondary text-base m-[0_0_60px] text-center font-medium"
                  )}>
                    <BlogDate dateString={date} />
                  </h2>
                </div>
              )}

              {children}
            </PostContainer>
          </PostContent>
          </Main>
        </div>
        <Footer />
      </div>
    </SidebarNav>
  )
}

function Main(props) {
  return props.image ? (
    <Post>{props.children}</Post>
  ) : (
    <PostMain>{props.children}</PostMain>
  )
}
