"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronRight, ChevronLeft, Quote, ExternalLink } from "lucide-react"
import React from "react"

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  const autoplayRef = useRef(null)
  const carouselRef = useRef(null)

  const testimonials = [
    {
      id: 1,
      name: "Michael D. Lovelady",
      position: "CEO @ Google",
      image: "client/1.webp",
      text: "Histudy education, vulputate at sapien sit amet, auctor iaculis lorem. In vel hendrerit nisi. Vestibulum eget risus velit.",
      rating: 5,
    },
    {
      id: 2,
      name: "Valerie J. Creasman",
      position: "Executive Designer @ Google",
      image: "client/2.webp",
      text: "Our educational, vulputate at sapien sit amet, auctor iaculis lorem. In vel hendrerit nisi. Vestibulum eget risus velit.",
      rating: 5,
    },
    {
      id: 3,
      name: "Hannah R. Sutton",
      position: "Executive Chairman @ Google",
      image: "client/3.webp",
      text: "People says about, vulputate at sapien sit amet, auctor iaculis lorem. In vel hendrerit nisi. Vestibulum eget risus velit.",
      rating: 5,
    },
    {
      id: 4,
      name: "Pearl B. Hill",
      position: "Executive Chairman @ Twitter",
      image: "client/4.webp",
      text: "Like this histudy, vulputate at sapien sit amet, auctor iaculis lorem. In vel hendrerit nisi. Vestibulum eget risus velit.",
      rating: 5,
    },
    {
      id: 5,
      name: "Mandy F. Wood",
      position: "SR Designer @ Google",
      image: "client/5.webp",
      text: "Educational template, vulputate at sapien sit amet, auctor iaculis lorem. In vel hendrerit nisi. Vestibulum eget risus velit.",
      rating: 5,
    },
  ]

  // Get colorful gradient backgrounds for each testimonial
  const getGradientByIndex = (index) => {
    const gradients = [
      "from-blue-400 to-sky-300",
      "from-purple-400 to-pink-300",
      "from-amber-400 to-yellow-300",
      "from-emerald-400 to-teal-300",
      "from-rose-400 to-red-300",
      "from-indigo-400 to-violet-300",
      "from-cyan-400 to-blue-300",
      "from-fuchsia-400 to-pink-300",
    ]
    return gradients[index % gradients.length]
  }

  // Autoplay functionality with direction change
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        // Randomly change direction occasionally
        if (Math.random() > 0.8) {
          setDirection((prev) => prev * -1)
        }

        setActiveIndex((prev) => {
          const total = testimonials.length
          const newIndex = prev + direction

          if (newIndex >= total) return 0
          if (newIndex < 0) return total - 1
          return newIndex
        })
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, direction, testimonials.length])

  // Handle mouse enter/leave for autoplay
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  // Navigation handlers
  const handleNext = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 5000)
  }

  const handlePrev = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 5000)
  }

  const handleDotClick = (index) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 5000)
  }

  // Get visible cards for the current view
  const getVisibleCards = () => {
    const result = []
    const total = testimonials.length
    
    // Main card (center)
    result.push(testimonials[activeIndex])
    
    // Previous card (left)
    const prevIndex = (activeIndex - 1 + total) % total
    result.unshift(testimonials[prevIndex])
    
    // Next card (right)
    const nextIndex = (activeIndex + 1) % total
    result.push(testimonials[nextIndex])
    
    return result
  }

  const visibleCards = getVisibleCards()

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl translate-y-1/2 -translate-x-1/3"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading with animated underline */}
        <div className="text-center mb-20">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Ce que disent nos élèves
          </motion.h2>
           
          <motion.div 
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className="h-1 w-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
              whileHover={{ width: 60 }}
            />
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              whileHover={{ width: 80 }}
            />
            <motion.div
              className="h-1 w-12 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full"
              whileHover={{ width: 60 }}
            />
          </motion.div>
            
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Découvrez les témoignages de nos élèves satisfaits et leurs expériences exceptionnelles
          </motion.p>
        </div>
        
        {/* Main testimonial showcase */}
        <div 
          className="relative mb-24"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Large decorative quotes */}
          <motion.div 
            className="absolute -top-12 left-0 text-gray-100 opacity-60"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Quote size={120} strokeWidth={1} />
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-12 right-0 text-gray-100 opacity-60 rotate-180"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Quote size={120} strokeWidth={1} />
          </motion.div>
          
          {/* Cards container */}
          <div className="max-w-6xl mx-auto relative h-96">
            <AnimatePresence mode="popLayout">
              {visibleCards.map((testimonial, index) => {
                // Position data
                const isActive = index === 1
                const isPrev = index === 0
                const isNext = index === 2
                
                // Animation variants based on position
                let xPosition = 0
                let scale = 1
                let zIndex = 10
                let opacity = 1
                
                if (isPrev) {
                  xPosition = -300
                  scale = 0.85
                  zIndex = 5
                  opacity = 0.7
                } else if (isNext) {
                  xPosition = 300
                  scale = 0.85
                  zIndex = 5
                  opacity = 0.7
                }
                
                return (
                  <motion.div
                    key={`card-${testimonial.id}-${index}`}
                    className={`absolute top-0 left-1/2 w-full max-w-2xl ${isActive ? 'z-20' : 'z-10'}`}
                    initial={{ 
                      x: direction > 0 ? 300 : -300,
                      opacity: 0,
                      scale: 0.85,
                    }}
                    animate={{ 
                      x: xPosition,
                      opacity: opacity,
                      scale: scale,
                      translateX: '-50%',
                    }}
                    exit={{ 
                      x: direction > 0 ? -300 : 300,
                      opacity: 0,
                      scale: 0.85,
                      zIndex: 1,
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    style={{ zIndex }}
                  >
                    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-blue-500 h-full`}>
                      <div className="p-8">
                        {/* Testimonial header */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="relative">
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getGradientByIndex(testimonial.id - 1)} blur-md opacity-70`}></div>
                            <img 
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md relative z-10"
                            />
                          </div>
                          
                          <div>
                            <h4 className="font-bold text-lg">{testimonial.name}</h4>
                            <p className="text-gray-600 text-sm">{testimonial.position}</p>
                            <div className="flex mt-1">
                              {Array.from({ length: testimonial.rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Quote icon */}
                        <div className="mb-4 text-blue-500">
                          <Quote className="w-8 h-8" />
                        </div>
                        
                        {/* Testimonial text */}
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                          {testimonial.text}
                        </p>
                        
                     
                      </div>
                      
                      {/* Bottom gradient bar */}
                      <div className={`h-2 bg-gradient-to-r ${getGradientByIndex(testimonial.id - 1)}`}></div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
            
            {/* Navigation controls */}
            <motion.button
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-lg p-3 z-30"
              onClick={handlePrev}
              whileHover={{ scale: 1.1, x: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </motion.button>
            
            <motion.button
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-lg p-3 z-30"
              onClick={handleNext}
              whileHover={{ scale: 1.1, x: 8 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </motion.button>
          </div>
        </div>
        
        {/* Progress indicators */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index 
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 w-10" 
                    : "bg-gray-300 w-2"
                }`}
                whileHover={{ 
                  scale: 1.2, 
                  backgroundColor: activeIndex === index ? undefined : "#94a3b8"
                }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
        
     
      </div>
    </section>
  )
}

export default TestimonialCarousel