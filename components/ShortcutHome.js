import { useKBar } from 'kbar'
import { useEffect, useState } from 'react'
import { ButtonPrimary } from '../components/ButtonPrimary'

export default function ShortcutHome() {
  const { query } = useKBar()
  const [mounted, setMounted] = useState(false)
  const [isMac, setIsMac] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof navigator !== 'undefined') {
      setIsMac(/(Mac)/i.test(navigator.userAgent))
      setIsMobile(/iPhone|iPad|Android/i.test(navigator.userAgent))
    }
  }, [])

  if (!mounted || !query) {
    return <div />
  }

  if (isMobile) {
    return null
  } else if (isMac) {
    return (
      <ButtonPrimary as="button" onClick={query.toggle}>
        Press <kbd>⌘</kbd> <kbd>K</kbd> to start →
      </ButtonPrimary>
    )
  } else {
    return (
      <ButtonPrimary as="button" onClick={query.toggle}>
        Press <kbd>ctrl</kbd> <kbd>K</kbd> to start →
      </ButtonPrimary>
    )
  }
}
