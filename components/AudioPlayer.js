import React, { useState, useRef } from 'react'
import { cn } from '../lib/utils'

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
    <div className={cn(
      "flex items-center gap-2 my-4 py-3 px-4 bg-hover rounded-lg",
      "border border-transparent transition-all duration-200 ease-in-out",
      "hover:bg-command hover:border-secondary group"
    )}>
      <button
        role="button"
        aria-label={label}
        onClick={toggleAudio}
        className={cn(
          "bg-transparent border-none text-primary cursor-pointer p-0",
          "transition-transform duration-200 ease-in-out",
          "hover:scale-110 hover:translate-z-0"
        )}
      >
        <i
          className={cn(
            "text-[28px] leading-8",
            `ri-${isPlaying ? 'pause' : 'play'}-circle-fill`
          )}
        />
      </button>
      <span className={cn(
        "text-secondary text-sm font-medium transition-colors duration-200 ease-in-out",
        "group-hover:text-primary"
      )}>
        {isPlaying ? 'Playing...' : 'Listen to a quick intro'}
      </span>
      <audio
        src={src}
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  )
}

