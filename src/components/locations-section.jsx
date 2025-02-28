"use client"

import { useState, lazy, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react"
import React from "react"

const MapComponent = lazy(() => import("./map-component"))

const locations = [
  {
    id: "centre-1",
    name: "Centre Sidi Youssef Ben Ali",
    address: "Diour Chouhadaa SYBA Marrakech",
    phone: "+212 6 75 77 58 84",
    email: "contact@centerkech.com",
    coordinates: [31.606, -7.9614],
  },
  {
    id: "centre-2",
    name: "Centre M'Hamid",
    address: "M'Hamid - Marrakech",
    phone: "+212 6 75 77 58 84",
    email: "contact@centerkech.com",
    coordinates: [31.5933, -8.0211],
  },
  {
    id: "centre-3",
    name: "Centre Moussa Ibn Noussaire",
    address: "Av. Moussa Ibn Noussaire, SYBA",
    phone: "+212 6 75 77 58 84",
    email: "contact@centerkech.com",
    coordinates: [31.6092, -7.9587],
  },
]

export default function LocationsSection() {
  const [activeLocation, setActiveLocation] = useState(locations[0])

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4" style={{width:"90%" ,margin:"0 auto"}}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Centres</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos centres d'excellence répartis dans Marrakech pour un apprentissage de qualité
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AnimatePresence>
              {locations.map((location) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 p-6 rounded-xl cursor-pointer transition-all ${
                    activeLocation.id === location.id
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white hover:bg-gray-50 shadow"
                  }`}
                  onClick={() => setActiveLocation(location)}
                >
                  <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                  <p className={`text-sm ${activeLocation.id === location.id ? "text-white/80" : "text-gray-500"}`}>
                    {location.address} 
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="lg:col-span-2">
            <motion.div layout transition={{ duration: 0.3 }} className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{activeLocation.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{activeLocation.address}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{activeLocation.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{activeLocation.email}</span>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${activeLocation.coordinates[0]},${activeLocation.coordinates[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-primary hover:underline"
                >
                  <span>Voir sur Google Maps</span>
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
              <div className="h-[400px]">
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      Chargement de la carte...
                    </div>
                  }
                >
                  <MapComponent location={activeLocation} />
                </Suspense>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

