import React, { useState, useRef } from 'react'
import { cn } from '../lib/utils'

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
    <button
      role="button"
      aria-label="Listen to Gangadhar's audio introduction"
      onClick={toggleAudio}
      className={cn(
        "bg-transparent border-none text-primary cursor-pointer",
        "mx-1 p-0 relative top-[5px] transform-none",
        "transition-transform duration-200 ease-in-out",
        "hover:scale-110 hover:translate-z-0"
      )}
    >
      <i
        className={cn(
          "text-2xl leading-8",
          `ri-${isPlaying ? 'pause' : 'play'}-circle-fill`
        )}
      />
      <audio
        src="/static/audio/Gangadhar.m4a"
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
      />
    </button>
  )
}

