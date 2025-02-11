"use client"

import { motion } from "framer-motion"
import { Users, BookOpen, Target, Sparkles } from "lucide-react"
import React from "react";

const features = [
  {
    icon: Users,
    title: "L'équipe",
    description: "Une équipe d'enseignants et de professeurs compétents est à votre disposition.",
    color: "bg-blue-500",
  },
  {
    icon: BookOpen,
    title: "Méthode",
    description: "Nous fournissons aux élèves des outils méthodologiques pour les faire gagner en autonomie.",
    color: "bg-red-500",
  },
  {
    icon: Target,
    title: "Un suivi adapté",
    description: "Selon que l'élève veut s'avancer ou s'améliorer, le tuteur adapte ses exercices et ses méthodes.",
    color: "bg-green-500",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
      <div className="container px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Notre Méthode</h2>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="h-1 w-20 bg-red-500 rounded-full" />
            <Sparkles className="h-6 w-6 text-red-500" />
            <div className="h-1 w-20 bg-red-500 rounded-full" />
          </div>
          <p className="text-xl text-gray-600">La recette du succès pour une éducation de qualité</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
              <div className="relative p-8 rounded-2xl border border-gray-100">
                <div
                  className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

