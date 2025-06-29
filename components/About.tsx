'use client'

import React, { useRef } from 'react'
import { CheckCircle, Award, Users, Clock } from 'lucide-react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring, useInView, Variants } from 'framer-motion'
import AnimatedCounter from './animations/AnimatedCounter'
import AnimatedText from './animations/AnimatedText'
import ScrollAnimationWrapper from './animations/ScrollAnimationWrapper'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const About: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Smooth spring animations for parallax
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), springConfig)
  const imageScale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.9]), springConfig)
  const imageRotate = useSpring(useTransform(scrollYProgress, [0, 1], [-2, 2]), springConfig)
  
  // Background elements parallax
  const bgY1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), springConfig)
  const bgY2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), springConfig)

  const values = [
    { icon: Award, text: "Artisan local et passionné", color: "text-ccg-green" },
    { icon: Clock, text: "Respect des délais garantis", color: "text-blue-500" },
    { icon: CheckCircle, text: "Devis clairs et transparents", color: "text-purple-500" },
    { icon: Users, text: "Satisfaction client comme priorité absolue", color: "text-orange-500" }
  ]

  const stats = [
    { value: 10, suffix: '+', label: "Années d'expérience" },
    { value: 500, suffix: '+', label: "Clients satisfaits" },
    { value: 6, suffix: 'j/7', label: "Disponibilité" }
  ]

  // Enhanced animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  }

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden" ref={ref}>
      {/* Enhanced Background Elements */}
      {!prefersReducedMotion && (
        <>
          <motion.div 
            className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-ccg-green/10 to-blue-500/10 rounded-full blur-3xl"
            style={{ y: bgY1 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
            style={{ y: bgY2 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          {/* Floating particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-ccg-green/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 10, 0],
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </>
      )}

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Image Column */}
          <motion.div 
            ref={imageRef}
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <motion.div
              className="relative h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={!prefersReducedMotion ? { 
                y: imageY,
                scale: imageScale,
                rotate: imageRotate
              } : {}}
            >
              {/* Gradient overlay with animation */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-ccg-green/30 via-transparent to-blue-500/20 z-10"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Main image */}
              <Image
                src="/CCG.png"
                alt="C-C-G Plomberie - Artisan professionnel"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Animated badge */}
              <motion.div 
                className="absolute top-6 right-6 bg-gradient-to-r from-ccg-green to-green-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl z-20"
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  delay: 0.5
                }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.span 
                  className="flex items-center gap-2"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Award className="w-4 h-4" />
                  Artisan certifié
                </motion.span>
              </motion.div>

              {/* Experience badge */}
              <motion.div 
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg z-20"
                initial={{ scale: 0, x: -50 }}
                animate={isInView ? { scale: 1, x: 0 } : {}}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  delay: 0.7
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-ccg-green/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ccg-dark">Excellence garantie</div>
                    <div className="text-xs text-gray-600">Qualité professionnelle</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-ccg-green/20 rounded-full blur-2xl"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>

          {/* Enhanced Content Column */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold text-ccg-dark mb-6">
                <AnimatedText 
                  text="C-C-G : L'engagement d'un travail bien fait"
                  type="word"
                  delay={0.2}
                />
              </h2>
              <ScrollAnimationWrapper animation="fadeUp" delay={0.4}>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Depuis notre création, nous mettons notre expertise et notre passion au service 
                  de votre confort. Basés à Héricourt, nous intervenons rapidement pour tous vos 
                  besoins en plomberie, chauffage et climatisation.
                </p>
              </ScrollAnimationWrapper>
            </motion.div>

            {/* Enhanced Values List */}
            <motion.div className="space-y-4" variants={itemVariants}>
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <motion.div
                    className="flex items-center space-x-4 p-3 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-lg"
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <motion.div
                      className={`p-2 rounded-full bg-white shadow-md ${value.color}`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <value.icon className="w-6 h-6" />
                    </motion.div>
                    <span className="text-gray-700 font-medium group-hover:text-ccg-dark transition-colors duration-300">
                      {value.text}
                    </span>
                  </motion.div>
                  
                  {/* Hover effect line */}
                  <motion.div
                    className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-ccg-green to-blue-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Stats avec animations simplifiées */}
            <motion.div 
              className="grid grid-cols-3 gap-4 pt-6"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center group hover:-translate-y-1 transition-transform duration-200"
                >
                  <div className="text-3xl font-bold text-ccg-green mb-1">
                    <AnimatedCounter 
                      value={stat.value} 
                      suffix={stat.suffix}
                      duration={1.5}
                    />
                  </div>
                  <div className="text-sm text-gray-600 group-hover:text-ccg-dark transition-colors duration-200">
                    {stat.label}
                  </div>
                  
                  {/* Progress Bar simplifié */}
                  <motion.div
                    className="h-1 bg-ccg-green mt-2 rounded-full overflow-hidden"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About