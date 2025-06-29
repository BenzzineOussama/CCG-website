'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

interface ParticleBackgroundProps {
  particleCount?: number
  color?: string
  maxSize?: number
  speed?: number
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 50,
  color = '#22C55E',
  maxSize = 4,
  speed = 0.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles.current = []
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * maxSize + 1,
          opacity: Math.random() * 0.5 + 0.2
        })
      }
    }

    const drawParticle = (particle: Particle) => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = `${color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`
      ctx.fill()
    }

    const connectParticles = () => {
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x
          const dy = particles.current[i].y - particles.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particles.current[i].x, particles.current[i].y)
            ctx.lineTo(particles.current[j].x, particles.current[j].y)
            ctx.strokeStyle = `${color}${Math.floor((1 - distance / 150) * 0.2 * 255).toString(16).padStart(2, '0')}`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const updateParticles = () => {
      particles.current.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse interaction
        const dx = mousePos.current.x - particle.x
        const dy = mousePos.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx -= (dx / distance) * force * 0.2
          particle.vy -= (dy / distance) * force * 0.2
        }

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Limit velocity
        const maxVelocity = 2
        particle.vx = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vx))
        particle.vy = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vy))
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      updateParticles()
      connectParticles()
      
      particles.current.forEach(particle => {
        drawParticle(particle)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    resizeCanvas()
    createParticles()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      createParticles()
    })
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [particleCount, color, maxSize, speed])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{ zIndex: 0 }}
    />
  )
}

export default ParticleBackground