'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02,
  },
}

const pageTransition = {
  type: "tween" as const,
  ease: [0.36, 0.66, 0.04, 1] as const,
  duration: 0.5,
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen"
      >
        {/* Page transition overlay */}
        <motion.div
          className="fixed inset-0 bg-ccg-green z-50 pointer-events-none"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ transformOrigin: "left" }}
        />
        
        <motion.div
          className="fixed inset-0 bg-ccg-green z-50 pointer-events-none"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
          style={{ transformOrigin: "right" }}
        />

        {/* Content */}
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Alternative slide transition
export function SlidePageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <AnimatePresence mode="wait" custom={1}>
      <motion.div
        key={pathname}
        custom={1}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Fade transition
export function FadePageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Scale transition
export function ScalePageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{
          duration: 0.4,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Rotate transition
export function RotatePageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, rotateY: 90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        exit={{ opacity: 0, rotateY: -90 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        style={{ transformStyle: "preserve-3d", perspective: 1200 }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}