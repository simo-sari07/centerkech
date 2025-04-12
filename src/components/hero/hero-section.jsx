"use client"

import { useRef } from "react"
import React from "react"
import { motion } from "framer-motion"
import { Player } from "@lottiefiles/react-lottie-player"
import { BookOpen, GraduationCap, PenTool, Brain, Calculator, School } from "lucide-react"

export default function HeroSection() {
  const imageRef = useRef(null)

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  // Interactive particle animation for education theme
  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background:
                i % 3 === 0
                  ? "rgba(59, 130, 246, 0.3)" // Blue
                  : i % 3 === 1
                    ? "rgba(16, 185, 129, 0.3)" // Green
                    : "rgba(245, 158, 11, 0.3)", // Amber
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
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    )
  }

  const features = [
    {
      icon: School,
      text: "Environnement Stimulant",
      description: "Cadre d'apprentissage moderne et inspirant",
      lottie: "https://assets10.lottiefiles.com/packages/lf20_jtbfg2nb.json", // School building animation
    },
    {
      icon: GraduationCap,
      text: "Enseignants Qualifiés",
      description: "Professeurs expérimentés et passionnés",
      lottie: "https://assets9.lottiefiles.com/packages/lf20_5njp3vgg.json", // Teacher animation
    },
    {
      icon: BookOpen,
      text: "Méthode Pédagogique",
      description: "Approche personnalisée pour chaque élève",
      lottie: "https://assets2.lottiefiles.com/packages/lf20_dn6rwtwl.json", // Book animation
    },
  ]

  const disciplines = [
    {
      name: "Mathématiques",
      icon: Calculator,
      color: "text-blue-500",
      lottie: "https://assets3.lottiefiles.com/packages/lf20_ychkhrqm.json", // Math animation
    },
    {
      name: "Langues",
      icon: PenTool,
      color: "text-amber-500",
      lottie: "https://assets9.lottiefiles.com/packages/lf20_8wuout7s.json", // Language/writing animation
    },
    {
      name: "Sciences",
      icon: Brain,
      color: "text-green-500",
      lottie: "https://assets3.lottiefiles.com/packages/lf20_jtbfg2nb.json", // Science animation
    },
  ]

  return (
    <section
      className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden min-h-screen flex items-center"
      style={{ width: "90%", margin: "0 auto" }}
    >
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
            <motion.div
              variants={itemVariants}
              className="mb-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                Centre d'Excellence Éducative
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900"
            >
              <motion.span
                className="text-blue-600 inline-block"
                animate={{
                  color: ["#2563eb", "#3b82f6", "#2563eb"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                Construisez
              </motion.span>{" "}
              votre avenir
              <span className="block mt-2">avec Excellence</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Développez vos compétences avec nos programmes éducatifs de qualité. Un enseignement personnalisé pour
              votre réussite académique et votre épanouissement personnel.
            </motion.p>

            {/* Disciplines with Lottie animations */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {disciplines.map((discipline, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px blue-50, 0 10px 10px -5px blue-50",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Player autoplay loop src={discipline.lottie} style={{ height: "30px", width: "30px" }} />
                  </div>
                  <span className="font-medium text-gray-700">{discipline.name}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Features with Lottie animations */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="bg-white p-4 rounded-xl shadow-sm hover:shadow transition-all flex flex-col items-center lg:items-start gap-2"
                >
                  <div className="w-16 h-16 mb-2">
                    <Player autoplay loop src={feature.lottie} style={{ height: "100%", width: "100%" }} />
                  </div>
                  <span className="font-medium text-gray-800">{feature.text}</span>
                  <p className="text-sm text-gray-500 text-center lg:text-left">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                onClick={() => console.log("Primary button clicked")}
              >
                Commencer Maintenant
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                onClick={() => console.log("Secondary button clicked")}
              >
                En Savoir Plus
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image Side - Education-focused Lottie animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] order-1 lg:order-2"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="relative h-full flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full p-6"
                >
                  <div className="h-full w-full rounded-xl overflow-hidden shadow-2xl relative bg-white flex items-center justify-center">
                    {/* Main education Lottie animation - Changed to a more education-focused animation */}
                    <Player
                      autoplay
                      loop
                      src="https://assets3.lottiefiles.com/packages/lf20_mf5j5kua.json"
                      style={{ height: "100%", width: "100%" }}
                    />

                    {/* Subtle overlay to enhance animation */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-green-500/5"></div>

                    {/* Optional decorative elements */}
                    <motion.div
                      className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-blue-600 shadow-sm"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      }}
                    >
                      Découvrez nos programmes
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Animated Decorative Elements */}
            <motion.div
              className="absolute -z-10 top-1/2 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -z-10 bottom-0 left-0 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 1,
              }}
            />
            <motion.div
              className="absolute -z-10 top-0 left-1/4 w-40 h-40 bg-amber-100 rounded-full blur-3xl opacity-20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 2,
              }}
            />
          </motion.div>
        </div>

        {/* Stats counter with Lottie animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center"
        >
          {[
            {
              value: "15+",
              label: "Années d'expérience",
              lottie: "https://assets3.lottiefiles.com/packages/lf20_touohxv0.json", // Calendar/time animation
            },
            {
              value: "500+",
              label: "Étudiants satisfaits",
              lottie: "https://assets5.lottiefiles.com/private_files/lf30_yJWXa5.json", // Students animation
            },
            {
              value: "98%",
              label: "Taux de réussite",
              lottie: "https://assets10.lottiefiles.com/packages/lf20_ltbqacam.json", // Success/trophy animation
            },
            {
              value: "20",
              label: "Prix d'excellence",
              lottie: "https://assets9.lottiefiles.com/packages/lf20_i9mtrven.json", // Award animation
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="p-4"
              whileHover={{
                y: -5,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12">
                  <Player autoplay loop src={stat.lottie} style={{ height: "100%", width: "100%" }} />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
