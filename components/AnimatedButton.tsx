'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  icon?: ReactNode
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  className = '',
  ...props
}: AnimatedButtonProps) {
  const baseClasses = 'relative overflow-hidden font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2'
  
  const variantClasses = {
    primary: 'bg-ccg-green text-white hover:bg-green-600',
    secondary: 'bg-white text-ccg-dark border-2 border-ccg-dark hover:bg-gray-100',
    ghost: 'bg-transparent text-ccg-dark hover:bg-gray-100',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const widthClass = fullWidth ? 'w-full' : ''
  
  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={loading}
      {...props}
    >
      {/* Ripple effect on click */}
      <motion.span
        className="absolute inset-0 bg-white/30 rounded-lg"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformOrigin: 'center' }}
        key={Date.now()} // Force re-render on each click
      />
      
      {/* Hover glow effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: '-200%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      
      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="absolute inset-0 bg-black/20 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && (
          <motion.span
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.span>
        )}
        {children}
      </span>
    </motion.button>
  )
}

// Magnetic button variant
export function MagneticButton({ children, className = '', ...props }: AnimatedButtonProps) {
  return (
    <motion.button
      className={`relative px-8 py-4 bg-ccg-green text-white rounded-lg font-medium ${className}`}
      whileHover="hover"
      {...props}
    >
      <motion.span
        className="relative z-10"
        variants={{
          hover: {
            x: [0, -2, 2, -2, 2, 0],
            y: [0, 2, -2, 2, -2, 0],
            transition: { duration: 0.3 }
          }
        }}
      >
        {children}
      </motion.span>
      
      {/* Magnetic effect background */}
      <motion.span
        className="absolute inset-0 bg-green-600 rounded-lg"
        variants={{
          hover: {
            scale: 1.05,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }
        }}
      />
    </motion.button>
  )
}

// Morphing button variant
export function MorphingButton({ children, className = '', ...props }: AnimatedButtonProps) {
  return (
    <motion.button
      className={`relative px-8 py-4 bg-ccg-green text-white font-medium overflow-hidden ${className}`}
      whileHover="hover"
      style={{ borderRadius: '12px' }}
      {...props}
    >
      <motion.span
        className="absolute inset-0 bg-green-600"
        variants={{
          hover: {
            borderRadius: ['12px', '50%', '12px'],
            transition: { duration: 0.6, ease: "easeInOut" }
          }
        }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// Glitch button variant
export function GlitchButton({ children, className = '', ...props }: AnimatedButtonProps) {
  return (
    <motion.button
      className={`relative px-8 py-4 bg-ccg-green text-white rounded-lg font-medium ${className}`}
      whileHover="hover"
      {...props}
    >
      <motion.span
        className="relative z-10"
        variants={{
          hover: {
            x: [0, -2, 2, 0],
            filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(-90deg)', 'hue-rotate(0deg)'],
            transition: { duration: 0.3 }
          }
        }}
      >
        {children}
      </motion.span>
      
      {/* Glitch layers */}
      <motion.span
        className="absolute inset-0 bg-red-500 rounded-lg opacity-0"
        variants={{
          hover: {
            opacity: [0, 0.5, 0],
            x: [-2, 2, -2],
            transition: { duration: 0.3 }
          }
        }}
      />
      <motion.span
        className="absolute inset-0 bg-blue-500 rounded-lg opacity-0"
        variants={{
          hover: {
            opacity: [0, 0.5, 0],
            x: [2, -2, 2],
            transition: { duration: 0.3, delay: 0.1 }
          }
        }}
      />
    </motion.button>
  )
}

// 3D button variant
export function Button3D({ children, className = '', ...props }: AnimatedButtonProps) {
  return (
    <motion.button
      className={`relative px-8 py-4 bg-ccg-green text-white rounded-lg font-medium ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      whileHover={{
        rotateX: -10,
        rotateY: 10,
        scale: 1.05
      }}
      whileTap={{
        rotateX: -20,
        rotateY: 20,
        scale: 0.95
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {/* Shadow layer */}
      <motion.span
        className="absolute inset-0 bg-green-800 rounded-lg"
        style={{
          transform: 'translateZ(-10px)',
          filter: 'blur(10px)',
          opacity: 0.5
        }}
      />
      
      {/* Main button */}
      <span className="relative z-10">{children}</span>
      
      {/* Highlight */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 rounded-lg"
        style={{ transform: 'translateZ(5px)' }}
      />
    </motion.button>
  )
}