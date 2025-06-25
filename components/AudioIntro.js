import React, { useState, useRef } from 'react'
import { styled } from '../stitches.config'

export default function AudioIntro() {
  const audioRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleAudio = () => {
    if (
      audioRef.current !== null &&
      audioRef.current.duration > 0 &&
      !audioRef.current.paused
    ) {
      setIsPlaying(false)
      audioRef.current.pause()
    } else {
      setIsPlaying(true)
      audioRef.current.play()
    }
  }

  return (
    <Button
      role="button"
      aria-label="Listen to Gangadhar's audio introduction"
      onClick={toggleAudio}
    >
      <Icon
        className={`ri-${isPlaying ? 'pause' : 'play'}-circle-fill`}
      />
      <audio
        src="/static/audio/Gangadhar.m4a"
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
      />
    </Button>
  )
}

const Button = styled('button', {
  background: 'transparent',
  border: 'none',
  color: '$primary',
  cursor: 'pointer',
  margin: '0 4px',
  padding: '0',
  position: 'relative',
  top: '5px',
  transform: 'none',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': { transform: 'scale(1.1) translateZ(0)' },
})

const Icon = styled('i', {
  fontSize: '24px',
  lineHeight: '32px'
})