'use client';

import { useState } from "react"
import { motion } from "framer-motion"
import React from "react";
import rejoifne from "../../public/imgs/rejoifne.png"
export default function JoinUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    formation: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <main className="flex-1" style={{width:"90%" ,margin:"0 auto"}}>
      <section className="relative py-12 md:py-24 overflow-hidden"  >
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
        <div className="container px-4 md:px-6" style={{width:"90%" ,margin:"0 auto"}}>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={rejoifne }
                alt="Join us illustration"
                className="w-full max-w-md mx-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">REJOIGNEZ-NOUS</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <label htmlFor="formation" className="block text-sm font-medium text-gray-700 mb-1">
                      Formation
                    </label>
                    <select
                      id="formation"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      value={formData.formation}
                      onChange={(e) => setFormData({ ...formData, formation: e.target.value })}
                    >
                      <option value="">--Please choose an option--</option>
                      <option value="soutien">Cours de soutien scolaire</option>
                      <option value="langues">Langues et communication</option>
                      <option value="concours">Préparation Aux concours</option>
                      <option value="coaching">Coaching scolaire et orientation</option>
                      <option value="formation">Formation continue</option>
                      <option value="development">Développement personnel</option>
                    </select>
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
