'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { content } from '@/lib/content'
import { getCircularPosition } from '@/lib/utils'

// Register plugins
gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Option5GsapScroll() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const isMobile = window.innerWidth < 768

    // Section 1: Fade in top text
    gsap.from('.top-text', {
      scrollTrigger: {
        trigger: '.section-1',
        start: 'top top',
        end: 'bottom center',
        scrub: 1,
        pin: true,
      },
      opacity: 0,
      y: 50,
    })

    // Section 2: Scale up STRUGGLE
    gsap.from('.struggle-text', {
      scrollTrigger: {
        trigger: '.section-2',
        start: 'top top',
        end: 'bottom center',
        scrub: 1,
        pin: true,
      },
      scale: 0.5,
      opacity: 0,
    })

    // Section 3: Pain points timeline
    const scrollDistance = isMobile ? 2500 : 4000
    const radius = isMobile ? 150 : 280

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-3',
        start: 'top top',
        end: `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
      },
    })

    // Pain points fly in from sides one by one and stack vertically
    const stackSpacing = isMobile ? 60 : 80
    content.painPoints.forEach((point, index) => {
      const yOffset = (index - (content.painPoints.length - 1) / 2) * stackSpacing

      tl.fromTo(`.pain-${index}`,
        {
          x: index % 2 === 0 ? -window.innerWidth : window.innerWidth,
          y: yOffset,
          opacity: 0,
        },
        {
          x: 0,
          y: yOffset,
          opacity: 1,
          duration: 1,
        },
        index * 0.4
      )
    })

    // Hold in stacked position
    tl.to({}, { duration: 0.8 })

    // Form circle animation - all at once
    tl.to(content.painPoints.map((_, index) => `.pain-${index}`), {
      x: (index) => {
        const { x } = getCircularPosition(index, content.painPoints.length, radius)
        return x
      },
      y: (index) => {
        const { y } = getCircularPosition(index, content.painPoints.length, radius)
        return y
      },
      duration: 1.5,
      ease: 'power2.inOut',
      stagger: 0.1,
    })

    // Section 4: Bottom text
    gsap.from('.bottom-text', {
      scrollTrigger: {
        trigger: '.section-4',
        start: 'top center',
        end: 'center center',
        scrub: 1,
      },
      opacity: 0,
      y: 50,
    })

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative bg-black -mt-16">
      {/* Section 1: Top question */}
      <div className="section-1 h-screen w-full flex items-center justify-center">
        <div className="top-text text-white text-3xl md:text-5xl lg:text-6xl text-center px-8 max-w-5xl font-bold leading-tight">
          {content.topText}
        </div>
      </div>

      {/* Section 2: STRUGGLE text */}
      <div className="section-2 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="struggle-text text-6xl md:text-8xl lg:text-9xl font-black text-red-500 tracking-wide uppercase">
          {content.centerText}
        </div>
      </div>

      {/* Section 3: Pain points animation */}
      <div className="section-3 h-screen w-full">
        <div className="pain-points-container relative w-full h-full flex items-center justify-center overflow-hidden">
          {content.painPoints.map((point, index) => (
            <div
              key={point}
              className={`pain-point pain-${index} absolute text-white text-base md:text-lg lg:text-xl font-semibold bg-gray-900/80 px-4 py-2 md:px-6 md:py-3 rounded-lg backdrop-blur-sm border border-gray-700 whitespace-nowrap`}
            >
              {point}
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Solution text */}
      <div className="section-4 h-screen w-full flex items-center justify-center">
        <div className="bottom-text text-white text-2xl md:text-4xl lg:text-5xl text-center px-8 max-w-4xl font-bold leading-relaxed">
          {content.bottomText}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm animate-bounce z-40 pointer-events-none">
        ↓ Scroll to explore ↓
      </div>
    </div>
  )
}
