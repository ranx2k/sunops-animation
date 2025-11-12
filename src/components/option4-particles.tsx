'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { loadEmittersPlugin } from '@tsparticles/plugin-emitters'
import type { Container, Engine } from '@tsparticles/engine'
import { motion, AnimatePresence } from 'framer-motion'
import { content } from '@/lib/content'
import { getCircularPosition } from '@/lib/utils'

type Stage = 'intro' | 'center' | 'explode' | 'chaos' | 'converge' | 'reveal' | 'solution'

export function Option4Particles() {
  const [stage, setStage] = useState<Stage>('intro')
  const [isMobile, setIsMobile] = useState(false)
  const [init, setInit] = useState(false)

  // Initialize TSParticles engine - ONCE per app lifetime
  useEffect(() => {
    console.log('🎨 Initializing TSParticles engine...')
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
      await loadEmittersPlugin(engine)
      console.log('✅ TSParticles engine loaded successfully')
    }).then(() => {
      console.log('✨ TSParticles ready to use!')
      setInit(true)
    })
  }, [])

  // Detect mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Stage progression timeline
  useEffect(() => {
    console.log('⏱️ Setting up stage timers...')
    const timers = [
      setTimeout(() => {
        console.log('▶️ Stage: CENTER')
        setStage('center')
      }, 1000),
      setTimeout(() => {
        console.log('💥 Stage: EXPLODE - Particles burst from center!')
        setStage('explode')
      }, 2500),
      setTimeout(() => {
        console.log('🌪️ Stage: CHAOS - Wild particle movement')
        setStage('chaos')
      }, 4000),
      setTimeout(() => {
        console.log('🎯 Stage: CONVERGE - Particles move to pain point positions')
        setStage('converge')
      }, 7000),
      setTimeout(() => {
        console.log('📝 Stage: REVEAL - Text appears')
        setStage('reveal')
      }, 9500),
      setTimeout(() => {
        console.log('✅ Stage: SOLUTION')
        setStage('solution')
      }, 11000),
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  const particlesLoaded = async (container: Container | undefined) => {
    if (container) {
      console.log('📦 Particles container loaded:', container)
      console.log('🔢 Particle count:', container.particles?.count)
    }
  }

  const radius = isMobile ? 200 : 300

  // Calculate positions for particle convergence
  const painPointPositions = content.painPoints.map((_, index) => {
    const { x, y } = getCircularPosition(index, content.painPoints.length, radius)
    return { x, y }
  })

  // Particle configuration
  const getParticleOptions = () => {
    const baseCount = isMobile ? 120 : 200
    console.log(`🎭 Stage: ${stage}, baseCount: ${baseCount}`)

    if (stage === 'explode' || stage === 'chaos') {
      const config = {
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: {
            value: stage === 'explode' ? 0 : baseCount,
            density: {
              enable: true,
              width: 1920,
              height: 1080
            }
          },
          color: {
            value: ['#ff0000', '#ff4444', '#ff6600', '#ffaa00', '#ffdd00', '#ffffff']
          },
          shape: {
            type: 'circle'
          },
          opacity: {
            value: 0.9,
            animation: {
              enable: true,
              speed: 1,
              sync: false,
              minimumValue: 0.4
            }
          },
          size: {
            value: { min: 3, max: 7 }
          },
          move: {
            enable: true,
            speed: stage === 'explode' ? { min: 8, max: 20 } : { min: 3, max: 8 },
            direction: 'none' as const,
            random: true,
            straight: false,
            outModes: {
              default: 'bounce' as const
            }
          }
        },
        emitters: stage === 'explode' ? {
          position: { x: 50, y: 50 },
          rate: {
            delay: 0.003,
            quantity: 20
          },
          size: {
            width: 0,
            height: 0
          },
          life: {
            count: Math.floor(baseCount / 20),
            duration: 1.5
          }
        } : undefined,
        detectRetina: true
      }
      console.log(`💥 ${stage.toUpperCase()} config created`)
      return config
    }

    if (stage === 'converge' || stage === 'reveal' || stage === 'solution') {
      // Create attractors at each pain point position
      const attractors = painPointPositions.map(pos => ({
        enable: true,
        distance: 200,
        factor: stage === 'converge' ? 8 : 3,
        position: {
          x: ((pos.x / (typeof window !== 'undefined' ? window.innerWidth : 1920)) * 100) + 50,
          y: ((pos.y / (typeof window !== 'undefined' ? window.innerHeight : 1080)) * 100) + 50
        }
      }))

      const config = {
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: {
            value: baseCount,
            density: {
              enable: false
            }
          },
          color: {
            value: ['#ff0000', '#ff4444', '#ff6600', '#ffaa00', '#ffdd00', '#ffffff']
          },
          shape: {
            type: 'circle'
          },
          opacity: {
            value: stage === 'reveal' || stage === 'solution' ? 0.7 : 0.9,
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
              minimumValue: 0.3
            }
          },
          size: {
            value: { min: 2, max: 4 }
          },
          move: {
            enable: true,
            speed: stage === 'converge' ? 4 : 1,
            direction: 'none' as const,
            random: false,
            straight: false,
            outModes: {
              default: 'bounce' as const
            },
            attract: {
              enable: true,
              distance: 300,
              rotate: {
                x: 1000,
                y: 1000
              }
            }
          }
        },
        detectRetina: true
      }
      console.log(`✨ ${stage.toUpperCase()} config created with attractors`)
      return config
    }

    console.log('⚠️ No particles for stage:', stage)
    return {
      background: { color: { value: 'transparent' } },
      particles: { number: { value: 0 } }
    }
  }

  const shouldShowParticles = init && stage !== 'intro' && stage !== 'center'
  console.log(`🎪 Render - Stage: ${stage}, Init: ${init}, Should show particles: ${shouldShowParticles}`)

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* TSParticles layer - visible from explosion onwards */}
      {shouldShowParticles && (
        <Particles
          key={stage} // Force refresh on stage change
          id="particles-explosion"
          particlesLoaded={particlesLoaded}
          options={getParticleOptions()}
          className="absolute inset-0 z-0"
        />
      )}


      {/* Top text */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{
          opacity: stage === 'intro' || stage === 'center' || stage === 'explode' ? 1 : 0.4,
          y: 0
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute top-24 md:top-28 text-center text-white text-xl md:text-2xl px-8 max-w-3xl font-rajdhani z-10"
      >
        {content.topText}
      </motion.div>

      {/* Center "struggling with..." text that explodes */}
      <AnimatePresence>
        {(stage === 'center') && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 2,
              opacity: 0,
              filter: 'blur(20px)'
            }}
            transition={{
              duration: stage === 'center' ? 0.6 : 0.5,
              ease: stage === 'center' ? [0.34, 1.56, 0.64, 1] : 'easeIn'
            }}
            className="absolute z-20 text-center"
          >
            <div className="text-6xl md:text-8xl font-bold text-red-500 font-bebas tracking-wider drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]">
              {content.centerText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explosion flash effect */}
      <AnimatePresence>
        {stage === 'explode' && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.8, 0], scale: [0, 1.5, 3] }}
              transition={{ duration: 0.8, times: [0, 0.3, 1] }}
              className="absolute w-[600px] h-[600px] bg-red-500 rounded-full blur-[100px] z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 2] }}
              transition={{ duration: 0.5, times: [0, 0.2, 1] }}
              className="absolute w-[400px] h-[400px] bg-orange-500 rounded-full blur-[80px] z-10"
            />
          </>
        )}
      </AnimatePresence>

      {/* Convergence glow spots - show where particles should gather */}
      <AnimatePresence>
        {stage === 'converge' && (
          <div className="absolute z-5">
            {content.painPoints.map((_, index) => {
              const { x, y } = getCircularPosition(index, content.painPoints.length, radius)

              return (
                <motion.div
                  key={`glow-${index}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0.4],
                    scale: [0, 1.2, 1]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="absolute w-20 h-20 bg-red-500/40 rounded-full blur-2xl"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              )
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Pain point text labels - emerge from particles */}
      <AnimatePresence>
        {(stage === 'reveal' || stage === 'solution') && (
          <div className="absolute z-20">
            {content.painPoints.map((point, index) => {
              const { x, y } = getCircularPosition(index, content.painPoints.length, radius)

              return (
                <motion.div
                  key={point}
                  className="absolute text-white text-sm md:text-base font-medium font-rajdhani"
                  initial={{
                    x,
                    y,
                    opacity: 0,
                    scale: 0.3
                  }}
                  animate={{
                    x,
                    y,
                    opacity: 1,
                    scale: 1
                  }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.6,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  style={{
                    transform: `translate(-50%, -50%)`
                  }}
                >
                  <span className="relative bg-black/90 px-4 py-2 rounded-lg border border-red-500/70 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.4)] whitespace-nowrap">
                    {point}
                  </span>
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Bottom solution text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: stage === 'solution' ? 1 : 0,
          y: stage === 'solution' ? 0 : 30
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute bottom-16 md:bottom-20 text-center text-white text-lg md:text-xl px-8 max-w-3xl font-rajdhani z-10"
      >
        {content.bottomText}
      </motion.div>

      {/* Stage indicator (for development/debugging) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 text-white text-xs font-mono bg-black/80 px-3 py-1 rounded z-50">
          Stage: {stage}
        </div>
      )}
    </div>
  )
}
