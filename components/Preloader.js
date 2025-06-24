import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { styled } from '../stitches.config'

const words = [
  'Hello',        // English
  'నమస్కారం',      // Telugu (Namaskāram)
  'ನಮಸ್ಕಾರ',       // Kannada (Namaskāra)
  'नमस्ते',        // Hindi
  'வணக்கம்',       // Tamil
  'Bonjour',      // French
  'Hola',         // Spanish
]

const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 },
  },
}

const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: '-100vh',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
}

const PreloaderContainer = styled(motion.div, {
  position: 'fixed',
  inset: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#000',
  zIndex: 99999999999,
})

const PreloaderText = styled(motion.p, {
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  fontSize: '2.25rem',
  position: 'absolute',
  zIndex: 10,
  fontWeight: 500,
  fontFamily: '$heading',
  '@bp1': {
    fontSize: '3rem',
  },
  '@bp2': {
    fontSize: '3.75rem',
  },
})

const Dot = styled('span', {
  display: 'block',
  width: '10px',
  height: '10px',
  backgroundColor: 'white',
  borderRadius: '50%',
  marginRight: '10px',
})

const SVGContainer = styled('svg', {
  position: 'absolute',
  top: 0,
  width: '100%',
  height: 'calc(100% + 300px)',
})

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    if (index === words.length - 1) {
      // Start exit animation after showing the last word
      setTimeout(() => {
        setIsExiting(true)
        // Call onComplete after exit animation
        setTimeout(() => {
          onComplete?.()
        }, 1000)
      }, 1000)
      return
    }

    setTimeout(
      () => {
        setIndex(index + 1)
      },
      index === 0 ? 1000 : 150,
    )
  }, [index, onComplete])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  }

  return (
    <PreloaderContainer
      variants={slideUp}
      initial="initial"
      animate={isExiting ? 'exit' : 'initial'}
    >
      {dimension.width > 0 && (
        <>
          <PreloaderText
            variants={opacity}
            initial="initial"
            animate="enter"
          >
            <Dot />
            {words[index]}
          </PreloaderText>
          <SVGContainer>
            <motion.path 
              variants={curve} 
              initial="initial" 
              animate={isExiting ? 'exit' : 'initial'} 
              fill="#08070b" 
            />
          </SVGContainer>
        </>
      )}
    </PreloaderContainer>
  )
}