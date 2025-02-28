import FeaturesSection from "../components/features-section"
import HeroSection from "../components/hero/hero-section"
import LocationsSection from "../components/locations-section"
import ServicesSection from "../components/services-section"
import React from "react"
export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <LocationsSection />
    </main>
  )
}

