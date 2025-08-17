'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'

/**
 * Stagger
 * Orchestrates a group reveal: first the container, then each child in sequence.
 *
 * Props:
 *  - as: wrapper element, default 'div'
 *  - stagger: number (seconds between children), default 0.05
 *  - delayChildren: number (seconds before children start), default 0
 *  - once: boolean, default true
 *  - childProps: props to pass to each child Reveal (e.g., { y: 16, duration: 1.2 })
 */
export function Stagger({
  as: As = 'div',
  stagger = 0.05,
  delayChildren = 0,
  once = true,
  childProps = {},
  className,
  children,
  ...rest
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const items = React.Children.toArray(children)

  // Don't animate on server or before hydration
  if (!mounted) {
    return (
      <div className={className} {...rest}>
        {items.map((child, i) => (
          <div key={i}>
            {child}
          </div>
        ))}
      </div>
    )
  }

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={container}
      className={className}
      {...rest}
    >
      {items.map((child, i) => (
        <Reveal key={i} {...childProps}>
          {child}
        </Reveal>
      ))}
    </motion.div>
  )
}