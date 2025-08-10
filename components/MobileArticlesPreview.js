import Link from 'next/link'
import { cn } from '../lib/utils'

export default function MobileArticlesPreview() {
  // Featured articles data - using the most recent/important ones
  const featuredArticles = [
    {
      title: "Made a Email Subject Line Checker",
      description: "Building an AI-powered tool to optimize email subject lines and improve open rates through data-driven insights.",
      date: "Nov 15, 2024",
      slug: "email-subject-line-checker-experiment"
    },
    {
      title: "UTM Generator with Claude",
      description: "How I built a comprehensive UTM parameter generator using Claude AI to streamline marketing campaign tracking.",
      date: "Nov 10, 2024",
      slug: "utm-generator-with-claude"
    }
  ]

  return (
    <div className={cn(
      "hidden bp3:flex bp3:flex-col bp3:gap-4 bp3:mt-12 bp3:w-full"
    )}>
      <h3 className={cn(
        "text-2xl font-semibold text-primary m-0 mb-4 text-left"
      )}>
        Recent Articles
      </h3>
      <div className="flex flex-col gap-3">
        {featuredArticles.map((article, index) => (
          <Link href={`/articles/${article.slug}`} key={index} passHref>
            <a className={cn(
              "bg-background border border-secondary rounded-xl p-4",
              "flex items-center gap-3 no-underline transition-all duration-200",
              "cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
              "hover:border-primary"
            )}>
              <div className="flex-1 flex flex-col gap-1">
                <h4 className={cn(
                  "text-base font-semibold text-primary m-0 leading-[1.3]"
                )}>
                  {article.title}
                </h4>
                <p className={cn(
                  "text-[0.8rem] text-secondary my-1 mx-0 leading-[1.4]",
                  "[-webkit-line-clamp:2] [-webkit-box-orient:vertical]",
                  "[display:-webkit-box] overflow-hidden"
                )}>
                  {article.description}
                </p>
                <span className={cn(
                  "text-[0.75rem] text-secondary font-normal mt-1"
                )}>
                  {article.date}
                </span>
              </div>
              <i className={cn(
                "ri-arrow-right-line text-xl text-secondary flex-shrink-0",
                "transition-all duration-200 hover:text-primary hover:translate-x-1"
              )} />
            </a>
          </Link>
        ))}
      </div>
      <Link href="/articles" passHref>
        <a className={cn(
          "bg-hover text-primary border border-secondary rounded-lg",
          "py-3 px-6 no-underline font-medium text-center",
          "transition-all duration-200 cursor-pointer",
          "hover:bg-primary hover:text-background hover:-translate-y-px"
        )}>
          View All Articles
        </a>
      </Link>
    </div>
  )
}

