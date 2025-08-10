import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '../lib/utils'
import BlogDate from './BlogDate'

export default function ListItem(props) {
  if (props.href.charAt(0) === '/') {
    return (
      <li className="border-b border-hover last:border-0">
        <Link href={props.href} passHref>
          <a className="no-underline">
            <Animation index={props.index} isArticle={true}>
              <span className="block max-w-[500px] font-bold text-lg leading-10 text-left">
                {props.title}
              </span>
              <span className="text-secondary block font-medium text-sm min-w-[100px] text-left bp2:text-right">
                <BlogDate dateString={props.date} />
              </span>
            </Animation>
          </a>
        </Link>
      </li>
    )
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: (props.animationIndex ?? props.index) * 0.05,
        duration: 0.4,
        type: 'spring',
        stiffness: 60,
      }}
      style={{ listStyle: 'none' }}
    >
      <li className="border-b border-hover last:border-0">
        <a href={props.href} target="_blank" className="no-underline">
          <Animation index={props.index}>
            <span className="block max-w-[500px] font-bold text-lg leading-10 text-left">
              {props.title}
            </span>
            <span className="text-2xl">
              <i className="ri-arrow-right-up-line"></i>
            </span>
          </Animation>
        </a>
      </li>
    </motion.li>
  )
}

function Animation({ index, children, isArticle = false }) {
  const [hovered, setHovered] = useState('')
  const isHovered = hovered === index

  return (
    <motion.span
      className={cn(
        "border-0 text-secondary cursor-pointer flex justify-between py-5 w-full",
        "opacity-100 transition-all duration-200 ease-in-out no-underline relative",
        "hover:text-primary",
        isArticle && "flex-col bp2:flex-row"
      )}
      onHoverStart={() => setHovered(index)}
      onHoverEnd={() => setHovered('')}
    >
      {isHovered && (
        <motion.span
          className="absolute -top-px -left-5 -right-5 -bottom-px bg-hover rounded-lg -z-10"
          layoutId="listItem"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {children}
    </motion.span>
  )
}