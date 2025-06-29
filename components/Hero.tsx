'use client'

import React from 'react'
import { Phone, ArrowRight } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import AnimatedText from './animations/AnimatedText'
import ParticleBackground from './animations/ParticleBackground'
import AnimatedCounter from './animations/AnimatedCounter'

const Hero: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-white to-ccg-light overflow-hidden">
      {/* Animated Particle Background */}
      <ParticleBackground 
        particleCount={30}
        color="#22C55E"
        maxSize={3}
        speed={0.3}
      />
      
      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-ccg-green/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-ccg-green/5 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container-custom py-20 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Heading with Advanced Text Animation */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-ccg-dark mb-6"
            variants={itemVariants}
          >
            <AnimatedText 
              text="Votre Artisan Plombier Chauffagiste de Confiance à"
              type="word"
            />
            {' '}
            <motion.span 
              className="text-ccg-green inline-block"
              animate={{
                backgroundImage: [
                  'linear-gradient(45deg, #22C55E, #22C55E)',
                  'linear-gradient(45deg, #22C55E, #16A34A)',
                  'linear-gradient(45deg, #16A34A, #22C55E)',
                  'linear-gradient(45deg, #22C55E, #22C55E)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Héricourt
            </motion.span>
          </motion.h1>
          
          {/* Subtitle with Stagger Effect */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-10"
            variants={itemVariants}
          >
            Interventions rapides et garanties pour votre chauffage, climatisation et plomberie
          </motion.p>
          
          {/* CTA Buttons with Advanced Hover Effects */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <motion.a
              href="#contact"
              className="btn-primary flex items-center space-x-2 text-lg relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Obtenir mon Devis Gratuit</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-green-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ type: "tween", duration: 0.3 }}
              />
            </motion.a>
            
            <motion.a
              href="tel:+33624950171"
              className="flex items-center space-x-3 text-lg font-medium text-ccg-dark hover:text-ccg-green transition-colors group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut" as const
                }}
                className="relative"
              >
                <Phone className="w-6 h-6 text-ccg-green" />
                <motion.div
                  className="absolute inset-0 bg-ccg-green/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <span className="group-hover:text-ccg-green transition-colors">06 24 95 01 71</span>
            </motion.a>
          </motion.div>
          
          {/* Trust Indicators with Animated Counters */}
          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            <motion.div 
              className="text-center group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl font-bold text-ccg-green mb-2">
                <AnimatedCounter value={6} suffix="j/7" />
              </div>
              <p className="text-gray-600 group-hover:text-ccg-dark transition-colors">Disponibilité</p>
              <motion.div
                className="h-1 bg-ccg-green/20 mt-2 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.div
                  className="h-full bg-ccg-green"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="text-center group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl font-bold text-ccg-green mb-2">
                <AnimatedCounter value={100} suffix="%" />
              </div>
              <p className="text-gray-600 group-hover:text-ccg-dark transition-colors">Satisfaction Client</p>
              <motion.div
                className="h-1 bg-ccg-green/20 mt-2 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <motion.div
                  className="h-full bg-ccg-green"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.5
                  }}
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="text-center group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl font-bold text-ccg-green mb-2">
                Gratuit
              </div>
              <p className="text-gray-600 group-hover:text-ccg-dark transition-colors">Devis Sans Engagement</p>
              <motion.div
                className="h-1 bg-ccg-green/20 mt-2 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <motion.div
                  className="h-full bg-ccg-green"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative Wave Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg
            viewBox="0 0 1920 100"
            className="w-[3840px] h-24"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C480,100 480,0 960,50 C1440,100 1440,0 1920,50 L1920,100 L0,100 Z"
              fill="white"
              opacity="0.5"
            />
            <path
              d="M0,50 C480,0 480,100 960,50 C1440,0 1440,100 1920,50 L1920,100 L0,100 Z"
              fill="white"
              opacity="0.7"
            />
            <path
              d="M0,75 C480,25 480,125 960,75 C1440,25 1440,125 1920,75 L1920,100 L0,100 Z"
              fill="white"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero