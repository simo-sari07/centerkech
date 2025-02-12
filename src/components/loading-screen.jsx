"use client"

import { motion } from "framer-motion"
import React from "react"
export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="relative"
      >
        <div className="h-16 w-16 rounded-full border-4 border-red-500 border-t-transparent animate-spin" />
      </motion.div>
    </motion.div>
  )
}

