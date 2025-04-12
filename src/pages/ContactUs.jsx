"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { formService } from "../../api"
import confetti from "canvas-confetti"
import React from "react"
// Icons
import { CheckCircle, User, Mail, Phone, BookOpen, MessageSquare, Send, X, MapPin, Clock, Sparkles } from "lucide-react"

export default function ContactUs() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    formation: "",
    message: "",
  })

  // UI states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeField, setActiveField] = useState(null)

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.tel || !formData.formation) {
      setError("Veuillez remplir tous les champs obligatoires")
      return
    }

    setError(null)
    setLoading(true)

    try {
      const response = await formService.submitForm({
        ...formData,
        source: "contact",
      })

      if (response.success) {
        setShowSuccess(true)
        setFormData({
          name: "",
          email: "",
          tel: "",
          formation: "",
          message: "",
        })

        // Trigger confetti effect
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true,
        })

        // Auto close the success popup after 5 seconds
        setTimeout(() => {
          setShowSuccess(false)
        }, 5000)
      } else {
        setError(response.message || "Une erreur est survenue. Veuillez réessayer.")
      }
    } catch (err) {
      console.error("Form submission error:", err)
      setError(err.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  // Contact info items
  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Téléphone",
      value: "+212 6 75 77 58 84",
      link: "tel:+212675775884",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      value: "contact@centerkech.com",
      link: "mailto:contact@centerkech.com",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Adresse",
      value: "Diour Chouhadaa SYBA Marrakech",
      link: "https://maps.google.com/?q=Diour+Chouhadaa+SYBA+Marrakech",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Heures d'ouverture",
      value: "Lun-Ven: 9h-18h, Sam: 9h-13h",
    },
  ]

  return (
    <main className="flex-1 bg-gradient-to-br from-white to-red-50">
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <motion.h1
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              CONTACTEZ-NOUS
            </motion.h1>
            <motion.p
              className="mt-4 text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Nous sommes là pour répondre à toutes vos questions et vous aider dans votre parcours d'apprentissage
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="order-2 md:order-1"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-50" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-100 rounded-full opacity-50" />

                <div className="relative">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <MessageSquare className="mr-2 h-6 w-6 text-blue-500" />
                    Envoyez-nous un message
                  </h2>

                  {/* Error message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        className="bg-red-50 border-l-4 border-blue-500 p-4 mb-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-blue-700">{error}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom <span className="text-blue-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-colors ${
                            activeField === "name"
                              ? "border-blue-500 ring-2 ring-blue-200"
                              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          }`}
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => setActiveField("name")}
                          onBlur={() => setActiveField(null)}
                          autoComplete="name"
                          placeholder="Votre nom complet"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className={`h-5 w-5 ${activeField === "name" ? "text-blue-500" : "text-gray-400"}`} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-blue-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-colors ${
                            activeField === "email"
                              ? "border-blue-500 ring-2 ring-blue-200"
                              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          }`}
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => setActiveField("email")}
                          onBlur={() => setActiveField(null)}
                          autoComplete="email"
                          placeholder="votre@email.com"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className={`h-5 w-5 ${activeField === "email" ? "text-blue-500" : "text-gray-400"}`} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="tel" className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone <span className="text-blue-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="tel"
                          name="tel"
                          type="tel"
                          required
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-colors ${
                            activeField === "tel"
                              ? "border-blue-500 ring-2 ring-blue-200"
                              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          }`}
                          value={formData.tel}
                          onChange={handleInputChange}
                          onFocus={() => setActiveField("tel")}
                          onBlur={() => setActiveField(null)}
                          autoComplete="tel"
                          placeholder="Votre numéro de téléphone"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className={`h-5 w-5 ${activeField === "tel" ? "text-blue-500" : "text-gray-400"}`} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="formation" className="block text-sm font-medium text-gray-700 mb-1">
                        Formation <span className="text-blue-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="formation"
                          name="formation"
                          required
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg appearance-none transition-colors ${
                            activeField === "formation"
                              ? "border-blue-500 ring-2 ring-blue-200"
                              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          }`}
                          value={formData.formation}
                          onChange={handleInputChange}
                          onFocus={() => setActiveField("formation")}
                          onBlur={() => setActiveField(null)}
                        >
                          <option value="">Choisissez une formation</option>
                          <option value="soutien">Cours de soutien scolaire</option>
                          <option value="langues">Langues et communication</option>
                          <option value="concours">Préparation aux concours</option>
                          <option value="coaching">Coaching scolaire et orientation</option>
                          <option value="formation">Formation continue</option>
                          <option value="development">Développement personnel</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <BookOpen
                            className={`h-5 w-5 ${activeField === "formation" ? "text-blue-500" : "text-gray-400"}`}
                          />
                        </div>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          rows="4"
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-colors ${
                            activeField === "message"
                              ? "border-blue-500 ring-2 ring-blue-200"
                              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          }`}
                          value={formData.message}
                          onChange={handleInputChange}
                          onFocus={() => setActiveField("message")}
                          onBlur={() => setActiveField(null)}
                          placeholder="Comment pouvons-nous vous aider?"
                        ></textarea>
                        <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                          <MessageSquare
                            className={`h-5 w-5 ${activeField === "message" ? "text-blue-500" : "text-gray-400"}`}
                          />
                        </div>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className={`w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg flex items-center justify-center transition-all hover:shadow-lg ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Envoi en cours...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Envoyer le message
                          <Send className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="order-1 md:order-2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
                <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        {item.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-gray-600 hover:text-blue-500 transition-colors"
                            target={item.link.startsWith("http") ? "_blank" : undefined}
                            rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-600">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Map or additional info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 p-4 bg-red-50 rounded-lg border border-blue-100"
                >
                  <h3 className="font-semibold text-blue-600 mb-2">Pourquoi nous contacter?</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Pour obtenir plus d'informations sur nos formations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Pour planifier une visite de notre centre</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Pour discuter de vos besoins spécifiques en matière d'apprentissage</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Pour toute question concernant nos services</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Social media links could be added here */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-100 rounded-full opacity-30" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-100 rounded-full opacity-30" />

              {/* Close button */}
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Success content */}
              <div className="text-center relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, delay: 0.2 }}
                  className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6"
                >
                  <CheckCircle className="h-12 w-12 text-green-500" />

                  {/* Sparkles */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400" />
                    <Sparkles className="absolute -bottom-2 -left-2 h-6 w-6 text-yellow-400" />
                  </motion.div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-gray-900 mb-2"
                >
                  Message Envoyé!
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mb-6"
                >
                  Merci pour votre message! Notre équipe vous contactera dans les 24 heures pour répondre à votre
                  demande.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setShowSuccess(false)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Fermer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
