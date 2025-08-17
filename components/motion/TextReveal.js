'use client'
import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * TextReveal
 * Animates text piece-by-piece.
 *
 * Props:
 *  - as: element tag (e.g., 'h1', 'p'), default 'div'
 *  - text: string
 *  - per: 'word' | 'char' | 'line', default 'word'
 *  - delay: base delay before starting, default 0
 *  - speed: delay between pieces (stagger), default 0.03
 *  - y, blur, duration, once, spring: same meaning as Reveal
 *  - className: string
 */
export default function TextReveal({
  as: As = 'div',
  text = '',
  per = 'word',
  delay = 0,
  speed = 0.03,
  y = 10,
  blur = 6,
  duration = 0.8,
  once = true,
  spring = true,
  className,
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
      <As className={className} {...rest}>
        {text}
      </As>
    )
  }

  // Split text based on mode
  let words = []
  if (per === 'char') {
    words = Array.from(text).map((char, i) => ({ type: 'char', content: char, index: i }))
  } else if (per === 'line') {
    words = text.split('\n').map((line, i) => ({ type: 'line', content: line, index: i }))
  } else {
    // Word mode - split by spaces but keep words and spaces separate
    const parts = text.split(' ')
    words = []
    parts.forEach((word, i) => {
      if (word.length > 0) {
        words.push({ type: 'word', content: word, index: words.length })
      }
      // Add space after each word except the last one
      if (i < parts.length - 1) {
        words.push({ type: 'space', content: ' ', index: words.length })
      }
    })
  }

  const hidden = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y, filter: `blur(${blur}px)` }

  const visible = prefersReducedMotion
    ? { opacity: 1, transition: { duration: 0.2 } }
    : {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: spring
          ? { type: 'spring', bounce: 0.25, duration }
          : { duration, ease: 'easeOut' },
      }

  return (
    <As className={className} {...rest}>
      {words.map((item, i) => {
        // For spaces, render as static spans
        if (item.type === 'space') {
          return (
            <span 
              key={`space-${i}`}
              style={{ 
                display: 'inline',
                whiteSpace: 'pre'
              }}
            >
              {item.content}
            </span>
          )
        }
        
        // For words/chars/lines, render as animated spans
        const animationIndex = per === 'word' 
          ? Math.floor(i / 2) // Every other item is a word in word mode
          : i
        
        return (
          <motion.span
            key={`${item.type}-${i}-${item.content}`}
            style={{ 
              display: per === 'line' ? 'block' : 'inline-block',
              whiteSpace: per === 'line' ? 'normal' : 'nowrap',
              willChange: 'transform, filter, opacity'
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.6 }}
            variants={{ hidden, visible }}
            transition={{ delay: delay + animationIndex * speed }}
          >
            {item.content}
          </motion.span>
        )
      })}
    </As>
  )
}