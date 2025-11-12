'use client'

import { useState, useEffect } from 'react'
import Lottie from 'lottie-react'
import { content } from '@/lib/content'

export function Option7Lottie() {
  const [animationData] = useState(null)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Simulate content reveal
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/30 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-500/20 rounded-full animate-pulse delay-150" />
      </div>

      <div className={`relative z-10 h-full flex flex-col items-center justify-between py-20 px-8 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top Text */}
        <div className="text-center max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {content.topText}
          </h1>
        </div>

        {/* Center Animation Area */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-4xl">
          {animationData ? (
            <div className="max-w-2xl w-full">
              <Lottie
                animationData={animationData}
                loop={false}
                autoplay={true}
                onComplete={() => console.log('Animation complete')}
              />
            </div>
          ) : (
            <div className="text-center space-y-8">
              {/* Center Text with Glow Effect */}
              <div className="relative">
                <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-pulse">
                  {content.centerText}
                </h2>
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-red-500/30 via-orange-500/30 to-yellow-500/30 -z-10" />
              </div>

              {/* Pain Points as Floating Pills */}
              <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                {content.painPoints.map((point, i) => (
                  <div
                    key={i}
                    className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full border border-gray-700 text-white text-sm md:text-base shadow-lg animate-float"
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: `${3 + i * 0.3}s`
                    }}
                  >
                    {point}
                  </div>
                ))}
              </div>

              {/* Lottie Integration Instructions */}
              <div className="mt-8 p-6 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 text-left max-w-2xl">
                <h3 className="text-xl font-bold text-blue-400 mb-3">
                  🎬 Replace with Lottie Animation
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  Download animations from{' '}
                  <a
                    href="https://lottiefiles.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    LottieFiles.com
                  </a>
                  {' '}and place in <code className="bg-gray-800 px-2 py-1 rounded">public/animations/</code>
                </p>
                <pre className="text-xs text-green-400 overflow-x-auto bg-black/50 p-3 rounded">
{`import animationData from '@/public/animations/struggle.json'

const [animationData] = useState(animationData)`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Text */}
        <div className="text-center max-w-4xl">
          <p className="text-xl md:text-3xl text-white leading-relaxed">
            {content.bottomText}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
