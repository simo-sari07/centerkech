"use client"

import { motion } from "framer-motion"
import { GraduationCap, Languages, Award, Compass, BookOpen, Sparkles } from "lucide-react"
import React from "react"
import img1 from "../../public/imgs/2.avif"
import img2 from "../../public/imgs/9.webp"
import img3 from "../../public/imgs/10.jpg"
import img4 from "../../public/imgs/7.jpg"
import img5 from "../../public/imgs/6.jpg"
import img6 from "../../public/imgs/5.jpeg"

const services = [
  {
    icon: GraduationCap,
    title: "Cours de soutien scolaire",
    description:
      "Des cours d'aide et de soutien scolaire avec des professeurs de longue expérience, attitrés et qualifiés en matière d'enseignement",
    image: img1,
  },
  {
    icon: Languages,
    title: "Langues et communication",
    description: "L'opportunité d'apprendre facilement des langues (Espagnol / Français / Anglais / Allemande...)",
    image: img2,
  },
  {
    icon: Award,
    title: "Préparation Aux concours",
    description:
      "C'est la période la plus cruciale de votre parcours scolaire, où vous avez le plus besoin d'être accompagné et d'être soutenu.",
    image: img3 ,
  },
  {
    icon: Compass,
    title: "Coaching scolaire et orientation",
    description: "Le coaching d'orientation permet de définir un parcours d'études menant à un projet professionnel",
    image: img4,
  },
  {
    icon: BookOpen,
    title: "Formation continue",
    description: "Des programmes de formation continue de haut niveau, conçus sur une pédagogie inédite",
    image: img5,
  },
  {
    icon: Sparkles,
    title: "Développement personnel",
    description: "Découvrez nos services de développement personnel et mettez l'humain au coeur de vos projets",
    image: img6,
  },
]

export default function ServicesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4" style={{width:"90%" ,margin:"0 auto"}}>
        <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">NOS SERVICES</h2>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="h-1 w-20 bg-red-500 rounded-full" />
            <Sparkles className="h-6 w-6 text-red-500" />
            <div className="h-1 w-20 bg-red-500 rounded-full" />
          </div>
          <p className="text-xl text-gray-600">La recette du succès pour une éducation de qualité</p>
        </div>
          <h2 className="text-3xl font-bold mb-4">Soutien et Accompagnement scolaire à Marrakech</h2>
          <p className="text-gray-600">L'art de la réussite consiste à savoir s'entourer des meilleurs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
              <div className="relative p-6 rounded-2xl border border-gray-100">
                <div className="bg-red-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="h-7 w-7 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

