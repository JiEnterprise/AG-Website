'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Crystal({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    const mouse = mouseRef.current || { x: 0, y: 0 }

    groupRef.current.rotation.y = t * 0.3 + mouse.x * 0.4
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.15 + mouse.y * 0.2
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.08
  })

  return (
    <group ref={groupRef}>
      {/* Outer icosahedron — wireframe gold */}
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Inner icosahedron — semi-transparent */}
      <mesh scale={0.75}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshPhysicalMaterial
          color="#1A1510"
          transparent
          opacity={0.25}
          roughness={0.1}
          metalness={0.8}
          envMapIntensity={1}
        />
      </mesh>

      {/* Core glow */}
      <mesh scale={0.35}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial
          color="#C9A84C"
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.01, 8, 80]} />
        <meshBasicMaterial color="#C9A84C" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

export default function CrystalScene() {
  const mouseRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
    }
  }

  return (
    <div
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} intensity={2} color="#C9A84C" />
        <pointLight position={[-3, -2, 2]} intensity={1} color="#4A6BA8" />
        <Crystal mouseRef={mouseRef} />
      </Canvas>
    </div>
  )
}
