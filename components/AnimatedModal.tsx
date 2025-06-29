'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface AnimatedModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  animation?: 'fade' | 'slide' | 'scale' | 'rotate' | 'flip'
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4'
}

const animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slide: {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  rotate: {
    initial: { opacity: 0, rotate: -180, scale: 0.8 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 180, scale: 0.8 }
  },
  flip: {
    initial: { opacity: 0, rotateX: -90 },
    animate: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: 90 }
  }
}

export default function AnimatedModal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  animation = 'scale',
  closeOnOverlayClick = true,
  showCloseButton = true
}: AnimatedModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} pointer-events-auto relative`}
              {...animations[animation]}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300
              }}
              style={animation === 'flip' ? { transformStyle: 'preserve-3d' } : {}}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between p-6 border-b">
                  {title && (
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-2xl font-bold text-ccg-dark"
                    >
                      {title}
                    </motion.h2>
                  )}
                  {showCloseButton && (
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors ml-auto"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              )}

              {/* Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-6"
              >
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Drawer variant
export function AnimatedDrawer({
  isOpen,
  onClose,
  children,
  title,
  position = 'right',
  size = 'md'
}: AnimatedModalProps & { position?: 'left' | 'right' | 'top' | 'bottom' }) {
  const drawerSizes = {
    sm: position === 'left' || position === 'right' ? 'w-80' : 'h-80',
    md: position === 'left' || position === 'right' ? 'w-96' : 'h-96',
    lg: position === 'left' || position === 'right' ? 'w-[32rem]' : 'h-[32rem]',
    xl: position === 'left' || position === 'right' ? 'w-[40rem]' : 'h-[40rem]',
    full: position === 'left' || position === 'right' ? 'w-full' : 'h-full'
  }

  const positionClasses = {
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full'
  }

  const slideAnimations = {
    left: { x: '-100%' },
    right: { x: '100%' },
    top: { y: '-100%' },
    bottom: { y: '100%' }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className={`fixed ${positionClasses[position]} ${drawerSizes[size as keyof typeof drawerSizes]} bg-white shadow-2xl z-50`}
            initial={slideAnimations[position]}
            animate={{ x: 0, y: 0 }}
            exit={slideAnimations[position]}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              {title && (
                <h2 className="text-2xl font-bold text-ccg-dark">{title}</h2>
              )}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors ml-auto"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Popover variant
export function AnimatedPopover({
  isOpen,
  onClose,
  children,
  anchorEl,
  placement = 'bottom'
}: {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  anchorEl?: HTMLElement | null
  placement?: 'top' | 'bottom' | 'left' | 'right'
}) {
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (anchorEl && isOpen) {
      const rect = anchorEl.getBoundingClientRect()
      const popoverWidth = 300 // Approximate width
      const popoverHeight = 200 // Approximate height

      let top = 0
      let left = 0

      switch (placement) {
        case 'top':
          top = rect.top - popoverHeight - 10
          left = rect.left + rect.width / 2 - popoverWidth / 2
          break
        case 'bottom':
          top = rect.bottom + 10
          left = rect.left + rect.width / 2 - popoverWidth / 2
          break
        case 'left':
          top = rect.top + rect.height / 2 - popoverHeight / 2
          left = rect.left - popoverWidth - 10
          break
        case 'right':
          top = rect.top + rect.height / 2 - popoverHeight / 2
          left = rect.right + 10
          break
      }

      // Keep within viewport
      top = Math.max(10, Math.min(top, window.innerHeight - popoverHeight - 10))
      left = Math.max(10, Math.min(left, window.innerWidth - popoverWidth - 10))

      setPosition({ top, left })
    }
  }, [anchorEl, isOpen, placement])

  const originMap = {
    top: 'bottom center',
    bottom: 'top center',
    left: 'right center',
    right: 'left center'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          {/* Popover */}
          <motion.div
            className="fixed z-50 bg-white rounded-lg shadow-xl p-4 w-[300px]"
            style={{
              top: position.top,
              left: position.left,
              transformOrigin: originMap[placement]
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300
            }}
          >
            {/* Arrow */}
            <div
              className={`absolute w-3 h-3 bg-white transform rotate-45 ${
                placement === 'top' ? 'bottom-[-6px] left-1/2 -translate-x-1/2' :
                placement === 'bottom' ? 'top-[-6px] left-1/2 -translate-x-1/2' :
                placement === 'left' ? 'right-[-6px] top-1/2 -translate-y-1/2' :
                'left-[-6px] top-1/2 -translate-y-1/2'
              }`}
              style={{
                boxShadow: placement === 'top' ? '2px 2px 2px rgba(0,0,0,0.1)' :
                           placement === 'bottom' ? '-2px -2px 2px rgba(0,0,0,0.1)' :
                           placement === 'left' ? '2px -2px 2px rgba(0,0,0,0.1)' :
                           '-2px 2px 2px rgba(0,0,0,0.1)'
              }}
            />

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Confirmation dialog variant
export function AnimatedConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  variant = 'primary'
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'primary' | 'danger'
}) {
  return (
    <AnimatedModal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      animation="scale"
      showCloseButton={false}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            variant === 'danger' ? 'bg-red-100' : 'bg-green-100'
          }`}
        >
          <span className={`text-2xl ${variant === 'danger' ? 'text-red-600' : 'text-green-600'}`}>
            {variant === 'danger' ? '!' : '?'}
          </span>
        </motion.div>

        <h3 className="text-xl font-bold text-ccg-dark mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className={`px-6 py-2 rounded-lg text-white transition-colors ${
              variant === 'danger'
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-ccg-green hover:bg-green-600'
            }`}
          >
            {confirmText}
          </motion.button>
        </div>
      </div>
    </AnimatedModal>
  )
}