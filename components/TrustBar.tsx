'use client'

import React from 'react'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const TrustBar: React.FC = () => {
  const reviews = [
    {
      platform: 'Google',
      rating: 5,
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.52 2.75-2.08 5.07-4.42 6.62v5.52h7.15c4.16-3.83 6.55-9.48 6.55-16.15z" fill="#4285F4"/>
          <path d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.15-5.52c-1.97 1.32-4.49 2.1-7.41 2.1-5.71 0-10.58-3.86-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" fill="#34A853"/>
          <path d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" fill="#FBBC05"/>
          <path d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2c-8.6 0-16.04 4.93-19.66 12.12l7.35 5.7c1.73-5.21 6.6-9.07 12.31-9.07z" fill="#EA4335"/>
        </svg>
      )
    },
    {
      platform: 'Pages Jaunes',
      rating: 5,
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" fill="#FFD700" rx="8"/>
          <text x="24" y="32" textAnchor="middle" fill="#000" fontSize="20" fontWeight="bold" fontFamily="Arial, sans-serif">PJ</text>
        </svg>
      )
    }
  ]

  return (
    <section className="bg-ccg-green py-8 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {reviews.map((review, index) => (
            <React.Fragment key={review.platform}>
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Logo with Glow Effect */}
                <motion.div 
                  className="bg-white rounded-lg p-3 relative shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white rounded-lg"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(255, 255, 255, 0.7)',
                        '0 0 0 10px rgba(255, 255, 255, 0)',
                        '0 0 0 0 rgba(255, 255, 255, 0)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                  <div className="relative z-10">
                    {review.logo}
                  </div>
                </motion.div>
                
                <div className="text-white">
                  {/* Animated Stars */}
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.2 + i * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Platform Text */}
                  <motion.p 
                    className="font-semibold text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                  >
                    Noté {review.rating}/5 sur {review.platform}
                  </motion.p>
                  
                  
                </div>
              </motion.div>

              {/* Animated Separator */}
              {index === 0 && (
                <motion.div 
                  className="hidden md:block w-px h-12 bg-white/30 relative"
                  initial={{ height: 0 }}
                  whileInView={{ height: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-white/60"
                    animate={{
                      height: ['0%', '100%', '0%'],
                      top: ['0%', '0%', '100%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{ width: '1px' }}
                  />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Floating Review Cards */}
        <div className="absolute -top-4 -right-4 opacity-20 pointer-events-none">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-xs"
          >
            ⭐ "Excellent service!"
          </motion.div>
        </div>
        
        <div className="absolute -bottom-4 -left-4 opacity-20 pointer-events-none">
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-xs"
          >
            ⭐ "Très professionnel"
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TrustBar