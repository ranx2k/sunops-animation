'use client'

import { motion } from 'framer-motion'
import { content } from '@/lib/content'
import { useEffect, useState } from 'react'

export function Option3StarWars() {
  const [perspective, setPerspective] = useState(400)
  const [stars, setStars] = useState<Array<{ left: number; top: number; opacity: number; glow: number; glowOpacity: number }>>([])

  useEffect(() => {
    const handleResize = () => {
      // Adjust perspective for smaller screens
      setPerspective(window.innerWidth < 768 ? 300 : 400)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Generate stars only on client side to avoid hydration mismatch
  useEffect(() => {
    const generatedStars = Array.from({ length: 150 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.8 + 0.2,
      glow: Math.random() * 2 + 1,
      glowOpacity: Math.random() * 0.5 + 0.5
    }))
    setStars(generatedStars)
  }, [])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 bg-black">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.glow}px rgba(255, 255, 255, ${star.glowOpacity})`
            }}
          />
        ))}
      </div>

      {/* Perspective Container */}
      <div
        className="absolute inset-0 flex items-end justify-center"
        style={{ perspective: `${perspective}px` }}
      >
        <motion.div
          className="crawl-text text-center w-full max-w-3xl pb-32"
          initial={{
            y: '100vh',
            rotateX: 25,
            scale: 2
          }}
          animate={{
            y: '-200vh',
            rotateX: 25,
            scale: 0.8
          }}
          transition={{
            duration: 45,
            ease: "linear",
            repeat: Infinity
          }}
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'center bottom',
            color: '#FFE81F' // Authentic Star Wars yellow
          }}
        >
          {/* Opening Question */}
          <div className="text-3xl md:text-4xl lg:text-5xl font-rajdhani font-bold mb-16 leading-relaxed px-8">
            {content.topText}
          </div>

          {/* Center "STRUGGLE" Text */}
          <div className="text-6xl md:text-7xl lg:text-9xl font-rajdhani font-bold mb-20">
            {content.centerText}
          </div>

          {/* Pain Points List */}
          <div className="space-y-8 text-2xl md:text-3xl lg:text-4xl font-rajdhani font-medium px-8">
            {content.painPoints.map((point, index) => (
              <div key={index} className="leading-relaxed text-justify">
                {point}
              </div>
            ))}
          </div>

          {/* Bottom Solution Text */}
          <div className="text-3xl md:text-4xl lg:text-5xl font-rajdhani font-bold mt-20 px-8 leading-relaxed">
            {content.bottomText}
          </div>
        </motion.div>
      </div>

      {/* Gradient Fade Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black via-black/50 to-transparent" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
    </div>
  )
}
