'use client'
import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Reveal
 * Smoothly fades in, un-blurs, and lifts content when it enters the viewport.
 *
 * Props:
 *  - as: string | React.Component (wrapper element), default 'div'
 *  - delay: number (seconds)
 *  - duration: number (seconds), default 1.5
 *  - y: number (px), default 12
 *  - blur: number (px), default 12
 *  - once: boolean, default true (animate only the first time it enters)
 *  - spring: boolean, default true (spring vs tween)
 *  - className: string
 *  - children
 */
export default function Reveal({
  as: As = 'div',
  delay = 0,
  duration = 1.5,
  y = 12,
  blur = 12,
  once = true,
  spring = true,
  className,
  children,
  ...rest
}) {
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't animate on server or before hydration
  if (!mounted) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }

  const hidden = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, filter: `blur(${blur}px)`, y }

  const visible = prefersReducedMotion
    ? { opacity: 1, transition: { duration: 0.3, delay } }
    : {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: spring
          ? { type: 'spring', bounce: 0.3, duration, delay }
          : { duration, ease: 'easeOut', delay },
      }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={{ hidden, visible }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}