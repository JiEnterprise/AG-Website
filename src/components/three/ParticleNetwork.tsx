'use client'

import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 2400
const CONNECTION_DISTANCE = 0.18
const PARTICLE_SIZE = 0.006

function Particles({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Points>(null)
  const lineRef = useRef<THREE.LineSegments>(null)
  const { viewport } = useThree()

  // Generate initial positions
  const { positions, sizes, basePositions } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)
    const basePositions = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 4.5
      const y = (Math.random() - 0.5) * 2.8
      const z = (Math.random() - 0.5) * 1.5
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      basePositions[i * 3] = x
      basePositions[i * 3 + 1] = y
      basePositions[i * 3 + 2] = z
      sizes[i] = Math.random() * 0.012 + 0.004
    }
    return { positions, sizes, basePositions }
  }, [])

  // Velocities for slow drift
  const velocities = useMemo(() => {
    const vel = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      vel[i] = (Math.random() - 0.5) * 0.0002
    }
    return vel
  }, [])

  // Line geometry for connections
  const linePositions = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6), [])

  useFrame((state, delta) => {
    if (!meshRef.current || !lineRef.current) return

    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
    const pos = posAttr.array as Float32Array

    const mouse = mouseRef.current || { x: 0, y: 0 }
    const time = state.clock.elapsedTime

    // Update particle positions — drift + mouse parallax
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3
      pos[idx] = basePositions[idx] + Math.sin(time * 0.1 + i * 0.1) * 0.015 + mouse.x * 0.08
      pos[idx + 1] = basePositions[idx + 1] + Math.cos(time * 0.08 + i * 0.15) * 0.015 + mouse.y * 0.06
      pos[idx + 2] = basePositions[idx + 2]
    }
    posAttr.needsUpdate = true

    // Build connection lines (sample subset for performance)
    let lineIdx = 0
    const linePos = lineRef.current.geometry.attributes.position as THREE.BufferAttribute
    const linePosArr = linePos.array as Float32Array

    const step = 6 // check every 6th particle for connections
    for (let i = 0; i < PARTICLE_COUNT; i += step) {
      for (let j = i + step; j < PARTICLE_COUNT; j += step) {
        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < CONNECTION_DISTANCE && lineIdx < linePosArr.length - 6) {
          linePosArr[lineIdx++] = pos[i * 3]
          linePosArr[lineIdx++] = pos[i * 3 + 1]
          linePosArr[lineIdx++] = pos[i * 3 + 2]
          linePosArr[lineIdx++] = pos[j * 3]
          linePosArr[lineIdx++] = pos[j * 3 + 1]
          linePosArr[lineIdx++] = pos[j * 3 + 2]
        }
      }
    }

    // Clear remaining
    for (let k = lineIdx; k < Math.min(lineIdx + 300, linePosArr.length); k++) {
      linePosArr[k] = 0
    }
    linePos.needsUpdate = true
    lineRef.current.geometry.setDrawRange(0, lineIdx / 3)
  })

  return (
    <group>
      {/* Particles */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={PARTICLE_COUNT}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            array={sizes}
            count={PARTICLE_COUNT}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#C9A84C"
          size={PARTICLE_SIZE}
          sizeAttenuation
          transparent
          opacity={0.75}
          fog={false}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={linePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#C9A84C"
          transparent
          opacity={0.12}
          fog={false}
        />
      </lineSegments>
    </group>
  )
}

interface ParticleNetworkProps {
  className?: string
}

export default function ParticleNetwork({ className }: ParticleNetworkProps) {
  const mouseRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: -(e.clientY / window.innerHeight - 0.5) * 2,
    }
  }, [])

  return (
    <div
      className={className}
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 2.2], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Particles mouseRef={mouseRef} />
      </Canvas>
    </div>
  )
}
