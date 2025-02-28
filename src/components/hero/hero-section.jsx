"use client"

import { motion } from "framer-motion"
import { FlaskRoundIcon as Flask, GraduationCap, BookOpen, Atom, Microscope, Beaker } from 'lucide-react'
import React from "react"
import logo from "../../../public/imgs/homexx.png"

export default function HeroSection() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  // Interactive particle animation for scientific theme
  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: i % 3 === 0 ? 'rgba(239, 68, 68, 0.3)' : i % 3 === 1 ? 'rgba(59, 130, 246, 0.3)' : 'rgba(16, 185, 129, 0.3)',
              width: Math.random() * 30 + 10,
              height: Math.random() * 30 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5, 1],
              opacity: [0.7, 0.4, 0.7],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    );
  };

  const features = [
    { 
      icon: Flask, 
      text: "Laboratoire Moderne", 
      description: "Équipement de pointe pour expériences pratiques" 
    },
    { 
      icon: GraduationCap, 
      text: "Experts Qualifiés", 
      description: "Enseignants expérimentés et passionnés" 
    },
    { 
      icon: BookOpen, 
      text: "Méthode Éprouvée", 
      description: "Approche pédagogique reconnue et efficace" 
    },
  ];

  const disciplines = [
    { name: "Physique", icon: Atom, color: "text-blue-500" },
    { name: "Chimie", icon: Beaker, color: "text-red-500" },
    { name: "Biologie", icon: Microscope, color: "text-green-500" },
  ];

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden min-h-screen flex items-center" style={{width:"90%" ,margin:"0 auto"}}>
      {/* Particle animation background */}
      <ParticleBackground />
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="mb-2">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-500 rounded-full text-sm font-medium">
                Centre d'Excellence Scientifique
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              <span className="text-red-500">Découvrez</span> la Science
              <span className="block mt-2">avec Excellence</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Explorez la physique et la chimie avec nos experts qualifiés. Un enseignement pratique et théorique pour
              votre réussite académique et professionnelle.
            </motion.p>

            {/* Disciplines */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
            >
              {disciplines.map((discipline, index) => (
                <div key={index} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <discipline.icon className={`w-5 h-5 ${discipline.color}`} />
                  <span className="font-medium text-gray-700">{discipline.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Features */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-4 rounded-xl shadow-sm hover:shadow transition-all flex flex-col items-center lg:items-start gap-2"
                >
                  <div className="bg-red-50 p-2 rounded-lg mb-2">
                    <feature.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <span className="font-medium text-gray-800">{feature.text}</span>
                  <p className="text-sm text-gray-500 text-center lg:text-left">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 text-white px-8 py-3 rounded-full font-medium hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
                onClick={() => console.log("Primary button clicked")}
              >
                Commencer Maintenant
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red-500 px-8 py-3 rounded-full font-medium border-2 border-red-500 hover:bg-red-50 transition-colors"
                onClick={() => console.log("Secondary button clicked")}
              >
                En Savoir Plus
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image Side - Stable image with enhanced presentation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] order-1 lg:order-2"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="relative h-full flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full p-6"
                >
                  <div className="h-full w-full rounded-xl overflow-hidden shadow-2xl relative">
                    <img
                      src={logo}
                      alt="Laboratoire de Chimie"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    
                    {/* Subtle overlay to enhance image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 via-transparent to-blue-500/10"></div>
                    
                    {/* Optional decorative elements */}
                    <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-red-500 shadow-sm">
                      Découvrez nos installations
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/2 right-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute -z-10 bottom-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2" />
            <div className="absolute -z-10 top-0 left-1/4 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-20" />
          </motion.div>
        </div>
        
        {/* Stats counter - optional section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center"
        >
          {[
            { value: "25+", label: "Années d'expérience" },
            { value: "300+", label: "Étudiants satisfaits" },
            { value: "95%", label: "Taux de réussite" },
            { value: "12", label: "Prix d'excellence" },
          ].map((stat, i) => (
            <div key={i} className="p-4">
              <div className="text-3xl font-bold text-red-500 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}