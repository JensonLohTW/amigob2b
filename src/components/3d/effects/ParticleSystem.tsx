'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleSystemProps {
  count?: number
  quality?: 'high' | 'medium' | 'low'
  enabled?: boolean
}

export function EnvironmentParticles({ 
  count = 1000, 
  quality = 'high',
  enabled = true 
}: ParticleSystemProps) {
  const particlesRef = useRef<THREE.Points>(null!)
  
  // 根據質量調整粒子數量
  const particleCount = useMemo(() => {
    if (!enabled) return 0
    
    switch (quality) {
      case 'high': return count
      case 'medium': return Math.floor(count * 0.6)
      case 'low': return Math.floor(count * 0.3)
      default: return count
    }
  }, [count, quality, enabled])

  const [positions, colors, sizes] = useMemo(() => {
    if (particleCount === 0) return [new Float32Array(0), new Float32Array(0), new Float32Array(0)]
    
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    
    for (let i = 0; i < particleCount; i++) {
      // 位置 - 在販賣機周圍分布
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = Math.random() * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
      
      // 顏色 - 藍白色調
      const brightness = 0.7 + Math.random() * 0.3
      colors[i * 3] = brightness * 0.8     // R
      colors[i * 3 + 1] = brightness * 0.9 // G
      colors[i * 3 + 2] = brightness       // B
      
      // 大小
      sizes[i] = Math.random() * 0.03 + 0.01
    }
    
    return [positions, colors, sizes]
  }, [particleCount])

  useFrame((state) => {
    if (!particlesRef.current || particleCount === 0) return
    
    const time = state.clock.elapsedTime
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    
    // 更新粒子位置 - 緩慢浮動效果
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const x = positions[i3]
      const z = positions[i3 + 2]
      
      // 垂直浮動
      positions[i3 + 1] += Math.sin(time * 0.5 + x * 0.1 + z * 0.1) * 0.002
      
      // 邊界檢查 - 重置超出範圍的粒子
      if (positions[i3 + 1] > 8) {
        positions[i3 + 1] = 0
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  if (!enabled || particleCount === 0) return null

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// 互動粒子效果
export function InteractionParticles({ position, intensity = 1 }: { 
  position: [number, number, number]
  intensity?: number 
}) {
  const particlesRef = useRef<THREE.Points>(null!)
  const startTime = useRef(Date.now())
  
  const particleCount = 50
  const [positions, velocities, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // 起始位置
      positions[i3] = position[0] + (Math.random() - 0.5) * 0.2
      positions[i3 + 1] = position[1] + (Math.random() - 0.5) * 0.2
      positions[i3 + 2] = position[2] + (Math.random() - 0.5) * 0.2
      
      // 速度
      velocities[i3] = (Math.random() - 0.5) * 2
      velocities[i3 + 1] = Math.random() * 2 + 1
      velocities[i3 + 2] = (Math.random() - 0.5) * 2
      
      // 顏色 - 金色
      colors[i3] = 1.0     // R
      colors[i3 + 1] = 0.8 // G
      colors[i3 + 2] = 0.2 // B
    }
    
    return [positions, velocities, colors]
  }, [position])

  useFrame((state, delta) => {
    if (!particlesRef.current) return
    
    const elapsed = (Date.now() - startTime.current) / 1000
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    
    // 粒子生命週期 2 秒
    if (elapsed > 2) {
      // 重置粒子
      startTime.current = Date.now()
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positions[i3] = position[0] + (Math.random() - 0.5) * 0.2
        positions[i3 + 1] = position[1] + (Math.random() - 0.5) * 0.2
        positions[i3 + 2] = position[2] + (Math.random() - 0.5) * 0.2
      }
    } else {
      // 更新粒子位置
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positions[i3] += velocities[i3] * delta * intensity
        positions[i3 + 1] += velocities[i3 + 1] * delta * intensity
        positions[i3 + 2] += velocities[i3 + 2] * delta * intensity
        
        // 重力效果
        velocities[i3 + 1] -= 9.8 * delta * 0.1
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
    
    // 透明度隨時間衰減
    const opacity = Math.max(0, 1 - elapsed / 2)
    if (particlesRef.current.material instanceof THREE.PointsMaterial) {
      particlesRef.current.material.opacity = opacity
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={1}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
