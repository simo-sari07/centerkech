"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, Target } from "lucide-react";
import React from "react";
import home from "../../../public/imgs/hoem.png";
import { Link } from "react-router-dom";
// Custom Button component
const Button = ({ children, className, to, onClick, ...props }) => {
  if (to) {
    return (
      <Link
        to={to}
        className={`px-8 py-3 rounded-full font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`px-8 py-3 rounded-full font-medium transition-colors ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 to-orange-50 py-20 lg:py-32">
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              S'inscrire Dans La{" "}
              <span className="text-red-500">Continuité Du Succès</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Bénéficiez d'un soutien scolaire et d'un accompagnement académique
              de qualité, assurés par des experts pédagogues et qualifiés, et
              retrouvez les voies de la réussite...
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                to="/join"
                className="bg-red-500 hover:bg-red-600 text-white text-lg"
              >
                REJOIGNEZ-NOUS
              </Button>
              <Button
                to="/contact"
                className="border border-red-200 text-red-500 hover:bg-red-50 text-lg"
              >
                En savoir plus
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                {
                  icon: GraduationCap,
                  title: "500+",
                  subtitle: "Étudiants",
                },
                {
                  icon: Users,
                  title: "50+",
                  subtitle: "Professeurs",
                },
                {
                  icon: Target,
                  title: "95%",
                  subtitle: "Taux de réussite",
                },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{stat.title}</h3>
                  <p className="text-sm text-gray-500">{stat.subtitle}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-4  blur-xl" />
              <img
                src={home}
                alt="Professor teaching"
                className="relative rounded-xl w-full "
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 flex items-center space-x-4">
              <div className="bg-red-500/10 rounded-full p-2">
                <GraduationCap className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h4 className="font-medium">Expert Teachers</h4>
                <p className="text-sm text-gray-500">Highly qualified staff</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
