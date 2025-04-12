import BlogSection from "../components/blog-section"
import HeroSection from "../components/hero/hero-section"
import LocationsSection from "../components/locations-section"
import ServicesSection from "../components/services-section"
import TestimonialSection from "../components/testimonial-section"
//       <div className="container mx-auto px-4">
import React from "react"
export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ServicesSection />
      <LocationsSection />
      <TestimonialSection/>
      <BlogSection/>
    </main>
  )
}

