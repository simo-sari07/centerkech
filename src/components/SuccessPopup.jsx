"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X } from "lucide-react"
import React from "react"
export default function SuccessPopup({ isOpen, onClose, message }) {
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    setIsVisible(isOpen)

    // Auto close after 5 seconds
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 500) // Allow animation to complete
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
            onClick={() => {
              setIsVisible(false)
              setTimeout(onClose, 500)
            }}
          />

          <motion.div
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative z-10"
            layoutId="success-popup"
          >
            <button
              onClick={() => {
                setIsVisible(false)
                setTimeout(onClose, 500)
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15, delay: 0.2 }}
                className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4"
              >
                <CheckCircle className="h-10 w-10 text-green-500" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-medium text-gray-900 mb-2"
              >
                Formulaire envoyé avec succès!
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mb-6"
              >
                {message ||
                  "Merci pour votre inscription. Nous vous contacterons dans les 24 heures pour discuter de votre demande."}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  setIsVisible(false)
                  setTimeout(onClose, 500)
                }}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              >
                Fermer
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
