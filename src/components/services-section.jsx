"use client"

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CalendarCheck, 
  CheckCircle, 
  ChevronRight, 
  Clock, 
  Sparkles, 
  Star, 
  UserPlus, 
  Users
} from "lucide-react";

// Sample upcoming session data
const upcomingSessions = [
  {
    id: 1,
    title: "Préparation au Bac - Mathématiques",
    date: "15 Mars 2025",
    time: "14h00 - 16h00",
    spots: 5,
    level: "Terminale",
    category: "Mathématiques",
  },
  {
    id: 2,
    title: "Cours d'Anglais - Niveau Intermédiaire",
    date: "18 Mars 2025",
    time: "16h30 - 18h00",
    spots: 3,
    level: "Collège",
    category: "Langues",
  },
  {
    id: 3,
    title: "Méthodologie et Organisation",
    date: "20 Mars 2025",
    time: "15h00 - 17h00",
    spots: 8,
    level: "Tous niveaux",
    category: "Développement personnel",
  }
];

// Benefits list
const benefits = [
  "Premier cours d'essai gratuit",
  "Engagement sans durée minimale",
  "Professeurs expérimentés et certifiés",
  "Suivi personnalisé de votre progression",
  "Supports de cours accessibles 24/7",
  "Satisfaction garantie ou remboursé"
];

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState("formules");
  const [hoveredSession, setHoveredSession] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-gray-50" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-200 rounded-full filter blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(#f1f1f1_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

      <div className="container px-4 mx-auto relative z-10" style={{width:"90%", margin:"0 auto"}}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">COMMENCEZ MAINTENANT</h2>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="h-1 w-20 bg-red-500 rounded-full" />
            <Sparkles className="h-6 w-6 text-red-500" />
            <div className="h-1 w-20 bg-red-500 rounded-full" />
          </div>
          <p className="text-xl text-gray-600">Inscrivez-vous à nos cours et transformez votre parcours académique</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-10 items-stretch">
          {/* Left Column - Form */}
          <motion.div 
            className="lg:col-span-3 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-100">
              <button 
                className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${activeTab === "formules" ? "bg-red-50 text-red-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("formules")}
              >
                NOS FORMULES
              </button>
              <button 
                className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${activeTab === "inscription" ? "bg-red-50 text-red-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("inscription")}
              >
                INSCRIPTION RAPIDE
              </button>
            </div>

            <div className="p-6 lg:p-8">
              {activeTab === "formules" ? (
                <div>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">Découvrez nos différentes formules</h3>
                    <p className="text-gray-500">Adaptées à tous les niveaux et à tous les budgets</p>
                  </div>

                  <div className="space-y-4">
                    {/* Premium Package */}
                    <motion.div 
                      className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-red-50 to-white relative overflow-hidden"
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="absolute top-0 right-0">
                        <div className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                          POPULAIRE
                        </div>
                      </div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">Pack Premium</h4>
                          <p className="text-sm text-gray-500">Accompagnement complet et personnalisé</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-600">350 MAD</div>
                          <div className="text-xs text-gray-500">par séance</div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>8 séances par mois (2h par séance)</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>Support de cours inclus</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>Évaluations régulières</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>Accès aux sessions de groupe</span>
                        </div>
                      </div>
                      <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center">
                        <span>Sélectionner</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </motion.div>

                    {/* Standard Package */}
                    <motion.div 
                      className="border border-gray-200 rounded-xl p-6 bg-white"
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">Pack Standard</h4>
                          <p className="text-sm text-gray-500">Solution flexible et efficace</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800">200 MAD</div>
                          <div className="text-xs text-gray-500">par séance</div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>4 séances par mois (2h par séance)</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>Support de cours basique</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>Évaluation mensuelle</span>
                        </div>
                      </div>
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition-colors flex items-center justify-center">
                        <span>Sélectionner</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </motion.div>

                    {/* À la carte */}
                    <motion.div 
                      className="border border-gray-200 rounded-xl p-6 bg-white"
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">À la carte</h4>
                          <p className="text-sm text-gray-500">Pour des besoins ponctuels</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800">250 MAD</div>
                          <div className="text-xs text-gray-500">par séance</div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>Séances à la demande</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>Support de cours fourni</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>Sans engagement</span>
                        </div>
                      </div>
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition-colors flex items-center justify-center">
                        <span>Sélectionner</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </motion.div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold mb-2">Inscrivez-vous en quelques clics</h3>
                    <p className="text-gray-500">Complétez le formulaire ci-dessous pour réserver votre place</p>
                  </div>

                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                        placeholder="+212 XXX XXXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Niveau scolaire</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors appearance-none bg-white">
                        <option value="">Sélectionnez votre niveau</option>
                        <option value="primaire">Primaire</option>
                        <option value="college">Collège</option>
                        <option value="lycee">Lycée</option>
                        <option value="superieur">Enseignement Supérieur</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Matière(s) souhaitée(s)</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors appearance-none bg-white">
                        <option value="">Sélectionnez une matière</option>
                        <option value="mathematiques">Mathématiques</option>
                        <option value="physique">Physique-Chimie</option>
                        <option value="francais">Français</option>
                        <option value="anglais">Anglais</option>
                        <option value="arabe">Arabe</option>
                        <option value="svt">SVT</option>
                        <option value="histoire">Histoire-Géographie</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message (optionnel)</label>
                      <textarea 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                        rows="3"
                        placeholder="Dites-nous en plus sur vos besoins spécifiques..."
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center">
                        <UserPlus className="h-5 w-5 mr-2" />
                        <span>S'inscrire maintenant</span>
                      </button>
                      <p className="text-xs text-center text-gray-500 mt-3">
                        En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
                      </p>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column - Benefits & Upcoming Sessions */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Benefits Card */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-red-50 p-3 rounded-lg mr-4">
                  <Star className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold">Pourquoi nous choisir ?</h3>
              </div>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center"
                    variants={itemVariants}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Sessions Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-50 p-3 rounded-lg mr-4">
                  <CalendarCheck className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Sessions à venir</h3>
              </div>
              
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <motion.div 
                    key={session.id}
                    className="border border-gray-100 rounded-xl p-4 bg-gray-50 relative overflow-hidden"
                    whileHover={{ 
                      y: -3, 
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                      backgroundColor: "#fff"
                    }}
                    transition={{ duration: 0.2 }}
                    onHoverStart={() => setHoveredSession(session.id)}
                    onHoverEnd={() => setHoveredSession(null)}
                  >
                    <div className="absolute top-0 right-0 h-full w-1 bg-blue-500 opacity-50" />
                    <h4 className="font-semibold mb-2 pr-16">{session.title}</h4>
                    
                    <div className="flex flex-wrap gap-y-2">
                      <div className="w-1/2 flex items-center">
                        <CalendarCheck className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm text-gray-700">{session.date}</span>
                      </div>
                      <div className="w-1/2 flex items-center">
                        <Clock className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm text-gray-700">{session.time}</span>
                      </div>
                      <div className="w-1/2 flex items-center">
                        <Users className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm text-gray-700">{session.spots} places</span>
                      </div>
                      <div className="w-1/2 flex items-center">
                        <span className="text-sm text-gray-700">{session.level}</span>
                      </div>
                    </div>
                    
                    <motion.div
                      className="mt-3 text-right"
                      animate={{ 
                        opacity: hoveredSession === session.id ? 1 : 0,
                        y: hoveredSession === session.id ? 0 : 10 
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-lg transition-colors inline-flex items-center">
                        <span>Réserver</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center">
                  <span>Voir toutes les sessions</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

     
      </div>
    </section>
  );
}