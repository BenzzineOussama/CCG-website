'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

interface NotificationProps {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  onClose?: () => void
}

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
}

const colorMap = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
}

const iconColorMap = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500'
}

export function Notification({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const Icon = iconMap[type]

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose?.(), 300)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose?.(), 300)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className={`relative flex items-start gap-3 p-4 rounded-lg border shadow-lg ${colorMap[type]} max-w-md`}
        >
          {/* Progress bar */}
          {duration > 0 && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-current opacity-20 rounded-b-lg"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
            />
          )}

          {/* Icon */}
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <Icon className={`w-6 h-6 ${iconColorMap[type]}`} />
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <h4 className="font-semibold">{title}</h4>
            {message && <p className="text-sm mt-1 opacity-90">{message}</p>}
          </div>

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClose}
            className="text-current opacity-60 hover:opacity-100 transition-opacity"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Notification container
export function NotificationContainer({ notifications }: { notifications: NotificationProps[] }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Toast notification variant
export function ToastNotification({
  type,
  title,
  message,
  duration = 3000,
  position = 'bottom-center'
}: NotificationProps & { position?: string }) {
  const [isVisible, setIsVisible] = useState(true)
  const Icon = iconMap[type]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: position.includes('top') ? -20 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position.includes('top') ? -20 : 20 }}
          className={`fixed ${positionClasses[position as keyof typeof positionClasses]} z-50`}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-lg ${
              type === 'success' ? 'bg-green-500' :
              type === 'error' ? 'bg-red-500' :
              type === 'warning' ? 'bg-yellow-500' :
              'bg-blue-500'
            } text-white`}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-5 h-5" />
            </motion.div>
            <div>
              <p className="font-medium">{title}</p>
              {message && <p className="text-sm opacity-90">{message}</p>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Snackbar notification variant
export function SnackbarNotification({
  type,
  title,
  action,
  onAction,
  duration = 4000
}: NotificationProps & { action?: string; onAction?: () => void }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto z-50"
        >
          <motion.div
            layout
            className={`flex items-center justify-between gap-4 p-4 rounded-lg shadow-lg ${
              type === 'success' ? 'bg-green-600' :
              type === 'error' ? 'bg-red-600' :
              type === 'warning' ? 'bg-yellow-600' :
              'bg-blue-600'
            } text-white`}
          >
            <p className="font-medium">{title}</p>
            {action && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAction}
                className="px-3 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors"
              >
                {action}
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Alert notification variant
export function AlertNotification({
  type,
  title,
  message,
  onClose
}: NotificationProps) {
  const Icon = iconMap[type]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`relative overflow-hidden rounded-lg border-2 ${
        type === 'success' ? 'border-green-500 bg-green-50' :
        type === 'error' ? 'border-red-500 bg-red-50' :
        type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
        'border-blue-500 bg-blue-50'
      }`}
    >
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 15px)`,
        }}
        animate={{ x: [0, 10], y: [0, 10] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative p-4 flex items-start gap-3">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Icon className={`w-6 h-6 ${iconColorMap[type]}`} />
        </motion.div>

        <div className="flex-1">
          <h4 className={`font-semibold ${
            type === 'success' ? 'text-green-800' :
            type === 'error' ? 'text-red-800' :
            type === 'warning' ? 'text-yellow-800' :
            'text-blue-800'
          }`}>{title}</h4>
          {message && (
            <p className={`text-sm mt-1 ${
              type === 'success' ? 'text-green-700' :
              type === 'error' ? 'text-red-700' :
              type === 'warning' ? 'text-yellow-700' :
              'text-blue-700'
            }`}>{message}</p>
          )}
        </div>

        {onClose && (
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className={`${
              type === 'success' ? 'text-green-600 hover:text-green-800' :
              type === 'error' ? 'text-red-600 hover:text-red-800' :
              type === 'warning' ? 'text-yellow-600 hover:text-yellow-800' :
              'text-blue-600 hover:text-blue-800'
            }`}
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}