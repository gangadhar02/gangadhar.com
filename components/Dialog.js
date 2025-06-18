import { styled } from '../stitches.config'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const StyledOverlay = styled(motion.div, {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  inset: 0,
  zIndex: 100,
})

const StyledContent = styled(motion.div, {
  backgroundColor: '#1a1a1a',
  borderRadius: '8px',
  boxShadow: '0px 4px 32px rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '600px',
  maxHeight: '85vh',
  padding: '24px',
  zIndex: 101,
  overflowY: 'auto',
})

const Title = styled('h2', {
  margin: 0,
  fontWeight: 500,
  fontSize: '20px',
  marginBottom: '8px',
  color: '#fff',
})

const Description = styled('p', {
  fontSize: '16px',
  color: '#888',
  marginBottom: '16px',
})

const CloseButton = styled('button', {
  position: 'absolute',
  top: '16px',
  right: '16px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  color: '#888',
  '&:hover': {
    opacity: 0.7,
  },
})

const Dialog = ({ trigger, title, subtitle, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <DialogPrimitive.Root>
        <DialogPrimitive.Trigger asChild>
          {trigger}
        </DialogPrimitive.Trigger>
      </DialogPrimitive.Root>
    )
  }

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        {trigger}
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <AnimatePresence>
          {isOpen && (
            <>
              <DialogPrimitive.Overlay asChild>
                <StyledOverlay
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </DialogPrimitive.Overlay>
              <DialogPrimitive.Content asChild>
                <StyledContent
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <Title>{title}</Title>
                  <Description>{subtitle}</Description>
                  {children}
                  <DialogPrimitive.Close asChild>
                    <CloseButton aria-label="Close">✕</CloseButton>
                  </DialogPrimitive.Close>
                </StyledContent>
              </DialogPrimitive.Content>
            </>
          )}
        </AnimatePresence>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export default Dialog 