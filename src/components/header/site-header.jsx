"use client"

import { Link } from "react-router-dom"
import React from "react"
import { useState, useEffect } from "react"
import { Menu, Phone, ChevronDown, X } from "lucide-react"

// Custom Button component with Link support
const Button = ({ children, className, to, onClick, ...props }) => {
  if (to) {
    return (
      <Link
        to={to}
        className={`inline-flex items-center justify-center px-4 py-2 rounded-full font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
      </Link>
    )
  }
  return (
    <button
      className={`inline-flex items-center justify-center px-4 py-2 rounded-full font-medium transition-colors ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

const formations = [
  {
    title: "Cours de soutien scolaire",
    to: "/formations/soutien",
    description: "Des cours d'aide et de soutien scolaire",
  },
  {
    title: "Langues et communication",
    to: "/formations/langues",
    description: "Apprenez de nouvelles langues",
  },
  {
    title: "Préparation Aux concours",
    to: "/formations/concours",
    description: "Préparez-vous aux examens",
  },
  {
    title: "Coaching scolaire et orientation",
    to: "/formations/coaching",
    description: "Orientation et accompagnement",
  },
  {
    title: "Formation continue",
    to: "/formations/continue",
    description: "Formation professionnelle continue",
  },
  {
    title: "Développement personnel",
    to: "/formations/development",
    description: "Développez vos compétences personnelles",
  },
]

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [])

  // Handle mobile menu accessibility
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-white/60"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 z-50">
          <img
            src="https://www.ville-marrakech.ma/images/blog/alc.jpg"
            alt="Logo Centre Red City"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-red-500">
            ACCUEIL
          </Link>

          {/* Formations Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center space-x-1 text-sm font-medium text-red-500 group"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span>NOS FORMATIONS</span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block w-80 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="grid gap-4">
                {formations.map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    className="group grid gap-1 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                      <span className="font-medium text-sm text-gray-900 group-hover:text-red-500">{item.title}</span>
                    </div>
                    <span className="text-xs text-gray-500 pl-3.5">{item.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link to="/contact" className="text-sm font-medium transition-colors hover:text-red-500">
            CONTACTEZ-NOUS
          </Link>
          <Link to="/join" className="text-sm font-medium transition-colors hover:text-red-500">
            REJOIGNEZ-NOUS
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-6">
          <a
            href="tel:+212639042053"
            className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span className="text-sm font-medium">+212 6 75 77 58 84</span>
          </a>
          <Button to="/join" className="bg-red-500 hover:bg-red-600 text-white px-8">
            REJOIGNEZ-NOUS
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden z-50 p-2 -mr-2"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-white z-40 transition-transform duration-300 lg:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full overflow-y-auto px-4 py-24">
            <nav className="space-y-8">
              {/* Main Navigation */}
              <div className="space-y-4">
                <Link to="/" className="block text-lg font-medium hover:text-red-500" onClick={() => setIsOpen(false)}>
                  ACCUEIL
                </Link>

                {/* Mobile Formations */}
                <div className="space-y-4">
                  <div className="text-lg font-medium text-red-500">NOS FORMATIONS</div>
                  <div className="pl-4 space-y-4">
                    {formations.map((item) => (
                      <Link
                        key={item.title}
                        to={item.to}
                        className="block text-gray-600 hover:text-red-500"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="block text-lg font-medium hover:text-red-500"
                  onClick={() => setIsOpen(false)}
                >
                  CONTACTEZ-NOUS
                </Link>
                <Link
                  to="/join"
                  className="block text-lg font-medium hover:text-red-500"
                  onClick={() => setIsOpen(false)}
                >
                  REJOIGNEZ-NOUS
                </Link>
              </div>

              {/* Mobile Contact */}
              <div className="space-y-4">
                <a href="tel:+212639042053" className="flex items-center space-x-2 text-red-500">
                  <Phone className="h-5 w-5" />
                  <span className="text-sm font-medium">+212 6 39 04 20 53</span>
                </a>
                <Button
                  to="/join"
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  REJOIGNEZ-NOUS
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

