"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import React from "react"

// A more creative and professional Google Maps implementation
function GoogleMapComponent({ location, isExpanded }) {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [marker, setMarker] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Initialize the map
  useEffect(() => {
    // Load Google Maps API script dynamically
    if (!window.google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initMap
      document.head.appendChild(script)
      return () => {
        document.head.removeChild(script)
      }
    } else {
      initMap()
    }

    function initMap() {
      if (!mapRef.current) return

      // Custom map style for a more professional look
      const mapStyles = [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#2b7fff" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#2b7fff" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#2b7fff" }, { visibility: "on" }],
        },
      ]

      const mapOptions = {
        center: { lat: location.coordinates.lat, lng: location.coordinates.lng },
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        styles: mapStyles,
        gestureHandling: "cooperative",
      }

      const newMap = new window.google.maps.Map(mapRef.current, mapOptions)
      setMap(newMap)

      // Custom marker icon
      const markerIcon = {
        path: "M12 0C7.58 0 4 3.58 4 8c0 5.76 7.44 14 7.44 14a1 1 0 0 0 1.12 0S20 13.76 20 8c0-4.42-3.58-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
        fillColor: "#2b7fff",
        fillOpacity: 1,
        strokeWeight: 0,
        rotation: 0,
        scale: 1.5,
        anchor: new window.google.maps.Point(12, 22),
      }

      // Create a custom marker
      const newMarker = new window.google.maps.Marker({
        position: { lat: location.coordinates.lat, lng: location.coordinates.lng },
        map: newMap,
        title: location.name,
        animation: window.google.maps.Animation.DROP,
        icon: markerIcon,
      })
      setMarker(newMarker)

      // Add a custom info window
      const infoContent = `
        <div style="padding: 10px; max-width: 200px;">
          <h3 style="margin: 0 0 5px; font-size: 16px; color: #2b7fff;">${location.name}</h3>
          <p style="margin: 0; font-size: 12px; color: #2b7fff;">${location.address}</p>
        </div>
      `

      const infoWindow = new window.google.maps.InfoWindow({
        content: infoContent,
      })

      // Open info window on marker click
      newMarker.addListener("click", () => {
        infoWindow.open(newMap, newMarker)
      })

      // Add a circle around the marker
      const circle = new window.google.maps.Circle({
        strokeColor: "#2b7fff",
        strokeOpacity: 0.2,
        strokeWeight: 2,
        fillColor: "#2b7fff",
        fillOpacity: 0.1,
        map: newMap,
        center: { lat: location.coordinates.lat, lng: location.coordinates.lng },
        radius: 300,
        animation: window.google.maps.Animation.DROP,
      })

      // Add a pulsing effect to the circlecle
      let growing = true
      const pulseCircle = () => {
        const currentRadius = circle.getRadius()
        if (growing) {
          circle.setRadius(currentRadius + 5)
          if (currentRadius > 350) growing = false
        } else {
          circle.setRadius(currentRadius - 5)
          if (currentRadius < 300) growing = true
        }
      }

      const pulseInterval = setInterval(pulseCircle, 100)

      // Clean up the interval when component unmounts
      return () => {
        clearInterval(pulseInterval)
      }
    }
  }, [])

  // Update map when location changes
  useEffect(() => {
    if (map && marker) {
      const newPosition = { lat: location.coordinates.lat, lng: location.coordinates.lng }
      map.panTo(newPosition)
      marker.setPosition(newPosition)

      // Add a smooth zoom effect when expanded
      if (isExpanded) {
        setTimeout(() => {
          map.setZoom(16)
        }, 500)
      } else {
        setTimeout(() => {
          map.setZoom(15)
        }, 500)
      }

      // Add a bounce animation to the marker
      marker.setAnimation(window.google.maps.Animation.BOUNCE)
      setTimeout(() => {
        marker.setAnimation(null)
      }, 1500)

      setMapLoaded(true)
    }
  }, [location, isExpanded, map, marker])

  return (
    <div className="relative w-full h-full">
      {/* Map container with fancy border */}
      <div
        className="absolute inset-0 rounded-b-xl overflow-hidden"
        style={{
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
          border: "1px solid rgba(59, 130, 246, 0.2)",
        }}
      >
        <div ref={mapRef} className="w-full h-full" />
      </div>

      {/* Map overlay with location info */}
      <motion.div
        className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg z-10 max-w-xs"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-medium text-sm text-blue-600">{location.name}</h4>
        <p className="text-xs text-gray-600">{location.address}</p>
      </motion.div>

      {/* Map controls */}
      <motion.div
        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex space-x-2">
          <button
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            onClick={() => map && map.setZoom(map.getZoom() + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            onClick={() => map && map.setZoom(map.getZoom() - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Loading overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  )
}

export default GoogleMapComponent
