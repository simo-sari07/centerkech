"use client"

import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import React from "react"

export default function MapComponent({ location }) {
  useEffect(() => {
    const map = L.map("map").setView(location.coordinates, 13)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    const marker = L.marker(location.coordinates).addTo(map)
    marker.bindPopup(location.name).openPopup()

    return () => {
      map.remove()
    }
  }, [location])

  return <div id="map" style={{ height: "100%", width: "100%" }} />
}

