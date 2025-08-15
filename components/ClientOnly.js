import { useEffect, useState } from 'react'

/**
 * ClientOnly component - Prevents hydration errors by only rendering children on client-side
 * Use this wrapper for any component that:
 * - Uses browser APIs (window, document, localStorage, etc.)
 * - Has client-side only logic
 * - Causes hydration mismatches
 */
export default function ClientOnly({ children, fallback = null }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return fallback
  }

  return children
}

/**
 * Hook for checking if component has mounted (hydration-safe)
 * Use this in components that need to conditionally render based on client-side state
 */
export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

/**
 * Hook for safe browser API access
 * Use this instead of directly accessing window, localStorage, etc.
 */
export function useSafeBrowserAPI(callback, fallback = null) {
  const [result, setResult] = useState(fallback)
  const hasMounted = useHasMounted()

  useEffect(() => {
    if (hasMounted && typeof window !== 'undefined') {
      try {
        setResult(callback())
      } catch (error) {
        console.warn('Browser API access failed:', error)
        setResult(fallback)
      }
    }
  }, [hasMounted, callback, fallback])

  return result
}