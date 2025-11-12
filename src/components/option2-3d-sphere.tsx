'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Sphere, Line } from '@react-three/drei'
import { content } from '@/lib/content'
import { getSphericalPosition } from './option2-utils'
import type * as THREE from 'three'

function CenterText() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [visible, setVisible] = useState(false)
  const [opacity, setOpacity] = useState(0)

  // Appear right after top text (at 1s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 1000) // Appear early, before pain points

    return () => clearTimeout(timer)
  }, [])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1
    }

    // Fade in animation
    if (visible && opacity < 1) {
      setOpacity(Math.min(opacity + 0.02, 1))
    }
  })

  if (!visible) return null

  return (
    <Text
      ref={meshRef}
      fontSize={0.8}
      color="#ff0000"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.05}
      outlineColor="#330000"
      letterSpacing={0.05}
      fontWeight={900}
      fillOpacity={opacity}
    >
      {content.centerText.toUpperCase()}
    </Text>
  )
}

function WireframeSphere() {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setOpacity(prev => {
          if (prev >= 0.1) {
            clearInterval(interval)
            return 0.1
          }
          return Math.min(prev + 0.003, 0.1)
        })
      }, 16)

      return () => clearInterval(interval)
    }, 500) // Small delay before sphere appears

    return () => clearTimeout(timer)
  }, [])

  return (
    <Sphere args={[5, 32, 32]}>
      <meshBasicMaterial color="#ffffff" wireframe opacity={opacity} transparent />
    </Sphere>
  )
}

function PainPoint({
  point,
  index,
  position
}: {
  point: string
  index: number
  position: [number, number, number]
}) {
  const [visible, setVisible] = useState(false)
  const [scale, setScale] = useState(0)
  const textRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  // Staggered appearance animation - start after "STRUGGLING" (2000ms base delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 2000 + index * 500) // 2s base delay + 500ms between each point

    return () => clearTimeout(timer)
  }, [index])

  // Animate scale and billboard effect
  useFrame(() => {
    if (visible && scale < 1) {
      setScale(Math.min(scale + 0.03, 1)) // Slower scale animation (was 0.05)
    }

    // Make text always face the camera
    if (textRef.current) {
      textRef.current.quaternion.copy(camera.quaternion)
    }
  })

  if (!visible) return null

  return (
    <group>
      {/* Connection line from center to point */}
      <Line
        points={[[0, 0, 0], position]}
        color="#ff0000"
        lineWidth={1}
        opacity={scale}
        transparent
      />

      {/* Glowing sphere at point */}
      <Sphere args={[0.15, 16, 16]} position={position} scale={scale}>
        <meshStandardMaterial
          color="#ff3333"
          emissive="#ff0000"
          emissiveIntensity={0.5}
          transparent
          opacity={scale}
        />
      </Sphere>

      {/* 3D Text label with billboard effect */}
      <Text
        ref={textRef}
        position={position}
        fontSize={0.35}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
        maxWidth={4}
        letterSpacing={0.02}
        fontWeight={600}
        fillOpacity={scale}
      >
        {point}
      </Text>
    </group>
  )
}

function PainPoints() {
  const radius = 5

  return (
    <group>
      {content.painPoints.map((point, index) => {
        const { x, y, z } = getSphericalPosition(index, content.painPoints.length, radius)
        const position: [number, number, number] = [x, y, z]

        return (
          <PainPoint
            key={point}
            point={point}
            index={index}
            position={position}
          />
        )
      })}
    </group>
  )
}

function DelayedText({ delay, position, fontSize, color, children, ...props }: any) {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setOpacity(prev => {
          if (prev >= 1) {
            clearInterval(interval)
            return 1
          }
          return Math.min(prev + 0.03, 1)
        })
      }, 16) // ~60fps

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <Text
      position={position}
      fontSize={fontSize}
      color={color}
      fillOpacity={opacity}
      {...props}
    >
      {children}
    </Text>
  )
}

function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <pointLight position={[0, 0, 10]} intensity={0.8} />

      {/* OrbitControls without auto-rotate */}
      <OrbitControls
        autoRotate={false}
        enableZoom={true}
        enablePan={false}
        minDistance={10}
        maxDistance={20}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={(5 * Math.PI) / 6}
      />

      {/* Wireframe sphere for visual reference */}
      <WireframeSphere />

      {/* Top Text - appears first */}
      <DelayedText
        delay={0}
        position={[0, 7, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
        textAlign="center"
        letterSpacing={0.02}
        fontWeight={600}
      >
        {content.topText}
      </DelayedText>

      {/* Pain points appear one by one (starting at 1s) */}
      <PainPoints />

      {/* Center "STRUGGLE" Text - appears after pain points (at 3.5s) */}
      <CenterText />

      {/* Bottom Text - appears last (at 5.5s) */}
      <DelayedText
        delay={5500}
        position={[0, -7, 0]}
        fontSize={0.35}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
        maxWidth={10}
        textAlign="center"
        letterSpacing={0.01}
        fontWeight={400}
      >
        {content.bottomText}
      </DelayedText>
    </>
  )
}

export function Option2ThreeDSphere() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
