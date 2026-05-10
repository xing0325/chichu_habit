'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

export function DeviceModel({ exploded = false }: { exploded?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
  })

  const ex = exploded ? 1 : 0

  return (
    <group ref={groupRef}>
      {/* Main body */}
      <RoundedBox args={[2.2, 0.6, 1.4]} radius={0.12} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.2} />
      </RoundedBox>

      {/* OLED screen */}
      <mesh position={[-0.55, 0.31 + ex * 0.5, 0]}>
        <boxGeometry args={[0.7, 0.02, 0.5]} />
        <meshStandardMaterial color="#0a0a1a" emissive="#00ffcc" emissiveIntensity={0.4} />
      </mesh>
      {/* Screen glow pixels */}
      <mesh position={[-0.55, 0.33 + ex * 0.5, 0]}>
        <boxGeometry args={[0.6, 0.01, 0.4]} />
        <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={1.5} transparent opacity={0.6} />
      </mesh>

      {/* Scroll wheel (EC11) */}
      <mesh position={[0.7, 0.38 + ex * 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.12, 32]} />
        <meshStandardMaterial color="#2a2a4a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.7, 0.38 + ex * 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.18, 0.025, 8, 32]} />
        <meshStandardMaterial color="#4444aa" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Buttons row */}
      {[-0.5, -0.2, 0.1, 0.4, 0.7].map((x, i) => (
        <mesh key={i} position={[x, 0.32 + ex * 0.35, -0.45]}>
          <cylinderGeometry args={[0.065, 0.065, 0.06, 16]} />
          <meshStandardMaterial
            color={['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'][i]}
            emissive={['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'][i]}
            emissiveIntensity={0.3}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* RGB LEDs */}
      {[-0.3, 0, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 0.32 + ex * 0.3, 0.55]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial
            color={['#ff0040', '#00ff88', '#4488ff'][i]}
            emissive={['#ff0040', '#00ff88', '#4488ff'][i]}
            emissiveIntensity={2}
          />
        </mesh>
      ))}

      {/* Microphone hole */}
      <mesh position={[0.2, 0.32 + ex * 0.25, 0.4]}>
        <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
        <meshStandardMaterial color="#0a0a1a" />
      </mesh>

      {/* USB-C port */}
      <mesh position={[1.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.12, 0.08, 0.28]} />
        <meshStandardMaterial color="#333355" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Bottom plate */}
      <mesh position={[0, -0.32, 0]}>
        <boxGeometry args={[2.18, 0.02, 1.38]} />
        <meshStandardMaterial color="#111122" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  )
}
