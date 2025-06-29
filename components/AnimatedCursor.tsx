'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AnimatedCursorProps {
  color?: string
  size?: number
  sizeHover?: number
  mixBlendMode?: string
}

export default function AnimatedCursor({
  color = '#22C55E',
  size = 20,
  sizeHover = 40,
  mixBlendMode = 'difference'
}: AnimatedCursorProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - size / 2)
      cursorY.set(e.clientY - size / 2)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    // Hide default cursor
    document.body.style.cursor = 'none'

    // Add event listeners
    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseenter', handleMouseEnter, true)
    window.addEventListener('mouseleave', handleMouseLeave, true)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Handle hover on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [onclick], .cursor-pointer')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => setIsHovering(true))
      el.addEventListener('mouseleave', () => setIsHovering(false))
    })

    return () => {
      document.body.style.cursor = 'auto'
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseenter', handleMouseEnter, true)
      window.removeEventListener('mouseleave', handleMouseLeave, true)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [cursorX, cursorY, size])

  const currentSize = isHovering ? sizeHover : size
  const scale = isClicking ? 0.8 : 1

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0
        }}
      >
        <motion.div
          className="relative"
          animate={{
            width: currentSize,
            height: currentSize,
            scale
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: color,
              mixBlendMode: mixBlendMode as any
            }}
            animate={{
              scale: isHovering ? 1.2 : 1,
              rotate: isClicking ? 180 : 0
            }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          />

          {/* Inner dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: color,
              mixBlendMode: mixBlendMode as any
            }}
            animate={{
              scale: isHovering ? 2 : 1
            }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          />

          {/* Click ripple */}
          {isClicking && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                borderColor: color,
                borderWidth: '2px',
                borderStyle: 'solid'
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Trail effect */}
      <CursorTrail
        x={cursorXSpring}
        y={cursorYSpring}
        color={color}
        size={size}
        isVisible={isVisible}
      />
    </>
  )
}

// Cursor trail component
function CursorTrail({
  x,
  y,
  color,
  size,
  isVisible
}: {
  x: any
  y: any
  color: string
  size: number
  isVisible: boolean
}) {
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    let lastX = 0
    let lastY = 0

    const unsubscribeX = x.onChange((latest: number) => {
      lastX = latest
    })

    const unsubscribeY = y.onChange((latest: number) => {
      lastY = latest
    })

    const interval = setInterval(() => {
      setTrails(prev => {
        const newTrails = [{ x: lastX, y: lastY, id: Date.now() }, ...prev.slice(0, 5)]
        return newTrails
      })
    }, 50)

    return () => {
      unsubscribeX()
      unsubscribeY()
      clearInterval(interval)
    }
  }, [x, y])

  return (
    <>
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
          style={{
            x: trail.x + size / 2 - (size * 0.3) / 2,
            y: trail.y + size / 2 - (size * 0.3) / 2,
            width: size * 0.3,
            height: size * 0.3,
            backgroundColor: color,
            opacity: isVisible ? (1 - index * 0.2) * 0.3 : 0
          }}
          initial={{ scale: 1 }}
          animate={{ scale: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        />
      ))}
    </>
  )
}

// Magnetic cursor variant
export function MagneticCursor({ color = '#22C55E' }: { color?: string }) {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      if (!isHovering) {
        setTargetPos({ x: e.clientX, y: e.clientY })
      }
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('magnetic-cursor')
      ) {
        setIsHovering(true)
        setHoveredElement(target)
        const rect = target.getBoundingClientRect()
        setTargetPos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        })
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setHoveredElement(null)
    }

    document.body.style.cursor = 'none'

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseenter', handleMouseEnter, true)
    window.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      document.body.style.cursor = 'auto'
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter, true)
      window.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [isHovering])

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(targetPos.x - 20, springConfig)
  const y = useSpring(targetPos.y - 20, springConfig)

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] mix-blend-difference"
      style={{ x, y }}
    >
      <motion.div
        className="relative w-10 h-10 rounded-full border-2"
        style={{ borderColor: color }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderWidth: isHovering ? '3px' : '2px'
        }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ scale: isHovering ? 2 : 1 }}
        />
      </motion.div>
    </motion.div>
  )
}

// Glow cursor variant
export function GlowCursor({ color = '#22C55E' }: { color?: string }) {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    document.body.style.cursor = 'none'
    window.addEventListener('mousemove', moveCursor)

    return () => {
      document.body.style.cursor = 'auto'
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div
        className="relative w-6 h-6 rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 20px ${color}, 0 0 40px ${color}, 0 0 60px ${color}`
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: color,
            filter: 'blur(10px)'
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>
    </motion.div>
  )
}