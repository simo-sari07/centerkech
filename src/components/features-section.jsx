import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Élève de Terminale",
    avatar: "/api/placeholder/64/64",
    content: "Grâce à cette méthode, j'ai pu améliorer mes notes en mathématiques et décrocher une mention au bac. Le suivi personnalisé a fait toute la différence !",
    rating: 5,
    subject: "Mathématiques",
    improvement: "+4 points",
    bgColor: "bg-blue-50",
    accentColor: "text-blue-600",
    borderColor: "border-blue-200"
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Étudiant en Licence",
    avatar: "/api/placeholder/64/64",
    content: "Les tuteurs sont exceptionnels. Ils m'ont aidé à développer une véritable méthode de travail que j'utilise maintenant à l'université.",
    rating: 5,
    subject: "Physique-Chimie",
    improvement: "+3 points",
    bgColor: "bg-purple-50",
    accentColor: "text-purple-600",
    borderColor: "border-purple-200"
  },
  {
    id: 3,
    name: "Emma Petit",
    role: "Élève de Première",
    avatar: "/api/placeholder/64/64",
    content: "Le pack intensif m'a permis de rattraper mon retard en quelques semaines. Je me sens beaucoup plus confiante pour aborder mes examens.",
    rating: 4,
    subject: "Français",
    improvement: "+5 points",
    bgColor: "bg-rose-50",
    accentColor: "text-rose-600",
    borderColor: "border-rose-200"
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
            Témoignages d'Élèves
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-lg">
            Découvrez comment notre méthode a transformé le parcours académique de nos élèves
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Main Testimonial Card */}
            <div 
              className="relative p-1 rounded-3xl bg-gradient-to-r from-blue-200 via-purple-200 to-rose-200"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-2 md:-top-6 md:-left-4">
                  <div className={`p-3 rounded-full ${testimonials[activeIndex].bgColor}`}>
                    <Quote className={`w-6 h-6 ${testimonials[activeIndex].accentColor}`} />
                  </div>
                </div>

                <div className="grid md:grid-cols-5 gap-8">
                  {/* Author Info - Mobile Version */}
                  <div className="md:hidden flex items-center mb-4">
                    <div className="mr-4">
                      <img 
                        src={testimonials[activeIndex].avatar} 
                        alt={testimonials[activeIndex].name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {testimonials[activeIndex].role}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="md:col-span-3 flex flex-col justify-center">
                    <div className="mb-6">
                      <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed">
                        "{testimonials[activeIndex].content}"
                      </p>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < testimonials[activeIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4">
                      <div className={`px-4 py-2 rounded-full ${testimonials[activeIndex].bgColor} ${testimonials[activeIndex].borderColor} border`}>
                        <span className="text-sm font-medium">
                          Matière: <span className={testimonials[activeIndex].accentColor}>{testimonials[activeIndex].subject}</span>
                        </span>
                      </div>
                      <div className={`px-4 py-2 rounded-full ${testimonials[activeIndex].bgColor} ${testimonials[activeIndex].borderColor} border`}>
                        <span className="text-sm font-medium">
                          Progression: <span className={testimonials[activeIndex].accentColor}>{testimonials[activeIndex].improvement}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Author Info - Desktop Version */}
                  <div className="hidden md:block md:col-span-2">
                    <div className={`h-full ${testimonials[activeIndex].bgColor} rounded-xl p-6 flex flex-col items-center justify-center text-center ${testimonials[activeIndex].borderColor} border`}>
                      <div className="mb-4">
                        <img 
                          src={testimonials[activeIndex].avatar} 
                          alt={testimonials[activeIndex].name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mx-auto"
                        />
                      </div>
                      <h4 className="font-bold text-xl text-gray-900 mb-1">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-gray-600 mb-3">
                        {testimonials[activeIndex].role}
                      </p>
                      <div className={`w-12 h-1 ${testimonials[activeIndex].accentColor} rounded-full opacity-70 mb-3`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between pointer-events-none">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all transform -translate-x-1/2 hover:scale-110 focus:outline-none pointer-events-auto"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button 
                onClick={handleNext}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all transform translate-x-1/2 hover:scale-110 focus:outline-none pointer-events-auto"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}