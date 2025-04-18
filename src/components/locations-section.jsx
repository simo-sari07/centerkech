"use client"

import { useState, useRef, lazy, Suspense } from "react"
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Clock,
  Users,
  Camera,
  Navigation,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import React from "react"

// Lazy load the map component to improve initial load performance
const MapComponent = lazy(() => import("./MapComponent"))

const locations = [
  {
    id: "centre-1",
    name: "Centre Sidi Youssef Ben Ali",
    address: "Diour Chouhadaa SYBA Marrakech",
    phone: "+212 6 75 77 58 84",
    email: "contact@centerkech.com",
    coordinates: [31.606, -7.9614],
    hours: "Lun-Ven: 9h-18h, Sam: 9h-13h",
    specialties: ["Langues", "Informatique", "Mathématiques"],
    image: "https://mma.prnewswire.com/media/1888550/Center_Midnight_Logo.jpg?p=facebook",
    description: "Notre centre principal offrant une variété de cours pour tous les âges et niveaux.",
  },
  {
    id: "centre-2",
    name: "Centre M'Hamid",
    address: "M'Hamid - Marrakech",
    phone: "+212 6 75 77 58 84",
    email: "contact@centerkech.com",
    coordinates: [31.5933, -8.0211],
    hours: "Lun-Ven: 8h30-19h, Sam: 9h-14h",
    specialties: ["Sciences", "Robotique", "Arts Plastiques"],
    image: "https://mma.prnewswire.com/media/1888550/Center_Midnight_Logo.jpg?p=facebook",
    description: "Un espace moderne dédié aux sciences et à la technologie avec des équipements de pointe.",
  },
  {
    id: "centre-3",
    name: "Centre Moussa Ibn Noussaire",
    address: "Av. Moussa Ibn Noussaire, SYBA",
    phone: "+212 6 75 77 58 84",
    email: "contact@centerkech.com",
    coordinates: [31.6092, -7.9587],
    hours: "Lun-Ven: 9h-20h, Sam-Dim: 10h-16h",
    specialties: ["Musique", "Théâtre", "Développement Personnel"],
    image: "https://mma.prnewswire.com/media/1888550/Center_Midnight_Logo.jpg?p=facebook",
    description: "Un centre culturel et artistique offrant des programmes créatifs pour tous les âges.",
  },
]

export default function LocationsSection() {
  const [activeLocation, setActiveLocation] = useState(locations[0])
  const [isHovered, setIsHovered] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const sectionRef = useRef(null)

  // Handle manual navigation
  const handlePrevLocation = () => {
    const currentIndex = locations.findIndex((loc) => loc.id === activeLocation.id)
    const prevIndex = (currentIndex - 1 + locations.length) % locations.length
    setActiveLocation(locations[prevIndex])
  }

  const handleNextLocation = () => {
    const currentIndex = locations.findIndex((loc) => loc.id === activeLocation.id)
    const nextIndex = (currentIndex + 1) % locations.length
    setActiveLocation(locations[nextIndex])
  }

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background elements with creative styling */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0" />

      {/* Creative background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0 10 L 40 10 M 10 0 L 10 40" stroke="#2b7fff" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10" style={{ width: "90%", margin: "0 auto" }}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 relative inline-block">
            <span className="relative z-10">Nos Centres</span>
            <div className="absolute -bottom-2 left-0 h-3 w-full bg-blue-200/70 -z-0 rounded-full" />
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6">
            Découvrez nos centres d'excellence répartis dans Marrakech pour un apprentissage de qualité
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            {/* Auto-rotate toggle */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md">
              <span className="text-sm font-medium text-gray-700">Rotation automatique</span>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoRotate ? "bg-blue-500" : "bg-gray-200"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoRotate ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>

            {/* Location cards with manual navigation */}
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-800">Nos emplacements</h3>
                <div className="flex space-x-1">
                  <button
                    onClick={handlePrevLocation}
                    className="p-1 rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNextLocation}
                    className="p-1 rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {locations.map((location, i) => (
                <div
                  key={location.id}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden mb-4 ${
                    activeLocation.id === location.id
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-white hover:bg-gray-50 shadow-md"
                  }`}
                  onClick={() => {
                    setActiveLocation(location)
                    setIsExpanded(false)
                  }}
                  onMouseEnter={() => setIsHovered(location.id)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  {/* Progress indicator for auto-rotate */}
                  {autoRotate && activeLocation.id === location.id && !isExpanded && (
                    <div className="absolute bottom-0 left-0 h-1 bg-white/50 w-full" />
                  )}

                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          activeLocation.id === location.id ? "bg-white" : "bg-blue-500"
                        }`}
                      />
                      {location.name}
                    </h3>
                    <p
                      className={`text-sm mb-2 ${activeLocation.id === location.id ? "text-white/80" : "text-gray-500"}`}
                    >
                      {location.address}
                    </p>

                    {(isHovered === location.id || activeLocation.id === location.id) && (
                      <div
                        className={`text-xs space-y-1 ${
                          activeLocation.id === location.id ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        <div className="flex items-center space-x-1 mt-2">
                          <Clock className="h-3 w-3 flex-shrink-0" />
                          <span>{location.hours}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3 flex-shrink-0" />
                          <span>{location.specialties.join(" • ")}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl shadow-inner">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Horaires d'ouverture</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between items-center">
                  <span>Lundi - Vendredi:</span>
                  <span className="font-medium">9h - 18h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Samedi:</span>
                  <span className="font-medium">9h - 13h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Dimanche:</span>
                  <span className="font-medium">Fermé</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a href="/contact" className="text-blue-500 hover:text-blue-600 font-medium flex items-center text-sm">
                  <span>Prendre un rendez-vous</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row border-b">
                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{activeLocation.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span>{activeLocation.address}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Phone className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span>{activeLocation.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span>{activeLocation.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Clock className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span>{activeLocation.hours}</span>
                    </div>
                    <div className="text-gray-600 mt-2 text-sm border-t border-gray-100 pt-2">
                      {activeLocation.description}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${activeLocation.coordinates[0]}&mlon=${activeLocation.coordinates[1]}&zoom=16`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <span>Voir sur OpenStreetMap</span>
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="inline-flex items-center px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <span>{isExpanded ? "Voir moins" : "Voir plus"}</span>
                    </button>
                    <a
                      href={`https://www.waze.com/ul?ll=${activeLocation.coordinates[0]}%2C${activeLocation.coordinates[1]}&navigate=yes`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      <span>Itinéraire</span>
                    </a>
                  </div>
                </div>
                <div className="md:w-1/3 p-4 flex items-center justify-center bg-gray-50">
                  <div className="w-full h-full rounded-lg overflow-hidden relative shadow-md">
                    <img
                      src={activeLocation.image || "/placeholder.svg"}
                      alt={activeLocation.name}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <div className="flex items-center text-white space-x-1">
                        <Camera className="h-4 w-4" />
                        <span className="text-xs">Vue extérieure</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative" style={{ height: isExpanded ? "600px" : "400px" }}>
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <div className="inline-block p-3 bg-blue-50 rounded-full mb-3">
                          <MapPin className="h-6 w-6 text-blue-500" />
                        </div>
                        <p className="text-gray-600">Chargement de la carte...</p>
                      </div>
                    </div>
                  }
                >
                  <MapComponent location={activeLocation} isExpanded={isExpanded} />
                </Suspense>

                {isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-32 flex items-end">
                    <div className="container mx-auto px-6 py-4">
                      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Spécialités</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeLocation.specialties.map((specialty, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h4 className="font-semibold text-gray-900">Vous cherchez un centre près de chez vous?</h4>
                <p className="text-sm text-gray-600">Contactez-nous pour en savoir plus sur nos emplacements</p>
              </div>
              <a
                href="/contact"
                className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
