"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ChevronRight, Calendar, User, Clock } from "lucide-react"
import React from "react"

const ProfessionalBlogSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [isInView, setIsInView] = useState(false)

  // Blog posts data with your image paths
  const blogPosts = [
    {
      id: 1,
      title: "Difficult Things About Education",
      excerpt:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      image: "/blog/40.webp",
      category: "Education",
      author: "Sarah Johnson",
      date: "May 15, 2023",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Modern React Development Techniques",
      excerpt:
        "Discover the latest React patterns and techniques that will transform your development workflow and boost productivity.",
      image: "/blog/20.webp",
      category: "Technology",
      author: "David Chen",
      date: "June 3, 2023",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Education Is So Famous, But Why?",
      excerpt:
        "Exploring the reasons behind education's enduring importance in society and how it shapes our collective future.",
      image: "/blog/30.jpg",
      category: "Education",
      author: "Emma Williams",
      date: "April 22, 2023",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Why Is Education So Famous?",
      excerpt:
        "A deep dive into the historical significance of education and its impact on modern civilization and technological advancement.",
      image: "/blog/10.webp",
      category: "Research",
      author: "Michael Brown",
      date: "July 10, 2023",
      readTime: "7 min read",
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("blog-section")
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  return (
    <section id="blog-section" className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="inline-block px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-medium mb-4">
              OUR BLOG
            </div>
            <h2 className="text-4xl font-bold mb-2 text-gray-900">Histudy Blog</h2>
            <p className="text-gray-600 max-w-2xl">
              Découvrez nos derniers articles sur l'éducation, la pédagogie et les méthodes d'apprentissage innovantes.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md"
            >
              <span>VIEW ALL POSTS</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Featured post (larger) */}
          <motion.div className="lg:col-span-6 xl:col-span-7" variants={itemVariants}>
            <div
              className="group relative h-full"
              onMouseEnter={() => setHoveredCard("featured")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {blogPosts[0].category}
                  </div>
                  <img
                    src={blogPosts[0].image || "/placeholder.svg"}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col mt-5">
                  <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                      <span>{blogPosts[0].date}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1 text-blue-500" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-blue-500" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    {blogPosts[0].title}
                  </h3>

                  <p className="text-gray-600 mb-4 flex-1">{blogPosts[0].excerpt}</p>

                  <div className="inline-flex items-center text-blue-600 font-medium">
                    <span>Read Full Article</span>
                    <motion.div animate={{ x: hoveredCard === "featured" ? 5 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side blog posts */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6">
            {blogPosts.slice(1, 4).map((post, index) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredCard(post.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex"
              >
                <div className="w-2/5 flex-shrink-0 relative">
                  <div className="h-full relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="w-3/5 p-4 flex flex-col justify-center">
                  <div className="flex items-center mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500 ml-2 flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center text-blue-600 text-sm font-medium mt-auto">
                    <span>Read Article</span>
                    <motion.div animate={{ x: hoveredCard === post.id ? 5 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default ProfessionalBlogSection
