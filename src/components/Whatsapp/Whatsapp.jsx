"use client"

import { useState } from "react"
import { FaWhatsapp, FaTimes } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import React from "react"

export default function WhatsappContact() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Backdrop for when chat is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleChat}
          />
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 md:bottom-20 right-4 md:right-6 z-50 w-80 rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-blue-500 text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white p-1.5 rounded-full">
                  <FaWhatsapp size={24} className="text-green-500" />
                </div>
                <h3 className="text-lg font-medium">Contactez-nous</h3>
              </div>
            </div>

            {/* Chat content */}
            <div className="bg-gray-100 p-4">
              <p className="text-gray-600 text-sm mb-4">Cliquez pour ouvrir une nouvelle conversation :</p>

              <a
                href="https://wa.me/+212675775884"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white p-3 rounded-lg border-l-4 border-green-500 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {/* Replace with your actual logo */}
                    <div className="w-10 h-10  bg-blue-500 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs">M.S</span>
                    </div>
                  </div>
                  <span className="font-medium text-white-800">Mr sari </span>
                </div>
                <FaWhatsapp size={20} className="text-green-500" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <div className="fixed md:bottom-6 bottom-14 right-4 z-50">
        <motion.button
          onClick={toggleChat}
          className={`p-3 rounded-full shadow-lg ${isOpen ? "bg-blue-500" : "bg-blue-500"}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ y: -100, opacity: 0.2 }}
          animate={{
            y: isOpen ? 0 : [0, -15, 0],
            opacity: 1,
            rotate: isOpen ? 0 : [0, -10, 10, -10, 0],
          }}
          transition={{
            duration: 1.2,
            ease: [0.17, 0.67, 0.83, 0.67],
            repeat: isOpen ? 0 : Number.POSITIVE_INFINITY,
            repeatDelay: 2,
          }}
        >
          {isOpen ? (
            <FaTimes size={30} className="text-white" />
          ) : (
            <>
              <FaWhatsapp size={30} className="text-white" />
              <motion.div
                className="absolute -top-2 -right-2 bg-white text-xs px-2 py-1 rounded-full font-bold text-green-500 shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
              >
                1
              </motion.div>
            </>
          )}
        </motion.button>
      </div>

      {/* Tooltip - Only shows on desktop screens (md and above) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed md:bottom-6 bottom-14 right-20 z-40 bg-white py-2 px-4 rounded-lg shadow-md max-w-xs hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-gray-800 font-medium">Need help??</div>
            <div className="text-gray-600 text-sm">Contact us</div>
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}