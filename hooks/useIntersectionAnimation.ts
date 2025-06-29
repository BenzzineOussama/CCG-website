'use client'

import { useEffect, useRef, useState, RefObject } from 'react'
import { useInView } from 'framer-motion'

interface IntersectionAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}

export function useIntersectionAnimation<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionAnimationOptions = {}
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const isInView = useInView(ref, {
    once: options.triggerOnce ?? true,
    margin: (options.rootMargin ?? '-100px') as any,
    amount: options.threshold ?? 0.3
  })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      if (options.delay) {
        const timer = setTimeout(() => {
          setHasAnimated(true)
        }, options.delay)
        return () => clearTimeout(timer)
      } else {
        setHasAnimated(true)
      }
    }
  }, [isInView, hasAnimated, options.delay])

  return [ref, options.triggerOnce ? hasAnimated : isInView]
}

// Hook for staggered animations
export function useStaggeredAnimation<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  options: IntersectionAnimationOptions = {}
): Array<[RefObject<T>, boolean, number]> {
  const refs = useRef<Array<RefObject<T>>>([])
  const [animatedItems, setAnimatedItems] = useState<boolean[]>(new Array(itemCount).fill(false))

  // Initialize refs
  if (refs.current.length !== itemCount) {
    refs.current = Array(itemCount).fill(null).map(() => useRef<T>(null))
  }

  useEffect(() => {
    const observers = refs.current.map((ref, index) => {
      if (!ref.current) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setAnimatedItems(prev => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * 100 + (options.delay || 0))

              if (options.triggerOnce) {
                observer.disconnect()
              }
            } else if (!options.triggerOnce) {
              setAnimatedItems(prev => {
                const newState = [...prev]
                newState[index] = false
                return newState
              })
            }
          })
        },
        {
          threshold: options.threshold || 0.3,
          rootMargin: options.rootMargin || '-100px'
        }
      )

      observer.observe(ref.current)
      return observer
    })

    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [itemCount, options])

  return refs.current.map((ref, index) => [ref, animatedItems[index], index])
}

// Hook for parallax animations
export function useParallaxAnimation<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.5
): [RefObject<T>, number] {
  const ref = useRef<T>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      const elementHeight = rect.height

      // Calculate how far through the viewport the element is
      const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight)
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress))

      // Apply speed multiplier
      setOffset((clampedProgress - 0.5) * 100 * speed)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [speed])

  return [ref, offset]
}

// Hook for reveal animations with different directions
export function useRevealAnimation<T extends HTMLElement = HTMLDivElement>(
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  options: IntersectionAnimationOptions = {}
): [RefObject<T>, boolean, { x: number; y: number }] {
  const [ref, isVisible] = useIntersectionAnimation<T>(options)

  const initialPosition = {
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 }
  }

  const position = isVisible ? { x: 0, y: 0 } : initialPosition[direction]

  return [ref, isVisible, position]
}

// Hook for scale animations
export function useScaleAnimation<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionAnimationOptions & { initialScale?: number } = {}
): [RefObject<T>, boolean, number] {
  const [ref, isVisible] = useIntersectionAnimation<T>(options)
  const scale = isVisible ? 1 : (options.initialScale ?? 0.8)

  return [ref, isVisible, scale]
}

// Hook for rotation animations
export function useRotateAnimation<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionAnimationOptions & { initialRotation?: number } = {}
): [RefObject<T>, boolean, number] {
  const [ref, isVisible] = useIntersectionAnimation<T>(options)
  const rotation = isVisible ? 0 : (options.initialRotation ?? -180)

  return [ref, isVisible, rotation]
}

// Hook for counting animations
export function useCountAnimation(
  endValue: number,
  duration: number = 2000,
  startValue: number = 0
): number {
  const [count, setCount] = useState(startValue)
  const [ref, isVisible] = useIntersectionAnimation({ triggerOnce: true })

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const endTime = startTime + duration

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      // Easing function (ease-out-expo)
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutExpo)
      setCount(currentCount)

      if (now < endTime) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isVisible, endValue, duration, startValue])

  return count
}

// Hook for typewriter animations
export function useTypewriterAnimation(
  text: string,
  speed: number = 50,
  startDelay: number = 0
): [RefObject<HTMLDivElement>, string] {
  const [ref, isVisible] = useIntersectionAnimation({ triggerOnce: true })
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    if (!isVisible) return

    let currentIndex = 0
    setDisplayedText('')

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(startTimeout)
  }, [isVisible, text, speed, startDelay])

  return [ref, displayedText]
}