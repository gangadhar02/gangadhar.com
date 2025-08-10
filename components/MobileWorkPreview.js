import Link from 'next/link'
import { cn } from '../lib/utils'
import workItems from '../data/work'

export default function MobileWorkPreview() {
  const currentWork = workItems[0] // Get the most recent work item (Demandlane)

  return (
    <div className={cn(
      "hidden bp3:flex bp3:flex-col bp3:gap-4 bp3:mt-12 bp3:w-full"
    )}>
      <h3 className={cn(
        "text-2xl font-semibold text-primary m-0 mb-4 text-left"
      )}>
        Current Work
      </h3>
      <div className={cn(
        "bg-background border border-secondary rounded-xl p-5",
        "flex items-center gap-4 transition-all duration-200",
        "min-h-[120px] w-full hover:-translate-y-0.5",
        "hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
      )}>
        <div className={cn(
          "w-[60px] h-[60px] flex-shrink-0 flex items-center justify-center",
          "bg-white rounded-lg p-2"
        )}>
          <img 
            src={currentWork.companyLogo} 
            alt={currentWork.company}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className={cn(
          "flex-1 flex flex-col gap-[6px] min-w-0 overflow-hidden"
        )}>
          <h4 className={cn(
            "text-lg font-semibold text-primary m-0 leading-[1.3]"
          )}>
            {currentWork.jobTitle}
          </h4>
          <p className={cn(
            "text-[0.9rem] text-secondary my-0.5 mx-0 font-medium"
          )}>
            {currentWork.company}
          </p>
          <p className={cn(
            "text-[0.85rem] text-secondary mt-[6px] mb-0 mx-0 leading-[1.4]",
            "[-webkit-line-clamp:2] [-webkit-box-orient:vertical]",
            "[display:-webkit-box] overflow-hidden"
          )}>
            {currentWork.description[0]}
          </p>
        </div>
      </div>
      <Link href="/work" passHref>
        <a className={cn(
          "bg-hover text-primary border border-secondary rounded-lg",
          "py-3 px-6 no-underline font-medium text-center",
          "transition-all duration-200 cursor-pointer",
          "hover:bg-primary hover:text-background hover:-translate-y-px"
        )}>
          View All Work
        </a>
      </Link>
    </div>
  )
}

