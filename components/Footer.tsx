'use client'

import React from 'react'
import { Phone, MapPin, Facebook, Instagram, Clock, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import Logo from './Logo'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  }

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' }
  ]

  const quickLinks = [
    { label: 'Nos Services', href: '#services' },
    { label: 'Qui sommes-nous', href: '#about' },
    { label: 'Contact & Devis', href: '#contact' },
    { label: 'Mentions Légales', href: '#' }
  ]

  return (
    <footer className="bg-ccg-dark text-white py-12 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <motion.div 
              className="mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Logo width={140} height={42} className="text-white" />
            </motion.div>
            <p className="text-gray-300 mb-4">
              Votre artisan plombier chauffagiste de confiance à Héricourt. 
              Intervention rapide et travail de qualité garantis.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-ccg-green transition-colors relative overflow-hidden group"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-ccg-green"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                  />
                  <social.icon className="w-5 h-5 relative z-10" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <motion.a 
                    href={link.href} 
                    className="text-gray-300 hover:text-ccg-green transition-colors inline-flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <motion.span
                      className="inline-block mr-2 opacity-0 group-hover:opacity-100"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <motion.a
                href="tel:+33624950171"
                className="flex items-center space-x-3 text-gray-300 hover:text-ccg-green transition-colors group"
                whileHover={{ x: 5 }}
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                </motion.div>
                <span>06 24 95 01 71</span>
              </motion.a>
              
              <motion.div 
                className="flex items-start space-x-3 text-gray-300"
                whileHover={{ x: 5 }}
              >
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                </motion.div>
                <div>
                  <p>8 Rue de Verlans</p>
                  <p>70400 Héricourt</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-3 text-gray-300 mt-3"
                whileHover={{ x: 5 }}
              >
                <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p>Lun-Ven: 08h30 - 17h00</p>
                  <p>Sam: 09h00 - 12h00</p>
                  <p>Dim: Fermé</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-white/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p 
              className="text-gray-400 text-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              © {currentYear} C-C-G | Tous droits réservés
            </motion.p>
            <motion.p 
              className="text-gray-400 text-sm flex items-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              Conçu avec 
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mx-1"
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" />
              </motion.span>
              | <a href="#" className="hover:text-ccg-green transition-colors ml-1">Mentions Légales</a>
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute bottom-0 right-0 w-32 h-32 bg-ccg-green/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </footer>
  )
}

export default Footer