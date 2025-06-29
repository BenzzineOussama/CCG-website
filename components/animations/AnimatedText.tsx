'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  type?: 'word' | 'letter'
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.5,
  type = 'word'
}) => {
  const words = text.split(' ')
  const letters = text.split('')

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    })
  }

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration
      }
    }
  }

  if (type === 'letter') {
    return (
      <motion.span
        className={className}
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ display: 'inline-block' }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={child}
            style={{ display: 'inline-block' }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.span>
    )
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: 'inline-block' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default AnimatedText