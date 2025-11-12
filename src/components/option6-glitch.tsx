'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { content } from '@/lib/content'
import { getCircularPosition } from '@/lib/utils'

type Stage = 'matrix' | 'glitch' | 'errors' | 'stable'

export function Option6Glitch() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stage, setStage] = useState<Stage>('matrix')

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()

    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)

    // Katakana + Latin + numbers + symbols for matrix effect
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ'

    let animationFrameId: number

    function draw() {
      if (!ctx || !canvas) return

      // Semi-transparent black for fade trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Green terminal text
      ctx.fillStyle = '#0F0'
      ctx.font = `${fontSize}px monospace`

      drops.forEach((y, x) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, x * fontSize, y * fontSize)

        // Reset drop randomly to create continuous rain
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[x] = 0
        }

        drops[x]++
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    // Start animation
    animationFrameId = requestAnimationFrame(draw)

    // Handle resize
    const handleResize = () => {
      setCanvasSize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Stage progression
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('glitch'), 1000),   // Glitch starts
      setTimeout(() => setStage('errors'), 3000),   // Pain points appear
      setTimeout(() => setStage('stable'), 6000),   // Stabilize
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Matrix rain background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-60"
      />

      {/* Scanline CRT effect */}
      <div className="absolute inset-0 scanlines pointer-events-none z-20" />

      {/* Top text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-16 text-center text-green-400 text-xl px-8 font-mono z-10 w-full flex justify-center"
      >
        <div className="px-6 py-3 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/30 shadow-lg shadow-green-500/20 max-w-3xl">
          {content.topText}
        </div>
      </motion.div>

      {/* Center "STRUGGLING" text with glitch effect */}
      <AnimatePresence>
        {stage !== 'matrix' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`absolute z-10 text-6xl md:text-8xl font-bold text-red-500 font-mono
              ${stage === 'glitch' ? 'glitch-active glitch-text' : ''}
            `}
          >
            {content.centerText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal error pain points in circular orbit */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {stage === 'errors' || stage === 'stable' ? (
            <>
              {content.painPoints.map((point, index) => {
                const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 200 : 300
                const { x, y } = getCircularPosition(index, content.painPoints.length, radius)

                return (
                  <motion.div
                    key={point}
                    className="absolute pointer-events-auto"
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x,
                      y
                    }}
                    transition={{
                      delay: index * 0.2,
                      duration: 0.5,
                      type: 'spring',
                      stiffness: 100
                    }}
                  >
                    <div
                      className={`
                        text-green-400 font-mono text-sm md:text-base whitespace-nowrap
                        px-4 py-2 rounded-lg
                        bg-black/40 backdrop-blur-md
                        border border-green-500/30
                        shadow-lg shadow-green-500/20
                        hover:bg-black/60 hover:border-green-400/50 hover:shadow-green-400/40
                        transition-all duration-300 cursor-pointer
                        ${stage === 'errors' && index % 2 === 0 ? 'glitch-text' : ''}
                      `}
                    >
                      <span className="text-red-500 font-bold">ERROR:</span>{' '}
                      <ScrambleText className="inline-block">
                        {point}
                      </ScrambleText>
                    </div>
                  </motion.div>
                )
              })}
            </>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Bottom text with typing effect */}
      <AnimatePresence>
        {stage === 'stable' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-16 z-10 px-8 max-w-2xl w-full flex justify-center"
          >
            <div className="px-6 py-3 rounded-lg bg-black/40 backdrop-blur-md border border-green-500/30 shadow-lg shadow-green-500/20">
              <TypingText text={content.bottomText} delay={0} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Typing effect component
function TypingText({ text, delay }: { text: string; delay: number }) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let index = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
          // Blink cursor after typing is done
          const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev)
          }, 500)
          return () => clearInterval(cursorInterval)
        }
      }, 50)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, delay])

  return (
    <div className="text-green-400 font-mono text-base md:text-lg text-center">
      {displayText}
      {showCursor && <span className="text-green-400">_</span>}
    </div>
  )
}

// Scramble text hover effect component
function ScrambleText({ children, className = '' }: { children: string; className?: string }) {
  const [displayText, setDisplayText] = useState(children)
  const [isScrambling, setIsScrambling] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const originalTextRef = useRef(children)

  // Characters to use for scrambling (hacker style)
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  const scramble = () => {
    if (isScrambling) return
    setIsScrambling(true)

    let iteration = 0
    const maxIterations = originalTextRef.current.length

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setDisplayText((current) =>
        current
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) {
              return originalTextRef.current[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      iteration += 1 / 3

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(originalTextRef.current)
        setIsScrambling(false)
      }
    }, 30)
  }

  const resetText = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setDisplayText(originalTextRef.current)
    setIsScrambling(false)
  }

  useEffect(() => {
    originalTextRef.current = children
    setDisplayText(children)
  }, [children])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <span
      onMouseEnter={scramble}
      onMouseLeave={resetText}
      className={className}
    >
      {displayText}
    </span>
  )
}
