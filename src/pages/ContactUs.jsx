"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react"
import React from "react"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeLocation, setActiveLocation] = useState(0)

  const locations = [
    {
      name: "Centre 1 - Sidi Youssef Ben Ali",
      address: "Diour Chouhadaa SYBA Marrakech, Sidi Youssef Ben Ali, Maroc",
      phone: "+212 6 39 04 20 53",
      email: "contact@centerkech.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13592.063948796918!2d-7.9614215!3d31.6060217!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafefb140cc57b5%3A0x4d30dd25061a3c67!2sCentre%20Red%20City!5e0!3m2!1sen!2sma!4v1680966124953!5m2!1sen!2sma"
    },
    {
      name: "Centre 2 - Guéliz",
      address: "Avenue Mohammed V, Guéliz, Marrakech, Maroc",
      phone: "+212 6 39 04 20 54",
      email: "gueliz@centerkech.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13592.063948796918!2d-7.9614215!3d31.6060217!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafefb140cc57b5%3A0x4d30dd25061a3c67!2sCentre%20Red%20City!5e0!3m2!1sen!2sma!4v1680966124953!5m2!1sen!2sma"
    }
  ]

  // Auto-rotate locations every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLocation((prev) => (prev + 1) % locations.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [locations.length])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        tel: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-gray-50"

  return (
    <main className="flex-1 bg-gradient-to-b from-white to-gray-50">
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400">
              Nous Sommes à Votre Service
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Visitez l'un de nos centres ou contactez-nous directement. Notre équipe est prête à vous accueillir et répondre à toutes vos questions.
            </p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-2">Nos Centres</span>
                  <div className="h-1 flex-grow bg-gradient-to-r from-red-500 to-red-300 rounded-full" />
                </h2>
              </div>

              <div className="space-y-6">
                {locations.map((location, index) => (
                  <motion.div
                    key={index}
                    className={`bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${activeLocation === index ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-100'}`}
                    whileHover={{ y: -5 }}
                    onClick={() => setActiveLocation(index)}
                  >
                    <h3 className="font-bold mb-4 text-lg flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${activeLocation === index ? 'bg-red-500' : 'bg-gray-300'}`} />
                      {location.name}
                    </h3>
                    <div className="space-y-3">
                      <motion.div 
                        className="flex items-center space-x-3 text-gray-600"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <MapPin className="h-5 w-5 text-red-500 flex-shrink-0" />
                        <span>{location.address}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center space-x-3 text-gray-600"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Phone className="h-5 w-5 text-red-500 flex-shrink-0" />
                        <span>{location.phone}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center space-x-3 text-gray-600"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Mail className="h-5 w-5 text-red-500 flex-shrink-0" />
                        <span>{location.email}</span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLocation}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-[400px] rounded-xl overflow-hidden border border-gray-200 shadow-md"
                >
                  <iframe
                    src={locations[activeLocation].mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map for ${locations[activeLocation].name}`}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:pl-8"
            >
              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 relative">
                  <span className="relative z-10">CONTACTEZ-NOUS</span>
                  <div className="absolute bottom-0 left-0 h-3 w-24 bg-red-200 -z-0" />
                </h2>
                
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, 10, 0] }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      >
                        <CheckCircle className="h-16 w-16 text-green-500" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-800">Message Envoyé!</h3>
                      <p className="text-gray-600">Merci de nous avoir contacté. Nous vous répondrons dans les plus brefs délais.</p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      onSubmit={handleSubmit} 
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nom
                          </label>
                          <input
                            id="name"
                            type="text"
                            required
                            className={inputClasses}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Votre nom complet"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            className={inputClasses}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="votre@email.com"
                          />
                        </motion.div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <label htmlFor="tel" className="block text-sm font-medium text-gray-700 mb-1">
                            Téléphone
                          </label>
                          <input
                            id="tel"
                            type="tel"
                            required
                            className={inputClasses}
                            value={formData.tel}
                            onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                            placeholder="+212 6XX XX XX XX"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                            Sujet
                          </label>
                          <input
                            id="subject"
                            type="text"
                            required
                            className={inputClasses}
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="Le sujet de votre message"
                          />
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={6}
                          required
                          className={`${inputClasses} resize-none`}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Votre message ici..."
                        />
                      </motion.div>
                      <motion.button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-300 flex items-center justify-center space-x-2 font-medium shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>ENVOYEZ VOTRE MESSAGE</span>
                        <Send className="h-5 w-5" />
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
              
              <motion.div 
                className="mt-8 p-5 bg-red-50 rounded-lg border border-red-100 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="font-medium text-red-600 mb-2">Pourquoi nous contacter?</h3>
                <p className="text-gray-700 text-sm">
                  Notre équipe est disponible pour vous aider avec toutes vos questions concernant nos services, 
                  réservations, ou toute autre demande. Nous nous engageons à vous répondre dans un délai de 24 heures.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}