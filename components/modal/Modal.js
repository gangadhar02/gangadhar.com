import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { cn } from '../../lib/utils'

export function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className={cn(
            "fixed inset-0 bg-black/60 flex items-center justify-center",
            "z-[1000] p-5"
          )}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            onClick={e => e.stopPropagation()}
            className={cn(
              "relative bg-background rounded-lg w-full max-w-[700px]",
              "max-h-[90vh] overflow-hidden flex flex-col",
              "shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            )}
          >
            <button 
              onClick={onClose}
              className={cn(
                "absolute top-5 right-5 bg-none border-none text-[28px]",
                "leading-none text-secondary cursor-pointer p-[5px] z-10",
                "transition-colors duration-200 ease-in-out hover:text-primary"
              )}
            >
              &times;
            </button>
            <div className={cn(
              "pt-[60px] pb-10 px-10 overflow-y-auto overflow-x-hidden",
              "flex-1 min-h-0"
            )}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

