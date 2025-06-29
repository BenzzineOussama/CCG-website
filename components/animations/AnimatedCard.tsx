'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  index?: number
  enableTilt?: boolean
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  index = 0,
  enableTilt = true
}) => {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  )
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      whileHover={enableTilt ? { scale: 1.02 } : { scale: 1.05 }}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(34, 197, 94, 0.3), transparent 40%)',
          '--mouse-x': useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']),
          '--mouse-y': useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%'])
        } as any}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content with depth */}
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
      </motion.div>
    </motion.div>
  )
}

export default AnimatedCard