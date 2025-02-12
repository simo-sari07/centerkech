import React, { useState } from "react";
import { Users, BookOpen, Target, Receipt, ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Méthode",
    description: "Nous fournissons aux élèves des outils méthodologiques pour les faire gagner en autonomie.",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
    image: "/api/placeholder/400/300"
  },
  {
    icon: Users,
    title: "Un suivi adapté",
    description: "Selon que l'élève veut s'avancer ou s'améliorer, le tuteur adapte ses exercices et ses méthodes.",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200",
    image: "/api/placeholder/400/300"
  },
  {
    icon: Receipt,
    title: "Packs",
    description: "Des packages de formation pour des tarifs accessibles et défiant toute concurrence.",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-600",
    borderColor: "border-rose-200",
    image: "/api/placeholder/400/300"
  }
];

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  const nextFeature = () => {
    setActiveFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setActiveFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="max-w-xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
            Nos Avantages
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-500 to-purple-500 mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-lg">
            Découvrez notre approche unique pour votre réussite académique
          </p>
        </div>

        {/* Features Display */}
        <div className="max-w-6xl mx-auto relative">
          {/* Timeline Connector */}
          <div className="absolute top-24 left-0 right-0 hidden md:block">
            <div className="h-px bg-gradient-to-r from-rose-200 via-purple-200 to-blue-200 w-full" />
            <div className="absolute top-0 left-0 right-0 flex justify-between transform -translate-y-1/2">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                    index === activeFeature ? 'bg-rose-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative transition-all duration-500 transform ${
                  index === activeFeature ? 'scale-105 z-10' : 'scale-100 opacity-70'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`rounded-2xl p-6 ${feature.bgColor} border ${feature.borderColor} relative overflow-hidden`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-1/2 -translate-y-1/2">
                    <div className={`w-full h-full rounded-full ${feature.bgColor} opacity-50 blur-xl`} />
                  </div>

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`inline-flex p-3 rounded-xl ${feature.bgColor}`}>
                      <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-rose-500 transition-colors">
                    <span>En savoir plus</span>
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Connector Line */}
                {index < features.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2">
                    <div className="flex items-center space-x-1">
                      <div className="w-6 h-px bg-gray-200" />
                      <div className="text-gray-300">×</div>
                      <div className="w-6 h-px bg-gray-200" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center space-x-4 mt-12">
            <button
              onClick={prevFeature}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous feature"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextFeature}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next feature"
            >
              <ArrowRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}