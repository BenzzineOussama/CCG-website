'use client'

import React, { useState } from 'react'
import { Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FormField {
  value: string
  error: string
  touched: boolean
}

interface FormData {
  name: FormField
  phone: FormField
  email: FormField
  message: FormField
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: { value: '', error: '', touched: false },
    phone: { value: '', error: '', touched: false },
    email: { value: '', error: '', touched: false },
    message: { value: '', error: '', touched: false }
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Le nom doit contenir au moins 2 caractères' : ''
      case 'phone':
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
        return !phoneRegex.test(value) ? 'Numéro de téléphone invalide' : ''
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(value) ? 'Email invalide' : ''
      case 'message':
        return value.length < 10 ? 'Le message doit contenir au moins 10 caractères' : ''
      default:
        return ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name as keyof FormData, value)
    
    setFormData(prev => ({
      ...prev,
      [name]: {
        value,
        error,
        touched: true
      }
    }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof FormData],
        touched: true
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const newFormData = { ...formData }
    let hasErrors = false
    
    Object.keys(formData).forEach(key => {
      const field = key as keyof FormData
      const error = validateField(field, formData[field].value)
      newFormData[field] = {
        ...formData[field],
        error,
        touched: true
      }
      if (error) hasErrors = true
    })
    
    setFormData(newFormData)
    
    if (!hasErrors) {
      setIsSubmitting(true)
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false)
        setSubmitStatus('success')
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
          setFormData({
            name: { value: '', error: '', touched: false },
            phone: { value: '', error: '', touched: false },
            email: { value: '', error: '', touched: false },
            message: { value: '', error: '', touched: false }
          })
        }, 3000)
      }, 2000)
    }
  }

  // Animations d'entrée améliorées
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  }

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  }

  const formVariants = {
    hidden: { 
      opacity: 0,
      x: -50,
      rotateY: -5
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  }

  const infoVariants = {
    hidden: { 
      opacity: 0,
      x: 50,
      rotateY: 5
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <section id="contact" className="py-20 bg-ccg-light relative overflow-hidden">
      {/* Animated Background Elements - Plus subtils */}
      <motion.div
        className="absolute top-10 left-10 w-96 h-96 bg-ccg-green/5 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-12"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-ccg-dark mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Un projet ? Une urgence ? Contactez-nous
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Nous sommes à votre écoute pour répondre à tous vos besoins en plomberie et chauffage
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form with Advanced Animations */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden transform perspective-1000"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ 
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              y: -5
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Gradient overlay subtil */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-ccg-green/5 via-transparent to-blue-500/5 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Success/Error Overlay */}
            <AnimatePresence>
              {submitStatus !== 'idle' && (
                <motion.div
                  className="absolute inset-0 bg-white z-20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="text-center"
                  >
                    {submitStatus === 'success' ? (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        >
                          <CheckCircle className="w-16 h-16 text-ccg-green mx-auto mb-4" />
                        </motion.div>
                        <h3 className="text-2xl font-semibold text-ccg-dark mb-2">Message envoyé !</h3>
                        <p className="text-gray-600">Nous vous recontacterons rapidement.</p>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-ccg-dark mb-2">Erreur</h3>
                        <p className="text-gray-600">Une erreur s'est produite. Veuillez réessayer.</p>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <h3 className="text-2xl font-semibold text-ccg-dark mb-6 relative z-10">
              Demandez votre devis gratuit
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              {/* Name Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ccg-green focus:border-transparent transition-all ${
                      formData.name.touched && formData.name.error 
                        ? 'border-red-500' 
                        : formData.name.touched && !formData.name.error 
                        ? 'border-green-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="Jean Dupont"
                  />
                  <AnimatePresence>
                    {formData.name.touched && !formData.name.error && formData.name.value && (
                      <motion.div
                        className="absolute right-3 top-3.5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {formData.name.touched && formData.name.error && (
                    <motion.p
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {formData.name.error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Phone Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ccg-green focus:border-transparent transition-all ${
                      formData.phone.touched && formData.phone.error 
                        ? 'border-red-500' 
                        : formData.phone.touched && !formData.phone.error 
                        ? 'border-green-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="06 12 34 56 78"
                  />
                  <AnimatePresence>
                    {formData.phone.touched && !formData.phone.error && formData.phone.value && (
                      <motion.div
                        className="absolute right-3 top-3.5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {formData.phone.touched && formData.phone.error && (
                    <motion.p
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {formData.phone.error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ccg-green focus:border-transparent transition-all ${
                      formData.email.touched && formData.email.error 
                        ? 'border-red-500' 
                        : formData.email.touched && !formData.email.error 
                        ? 'border-green-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="jean.dupont@email.com"
                  />
                  <AnimatePresence>
                    {formData.email.touched && !formData.email.error && formData.email.value && (
                      <motion.div
                        className="absolute right-3 top-3.5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {formData.email.touched && formData.email.error && (
                    <motion.p
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {formData.email.error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Message Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Votre message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-ccg-green focus:border-transparent transition-all resize-none ${
                      formData.message.touched && formData.message.error 
                        ? 'border-red-500' 
                        : formData.message.touched && !formData.message.error 
                        ? 'border-green-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="Décrivez votre projet ou votre problème..."
                  />
                  <AnimatePresence>
                    {formData.message.touched && !formData.message.error && formData.message.value && (
                      <motion.div
                        className="absolute right-3 top-3.5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {formData.message.touched && formData.message.error && (
                    <motion.p
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {formData.message.error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center space-x-2 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                variants={itemVariants}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center space-x-2"
                    >
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Envoi en cours...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center space-x-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>Envoyer ma demande</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map with Animations */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Contact Cards */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8 space-y-6 relative overflow-hidden"
              variants={infoVariants}
              whileHover={{ 
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                y: -5
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Gradient overlay subtil */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-ccg-green/5 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />

              <h3 className="text-2xl font-semibold text-ccg-dark mb-4 relative z-10">
                Informations de contact
              </h3>
              
              <div className="space-y-4 relative z-10">
                <motion.a
                  href="tel:+33624950171"
                  className="flex items-start space-x-4 group hover:text-ccg-green transition-colors"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Phone className="w-6 h-6 text-ccg-green flex-shrink-0" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-lg">06 24 95 01 71</p>
                    <p className="text-sm text-gray-600">Appel direct</p>
                  </div>
                </motion.a>

                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <MapPin className="w-6 h-6 text-ccg-green flex-shrink-0" />
                  <div>
                    <p className="font-semibold">8 Rue de Verlans</p>
                    <p className="text-gray-600">70400 Héricourt, France</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Clock className="w-6 h-6 text-ccg-green flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Horaires d'ouverture</p>
                    <p className="text-gray-600 text-sm">Lun-Ven: 08h30 - 17h00</p>
                    <p className="text-gray-600 text-sm">Sam: 09h00 - 12h00</p>
                    <p className="text-gray-600 text-sm">Dim: Fermé</p>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="pt-4 border-t border-gray-200"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-ccg-green font-semibold flex items-center">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
                  >
                    ✓
                  </motion.span>
                  <span className="ml-2">Nous vous recontactons dans les plus brefs délais</span>
                </p>
              </motion.div>
            </motion.div>

            {/* Map with Hover Effect */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden h-[300px] relative group"
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2694.8887769999997!2d6.7583333!3d47.5777778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47923b5e5e5e5e5e%3A0x0!2s8%20Rue%20de%20Verlans%2C%2070400%20H%C3%A9ricourt!5e0!3m2!1sfr!2sfr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <motion.div
                className="absolute inset-0 bg-ccg-green/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact