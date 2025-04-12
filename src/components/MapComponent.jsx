"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import React from "react"

// Enhanced creative map component with 3D effects and animations
function MapComponent({ location, isExpanded }) {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [marker, setMarker] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapStyle, setMapStyle] = useState("streets") // streets, satellite, night

  // Initialize the map
  useEffect(() => {
    // Load Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link")
      link.id = "leaflet-css"
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      link.crossOrigin = ""
      document.head.appendChild(link)
    }

    // Load Leaflet JS
    if (!window.L) {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      script.crossOrigin = ""
      script.async = true
      script.onload = initMap
      document.head.appendChild(script)
    } else {
      initMap()
    }

    function initMap() {
      // Check if there's already a map instance on this container
      if (window.L && window.L.DomUtil.get("map")) {
        window.L.DomUtil.get("map")._leaflet_id = null
      }

      if (!mapRef.current || !window.L) return

      // Create map instance
      const newMap = window.L.map(mapRef.current, {
        center: [location.coordinates[0], location.coordinates[1]],
        zoom: 15,
        zoomControl: false,
        attributionControl: true,
      })

      // Map style URLs
      const mapStyles = {
        streets: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        night: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
      }

      // Add tile layer based on style
      window.L.tileLayer(mapStyles[mapStyle], {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(newMap)

      // Create custom icon with 3D effect
      const customIcon = window.L.divIcon({
        className: "custom-marker",
        html: `
          <div class="marker-container" style="position: relative; width: 40px; height: 40px;">
            <div class="marker-shadow" style="
              position: absolute;
              bottom: -5px;
              left: 50%;
              transform: translateX(-50%);
              width: 20px;
              height: 6px;
              background: rgba(0,0,0,0.3);
              border-radius: 50%;
              filter: blur(3px);
            "></div>
            <div class="marker-pin" style="
              width: 30px;
              height: 30px;
              position: absolute;
              left: 50%;
              top: 0;
              margin-left: -15px;
              border-radius: 50% 50% 50% 0;
              background: #2b7fff;
              transform: rotate(-45deg);
              box-shadow: 
                0 0 0 6px rgba(239, 68, 68, 0.2),
                0 0 0 12px rgba(239, 68, 68, 0.1),
                5px 5px 10px rgba(0,0,0,0.2);
              animation: bounce 1s ease-in-out infinite alternate;
            ">
              <div style="
                width: 14px;
                height: 14px;
                background: white;
                position: absolute;
                border-radius: 50%;
                top: 8px;
                left: 8px;
              "></div>
            </div>
          </div>
          <div class="pulse" style="
            background: rgba(239, 68, 68, 0.2);
            border-radius: 50%;
            height: 50px;
            width: 50px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -25px 0 0 -25px;
            transform: rotateX(55deg);
            z-index: -2;
            animation: pulse 2s ease-out infinite;
          "></div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      })

      // Add marker
      const newMarker = window.L.marker([location.coordinates[0], location.coordinates[1]], {
        icon: customIcon,
        title: location.name,
      }).addTo(newMap)

      // Add popup with custom styling
      const popupContent = `
        <div style="
          padding: 12px; 
          text-align: center;
          border-radius: 8px;
          min-width: 200px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        ">
          <div style="
            width: 40px;
            height: 40px;
            background-color: #2b7fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 8px;
            color: white;
            font-weight: bold;
          ">
            ${location.name.charAt(0)}
          </div>
          <h3 style="
            margin: 0 0 5px; 
            font-size: 16px; 
            color: #2b7fff;
            font-weight: bold;
          ">${location.name}</h3>
          <p style="
            margin: 0 0 8px; 
            font-size: 12px; 
            color: #2b7fff;
          ">${location.address}</p>
          <div style="
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 8px;
          ">
            <a href="tel:${location.phone}" style="
              background-color: #2b7fff;
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              text-decoration: none;
              font-size: 12px;
            ">Appeler</a>
            <a href="mailto:${location.email}" style="
              background-color: #2b7fff;
              color: #2b7fff;
              padding: 4px 8px;
              border-radius: 4px;
              text-decoration: none;
              font-size: 12px;
            ">Email</a>
          </div>
        </div>
      `

      newMarker.bindPopup(popupContent)

      // Add circle with gradient effect
      const circle = window.L.circle([location.coordinates[0], location.coordinates[1]], {
        color: "#2b7fff",
        fillColor: "#2b7fff",
        fillOpacity: 0.1,
        radius: 300,
        weight: 1,
      }).addTo(newMap)

      // Add custom controls
      const customControls = window.L.control({ position: "bottomright" })
      customControls.onAdd = () => {
        const div = window.L.DomUtil.create("div", "leaflet-control-custom")
        div.innerHTML = `
          <div style="
            display: flex;
            flex-direction: column;
            gap: 8px;
            background: white;
            padding: 8px;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          ">
            <button id="zoom-in" style="
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: #2b7fff;
              color: white;
              border: none;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              font-size: 18px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            ">+</button>
            <button id="zoom-out" style="
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: #2b7fff;
              color: white;
              border: none;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              font-size: 18px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            ">-</button>
            <button id="center-map" style="
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: #2b7fff;
              color: white;
              border: none;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              font-size: 14px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            ">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
        `

        // Prevent map click events from propagating to the controls
        window.L.DomEvent.disableClickPropagation(div)

        // Add event listeners
        setTimeout(() => {
          document.getElementById("zoom-in").addEventListener("click", () => {
            newMap.zoomIn()
          })
          document.getElementById("zoom-out").addEventListener("click", () => {
            newMap.zoomOut()
          })
          document.getElementById("center-map").addEventListener("click", () => {
            newMap.setView([location.coordinates[0], location.coordinates[1]], 15, {
              animate: true,
              duration: 1,
            })
          })
        }, 100)

        return div
      }
      customControls.addTo(newMap)

      // Style selector control
      const styleControl = window.L.control({ position: "topright" })
      styleControl.onAdd = () => {
        const div = window.L.DomUtil.create("div", "leaflet-control-styles")
        div.innerHTML = `
          <div style="
            display: flex;
            gap: 4px;
            background: white;
            padding: 6px;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          ">
            <button id="style-streets" class="style-btn ${mapStyle === "streets" ? "active" : ""}" style="
              width: 24px;
              height: 24px;
              border-radius: 4px;
              background: ${mapStyle === "streets" ? "#2b7fff" : "#2b7fff"};
              color: ${mapStyle === "streets" ? "white" : "#2b7fff"};
              border: none;
              font-size: 10px;
              cursor: pointer;
            ">Rue</button>
            <button id="style-satellite" class="style-btn ${mapStyle === "satellite" ? "active" : ""}" style="
              width: 24px;
              height: 24px;
              border-radius: 4px;
              background: ${mapStyle === "satellite" ? "#2b7fff" : "#2b7fff"};
              color: ${mapStyle === "satellite" ? "white" : "#2b7fff"};
              border: none;
              font-size: 10px;
              cursor: pointer;
            ">Sat</button>
            <button id="style-night" class="style-btn ${mapStyle === "night" ? "active" : ""}" style="
              width: 24px;
              height: 24px;
              border-radius: 4px;
              background: ${mapStyle === "night" ? "#2b7fff" : "#2b7fff"};
              color: ${mapStyle === "night" ? "white" : "#2b7fff"};
              border: none;
              font-size: 10px;
              cursor: pointer;
            ">Nuit</button>
          </div>
        `

        // Prevent map click events from propagating to the controls
        window.L.DomEvent.disableClickPropagation(div)

        // Add event listeners
        setTimeout(() => {
          document.getElementById("style-streets").addEventListener("click", () => {
            setMapStyle("streets")
          })
          document.getElementById("style-satellite").addEventListener("click", () => {
            setMapStyle("satellite")
          })
          document.getElementById("style-night").addEventListener("click", () => {
            setMapStyle("night")
          })
        }, 100)

        return div
      }
      styleControl.addTo(newMap)

      // Add custom CSS for animations
      if (!document.getElementById("leaflet-custom-css")) {
        const style = document.createElement("style")
        style.id = "leaflet-custom-css"
        style.textContent = `
          @keyframes pulse {
            0% {
              transform: scale(0.1, 0.1);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: scale(1.5, 1.5);
              opacity: 0;
            }
          }
          
          @keyframes bounce {
            0% {
              transform: rotate(-45deg) translateY(0);
            }
            100% {
              transform: rotate(-45deg) translateY(-5px);
            }
          }
          
          .leaflet-marker-icon {
            filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07));
          }
          
          .leaflet-popup-content-wrapper {
            border-radius: 12px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            overflow: hidden;
            padding: 0;
          }
          
          .leaflet-popup-content {
            margin: 0;
            width: auto !important;
          }
          
          .leaflet-popup-tip {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          
          .leaflet-container {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          }
          
          .style-btn.active {
            background-color: #2b7fff !important;
            color: white !important;
          }
          
          .leaflet-control-custom button:hover,
          .style-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease;
          }
        `
        document.head.appendChild(style)
      }

      // Store references
      setMap(newMap)
      setMarker(newMarker)
      setMapLoaded(true)

      // Pulsing effect for circle
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

      // Add 3D tilt effect on mouse move
      const mapContainer = mapRef.current
      const handleMouseMove = (e) => {
        if (!mapContainer) return

        const rect = mapContainer.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const tiltX = (y - centerY) / 50
        const tiltY = (centerX - x) / 50

        mapContainer.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
      }

      const resetTilt = () => {
        if (!mapContainer) return
        mapContainer.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
      }

      mapContainer.addEventListener("mousemove", handleMouseMove)
      mapContainer.addEventListener("mouseleave", resetTilt)

      // Clean up
      return () => {
        clearInterval(pulseInterval)
        if (map) {
          map.remove()
          setMap(null)
          setMarker(null)
        }
      }
    }
  }, [mapStyle])

  // Update map when location changes
  useEffect(() => {
    if (!map || !marker || !window.L) return

    // Update map center and marker position
    if (map && marker && window.L) {
      map.setView([location.coordinates[0], location.coordinates[1]], isExpanded ? 16 : 15, {
        animate: true,
        duration: 1,
        easeLinearity: 0.5,
      })
      marker.setLatLng([location.coordinates[0], location.coordinates[1]])

      // Update popup content
      const popupContent = `
        <div style="
          padding: 12px; 
          text-align: center;
          border-radius: 8px;
          min-width: 200px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        ">
          <div style="
            width: 40px;
            height: 40px;
            background-color: #2b7fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 8px;
            color: white;
            font-weight: bold;
          ">
            ${location.name.charAt(0)}
          </div>
          <h3 style="
            margin: 0 0 5px; 
            font-size: 16px; 
            color: #2b7fff;
            font-weight: bold;
          ">${location.name}</h3>
          <p style="
            margin: 0 0 8px; 
            font-size: 12px; 
            color: #2b7fff;
          ">${location.address}</p>
          <div style="
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 8px;
          ">
            <a href="tel:${location.phone}" style="
              background-color: #2b7fff;
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              text-decoration: none;
              font-size: 12px;
            ">Appeler</a>
            <a href="mailto:${location.email}" style="
              background-color: #2b7fff;
              color: #2b7fff;
              padding: 4px 8px;
              border-radius: 4px;
              text-decoration: none;
              font-size: 12px;
            ">Email</a>
          </div>
        </div>
      `

      marker.bindPopup(popupContent)

      // Fly to location with animation
      map.flyTo([location.coordinates[0], location.coordinates[1]], isExpanded ? 16 : 15, {
        duration: 1.5,
        easeLinearity: 0.25,
      })

      // Bounce effect simulation
      const originalPos = [location.coordinates[0], location.coordinates[1]]
      const bounceAnimation = () => {
        setTimeout(() => {
          marker.setLatLng([originalPos[0] - 0.0001, originalPos[1]])
        }, 200)
        setTimeout(() => {
          marker.setLatLng([originalPos[0] + 0.0001, originalPos[1]])
        }, 400)
        setTimeout(() => {
          marker.setLatLng(originalPos)
        }, 600)
      }

      bounceAnimation()

      // Add a dramatic reveal effect
      const mapContainer = mapRef.current
      if (mapContainer) {
        mapContainer.style.transform = "perspective(1000px) rotateX(10deg) scale3d(0.95, 0.95, 0.95)"
        setTimeout(() => {
          mapContainer.style.transition = "transform 1s ease-out"
          mapContainer.style.transform = "perspective(1000px) rotateX(0deg) scale3d(1, 1, 1)"
        }, 100)
        setTimeout(() => {
          mapContainer.style.transition = ""
        }, 1100)
      }
    }
  }, [location, isExpanded, map, marker])

  // Update map style when it changes
  useEffect(() => {
    if (map && window.L) {
      // Map style URLs
      const mapStyles = {
        streets: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        night: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
      }

      // Remove existing layers
      map.eachLayer((layer) => {
        if (layer instanceof window.L.TileLayer) {
          map.removeLayer(layer)
        }
      })

      // Add new tile layer
      window.L.tileLayer(mapStyles[mapStyle], {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      // Update style buttons
      document.querySelectorAll(".style-btn").forEach((btn) => {
        btn.classList.remove("active")
        btn.style.backgroundColor = "#2b7fff"
        btn.style.color = "#2b7fff"
      })

      const activeBtn = document.getElementById(`style-${mapStyle}`)
      if (activeBtn) {
        activeBtn.classList.add("active")
        activeBtn.style.backgroundColor = "#2b7fff"
        activeBtn.style.color = "white"
      }
    }
  }, [mapStyle, map])

  return (
    <div className="relative w-full h-full">
      {/* Map container with fancy border and 3D effect */}
      <div
        className="absolute inset-0 rounded-b-xl overflow-hidden"
        style={{
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          transition: "transform 0.3s ease-out",
        }}
      >
        <div ref={mapRef} id="map" className="w-full h-full" style={{ transition: "all 0.5s ease" }} />
      </div>

      {/* Map overlay with location info */}
      <motion.div
        className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg z-[1000] max-w-xs"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {location.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-medium text-sm text-blue-600">{location.name}</h4>
            <p className="text-xs text-gray-600">{location.address}</p>
          </div>
        </div>
      </motion.div>

      {/* Map style indicator */}
      <motion.div
        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg z-[1000]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <span className="text-xs font-medium text-blue-500">
          {mapStyle === "streets" ? "Vue Rue" : mapStyle === "satellite" ? "Vue Satellite" : "Vue Nuit"}
        </span>
      </motion.div>

      {/* Loading overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-[999]">
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-gray-600 text-sm mt-4">Chargement de la carte...</p>
          </div>
        </div>
      )}

      {/* Creative floating elements */}
      <div className="absolute inset-0 pointer-events-none z-[998] overflow-hidden">
        {mapLoaded && (
          <>
            <motion.div
              className="absolute w-20 h-20 rounded-full bg-blue-500/10"
              style={{ top: "20%", left: "10%" }}
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute w-12 h-12 rounded-full bg-blue-500/10"
              style={{ bottom: "30%", right: "15%" }}
              animate={{
                y: [0, 10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 1,
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default MapComponent
