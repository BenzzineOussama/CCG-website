'use client'

import React from 'react'
import { Flame, Snowflake, Thermometer, Droplets, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedCard from './animations/AnimatedCard'

interface Service {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  bgGradient: string
}

const Services: React.FC = () => {
  const services: Service[] = [
    {
      icon: <Flame className="w-8 h-8" />,
      title: "Installation & Dépannage Chauffage",
      description: "Chaudières gaz, fioul, électrique. Maintenance et réparation rapide de tous systèmes de chauffage.",
      color: "#ef4444",
      bgGradient: "from-red-500/10 to-orange-500/10"
    },
    {
      icon: <Snowflake className="w-8 h-8" />,
      title: "Installation Climatisation & Pompe à Chaleur",
      description: "Solutions économiques et écologiques pour votre confort thermique toute l'année.",
      color: "#3b82f6",
      bgGradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      icon: <Thermometer className="w-8 h-8" />,
      title: "Réglage & Installation de Thermostats",
      description: "Optimisez votre consommation énergétique avec des thermostats intelligents et programmables.",
      color: "#f59e0b",
      bgGradient: "from-amber-500/10 to-yellow-500/10"
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Plomberie Générale & Sanitaire",
      description: "Installation, réparation et entretien de tous vos équipements sanitaires et canalisations.",
      color: "#06b6d4",
      bgGradient: "from-cyan-500/10 to-blue-500/10"
    },
    {
      icon: <AlertCircle className="w-8 h-8" />,
      title: "Intervention d'Urgence",
      description: "Service d'urgence disponible pendant nos heures d'ouverture pour vos problèmes de plomberie et chauffage.",
      color: "#dc2626",
      bgGradient: "from-red-600/10 to-rose-500/10"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  return (
    <section id="services" className="py-20 bg-ccg-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322C55E' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-ccg-dark mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Nos domaines d'expertise pour votre confort
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Des solutions complètes pour tous vos besoins en plomberie, chauffage et climatisation
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <AnimatedCard
              key={index}
              index={index}
              className="group"
            >
              <div className={`card relative overflow-hidden bg-gradient-to-br ${service.bgGradient} backdrop-blur-sm border border-white/50`}>
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${service.color}20, transparent 70%)`
                  }}
                />
                
                {/* Icon Container with Animation */}
                <motion.div 
                  className="mb-4 relative"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center relative"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          `0 0 0 0 ${service.color}40`,
                          `0 0 0 10px ${service.color}00`,
                          `0 0 0 0 ${service.color}00`
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                      className="absolute inset-0 rounded-full"
                    />
                    <div style={{ color: service.color }}>
                      {service.icon}
                    </div>
                  </div>
                </motion.div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-ccg-dark mb-3 group-hover:text-ccg-green transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 relative z-10">
                  {service.description}
                </p>
                
                {/* Hover Line Animation */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-ccg-green"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </AnimatedCard>
          ))}
        </motion.div>

        {/* CTA Section with Animation */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="#contact"
            className="btn-primary inline-flex items-center relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Demander un devis gratuit</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 bg-ccg-green/10 rounded-full blur-2xl"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  )
}

export default Services