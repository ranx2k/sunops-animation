'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign,
  Shield,
  Clock,
  Wrench,
  AlertTriangle,
  Link,
  GraduationCap,
  Lock
} from 'lucide-react'
import { content } from '@/lib/content'
import { getCircularPosition, getStaggerDelay } from '@/lib/utils'

// Icon and color mapping for each pain point
const painPointIcons = [
  DollarSign,    // chaotic IT costs
  Wrench,        // environment complexity
  Shield,        // security issues
  GraduationCap, // competent IT/DevOps stuff
  Lock,          // vendor lock-in
  Clock          // never getting decent support
]

const painPointColors = [
  { bg: 'from-red-500 to-orange-500', text: 'text-red-400', border: 'border-red-400/50', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.6)]' },
  { bg: 'from-purple-500 to-pink-500', text: 'text-purple-400', border: 'border-purple-400/50', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.6)]' },
  { bg: 'from-blue-500 to-cyan-500', text: 'text-blue-400', border: 'border-blue-400/50', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.6)]' },
  { bg: 'from-yellow-500 to-orange-500', text: 'text-yellow-400', border: 'border-yellow-400/50', glow: 'shadow-[0_0_20px_rgba(234,179,8,0.6)]' },
  { bg: 'from-green-500 to-emerald-500', text: 'text-green-400', border: 'border-green-400/50', glow: 'shadow-[0_0_20px_rgba(34,197,94,0.6)]' },
  { bg: 'from-indigo-500 to-blue-500', text: 'text-indigo-400', border: 'border-indigo-400/50', glow: 'shadow-[0_0_20px_rgba(99,102,241,0.6)]' }
]

function TypewriterText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(delay === 0)

  useEffect(() => {
    // Handle delay before starting to type
    if (delay > 0) {
      const delayTimeout = setTimeout(() => {
        setHasStarted(true)
      }, delay * 1000)

      return () => clearTimeout(delayTimeout)
    }
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return

    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, 50) // 50ms per character

    return () => clearInterval(interval)
  }, [text, hasStarted])

  if (!hasStarted) return null

  return (
    <p className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </p>
  )
}

export function Option1Orbital() {
  const radius = 350 // Distance from center in pixels

  // Detect reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center overflow-hidden">
      {/* Animated radial gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      {/* Top Text Animation with Typewriter Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.5,
          ease: "easeOut"
        }}
        className="absolute top-24 md:top-28 text-center px-8 max-w-4xl"
      >
        <TypewriterText
          text={content.topText}
          className="text-white text-3xl md:text-4xl font-light tracking-wide leading-relaxed font-rajdhani"
        />
      </motion.div>

      {/* Center "struggling with..." Text */}
      <div className="relative z-10 mb-8">
        <TypewriterText
          text={content.centerText}
          className="text-red-500 text-6xl md:text-7xl font-bold tracking-wider uppercase font-bebas"
          delay={prefersReducedMotion ? 0 : 2.5}
        />
      </div>

      {/* Static Pain Points Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Pain Points appearing one by one */}
        {content.painPoints.map((point, index) => {
          const { x, y } = getCircularPosition(index, content.painPoints.length, radius)
          const Icon = painPointIcons[index]
          const colors = painPointColors[index]

          return (
            <motion.div
              key={point}
              className="absolute pointer-events-auto"
              initial={{
                x: x * 2.5,
                y: y * 2.5,
                opacity: 0,
                scale: 0
              }}
              animate={{
                x,
                y,
                opacity: 1,
                scale: 1
              }}
              transition={{
                delay: prefersReducedMotion ? 0 : 4 + getStaggerDelay(index, 0.5),
                duration: prefersReducedMotion ? 0 : 0.8,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
              }}
            >
              <motion.div
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.15, y: -5 }}
                animate={{
                  y: [0, -8, 0]
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  },
                  scale: {
                    type: "spring",
                    stiffness: 400,
                    damping: 15
                  }
                }}
              >
                {/* Animated glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${colors.bg} rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity ${colors.glow}`}
                  animate={{
                    opacity: [0.4, 0.6, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />

                {/* Card */}
                <div className={`relative bg-gray-900/95 border ${colors.border} rounded-xl px-4 py-3 shadow-xl min-w-[200px] ${colors.glow}`}>
                  <div className="flex flex-col items-center gap-2 text-center">
                    {/* Icon on top */}
                    <div className={`bg-gradient-to-br ${colors.bg} p-2.5 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    {/* Text below */}
                    <span className="text-white font-semibold text-sm leading-tight font-rajdhani">
                      {point}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom Text Animation */}
      <div className="absolute bottom-16 text-center px-8 max-w-4xl">
        <TypewriterText
          text={content.bottomText}
          className="text-white text-3xl md:text-4xl font-light tracking-wide leading-relaxed font-rajdhani"
          delay={prefersReducedMotion ? 0 : 7.5}
        />
      </div>
    </div>
  )
}
