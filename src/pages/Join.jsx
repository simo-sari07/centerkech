"use client"

import { useState, useEffect } from "react"
import { User, Mail, Phone, BookOpen, ArrowRight, X, CheckCircle } from "lucide-react"
import { formService } from "../../api"
import React from "react"
export default function JoinUs() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    formation: "",
  })

  // UI states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [formCompletion, setFormCompletion] = useState(0)

  // Calculate form completion percentage
  useEffect(() => {
    let completed = 0
    let total = 0

    Object.entries(formData).forEach(([key, value]) => {
      total++
      if (value) completed++
    })

    setFormCompletion((completed / total) * 100)
  }, [formData])

  // Handle input changes - Improved to prevent input blocking
  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Immediately update form data without validation blocking
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (error) {
      setError(null)
    }
  }

  // Validate current step
  const validateStep = () => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // Phone validation - accepts formats with or without spaces/dashes
    const phoneRegex = /^[\d\s\-+()]{8,15}$/

    if (currentStep === 0 && !formData.name.trim()) {
      setError("Veuillez entrer votre nom")
      return false
    }

    if (currentStep === 1) {
      if (!formData.email.trim()) {
        setError("Veuillez entrer votre email")
        return false
      } else if (!emailRegex.test(formData.email)) {
        setError("Veuillez entrer un email valide")
        return false
      }
    }

    if (currentStep === 2) {
      if (!formData.tel.trim()) {
        setError("Veuillez entrer votre numéro de téléphone")
        return false
      } else if (!phoneRegex.test(formData.tel)) {
        setError("Veuillez entrer un numéro de téléphone valide")
        return false
      }
    }

    if (currentStep === 3 && !formData.formation) {
      setError("Veuillez choisir une formation")
      return false
    }

    setError(null)
    return true
  }

  // Handle next step
  const handleNextStep = () => {
    if (validateStep()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      // Clear any errors when going back
      setError(null)
    }
  }

  // Handle form submission
  const handleSubmit = async () => {
    setError(null)
    setLoading(true)

    try {
      const response = await formService.submitForm({
        ...formData,
        source: "join",
      })

      if (response.success) {
        setShowSuccess(true)
      } else {
        setError(response.message || "Une erreur est survenue. Veuillez réessayer.")
      }
    } catch (err) {
      console.error("Form submission error:", err)
      setError(
        (err.response && err.response.data && err.response.data.message) ||
          "Une erreur est survenue. Veuillez réessayer.",
      )
    } finally {
      setLoading(false)
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      tel: "",
      formation: "",
    })
    setCurrentStep(0)
    setShowSuccess(false)
    setError(null)
  }

  // Handle key press for accessibility
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNextStep()
    }
  }

  // Form steps configuration
  const steps = [
    {
      title: "Votre Nom",
      description: "Comment pouvons-nous vous appeler ?",
      icon: <User className="h-6 w-6" />,
      field: "name",
      placeholder: "Entrez votre nom complet",
      type: "text",
    },
    {
      title: "Votre Email",
      description: "Pour vous envoyer les informations importantes",
      icon: <Mail className="h-6 w-6" />,
      field: "email",
      placeholder: "Entrez votre adresse email",
      type: "email",
    },
    {
      title: "Votre Téléphone",
      description: "Pour vous contacter rapidement",
      icon: <Phone className="h-6 w-6" />,
      field: "tel",
      placeholder: "Entrez votre numéro de téléphone",
      type: "tel",
    },
    {
      title: "Formation Souhaitée",
      description: "Quelle formation vous intéresse ?",
      icon: <BookOpen className="h-6 w-6" />,
      field: "formation",
      type: "select",
      options: [
        { value: "", label: "Choisissez une formation" },
        { value: "soutien", label: "Cours de soutien scolaire" },
        { value: "langues", label: "Langues et communication" },
        { value: "concours", label: "Préparation aux concours" },
        { value: "coaching", label: "Coaching scolaire et orientation" },
        { value: "formation", label: "Formation continue" },
        { value: "development", label: "Développement personnel" },
      ],
    },
  ]

  // Current step data
  const currentStepData = steps[currentStep]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-7xl mx-auto">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              REJOIGNEZ-NOUS
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Commencez votre parcours d'apprentissage avec nous et transformez votre avenir
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="md:flex">
              {/* Progress sidebar */}
              <div className="bg-gray-50 md:w-1/3 lg:w-1/4 border-r border-gray-200">
                <div className="p-6 md:p-8 sticky top-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Votre progression</h3>

                  {/* Progress bar */}
                  <div className="h-2 bg-gray-200 rounded-full mb-8">
                    <div
                      className="h-2 bg-blue-500 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${formCompletion}%` }}
                    ></div>
                  </div>

                  {/* Steps */}
                  <div className="space-y-6">
                    {steps.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div
                          className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                            index < currentStep
                              ? "bg-blue-500 text-white"
                              : index === currentStep
                                ? "bg-blue-100 border-2 border-blue-500 text-blue-700"
                                : "bg-gray-200 text-gray-500"
                          } transition-all duration-200`}
                        >
                          {index < currentStep ? <CheckCircle className="w-5 h-5" /> : <span>{index + 1}</span>}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${index === currentStep ? "text-blue-700" : "text-gray-700"}`}>
                            {step.title}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-blue-700">Pourquoi nous rejoindre ?</span> Nos formations
                      sont conçues pour vous aider à atteindre vos objectifs académiques et professionnels.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="md:w-2/3 lg:w-3/4">
                <div className="p-6 md:p-10">
                  {/* Form header */}
                  <div className="mb-8">
                    <div className="flex items-center mb-2">
                      <div className="p-2 bg-blue-100 rounded-full mr-3 text-blue-600">
                        {currentStepData.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">{currentStepData.title}</h2>
                    </div>
                    <p className="text-gray-600">{currentStepData.description}</p>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0 text-red-500">
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form fields */}
                  <div className="space-y-8">
                    <div>
                      {currentStepData.type === "select" ? (
                        <div>
                          <label
                            htmlFor={currentStepData.field}
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Sélectionnez une option
                          </label>
                          <select
                            id={currentStepData.field}
                            name={currentStepData.field}
                            value={formData[currentStepData.field]}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          >
                            {currentStepData.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div>
                          <label
                            htmlFor={currentStepData.field}
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            {currentStepData.title}
                          </label>
                          <input
                            id={currentStepData.field}
                            name={currentStepData.field}
                            type={currentStepData.type}
                            placeholder={currentStepData.placeholder}
                            value={formData[currentStepData.field]}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            autoComplete={currentStepData.field}
                          />
                        </div>
                      )}
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex justify-between pt-6">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        disabled={currentStep === 0}
                        className={`px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium transition-colors ${
                          currentStep === 0
                            ? "opacity-50 cursor-not-allowed bg-gray-100"
                            : "hover:bg-gray-50 active:bg-gray-100"
                        }`}
                      >
                        Précédent
                      </button>

                      <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={loading}
                        className={`px-6 py-3 bg-blue-600 rounded-lg text-white font-medium transition-colors ${
                          loading ? "opacity-70 cursor-wait" : "hover:bg-blue-700 active:bg-blue-800"
                        } flex items-center`}
                      >
                        {loading ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Traitement...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            {currentStep === steps.length - 1 ? "Soumettre" : "Suivant"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden">
            {/* Close button */}
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Success content */}
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 rounded-full p-3">
                  <div className="bg-blue-500 rounded-full p-3">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">Inscription Réussie!</h3>

              <p className="text-center text-gray-600 mb-6">
                Merci pour votre inscription! Notre équipe vous contactera dans les 24 heures pour discuter de votre
                formation et répondre à toutes vos questions.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">Prochaines étapes:</span> Vous recevrez un email de
                  confirmation avec plus d'informations. N'hésitez pas à préparer vos questions pour notre premier
                  appel.
                </p>
              </div>

              <button
                onClick={resetForm}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
