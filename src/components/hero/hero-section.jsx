"use client"

import { motion } from "framer-motion"
import { FlaskRoundIcon as Flask, GraduationCap, BookOpen } from 'lucide-react'
import img from "../../../public/imgs/homexx.png"
import React from "react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              <span className="text-red-500">Découvrez</span> la Science
              <span className="block mt-2">avec Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Explorez la physique et la chimie avec nos experts qualifiés. Un enseignement pratique et théorique pour
              votre réussite académique.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: Flask, text: "Laboratoire Moderne" },
                { icon: GraduationCap, text: "Experts Qualifiés" },
                { icon: BookOpen, text: "Méthode Éprouvée" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex flex-col items-center lg:items-start gap-2"
                >
                  <feature.icon className="w-6 h-6 text-red-500" />
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <button
                className="bg-red-500 text-white px-8 py-3 rounded-full font-medium hover:bg-red-600 transition-colors"
                onClick={() => console.log("Primary button clicked")}
              >
                Commencer Maintenant
              </button>
              <button
                className="bg-white text-red-500 px-8 py-3 rounded-full font-medium border-2 border-red-500 hover:bg-red-50 transition-colors"
                onClick={() => console.log("Secondary button clicked")}
              >
                En Savoir Plus
              </button>
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] order-1 lg:order-2"
          >
            <div className="relative h-full w-full ">
              <img
                src={img || "/placeholder.svg"}
                alt="Laboratoire de Chimie"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
              />
              {/* Overlay */}
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/2 right-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute -z-10 bottom-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
