'use client'

import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'shimmer'
}

export default function SkeletonLoader({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse'
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200 relative overflow-hidden'
  
  const variantClasses = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg'
  }
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: '',
    shimmer: ''
  }
  
  const style = {
    width: width || (variant === 'circular' ? '40px' : '100%'),
    height: height || (variant === 'circular' ? '40px' : variant === 'text' ? '16px' : '100px')
  }
  
  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    >
      {animation === 'shimmer' && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ translateX: '200%' }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      {animation === 'wave' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  )
}

// Card skeleton
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <SkeletonLoader variant="rectangular" height={200} className="mb-4" animation="shimmer" />
      <SkeletonLoader variant="text" width="60%" animation="pulse" />
      <SkeletonLoader variant="text" width="80%" animation="pulse" />
      <SkeletonLoader variant="text" width="40%" animation="pulse" />
      <div className="flex items-center justify-between mt-4">
        <SkeletonLoader variant="rounded" width={100} height={36} animation="pulse" />
        <SkeletonLoader variant="circular" width={32} height={32} animation="pulse" />
      </div>
    </div>
  )
}

// Service card skeleton
export function ServiceCardSkeleton() {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-8 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center mb-4">
        <SkeletonLoader variant="circular" width={80} height={80} animation="shimmer" />
      </div>
      <SkeletonLoader variant="text" width="70%" className="mx-auto" animation="pulse" />
      <div className="space-y-2">
        <SkeletonLoader variant="text" animation="wave" />
        <SkeletonLoader variant="text" animation="wave" />
        <SkeletonLoader variant="text" width="90%" animation="wave" />
      </div>
    </motion.div>
  )
}

// Text content skeleton
export function TextContentSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonLoader
          key={index}
          variant="text"
          width={index === lines - 1 ? '60%' : '100%'}
          animation="pulse"
        />
      ))}
    </div>
  )
}

// Table skeleton
export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 p-4 grid grid-cols-4 gap-4">
        {Array.from({ length: columns }).map((_, index) => (
          <SkeletonLoader key={index} variant="text" animation="pulse" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="p-4 grid grid-cols-4 gap-4 border-t">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <SkeletonLoader
              key={colIndex}
              variant="text"
              width={colIndex === 0 ? '80%' : '100%'}
              animation="wave"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// Profile skeleton
export function ProfileSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <SkeletonLoader variant="circular" width={64} height={64} animation="pulse" />
      <div className="flex-1 space-y-2">
        <SkeletonLoader variant="text" width="40%" animation="pulse" />
        <SkeletonLoader variant="text" width="60%" animation="pulse" />
      </div>
    </div>
  )
}

// Image gallery skeleton
export function GallerySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <SkeletonLoader
            variant="rounded"
            height={200}
            animation="shimmer"
            className="w-full"
          />
        </motion.div>
      ))}
    </div>
  )
}

// Form skeleton
export function FormSkeleton() {
  return (
    <div className="space-y-6">
      {/* Input fields */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <SkeletonLoader variant="text" width="30%" animation="pulse" />
          <SkeletonLoader variant="rounded" height={48} animation="wave" />
        </div>
      ))}
      
      {/* Textarea */}
      <div className="space-y-2">
        <SkeletonLoader variant="text" width="25%" animation="pulse" />
        <SkeletonLoader variant="rounded" height={120} animation="wave" />
      </div>
      
      {/* Submit button */}
      <SkeletonLoader variant="rounded" height={48} width="100%" animation="pulse" />
    </div>
  )
}

// List skeleton
export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, index) => (
        <motion.div
          key={index}
          className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <SkeletonLoader variant="circular" width={48} height={48} animation="pulse" />
          <div className="flex-1 space-y-2">
            <SkeletonLoader variant="text" width="60%" animation="wave" />
            <SkeletonLoader variant="text" width="40%" animation="wave" />
          </div>
          <SkeletonLoader variant="rounded" width={80} height={32} animation="pulse" />
        </motion.div>
      ))}
    </div>
  )
}