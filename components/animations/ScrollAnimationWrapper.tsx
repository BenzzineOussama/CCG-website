'use client'

import React, { useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

interface ScrollAnimationWrapperProps {
  children: React.ReactNode
  className?: string
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate'
  delay?: number
  duration?: number
  once?: boolean
}

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  once = true
}) => {
  const controls = useAnimation()
  const ref = React.useRef(null)
  const isInView = useInView(ref, { 
    once, 
    margin: "-100px",
    amount: 0.3
  })

  const animations = {
    fadeUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    slideLeft: {
      hidden: { opacity: 0, x: -100 },
      visible: { opacity: 1, x: 0 }
    },
    slideRight: {
      hidden: { opacity: 0, x: 100 },
      visible: { opacity: 1, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    rotate: {
      hidden: { opacity: 0, rotate: -180 },
      visible: { opacity: 1, rotate: 0 }
    }
  }

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else if (!once) {
      controls.start('hidden')
    }
  }, [controls, isInView, once])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={animations[animation]}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
        type: animation === 'rotate' ? 'spring' : 'tween'
      }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollAnimationWrapper