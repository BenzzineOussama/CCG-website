'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 100)
  }

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // Observe all elements with animate-on-scroll class
    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  // Stagger animation variants for sections - minimaliste et élégant
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const sectionVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const navbarVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const heroVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <>
            {/* Animated Navbar */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={navbarVariants}
            >
              <Navbar />
            </motion.div>

            {/* Main content with staggered animations */}
            <motion.main
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              style={{ perspective: 1000 }}
            >
              {/* Hero with special entrance */}
              <motion.div variants={heroVariants}>
                <Hero />
              </motion.div>

              {/* TrustBar avec animation subtile */}
              <motion.div variants={sectionVariants}>
                <TrustBar />
              </motion.div>

              {/* Services avec fade simple */}
              <motion.div variants={sectionVariants}>
                <Services />
              </motion.div>

              {/* About avec fade et slide */}
              <motion.div variants={sectionVariants}>
                <About />
              </motion.div>

              {/* Contact avec fade simple */}
              <motion.div variants={sectionVariants}>
                <Contact />
              </motion.div>
            </motion.main>

            {/* Footer avec animation subtile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.9,
                ease: "easeOut"
              }}
            >
              <Footer />
            </motion.div>

            {/* Subtle fade overlay during entrance */}
            <motion.div
              className="fixed inset-0 pointer-events-none z-40 bg-white"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </>
        )}
      </AnimatePresence>
    </>
  )
}