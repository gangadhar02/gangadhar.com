import React, { useState, useRef } from 'react'
import { styled } from '../stitches.config'

export default function AudioPlayer({ src, label = "Listen to audio" }) {
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
    <AudioContainer>
      <AudioButton
        role="button"
        aria-label={label}
        onClick={toggleAudio}
      >
        <PlayIcon
          className={`ri-${isPlaying ? 'pause' : 'play'}-circle-fill`}
        />
      </AudioButton>
      <AudioLabel>
        {isPlaying ? 'Playing...' : 'Listen to a quick intro'}
      </AudioLabel>
      <audio
        src={src}
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
      />
    </AudioContainer>
  )
}

const AudioContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  margin: '16px 0',
  padding: '12px 16px',
  backgroundColor: '$hover',
  borderRadius: '$borderRadius',
  border: '1px solid transparent',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: '$command',
    border: '1px solid $secondary',
  },
})

const AudioButton = styled('button', {
  background: 'transparent',
  border: 'none',
  color: '$primary',
  cursor: 'pointer',
  padding: '0',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': { 
    transform: 'scale(1.1) translateZ(0)',
  },
})

const PlayIcon = styled('i', {
  fontSize: '28px',
  lineHeight: '32px',
})

const AudioLabel = styled('span', {
  color: '$secondary',
  fontSize: '14px',
  fontWeight: 500,
  transition: 'color 0.2s ease-in-out',
  '$AudioContainer:hover &': {
    color: '$primary',
  },
})