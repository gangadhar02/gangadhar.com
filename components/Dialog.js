import * as DialogPrimitive from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { cn } from '../lib/utils'


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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-black/50 fixed inset-0 z-[100]"
                />
              </DialogPrimitive.Overlay>
              <DialogPrimitive.Content asChild>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className={cn(
                    "bg-[#1a1a1a] rounded-lg shadow-[0px_4px_32px_rgba(0,0,0,0.1)]",
                    "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                    "w-[90vw] max-w-[600px] max-h-[85vh] p-6 z-[101] overflow-y-auto"
                  )}
                >
                  <h2 className="m-0 font-medium text-xl mb-2 text-white">{title}</h2>
                  <p className="text-base text-[#888] mb-4">{subtitle}</p>
                  {children}
                  <DialogPrimitive.Close asChild>
                    <button 
                      aria-label="Close"
                      className={cn(
                        "absolute top-4 right-4 bg-none border-none cursor-pointer",
                        "p-1 text-[#888] hover:opacity-70"
                      )}
                    >
                      ✕
                    </button>
                  </DialogPrimitive.Close>
                </motion.div>
              </DialogPrimitive.Content>
            </>
          )}
        </AnimatePresence>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export default Dialog 