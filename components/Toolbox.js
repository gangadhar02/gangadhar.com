import { motion } from 'framer-motion'
import {
  SiMeta,
  SiGoogleads,
  SiFramer,
  SiGooglesheets,
  SiMidjourney,
  SiOpenai,
  SiAnthropic,
  SiNotion,
} from 'react-icons/si'
import { RiVideoLine, RiSearchLine } from 'react-icons/ri'
import { cn } from '../lib/utils'

const tools = [
  { name: 'Meta Ads', icon: SiMeta, color: '#1877F2' },
  { name: 'Google Ads', icon: SiGoogleads, color: '#4285F4' },
  { name: 'Motion', icon: SiFramer, color: '#0055FF' },
  { name: 'Google Sheets', icon: SiGooglesheets, color: '#34A853' },
  { name: 'Mid Journey', icon: SiMidjourney, color: '#000000' },
  { name: 'Kling', icon: RiVideoLine, color: '#FF6B6B' },
  { name: 'ChatGPT', icon: SiOpenai, color: '#74AA9C' },
  { name: 'Claude', icon: SiAnthropic, color: '#D97706' },
  { name: 'Perplexity', icon: RiSearchLine, color: '#20B2AA' },
  { name: 'Notion', icon: SiNotion, color: '#000000' },
]

export default function Toolbox() {
  return (
    <div className="mt-8">
      <h2>My Tools</h2>
      <div className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-8 mt-8"
      )}>
        {tools.map((tool, index) => {
          if (!tool.icon) return null
          const IconComponent = tool.icon
          return (
            <motion.div 
              key={index} 
              whileHover={{ scale: 1.1 }}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-xl",
                "bg-hover transition-colors duration-300 ease-in-out",
                "hover:bg-background"
              )}
            >
              <div 
                className={cn(
                  "text-[2.5rem] mb-2 scale-90 transition-transform duration-300 ease-in-out",
                  "[&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-in-out",
                  "hover:[&_svg]:rotate-[360deg]"
                )}
                style={{ color: tool.color }}
              >
                <IconComponent size={40} />
              </div>
              <span className="text-[0.9rem] text-secondary text-center">
                {tool.name}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

