'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Option1Orbital } from '@/components/option1-orbital'
import { Option3StarWars } from '@/components/option3-star-wars'

// Lazy load heavy components for better performance
const Option2ThreeDSphere = dynamic(
  () => import('@/components/option2-3d-sphere').then(mod => ({ default: mod.Option2ThreeDSphere })),
  { ssr: false }
)

const Option4Particles = dynamic(
  () => import('@/components/option4-particles').then(mod => ({ default: mod.Option4Particles })),
  { ssr: false }
)

const Option5GsapScroll = dynamic(
  () => import('@/components/option5-gsap-scroll').then(mod => ({ default: mod.Option5GsapScroll })),
  { ssr: false }
)

const Option6Glitch = dynamic(
  () => import('@/components/option6-glitch').then(mod => ({ default: mod.Option6Glitch })),
  { ssr: false }
)

const Option7Lottie = dynamic(
  () => import('@/components/option7-lottie').then(mod => ({ default: mod.Option7Lottie })),
  { ssr: false }
)

type OptionId = 'option1' | 'option2' | 'option3' | 'option4' | 'option5' | 'option6' | 'option7'

const options = [
  { id: 'option1' as OptionId, label: '1. Orbital', component: Option1Orbital },
  { id: 'option2' as OptionId, label: '2. 3D Sphere', component: Option2ThreeDSphere },
  { id: 'option3' as OptionId, label: '3. Star Wars', component: Option3StarWars },
  { id: 'option4' as OptionId, label: '4. Particles', component: Option4Particles },
  { id: 'option5' as OptionId, label: '5. GSAP Scroll', component: Option5GsapScroll },
  { id: 'option6' as OptionId, label: '6. Glitch', component: Option6Glitch },
  { id: 'option7' as OptionId, label: '7. Lottie', component: Option7Lottie },
]

function HomeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get initial option from URL or default to option1
  const urlOption = searchParams.get('option') as OptionId
  const initialOption = options.find(opt => opt.id === urlOption)?.id || 'option1'

  const [activeOption, setActiveOption] = useState<OptionId>(initialOption)
  const [key, setKey] = useState(0)

  // Update URL when option changes
  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('option', activeOption)
    router.replace(url.pathname + url.search, { scroll: false })
  }, [activeOption, router])

  const ActiveComponent = options.find(opt => opt.id === activeOption)?.component

  const handleOptionChange = (optionId: OptionId) => {
    setActiveOption(optionId)
    setKey(prev => prev + 1) // Reset animation when switching
  }

  const handleReset = () => {
    setKey(prev => prev + 1)
  }

  return (
    <main className="relative min-h-screen bg-black">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-lg font-bold text-white whitespace-nowrap">
              SunOps Animations
            </h1>

            <div className="flex items-center gap-2 flex-wrap">
              {options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleOptionChange(option.id)}
                  className={`px-3 py-1.5 rounded text-sm whitespace-nowrap transition-colors ${
                    activeOption === option.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}

              <button
                onClick={handleReset}
                className="px-3 py-1.5 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content - Full screen, accounting for fixed nav */}
      <div className="pt-16">
        {ActiveComponent && <ActiveComponent key={key} />}
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
