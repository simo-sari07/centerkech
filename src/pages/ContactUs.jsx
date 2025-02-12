"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail } from "lucide-react"
import React from "react"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <main className="flex-1">
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6" style={{width:"90%" ,margin:"0 auto"}}>
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-3xl font-bold mb-4">Retrouvez-nous dans l'un de nos centres</h1>
                <div className="h-1 w-20 bg-red-500 rounded-full" />
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-gray-100">
                  <h3 className="font-bold mb-4">Centre 1 - Sidi Youssef Ben Ali</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <MapPin className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span>Diour Chouhadaa SYBA Marrakech, Sidi Youssef Ben Ali, Maroc</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Phone className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span>+212 6 39 04 20 53</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Mail className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span>contact@centerkech.com</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[400px] rounded-lg overflow-hidden border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13592.063948796918!2d-7.9614215!3d31.6060217!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafefb140cc57b5%3A0x4d30dd25061a3c67!2sCentre%20Red%20City!5e0!3m2!1sen!2sma!4v1680966124953!5m2!1sen!2sma"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:pl-8"
            >
              <div className="bg-white p-8 rounded-lg border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">CONTACTEZ-NOUS</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="tel" className="block text-sm font-medium text-gray-700 mb-1">
                        Tel
                      </label>
                      <input
                        id="tel"
                        type="tel"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                        value={formData.tel}
                        onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Sujet
                      </label>
                      <input
                        id="subject"
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
                  >
                    ENVOYEZ
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

