'use client'

import React, { useState, useEffect } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import { motion, AnimatePresence, Variants, useScroll, useTransform, useSpring } from 'framer-motion'
import Logo from './Logo'

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      
      // Update active section based on scroll position
      const sections = ['hero', 'services', 'about', 'contact']
      const scrollPosition = window.scrollY + 100
      
      // Check if at top of page for hero section
      if (window.scrollY < 100) {
        setActiveSection('hero')
      } else {
        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section)
              break
            }
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#hero', label: 'Accueil', id: 'hero' },
    { href: '#services', label: 'Services', id: 'services' },
    { href: '#about', label: 'Qui sommes-nous', id: 'about' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ]

  const navVariants: Variants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20
      }
    }
  }

  const linkVariants: Variants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    }
  }

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Animation */}
          <motion.a 
            href="/" 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo width={160} height={48} className="text-ccg-dark" />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                className="relative"
                variants={linkVariants}
                whileHover="hover"
              >
                <a
                  href={link.href}
                  className={`text-ccg-dark hover:text-ccg-green transition-colors duration-200 font-medium ${
                    activeSection === link.id ? 'text-ccg-green' : ''
                  }`}
                >
                  {link.label}
                </a>
                
                {/* Active Indicator */}
                <AnimatePresence>
                  {activeSection === link.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ccg-green"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
                
                {/* Hover Indicator */}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ccg-green/30"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA Button with Advanced Animation */}
          <div className="hidden md:block">
            <motion.a
              href="tel:+33624950171"
              className="btn-primary flex items-center space-x-2 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Phone className="w-5 h-5 relative z-10" />
              </motion.div>
              <span className="relative z-10">Appeler Maintenant</span>
              
              {/* Ripple Effect */}
              <motion.div
                className="absolute inset-0 bg-green-600"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0.5, originY: 0.5 }}
              />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 relative"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-ccg-dark" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-ccg-dark" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu with Smooth Animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="px-4 py-6 space-y-4"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-ccg-dark hover:text-ccg-green transition-colors duration-200 font-medium py-2 ${
                      activeSection === link.id ? 'text-ccg-green' : ''
                    }`}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="tel:+33624950171"
                  className="btn-primary flex items-center justify-center space-x-2 w-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5" />
                  <span>Appeler Maintenant</span>
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Elegant Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-100/20 to-gray-200/20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Main Progress Bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-ccg-green via-emerald-400 to-ccg-green origin-left relative"
          style={{
            scaleX,
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)'
          }}
        >
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
            animate={{
              x: ['-200%', '200%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1
            }}
          />
          
          {/* Edge Glow */}
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/50 via-emerald-300/50 to-transparent"
            style={{
              filter: 'blur(8px)'
            }}
          />
        </motion.div>
        
        {/* Progress Indicator Dot */}
        <motion.div
          className="absolute top-1/2 h-3 w-3 bg-white rounded-full shadow-lg"
          style={{
            left: useTransform(scaleX, [0, 1], ['0%', '100%']),
            x: '-50%',
            y: '-50%',
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.4)'
          }}
        >
          {/* Inner Pulse */}
          <motion.div
            className="absolute inset-0 bg-ccg-green rounded-full"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Progress Percentage (optional, hidden by default) */}
        <motion.div
          className="absolute top-0 right-4 -translate-y-full mb-2 text-xs text-ccg-green font-medium opacity-0 hover:opacity-100 transition-opacity"
          style={{
            content: useTransform(scaleX, (value) => `${Math.round(value * 100)}%`)
          }}
        >
          <motion.span>
            {useTransform(scaleX, (value) => `${Math.round(value * 100)}%`)}
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar