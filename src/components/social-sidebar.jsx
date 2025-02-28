"use client"

import { motion } from "framer-motion"
import React from "react"
import fb from "../../public/imgs/fb.png"
import insta from "../../public/imgs/insta.webp"
import wts from "../../public/imgs/wts.png"
import yt from "../../public/imgs/yt.png"

export default function SocialSidebar() {
  const socials = [
    { name: "Facebook", color: "bg-[#1877f2]", icon: fb, link: "#" },
    {
      name: "Instagram",
      color: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
      icon: insta,
      link: "#",
    },
    { name: "YouTube", color: "bg-[#ff0000]", icon: yt, link: "#" },
    { name: "WhatsApp", color: "bg-[#25D366]", icon: wts, link: "#" },
  ]

  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ delay: 2.5, type: "spring" }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50"
    >
      <div className="flex flex-col gap-1">
        {socials.map((social) => (
          <motion.a
            key={social.name}
            href={social.link}
            whileHover={{ x: -5, scale: 1.1 }}
            className={`${social.color} p-3 text-white flex items-center justify-center`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={social.icon} alt={social.name} className="w-6 h-6 object-contain" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}

