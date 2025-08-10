import React, { useState, useRef } from 'react'
import { cn } from '../lib/utils'

export default function Pronunciation() {
  const pronunciationAudio = useRef()
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePronunciation = () => {
    if (
      pronunciationAudio.current !== null &&
      pronunciationAudio.current.duration > 0 &&
      !pronunciationAudio.current.paused
    ) {
      setIsPlaying(false)
      pronunciationAudio.current.pause()
    } else {
      setIsPlaying(true)
      pronunciationAudio.current.play()
    }
  }

  return (
    <button
      role="button"
      aria-label="How to pronounce my name"
      onClick={togglePronunciation}
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
          `ri-${isPlaying ? 'pause' : 'play' }-circle-fill`
        )}
      />
      <audio
        src="/static/audio/pronunciation.mp3"
        ref={pronunciationAudio}
        onEnded={() => setIsPlaying(false)}
      />
    </button>
  )
}

