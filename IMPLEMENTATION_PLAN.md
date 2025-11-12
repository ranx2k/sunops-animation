# 🎬 Complete Implementation Plan: 7 Animation Concepts

**Project**: SunOps IT Struggle Animation
**Framework**: Next.js 16 + TypeScript + Tailwind CSS v4
**Approach**: Phased implementation with context-clearing between phases
**Date Created**: 2025-11-07

---

## 📋 Table of Contents

- [Overview](#overview)
- [Content Structure](#content-structure)
- [Phase 0: Project Setup](#phase-0-project-setup)
- [Phase 1: Framer Motion Orbital Ring](#phase-1-framer-motion-orbital-ring)
- [Phase 2: React Three Fiber 3D Sphere](#phase-2-react-three-fiber-3d-sphere)
- [Phase 3: CSS 3D Star Wars Crawl](#phase-3-css-3d-star-wars-crawl)
- [Phase 4: TSParticles Explosion Effect](#phase-4-tsparticles-explosion-effect)
- [Phase 5: GSAP ScrollTrigger Narrative](#phase-5-gsap-scrolltrigger-narrative)
- [Phase 6: Canvas Matrix/Glitch Effect](#phase-6-canvas-matrixglitch-effect)
- [Phase 7: Lottie Integration + Demo Page](#phase-7-lottie-integration--demo-page)
- [Comparison Matrix](#comparison-matrix)
- [Testing Checklist](#testing-checklist)

---

## Overview

### Project Goals

Build 7 distinct animation concepts demonstrating IT infrastructure "struggle" that transitions to a solution. Each animation will:

1. Display the question: "Are you still running IT services by yourself?"
2. Feature "struggling" as the central focal point
3. Present 6 pain points in creative ways
4. Conclude with: "We lived the same, but SOLVED it. And now we want to share it with you."

### Implementation Strategy

**Phased Approach**: Before each phase, clear context and research the specific library's latest best practices using Context7 and web search. This ensures:

- Fresh, up-to-date implementation patterns
- Focused attention on each technique
- Minimal context pollution
- High-quality, maintainable code
- Easier debugging and testing

### Project Structure

```
sunops-animation/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Main demo page with tabs
│   │   ├── layout.tsx                  # Root layout
│   │   └── globals.css                 # Tailwind + custom styles
│   ├── components/
│   │   ├── option1-orbital.tsx         # Framer Motion orbital
│   │   ├── option2-3d-sphere.tsx       # React Three Fiber
│   │   ├── option3-star-wars.tsx       # CSS 3D transforms
│   │   ├── option4-particles.tsx       # Particle explosion
│   │   ├── option5-gsap-scroll.tsx     # GSAP ScrollTrigger
│   │   ├── option6-glitch.tsx          # Matrix/glitch effect
│   │   └── option7-lottie.tsx          # Lottie placeholder
│   └── lib/
│       ├── content.ts                  # Shared content data
│       └── utils.ts                    # Shared utilities
├── public/
│   └── animations/                     # Lottie JSON files
├── IMPLEMENTATION_PLAN.md              # This file
└── package.json
```

---

## Content Structure

### Shared Content (All Phases)

**File**: `src/lib/content.ts`

```typescript
export const content = {
  topText: "Are you still running IT services by yourself?",
  centerText: "struggling",
  painPoints: [
    "chaotic IT costs",
    "environment complexity",
    "security issues",
    "competent IT/DevOps stuff",
    "vendor lock-in",
    "never getting decent support"
  ],
  bottomText: "We lived the same, but SOLVED it. And now we want to share it with you."
}
```

---

## Phase 0: Project Setup

**Status**: Foundation phase
**Duration**: 30-60 minutes
**Dependencies**: None

### Objectives

1. Install all required dependencies for all 7 phases
2. Create shared content structure
3. Set up base styling and custom CSS animations
4. Create utility functions
5. Test Next.js app is running correctly

### Pre-Phase Research Topics

**No research needed** - this is infrastructure setup.

### Step-by-Step Checklist

#### 0.1 Install All Dependencies

```bash
# Core animation libraries
pnpm add framer-motion gsap lottie-react

# 3D graphics
pnpm add three @react-three/fiber @react-three/drei

# Particle effects
pnpm add @tsparticles/react @tsparticles/slim

# Types
pnpm add -D @types/three
```

**Verification**: Run `pnpm list` and verify all packages installed correctly.

#### 0.2 Create Shared Content Structure

**File**: `src/lib/content.ts`

```typescript
export const content = {
  topText: "Are you still running IT services by yourself?",
  centerText: "struggling",
  painPoints: [
    "chaotic IT costs",
    "environment complexity",
    "security issues",
    "competent IT/DevOps stuff",
    "vendor lock-in",
    "never getting decent support"
  ],
  bottomText: "We lived the same, but SOLVED it. And now we want to share it with you."
} as const

export type Content = typeof content
```

**Verification**: Import in a test component and log to console.

#### 0.3 Update Global Styles

**File**: `src/app/globals.css`

Add custom animations for Star Wars crawl, glitch effects, and matrix rain:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    font-family: var(--font-geist-sans);
  }
}

@layer utilities {
  /* Star Wars Crawl */
  @keyframes crawl {
    from {
      transform: translateY(100%) rotateX(30deg);
    }
    to {
      transform: translateY(-150%) rotateX(30deg) translateZ(500px);
    }
  }

  .animate-crawl {
    animation: crawl 20s linear infinite;
  }

  /* Glitch Effect */
  @keyframes glitch {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(2px, -2px); }
    60% { transform: translate(-2px, -2px); }
    80% { transform: translate(2px, 2px); }
  }

  .glitch {
    animation: glitch 0.3s infinite;
  }

  .glitch-text {
    text-shadow:
      2px 0 #ff0000,
      -2px 0 #00ffff;
  }

  /* Matrix Rain Canvas */
  .matrix-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
  }

  /* Scanline Effect */
  @keyframes scanline {
    from { background-position: 0 0; }
    to { background-position: 0 100%; }
  }

  .scanlines {
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(0, 0, 0, 0.1) 50%
    );
    background-size: 100% 4px;
    animation: scanline 8s linear infinite;
  }

  /* Fade animations */
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-in;
  }
}
```

**Verification**: Run `pnpm dev` and check for CSS errors in browser console.

#### 0.4 Create Utility Functions

**File**: `src/lib/utils.ts`

```typescript
/**
 * Calculate circular positioning for orbital animations
 */
export function getCircularPosition(
  index: number,
  total: number,
  radius: number
): { x: number; y: number; angle: number } {
  const angleStep = (Math.PI * 2) / total
  const angle = angleStep * index
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius

  return { x, y, angle }
}

/**
 * Calculate spherical coordinates for 3D positioning
 */
export function getSphericalPosition(
  index: number,
  total: number,
  radius: number
): { x: number; y: number; z: number } {
  const phi = Math.acos(-1 + (2 * index) / total)
  const theta = Math.sqrt(total * Math.PI) * phi

  const x = radius * Math.cos(theta) * Math.sin(phi)
  const y = radius * Math.sin(theta) * Math.sin(phi)
  const z = radius * Math.cos(phi)

  return { x, y, z }
}

/**
 * Stagger delay calculator for sequential animations
 */
export function getStaggerDelay(index: number, delayPerItem: number = 0.1): number {
  return index * delayPerItem
}

/**
 * Random number in range
 */
export function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

/**
 * Clamp number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
```

**Verification**: Import and test each function in Node console.

#### 0.5 Create Components Directory

```bash
mkdir src/components
```

#### 0.6 Update Layout Metadata

**File**: `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: "SunOps - IT Struggle Animation Concepts",
  description: "Exploring 7 animation techniques for showcasing IT infrastructure challenges",
}
```

### Testing Criteria

- [ ] All dependencies installed without errors
- [ ] `pnpm dev` runs successfully
- [ ] App loads at http://localhost:3000
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Custom CSS animations compile correctly

### Deliverables

- ✅ All dependencies installed
- ✅ `src/lib/content.ts` created
- ✅ `src/lib/utils.ts` created
- ✅ `src/app/globals.css` updated
- ✅ `src/components/` directory created
- ✅ Layout metadata updated

---

## Phase 1: Framer Motion Orbital Ring

**Status**: ✅ COMPLETE
**Duration**: 2-3 hours
**Dependencies**: Phase 0 complete
**Completed**: 2025-11-07

### Objectives

Create an animation where pain points spiral inward from the edges and settle into a circular orbit around "STRUGGLE" with continuous gentle rotation.

### Pre-Phase Research Topics

**Before starting this phase, research:**

1. **Context7**: Latest Framer Motion documentation
   - `motion` component API
   - `variants` object structure
   - `transition` types (spring, tween, inertia)
   - `staggerChildren` for sequential animations
   - `layoutId` for shared layout animations

2. **Web Search**: "Framer Motion best practices 2025"
   - Performance optimization patterns
   - TypeScript integration
   - Animation orchestration techniques
   - Accessible motion preferences

3. **Specific Topics**:
   - Circular motion with CSS transforms
   - Combining `rotate` and `translate` for orbits
   - `useAnimation` hook vs declarative variants
   - Infinite rotation with `repeat: Infinity`

### Technical Specifications

**Animation Timeline**:
1. (0s) Top text fades in
2. (0.5s) "STRUGGLE" scales up from center
3. (1s-3s) Pain points spiral in sequentially
4. (3s+) Continuous slow orbit rotation
5. (4s) Bottom text fades in

**Key Techniques**:
- Circular positioning using trigonometry
- Stagger animations with `staggerChildren`
- Infinite rotation on parent container
- Transform composition: `rotate` + `translate`

### Step-by-Step Checklist

#### 1.1 Create Component File

**File**: `src/components/option1-orbital.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { content } from '@/lib/content'
import { getCircularPosition, getStaggerDelay } from '@/lib/utils'

export function Option1Orbital() {
  const radius = 300 // Distance from center in pixels

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Implementation here */}
    </div>
  )
}
```

#### 1.2 Implement Top Text Animation

```typescript
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="absolute top-16 text-center text-white text-2xl px-8"
>
  {content.topText}
</motion.div>
```

#### 1.3 Implement Center "STRUGGLE" Text

```typescript
<motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{
    delay: 0.5,
    duration: 1,
    ease: "easeOut",
    type: "spring",
    stiffness: 100
  }}
  className="text-8xl font-bold text-red-500 z-10"
>
  {content.centerText}
</motion.div>
```

#### 1.4 Implement Orbital Container with Rotation

```typescript
<motion.div
  className="absolute"
  initial={{ rotate: 0 }}
  animate={{ rotate: 360 }}
  transition={{
    delay: 3,
    duration: 20,
    repeat: Infinity,
    ease: "linear"
  }}
>
  {/* Pain points will be positioned here */}
</motion.div>
```

#### 1.5 Implement Pain Points with Spiral Entry

```typescript
{content.painPoints.map((point, index) => {
  const { x, y, angle } = getCircularPosition(index, content.painPoints.length, radius)

  return (
    <motion.div
      key={point}
      className="absolute text-white text-lg font-medium"
      initial={{
        x: x * 3, // Start further out
        y: y * 3,
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
        delay: 1 + getStaggerDelay(index, 0.3),
        duration: 1,
        ease: "easeOut"
      }}
      style={{
        transform: `translate(-50%, -50%)` // Center the text on the point
      }}
    >
      {point}
    </motion.div>
  )
})}
```

#### 1.6 Implement Bottom Text Animation

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 4, duration: 0.8, ease: "easeOut" }}
  className="absolute bottom-16 text-center text-white text-xl px-8 max-w-2xl"
>
  {content.bottomText}
</motion.div>
```

#### 1.7 Add Motion Preferences Support

```typescript
const prefersReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false

// In transitions, conditionally disable animations:
transition={{
  delay: 4,
  duration: prefersReducedMotion ? 0 : 0.8,
  ease: "easeOut"
}}
```

### Performance Optimization

1. Use `transform` and `opacity` only (GPU-accelerated)
2. Avoid animating `width`, `height`, or `margin`
3. Use `will-change: transform` sparingly
4. Implement `prefersReducedMotion` support
5. Test with React DevTools Profiler

### Testing Criteria

- [ ] Animation plays smoothly at 60fps on desktop
- [ ] Animation plays at acceptable framerate on mobile
- [ ] All text is readable throughout animation
- [ ] Pain points position correctly in circular orbit
- [ ] Continuous rotation is smooth and doesn't stutter
- [ ] Respects `prefers-reduced-motion` setting
- [ ] No TypeScript errors
- [ ] No console errors

### Deliverables

- ✅ `src/components/option1-orbital.tsx` created
- ✅ Animation timeline matches specification
- ✅ All text elements visible and readable
- ✅ Smooth 60fps performance on desktop
- ✅ Accessibility support implemented

---

## Phase 2: React Three Fiber 3D Sphere

**Status**: ✅ COMPLETE
**Duration**: 6-8 hours
**Dependencies**: Phase 0 complete
**Completed**: 2025-11-10

### Objectives

Create a true 3D WebGL scene with pain points positioned on the surface of an invisible sphere around "STRUGGLE", with camera orbit and interactive mouse control.

### Pre-Phase Research Topics

**Before starting this phase, research:**

1. **Context7**: React Three Fiber + drei documentation
   - `Canvas` component setup
   - `useFrame` hook for animation loops
   - `Text` or `Text3D` component APIs
   - `OrbitControls` configuration
   - Camera setup and FOV

2. **Context7**: Three.js fundamentals
   - Spherical coordinate systems
   - Billboard effect (objects facing camera)
   - Scene graph and object hierarchy
   - Lighting models

3. **Web Search**: "React Three Fiber best practices 2025"
   - Performance optimization
   - Text rendering techniques
   - Mobile device support
   - Memory management

4. **Specific Topics**:
   - `Html` component from drei for 2D text in 3D space
   - Rotation quaternions vs Euler angles
   - Auto-rotation with damping
   - Responsive canvas sizing

### Technical Specifications

**Scene Setup**:
- Sphere radius: 5 Three.js units
- Camera position: [0, 0, 10]
- Camera FOV: 75
- Auto-rotate speed: 0.5 rpm

**Animation Timeline**:
1. Scene initializes with all text on sphere
2. Camera orbits automatically
3. Mouse movement influences rotation
4. "STRUGGLE" has gentle floating animation

**Key Techniques**:
- Spherical coordinates for positioning
- Billboard effect using `lookAt()` or `<Html>` component
- `useFrame` for continuous animation
- `OrbitControls` with auto-rotate

### Step-by-Step Checklist

#### 2.1 Create Component File

**File**: `src/components/option2-3d-sphere.tsx`

```typescript
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Html } from '@react-three/drei'
import { content } from '@/lib/content'
import { getSphericalPosition } from '@/lib/utils'

export function Option2ThreeDSphere() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
      >
        {/* Scene content */}
      </Canvas>
    </div>
  )
}
```

#### 2.2 Implement Lighting

```typescript
<ambientLight intensity={0.5} />
<pointLight position={[10, 10, 10]} intensity={1} />
```

#### 2.3 Implement OrbitControls

```typescript
<OrbitControls
  autoRotate
  autoRotateSpeed={0.5}
  enableZoom={false}
  enablePan={false}
  maxPolarAngle={Math.PI / 2}
  minPolarAngle={Math.PI / 2}
/>
```

#### 2.4 Create Pain Points on Sphere Surface

```typescript
function PainPoints() {
  const radius = 5

  return (
    <>
      {content.painPoints.map((point, index) => {
        const { x, y, z } = getSphericalPosition(index, content.painPoints.length, radius)

        return (
          <Html
            key={point}
            position={[x, y, z]}
            center
            distanceFactor={8}
          >
            <div className="text-white text-sm font-medium whitespace-nowrap bg-black/50 px-3 py-1 rounded">
              {point}
            </div>
          </Html>
        )
      })}
    </>
  )
}
```

#### 2.5 Create Center "STRUGGLE" Text with Animation

```typescript
function CenterText() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2
    }
  })

  return (
    <Text
      ref={meshRef}
      fontSize={1.5}
      color="red"
      anchorX="center"
      anchorY="middle"
    >
      {content.centerText}
    </Text>
  )
}
```

#### 2.6 Add Top and Bottom Text

```typescript
<Html
  position={[0, 6, 0]}
  center
  distanceFactor={10}
>
  <div className="text-white text-xl max-w-md text-center">
    {content.topText}
  </div>
</Html>

<Html
  position={[0, -6, 0]}
  center
  distanceFactor={10}
>
  <div className="text-white text-lg max-w-2xl text-center">
    {content.bottomText}
  </div>
</Html>
```

#### 2.7 Optimize Performance

```typescript
// In Canvas component
<Canvas
  camera={{ position: [0, 0, 10], fov: 75 }}
  dpr={[1, 2]} // Limit pixel ratio for performance
  performance={{ min: 0.5 }} // Allow framerate to drop if needed
>
```

#### 2.8 Add Loading State

```typescript
import { Suspense } from 'react'
import { Loader } from '@react-three/drei'

export function Option2ThreeDSphere() {
  return (
    <>
      <div className="w-full h-screen bg-black">
        <Canvas /* ... */>
          <Suspense fallback={null}>
            {/* Scene content */}
          </Suspense>
        </Canvas>
      </div>
      <Loader />
    </>
  )
}
```

### Performance Optimization

1. Use `Html` from drei instead of 3D text geometry
2. Limit `dpr` (device pixel ratio) to [1, 2]
3. Disable unused OrbitControls features (zoom, pan)
4. Use `Suspense` for async loading
5. Test memory usage with Chrome DevTools
6. Consider using instancing if duplicating geometries

### Testing Criteria

- [ ] Scene loads without errors
- [ ] WebGL context initializes successfully
- [ ] Camera orbits smoothly
- [ ] Mouse interaction works correctly
- [ ] Text is readable from all angles
- [ ] Performance is acceptable on mobile (30+ fps)
- [ ] No memory leaks over time
- [ ] Works on devices without WebGL2 (fallback)

### Deliverables

- ✅ `src/components/option2-3d-sphere.tsx` created with latest R3F patterns
- ✅ `src/components/option2-utils.ts` created for self-contained utilities
- ✅ 3D scene renders correctly with Canvas, lighting, and OrbitControls
- ✅ All text positioned on sphere surface using Fibonacci sphere distribution
- ✅ Camera orbit and mouse control working with auto-rotate
- ✅ Performance optimizations implemented (dpr limiting, Suspense)
- ✅ Loading state handles async initialization
- ✅ Center "STRUGGLE" text has floating animation using useFrame
- ✅ Compact navigation overlay implemented (doesn't obstruct view)
- ✅ Component is lazy-loaded with dynamic import for performance

---

## Phase 3: CSS 3D Star Wars Crawl

**Status**: Pending
**Duration**: 3-4 hours
**Dependencies**: Phase 0 complete

### Objectives

Create a Star Wars-style opening crawl using CSS 3D transforms with text receding into the distance from a vanishing point.

### Pre-Phase Research Topics

**Before starting this phase, research:**

1. **Web Search**: "CSS 3D transform perspective best practices"
   - `perspective` property usage
   - `transform-style: preserve-3d`
   - `rotateX` for tilt effect
   - `translateZ` for depth

2. **Web Search**: "CSS Star Wars crawl tutorial 2025"
   - Optimal perspective values
   - Rotation angles for authentic look
   - Text sizing for readability
   - Animation timing functions

3. **Specific Topics**:
   - Combining multiple transforms
   - `perspective-origin` for vanishing point
   - Performance of CSS 3D transforms
   - Background starfield effects

### Technical Specifications

**Animation Timeline**:
1. (0s) Fade to black
2. (1s) Top text appears (static at top)
3. (2s) "STRUGGLE" crawls from bottom, large
4. (3-8s) Pain points crawl continuously
5. (9s) All text fades out
6. (10s) Bottom solution text fades in

**Key CSS Properties**:
- `perspective`: 1000px
- `rotateX`: 30deg
- `translateZ`: -200px to 500px

### Step-by-Step Checklist

#### 3.1 Create Component File

**File**: `src/components/option3-star-wars.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { content } from '@/lib/content'

export function Option3StarWars() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Perspective container */}
    </div>
  )
}
```

#### 3.2 Create Starfield Background (Optional)

```typescript
<div className="absolute inset-0 bg-black">
  {/* Generate random stars */}
  {Array.from({ length: 100 }).map((_, i) => (
    <div
      key={i}
      className="absolute w-1 h-1 bg-white rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.8 + 0.2
      }}
    />
  ))}
</div>
```

#### 3.3 Create Perspective Container

```typescript
<div
  className="absolute inset-0 flex items-end justify-center"
  style={{ perspective: '1000px' }}
>
  <div className="crawl-container">
    {/* Crawling text */}
  </div>
</div>
```

#### 3.4 Add CSS for Crawl Animation

Update `src/app/globals.css` with crawl-specific styles:

```css
.crawl-container {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.crawl-text {
  position: absolute;
  width: 100%;
  transform: rotateX(30deg);
  transform-origin: center bottom;
}
```

#### 3.5 Implement Crawling Text Sequence

```typescript
<motion.div
  className="crawl-text text-yellow-400 text-center"
  initial={{ translateY: '100vh', translateZ: -200 }}
  animate={{
    translateY: '-150vh',
    translateZ: 500
  }}
  transition={{
    duration: 20,
    ease: "linear",
    repeat: Infinity
  }}
>
  <div className="text-4xl font-bold mb-8">
    {content.topText}
  </div>

  <div className="text-8xl font-bold mb-12 text-red-400">
    {content.centerText}
  </div>

  <div className="space-y-6">
    {content.painPoints.map((point, index) => (
      <div key={index} className="text-3xl">
        • {point}
      </div>
    ))}
  </div>

  <div className="text-4xl mt-12">
    {content.bottomText}
  </div>
</motion.div>
```

#### 3.6 Add Fade Effects

```typescript
// Add gradient masks for top and bottom fade
<div className="absolute inset-0 pointer-events-none">
  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
</div>
```

#### 3.7 Optimize for Mobile

```typescript
// Adjust perspective for smaller screens
const [perspective, setPerspective] = useState(1000)

useEffect(() => {
  const handleResize = () => {
    setPerspective(window.innerWidth < 768 ? 600 : 1000)
  }

  handleResize()
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])

// Use in style
style={{ perspective: `${perspective}px` }}
```

### Performance Optimization

1. Use CSS transforms exclusively (GPU-accelerated)
2. Avoid JavaScript-driven position updates
3. Use `will-change: transform` on crawl container
4. Test on mobile devices for acceptable framerate
5. Consider reducing animation complexity on low-end devices

### Testing Criteria

- [ ] Crawl animation runs smoothly
- [ ] Text maintains readability throughout
- [ ] Perspective effect creates depth illusion
- [ ] Vanishing point positioned correctly
- [ ] Works on mobile devices
- [ ] No flickering or tearing
- [ ] Background starfield (if added) performs well

### Deliverables

- ✅ `src/components/option3-star-wars.tsx` created
- ✅ CSS 3D transforms configured correctly
- ✅ Crawl animation timing matches specification
- ✅ Optional starfield background implemented
- ✅ Mobile responsiveness tested
- ✅ Gradient fades add cinematic effect

---

## Phase 4: TSParticles Explosion Effect

**Status**: Pending
**Duration**: 4-6 hours
**Dependencies**: Phase 0 complete

### Objectives

Create a particle explosion where "STRUGGLE" explodes into particles, swirls chaotically, then reforms into a circular orbit of pain points.

### Pre-Phase Research Topics

**Before starting this phase, research:**

1. **Context7**: TSParticles documentation
   - `Particles` component setup
   - Emitter configuration
   - Particle lifecycle
   - Custom shapes and interactions

2. **Web Search**: "TSParticles custom animations 2025"
   - Letter explosion effects
   - Morphing between shapes
   - Performance optimization
   - TypeScript configuration

3. **Specific Topics**:
   - Particle physics (velocity, gravity, friction)
   - Custom emitters
   - Move path generators
   - Absorbers and attractors

### Technical Specifications

**Animation Timeline**:
1. (0s) Top text fades in
2. (1s) "STRUGGLE" appears solid
3. (2s) Letters explode into particles
4. (2-3s) Particles swirl chaotically
5. (3-4s) Particles form circular orbit
6. (4-5s) Particles morph into pain point text
7. (6s) Bottom text fades in

**Implementation Approaches**:
- **Simple**: Canvas-based letter explosion using Framer Motion
- **Advanced**: TSParticles with custom configuration
- **Hybrid**: React components with transform animations

### Step-by-Step Checklist

#### 4.1 Create Component File

**File**: `src/components/option4-particles.tsx`

```typescript
'use client'

import { useCallback, useEffect, useState } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'
import { motion, AnimatePresence } from 'framer-motion'
import { content } from '@/lib/content'

export function Option4Particles() {
  const [stage, setStage] = useState<'intro' | 'explode' | 'orbit'>('intro')

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      {/* Implementation */}
    </div>
  )
}
```

#### 4.2 Initialize TSParticles

```typescript
const particlesInit = useCallback(async (engine: Engine) => {
  await loadSlim(engine)
}, [])
```

#### 4.3 Configure Particle Options

```typescript
const particleOptions = useMemo(() => ({
  background: {
    color: { value: "transparent" }
  },
  particles: {
    number: {
      value: stage === 'explode' ? 200 : 50
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: stage === 'explode' ? 1 : 0.5
    },
    size: {
      value: { min: 1, max: 3 }
    },
    move: {
      enable: true,
      speed: stage === 'explode' ? 6 : 2,
      direction: stage === 'explode' ? "none" : "none",
      random: stage === 'explode',
      straight: false,
      outModes: { default: "bounce" }
    }
  }
}), [stage])
```

#### 4.4 Implement Stage Transitions

```typescript
useEffect(() => {
  const timers = [
    setTimeout(() => setStage('explode'), 2000),
    setTimeout(() => setStage('orbit'), 4000)
  ]

  return () => timers.forEach(clearTimeout)
}, [])
```

#### 4.5 Create Initial "STRUGGLE" Text

```typescript
<AnimatePresence>
  {stage === 'intro' && (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute z-10 text-8xl font-bold text-red-500"
    >
      {content.centerText}
    </motion.div>
  )}
</AnimatePresence>
```

#### 4.6 Add Particles Layer

```typescript
<Particles
  id="tsparticles"
  init={particlesInit}
  options={particleOptions}
  className="absolute inset-0"
/>
```

#### 4.7 Implement Orbital Pain Points

```typescript
<AnimatePresence>
  {stage === 'orbit' && (
    <div className="absolute">
      {content.painPoints.map((point, index) => {
        const { x, y } = getCircularPosition(index, content.painPoints.length, 300)

        return (
          <motion.div
            key={point}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="absolute text-white text-lg"
            style={{
              transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
            }}
          >
            {point}
          </motion.div>
        )
      })}
    </div>
  )}
</AnimatePresence>
```

#### 4.8 Add Alternative: Simple Canvas Explosion

If TSParticles is too complex, implement a simpler Canvas-based explosion:

```typescript
function SimpleParticleExplosion() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Particle system implementation
    class Particle {
      x: number
      y: number
      vx: number
      vy: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 5 + 2
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.vx *= 0.98 // Friction
        this.vy *= 0.98
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Animation loop
    // ...
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0" />
}
```

### Performance Optimization

1. Limit particle count (< 300 on mobile)
2. Use `loadSlim` instead of full TSParticles
3. Disable complex interactions on mobile
4. Use `requestAnimationFrame` for smooth animations
5. Clean up particles outside viewport

### Testing Criteria

- [ ] Explosion effect is visually impressive
- [ ] Particles move smoothly without stuttering
- [ ] Transition from chaos to order is clear
- [ ] Performance is acceptable on mobile
- [ ] Memory usage is reasonable
- [ ] Animation completes in expected timeframe

### Deliverables

- ✅ `src/components/option4-particles.tsx` created
- ✅ TSParticles configured and initialized
- ✅ Explosion animation implemented
- ✅ Orbital formation transition working
- ✅ Alternative simple implementation (optional)
- ✅ Performance tested on multiple devices

---

## Phase 5: GSAP ScrollTrigger Narrative

**Status**: Pending
**Duration**: 5-7 hours
**Dependencies**: Phase 0 complete

### Objectives

Create a scroll-driven narrative where each scroll section reveals the next part of the story with pinned elements and parallax effects.

### Pre-Phase Research Topics

**Before starting this phase, research:**

1. **Context7**: GSAP 3 + ScrollTrigger documentation
   - `gsap.timeline()` API
   - `ScrollTrigger` configuration
   - `pin`, `scrub`, `snap` properties
   - Markers for debugging

2. **Web Search**: "GSAP ScrollTrigger best practices 2025"
   - React integration patterns
   - Cleanup and memory management
   - Mobile device compatibility
   - Performance optimization

3. **Specific Topics**:
   - Scroll-linked animations with `scrub`
   - Pinning sections during scroll
   - Coordinate multiple animations
   - `useGSAP` hook (if available)

### Technical Specifications

**Scroll Sections**:
1. **Section 1** (vh: 0-100): Top question fades in, pins
2. **Section 2** (vh: 100-200): "STRUGGLE" grows massively
3. **Section 3** (vh: 200-500): Pain points fly in sequentially
4. **Section 4** (vh: 500-600): Pain points form circle
5. **Section 5** (vh: 600-700): Fade out, solution text appears

**Key Techniques**:
- `ScrollTrigger.create()` for multiple sections
- `gsap.timeline()` for coordinated animations
- `scrub: true` for smooth scroll-linked motion
- `pin: true` for sticky sections

### Step-by-Step Checklist

#### 5.1 Create Component File

**File**: `src/components/option5-gsap-scroll.tsx`

```typescript
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content } from '@/lib/content'
import { getCircularPosition } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export function Option5GsapScroll() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* Scroll sections */}
    </div>
  )
}
```

#### 5.2 Create Section Elements

```typescript
<div className="section-1 h-screen flex items-center justify-center">
  <div className="top-text text-white text-3xl text-center px-8">
    {content.topText}
  </div>
</div>

<div className="section-2 h-screen flex items-center justify-center">
  <div className="struggle-text text-8xl font-bold text-red-500">
    {content.centerText}
  </div>
</div>

<div className="section-3 relative" style={{ height: '300vh' }}>
  <div className="sticky top-0 h-screen flex items-center justify-center">
    <div className="pain-points-container relative">
      {content.painPoints.map((point, index) => (
        <div
          key={point}
          className={`pain-point pain-${index} absolute text-white text-xl opacity-0`}
        >
          {point}
        </div>
      ))}
    </div>
  </div>
</div>

<div className="section-4 h-screen flex items-center justify-center">
  <div className="bottom-text text-white text-2xl text-center px-8 max-w-3xl">
    {content.bottomText}
  </div>
</div>
```

#### 5.3 Implement GSAP Animations

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // Section 1: Fade in top text
    gsap.from('.top-text', {
      scrollTrigger: {
        trigger: '.section-1',
        start: 'top center',
        end: 'center center',
        scrub: 1,
        pin: '.section-1',
      },
      opacity: 0,
      y: -50
    })

    // Section 2: Scale up STRUGGLE
    gsap.from('.struggle-text', {
      scrollTrigger: {
        trigger: '.section-2',
        start: 'top center',
        end: 'center center',
        scrub: 1,
        pin: '.section-2',
      },
      scale: 0,
      opacity: 0
    })

    // Section 3: Pain points timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-3',
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
      }
    })

    content.painPoints.forEach((point, index) => {
      tl.from(`.pain-${index}`, {
        x: index % 2 === 0 ? -1000 : 1000,
        opacity: 0,
        duration: 1
      }, index * 0.5)
    })

    // Section 4: Form circle
    const radius = 300
    content.painPoints.forEach((point, index) => {
      const { x, y } = getCircularPosition(index, content.painPoints.length, radius)

      tl.to(`.pain-${index}`, {
        x,
        y,
        duration: 1
      }, '>')
    })

    // Section 5: Bottom text
    gsap.from('.bottom-text', {
      scrollTrigger: {
        trigger: '.section-4',
        start: 'top center',
        end: 'center center',
        scrub: 1,
      },
      opacity: 0,
      y: 50
    })

  }, containerRef)

  return () => ctx.revert()
}, [])
```

#### 5.4 Add Scroll Markers (Development Only)

```typescript
// In ScrollTrigger config during development:
scrollTrigger: {
  trigger: '.section-1',
  start: 'top center',
  end: 'center center',
  scrub: 1,
  markers: true, // Remove in production
}
```

#### 5.5 Implement Smooth Scrolling (Optional)

```typescript
useEffect(() => {
  // Enable smooth scrolling
  ScrollTrigger.normalizeScroll(true)

  return () => {
    ScrollTrigger.normalizeScroll(false)
  }
}, [])
```

#### 5.6 Mobile Optimization

```typescript
// Adjust scroll distances for mobile
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
const scrollDistance = isMobile ? 2000 : 3000

scrollTrigger: {
  trigger: '.section-3',
  start: 'top top',
  end: `+=${scrollDistance}`,
  scrub: 1,
  pin: true,
}
```

#### 5.7 Add Progress Indicator

```typescript
<motion.div
  className="fixed top-4 right-4 text-white text-sm z-50"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Scroll to explore
</motion.div>
```

### Performance Optimization

1. Use `gsap.context()` for automatic cleanup
2. Call `ctx.revert()` in cleanup function
3. Limit number of pinned sections
4. Use `scrub: true` instead of `scrub: 1` for better performance
5. Test scroll performance on mobile devices
6. Consider disabling on devices with `prefers-reduced-motion`

### Testing Criteria

- [ ] Scroll animations are smooth and responsive
- [ ] Pin sections work correctly
- [ ] Scrub creates fluid scroll-linked animation
- [ ] All transitions happen at correct scroll positions
- [ ] No memory leaks after component unmount
- [ ] Works on mobile devices
- [ ] Accessible with keyboard navigation

### Deliverables

- ✅ `src/components/option5-gsap-scroll.tsx` created
- ✅ GSAP Timeline configured correctly
- ✅ ScrollTrigger sections positioned properly
- ✅ All animations synchronized with scroll
- ✅ Mobile responsiveness tested
- ✅ Cleanup functions prevent memory leaks

---

## Phase 6: Canvas Matrix/Glitch Effect

**Status**: Pending
**Duration**: 4-5 hours
**Dependencies**: Phase 0 complete

### Objectives

Create a Matrix-style code rain background with text glitching into existence, featuring terminal/hacker aesthetics with CRT scanline effects.

### Pre-Phase Research Topics

**Before starting this phase, research:**

1. **Web Search**: "Canvas matrix rain effect tutorial"
   - Character rendering on canvas
   - Fade trail effects
   - Performance optimization for canvas animations
   - Katakana character sets

2. **Web Search**: "CSS glitch effect 2025"
   - RGB split technique
   - Clip-path animations
   - Text shadow for chromatic aberration
   - CRT scanline overlays

3. **Specific Topics**:
   - `requestAnimationFrame` best practices
   - Canvas context save/restore
   - Monospace font rendering
   - CSS `mix-blend-mode` for effects

### Technical Specifications

**Animation Timeline**:
1. (0s) Matrix rain starts
2. (1s) Screen glitches
3. (2s) "STRUGGLE" materializes from glitching characters
4. (3-5s) Pain points appear as terminal errors
5. (6s) Glitches stabilize into circular formation
6. (7s) Bottom text types in terminal-style

**Key Techniques**:
- Canvas-based matrix rain
- CSS glitch animations
- RGB split color effects
- Scanline overlay

### Step-by-Step Checklist

#### 6.1 Create Component File

**File**: `src/components/option6-glitch.tsx`

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { content } from '@/lib/content'

export function Option6Glitch() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stage, setStage] = useState(0)

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Matrix rain background */}
      {/* Glitching text */}
    </div>
  )
}
```

#### 6.2 Implement Matrix Rain Canvas

```typescript
useEffect(() => {
  const canvas = canvasRef.current
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Set canvas size
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const fontSize = 16
  const columns = Math.floor(canvas.width / fontSize)
  const drops: number[] = Array(columns).fill(1)

  // Katakana + Latin + numbers
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ'

  function draw() {
    if (!ctx) return

    // Semi-transparent black for fade trail
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Green text
    ctx.fillStyle = '#0F0'
    ctx.font = `${fontSize}px monospace`

    drops.forEach((y, x) => {
      const char = chars[Math.floor(Math.random() * chars.length)]
      ctx.fillText(char, x * fontSize, y * fontSize)

      // Reset drop randomly
      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[x] = 0
      }

      drops[x]++
    })
  }

  const interval = setInterval(draw, 50)

  // Handle resize
  const handleResize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  window.addEventListener('resize', handleResize)

  return () => {
    clearInterval(interval)
    window.removeEventListener('resize', handleResize)
  }
}, [])
```

#### 6.3 Add Canvas Element

```typescript
<canvas
  ref={canvasRef}
  className="absolute inset-0 opacity-60"
/>
```

#### 6.4 Implement Glitch CSS

In `src/app/globals.css`, ensure these are present:

```css
@keyframes glitch-anim {
  0% {
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    transform: translate(0);
  }
  20% {
    clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
    transform: translate(-5px, 5px);
  }
  40% {
    clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
    transform: translate(5px, -5px);
  }
  60% {
    clip-path: polygon(0 80%, 100% 80%, 100% 95%, 0 95%);
    transform: translate(-5px, 5px);
  }
  80% {
    clip-path: polygon(0 10%, 100% 10%, 100% 30%, 0 30%);
    transform: translate(5px, -5px);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transform: translate(0);
  }
}

.glitch-active {
  animation: glitch-anim 0.3s infinite;
}

.glitch-text {
  text-shadow:
    2px 0 #ff0000,
    -2px 0 #00ffff;
}
```

#### 6.5 Create Glitching "STRUGGLE" Text

```typescript
<AnimatePresence>
  {stage >= 1 && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`absolute z-10 text-8xl font-bold text-red-500 font-mono
        ${stage === 1 ? 'glitch-active glitch-text' : ''}
      `}
    >
      {content.centerText}
    </motion.div>
  )}
</AnimatePresence>
```

#### 6.6 Implement Terminal Error Pain Points

```typescript
<AnimatePresence>
  {stage >= 2 && (
    <div className="absolute z-10">
      {content.painPoints.map((point, index) => {
        const { x, y } = getCircularPosition(index, content.painPoints.length, 300)

        return (
          <motion.div
            key={point}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="absolute text-green-400 font-mono text-sm"
            style={{
              transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
            }}
          >
            <span className="text-red-500">ERROR:</span> {point}
          </motion.div>
        )
      })}
    </div>
  )}
</AnimatePresence>
```

#### 6.7 Add Scanline Effect

```typescript
<div className="absolute inset-0 scanlines pointer-events-none z-20" />
```

#### 6.8 Implement Stage Progression

```typescript
useEffect(() => {
  const timers = [
    setTimeout(() => setStage(1), 1000),  // Glitch starts
    setTimeout(() => setStage(2), 3000),  // Pain points appear
    setTimeout(() => setStage(3), 6000),  // Bottom text
  ]

  return () => timers.forEach(clearTimeout)
}, [])
```

#### 6.9 Add Typing Effect for Bottom Text

```typescript
function TypingText({ text, delay }: { text: string; delay: number }) {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let index = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(prev => prev + text[index])
          index++
        } else {
          clearInterval(interval)
        }
      }, 50)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, delay])

  return (
    <div className="text-green-400 font-mono text-lg">
      {displayText}<span className="animate-pulse">_</span>
    </div>
  )
}

// Use in component:
<AnimatePresence>
  {stage >= 3 && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute bottom-16 z-10"
    >
      <TypingText text={content.bottomText} delay={0} />
    </motion.div>
  )}
</AnimatePresence>
```

### Performance Optimization

1. Limit matrix rain to ~100 columns on mobile
2. Reduce animation frame rate on low-end devices
3. Use `requestAnimationFrame` instead of `setInterval` for better performance
4. Cleanup canvas intervals properly
5. Test memory usage over time

### Testing Criteria

- [ ] Matrix rain runs smoothly
- [ ] Glitch effect is visible and impactful
- [ ] Text remains readable despite effects
- [ ] Scanlines add to aesthetic without causing nausea
- [ ] Performance is acceptable on mobile
- [ ] Canvas resizes correctly on window resize
- [ ] No memory leaks from intervals

### Deliverables

- ✅ `src/components/option6-glitch.tsx` created
- ✅ Matrix rain canvas animation implemented
- ✅ Glitch CSS effects applied
- ✅ Scanline overlay adds CRT aesthetic
- ✅ Terminal-style text rendering
- ✅ Typing effect for bottom text
- ✅ Performance tested on multiple devices

---

## Phase 7: Lottie Integration + Demo Page

**Status**: Pending
**Duration**: 3-4 hours
**Dependencies**: Phase 0 complete

### Objectives

1. Create Lottie animation integration component
2. Build main demo page with tab navigation
3. Implement comparison interface for all 7 options
4. Add performance monitoring (optional)

### Pre-Phase Research Topics

**Before starting this phase, research:**

1. **Context7**: Lottie React documentation
   - `Lottie` component API
   - Animation control (play, pause, stop)
   - Loop and autoplay configuration
   - Event handling

2. **Web Search**: "Lottie animation best practices 2025"
   - File size optimization
   - Performance considerations
   - Fallback for unsupported browsers
   - Dynamic JSON loading

3. **Specific Topics**:
   - LottieFiles.com sample animations
   - React state management for tabs
   - Lazy loading tab content
   - Performance monitoring with React DevTools

### Technical Specifications

**Main Demo Page Features**:
- Tab navigation for all 7 options
- Full-screen view for each animation
- Reset button for each animation
- Performance metrics display (optional)
- Responsive layout

**Lottie Component**:
- Sample animation placeholder
- Controls for play/pause
- Link to LottieFiles for custom animations

### Step-by-Step Checklist

#### 7.1 Create Lottie Component

**File**: `src/components/option7-lottie.tsx`

```typescript
'use client'

import { useState } from 'react'
import Lottie from 'lottie-react'
import { content } from '@/lib/content'

// Sample animation data (or import from JSON file)
// For demo, we'll show how to integrate

export function Option7Lottie() {
  const [animationData, setAnimationData] = useState(null)

  return (
    <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center">
      <div className="text-white text-center max-w-2xl px-8">
        <h2 className="text-4xl font-bold mb-6">Lottie Animation</h2>

        <p className="text-lg mb-8">
          This option requires custom animation design in After Effects.
          Export as Lottie JSON and place in <code className="bg-gray-800 px-2 py-1 rounded">public/animations/</code>
        </p>

        {animationData ? (
          <div className="max-w-xl mx-auto">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-400">
              Get free Lottie animations from{' '}
              <a
                href="https://lottiefiles.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                LottieFiles.com
              </a>
            </p>

            <div className="bg-gray-900 p-6 rounded-lg text-left">
              <h3 className="text-xl font-bold mb-4">Integration Example:</h3>
              <pre className="text-sm text-green-400 overflow-x-auto">
{`import animationData from '@/public/animations/struggle.json'

<Lottie
  animationData={animationData}
  loop={false}
  autoplay={true}
  onComplete={() => console.log('Done!')}
/>`}
              </pre>
            </div>

            <div className="mt-8 space-y-2">
              <p className="text-sm text-gray-400">Recommended content structure:</p>
              <ul className="text-sm text-gray-300 text-left max-w-md mx-auto">
                <li>• Top text: "{content.topText}"</li>
                <li>• Center: "{content.centerText}" (animated burst)</li>
                <li>• Pain points orbit in</li>
                <li>• Bottom text: "{content.bottomText}"</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

#### 7.2 Create Main Demo Page

**File**: `src/app/page.tsx`

```typescript
'use client'

import { useState } from 'react'
import { Option1Orbital } from '@/components/option1-orbital'
import { Option2ThreeDSphere } from '@/components/option2-3d-sphere'
import { Option3StarWars } from '@/components/option3-star-wars'
import { Option4Particles } from '@/components/option4-particles'
import { Option5GsapScroll } from '@/components/option5-gsap-scroll'
import { Option6Glitch } from '@/components/option6-glitch'
import { Option7Lottie } from '@/components/option7-lottie'

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

export default function Home() {
  const [activeOption, setActiveOption] = useState<OptionId>('option1')
  const [key, setKey] = useState(0)

  const ActiveComponent = options.find(opt => opt.id === activeOption)?.component

  const handleReset = () => {
    setKey(prev => prev + 1)
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">
              SunOps Animation Concepts
            </h1>

            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Reset Animation
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {options.map(option => (
              <button
                key={option.id}
                onClick={() => setActiveOption(option.id)}
                className={`px-4 py-2 rounded whitespace-nowrap transition-colors ${
                  activeOption === option.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32">
        {ActiveComponent && <ActiveComponent key={key} />}
      </div>
    </main>
  )
}
```

#### 7.3 Add Lazy Loading for Heavy Components

```typescript
import dynamic from 'next/dynamic'

const Option2ThreeDSphere = dynamic(
  () => import('@/components/option2-3d-sphere').then(mod => ({ default: mod.Option2ThreeDSphere })),
  { ssr: false }
)

const Option4Particles = dynamic(
  () => import('@/components/option4-particles').then(mod => ({ default: mod.Option4Particles })),
  { ssr: false }
)
```

#### 7.4 Add Performance Monitoring (Optional)

```typescript
import { useEffect, useState } from 'react'

function PerformanceMonitor() {
  const [fps, setFps] = useState(60)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()

    function measureFPS() {
      const now = performance.now()
      frameCount++

      if (now >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)))
        frameCount = 0
        lastTime = now
      }

      requestAnimationFrame(measureFPS)
    }

    const rafId = requestAnimationFrame(measureFPS)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded text-sm font-mono">
      FPS: {fps}
    </div>
  )
}

// Add to main page:
<PerformanceMonitor />
```

#### 7.5 Create Comparison View (Optional)

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
  {options.map(option => (
    <div key={option.id} className="border border-gray-800 rounded-lg overflow-hidden">
      <div className="aspect-video bg-black">
        {/* Thumbnail or small preview */}
      </div>
      <div className="p-4 bg-gray-900">
        <h3 className="text-white font-bold">{option.label}</h3>
        <button
          onClick={() => setActiveOption(option.id)}
          className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View Full
        </button>
      </div>
    </div>
  ))}
</div>
```

#### 7.6 Update Layout Metadata

```typescript
// In src/app/layout.tsx
export const metadata: Metadata = {
  title: "SunOps - IT Struggle Animation Concepts",
  description: "Exploring 7 animation techniques for showcasing IT infrastructure challenges and solutions",
}
```

#### 7.7 Add README Section

Create or update `README.md` with usage instructions:

```markdown
## Animation Options

1. **Orbital Ring** - Framer Motion circular orbit
2. **3D Sphere** - React Three Fiber WebGL scene
3. **Star Wars Crawl** - CSS 3D perspective transforms
4. **Particle Explosion** - TSParticles chaos to order
5. **GSAP Scroll** - Scroll-driven narrative
6. **Matrix Glitch** - Canvas rain + glitch effects
7. **Lottie** - After Effects integration

## Running the Demo

```bash
pnpm install
pnpm dev
```

Navigate to http://localhost:3000 and select animation options from the tabs.
```

### Testing Criteria

- [ ] All 7 tabs navigate correctly
- [ ] Each animation plays without errors
- [ ] Reset button restarts current animation
- [ ] No memory leaks when switching tabs
- [ ] Performance monitor (if added) shows accurate FPS
- [ ] Responsive layout works on mobile
- [ ] Browser back/forward buttons work correctly

### Deliverables

- ✅ `src/components/option7-lottie.tsx` created
- ✅ `src/app/page.tsx` updated with tab navigation
- ✅ All 7 options accessible from main page
- ✅ Reset functionality implemented
- ✅ Performance monitoring added (optional)
- ✅ README updated with instructions
- ✅ Lazy loading for heavy components

---

## Comparison Matrix

| Option | Complexity | Bundle Size | Mobile Perf | Wow Factor | Time | Best For |
|--------|-----------|-------------|-------------|------------|------|----------|
| 1. Orbital | Low | ~15KB | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 2-3h | Clean, professional sites |
| 2. 3D Sphere | High | ~150KB | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 6-8h | Tech-forward brands |
| 3. Star Wars | Medium | ~15KB | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 3-4h | Storytelling, nostalgia |
| 4. Particles | Medium | ~50KB | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 4-6h | Dynamic, energetic brands |
| 5. GSAP Scroll | Medium | ~47KB | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 5-7h | Long-form narratives |
| 6. Glitch | Medium | ~20KB | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 4-5h | Tech, cybersecurity brands |
| 7. Lottie | Low* | ~30KB* | ⭐⭐⭐⭐⭐ | Varies | 1h + design | Fully custom animations |

*Assumes pre-made animation; design time not included

---

## Testing Checklist

### Performance Testing

- [ ] All animations run at 60fps on desktop (Chrome, Firefox, Safari)
- [ ] Mobile performance acceptable (30+ fps on mid-range devices)
- [ ] Bundle size analyzed with `next build` and Webpack analyzer
- [ ] Memory usage monitored over 5+ minutes of interaction
- [ ] No memory leaks detected when switching between options
- [ ] Time to Interactive (TTI) < 3 seconds

### Functionality Testing

- [ ] All animations complete their full cycle
- [ ] Text remains readable throughout all animations
- [ ] Responsive layout works on mobile, tablet, desktop
- [ ] Animations respect `prefers-reduced-motion` setting
- [ ] No console errors or warnings
- [ ] TypeScript compiles without errors
- [ ] All links and interactions work correctly

### Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Accessibility Testing

- [ ] Keyboard navigation works for tab switching
- [ ] Screen reader announces tab changes
- [ ] Skip animation option available (if needed)
- [ ] Sufficient color contrast for all text
- [ ] Motion can be paused or disabled

### User Experience Testing

- [ ] Animation duration feels appropriate
- [ ] Timing between elements feels natural
- [ ] Visual hierarchy is clear
- [ ] Message is communicated effectively
- [ ] No elements cause nausea or discomfort
- [ ] Reset button works reliably

---

## Workflow: Phase Execution Process

### Before Each Phase

1. **Clear context** - Start fresh terminal/IDE session
2. **Research libraries**:
   ```bash
   # Use Context7 to get latest docs
   # Search: "library-name best practices 2025"
   # Read: Official documentation for specific APIs
   ```
3. **Review phase checklist** in this document
4. **Set up test environment** for that specific animation

### During Each Phase

1. **Follow checklist step-by-step**
2. **Test incrementally** - Don't wait until the end
3. **Commit after each major milestone**
4. **Take screenshots/videos** for comparison
5. **Document any deviations** from the plan

### After Each Phase

1. **Run full testing checklist** for that option
2. **Measure performance** (FPS, bundle size, load time)
3. **Commit with descriptive message**:
   ```bash
   git add .
   git commit -m "feat: implement Phase X - [Option Name]"
   ```
4. **Update this document** with any learnings or changes
5. **Clear context** before next phase

---

## Notes & Learnings

**Add notes here as you progress through phases:**

- Phase 0: [Any setup issues, dependency conflicts, etc.]
- Phase 1: [Framer Motion learnings, performance insights]
- Phase 2: [React Three Fiber challenges, solutions]
- Phase 3: [CSS 3D transform gotchas]
- Phase 4: [TSParticles configuration insights]
- Phase 5: [GSAP ScrollTrigger best practices]
- Phase 6: [Canvas performance optimizations]
- Phase 7: [Lottie integration tips]

---

## Final Decision Framework

After completing all phases, evaluate each option on:

1. **Performance**: Measured FPS, bundle size, load time
2. **Brand Fit**: Does it match SunOps personality?
3. **Message Clarity**: Does it communicate the struggle → solution story?
4. **Accessibility**: Can all users experience it?
5. **Maintenance**: How easy to update content?
6. **Uniqueness**: How memorable is it?

**Scoring Template**:

| Criteria | Weight | Option 1 | Option 2 | Option 3 | Option 4 | Option 5 | Option 6 | Option 7 |
|----------|--------|----------|----------|----------|----------|----------|----------|----------|
| Performance | 25% | - | - | - | - | - | - | - |
| Brand Fit | 20% | - | - | - | - | - | - | - |
| Message Clarity | 20% | - | - | - | - | - | - | - |
| Accessibility | 15% | - | - | - | - | - | - | - |
| Maintenance | 10% | - | - | - | - | - | - | - |
| Uniqueness | 10% | - | - | - | - | - | - | - |
| **Total** | 100% | - | - | - | - | - | - | - |

---

## Quick Reference: Dependencies

```json
{
  "dependencies": {
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "next": "16.0.1",
    "framer-motion": "latest",
    "gsap": "latest",
    "lottie-react": "latest",
    "three": "latest",
    "@react-three/fiber": "latest",
    "@react-three/drei": "latest",
    "@tsparticles/react": "latest",
    "@tsparticles/slim": "latest"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/three": "latest",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "@biomejs/biome": "2.2.0"
  }
}
```

---

**Document Status**: Ready for implementation
**Last Updated**: 2025-11-07
**Next Action**: Execute Phase 0
