'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Float } from '@react-three/drei'
import { DeviceModel } from './DeviceModel'
import { Suspense } from 'react'

export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 4], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-3, 2, -2]} intensity={0.8} color="#6366F1" />
        <pointLight position={[3, -1, 2]} intensity={0.6} color="#00ffcc" />
        <Environment preset="city" />
        <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.3}>
          <DeviceModel />
        </Float>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate={false}
        />
      </Suspense>
    </Canvas>
  )
}
