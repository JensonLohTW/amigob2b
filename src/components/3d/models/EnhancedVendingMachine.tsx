'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Float, Html } from '@react-three/drei'
import * as THREE from 'three'
import { tempVector3, tempQuaternion, SpringAnimation, createFloatingAnimation } from '../utils/animations'

interface EnhancedVendingMachineProps {
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  quality?: 'high' | 'medium' | 'low'
}

interface Hotspot {
  position: [number, number, number]
  label: string
  description: string
  icon: string
}

const HOTSPOTS: Hotspot[] = [
  { position: [-1, 1.5, 0], label: "觸控螢幕", description: "直觀操作介面", icon: "📱" },
  { position: [1, 0.5, 0], label: "出貨口", description: "安全取貨設計", icon: "📦" },
  { position: [0, -0.5, 0], label: "儲存倉", description: "大容量設計", icon: "🏪" },
  { position: [0, 2, 0], label: "品牌標識", description: "AMIGO 智能系統", icon: "🐕" },
]

export function EnhancedVendingMachine({ 
  scale = 1.3, 
  position = [0, -1, 0], 
  rotation = [0, Math.PI * 0.1, 0],
  quality = 'high'
}: EnhancedVendingMachineProps) {
  const { scene } = useGLTF('/models/vending-machine/狗狗販賣機_0724.gltf')
  const meshRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)

  // 彈簧動畫系統
  const scaleSpring = useMemo(() => new SpringAnimation(1, 0.15, 0.7), [])
  const rotationSpring = useMemo(() => new SpringAnimation(0, 0.1, 0.8), [])

  // 浮動動畫
  const floatingAnimation = useMemo(() => createFloatingAnimation(0.05, 0.5), [])

  // 根據質量設置優化材質
  const enhancedMaterials = useMemo(() => {
    const materials: { [key: string]: THREE.Material } = {}
    
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const originalMaterial = child.material as THREE.MeshStandardMaterial
        
        // 根據質量級別創建不同的材質
        let enhancedMaterial: THREE.Material

        switch (quality) {
          case 'high':
            enhancedMaterial = new THREE.MeshStandardMaterial({
              map: originalMaterial.map,
              normalMap: originalMaterial.normalMap,
              roughness: 0.3,
              metalness: 0.7,
              envMapIntensity: 1.0,
              // 高質量設置
              transparent: originalMaterial.transparent,
              opacity: originalMaterial.opacity,
            })
            break
          
          case 'medium':
            enhancedMaterial = new THREE.MeshStandardMaterial({
              map: originalMaterial.map,
              roughness: 0.5,
              metalness: 0.5,
              envMapIntensity: 0.7,
            })
            break
          
          case 'low':
            enhancedMaterial = new THREE.MeshBasicMaterial({
              map: originalMaterial.map,
            })
            break
        }
        
        materials[child.name] = enhancedMaterial
        child.material = enhancedMaterial
      }
    })
    
    return materials
  }, [scene, quality])

  // 處理交互事件
  const handlePointerOver = () => {
    setHovered(true)
    scaleSpring.setTarget(1.05)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHovered(false)
    scaleSpring.setTarget(1)
    document.body.style.cursor = 'default'
  }

  const handlePointerDown = () => {
    setClicked(true)
    scaleSpring.setTarget(0.95)
    rotationSpring.setTarget(0.1)
  }

  const handlePointerUp = () => {
    setClicked(false)
    scaleSpring.setTarget(hovered ? 1.05 : 1)
    rotationSpring.setTarget(0)
  }

  // 動畫循環
  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    
    // 浮動動畫
    const floatY = floatingAnimation(time)
    tempVector3.set(position[0], position[1] + floatY, position[2])
    meshRef.current.position.lerp(tempVector3, 0.1)
    
    // 彈簧動畫更新
    const currentScale = scaleSpring.update(delta)
    meshRef.current.scale.setScalar(currentScale * scale)
    
    const currentRotation = rotationSpring.update(delta)
    tempQuaternion.setFromEuler(new THREE.Euler(rotation[0], rotation[1] + currentRotation, rotation[2]))
    meshRef.current.quaternion.slerp(tempQuaternion, 0.1)
  })

  return (
    <group>
      {/* 主要模型 */}
      <primitive
        ref={meshRef}
        object={scene}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      />
      
      {/* 互動熱點 */}
      {HOTSPOTS.map((hotspot, index) => (
        <group key={index} position={hotspot.position}>
          <Float speed={3} rotationIntensity={0.2} floatIntensity={0.3}>
            <mesh
              onPointerOver={() => setActiveHotspot(hotspot.label)}
              onPointerOut={() => setActiveHotspot(null)}
            >
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial 
                color={activeHotspot === hotspot.label ? "#fbbf24" : "#3b82f6"}
                emissive={activeHotspot === hotspot.label ? "#f59e0b" : "#1d4ed8"}
                emissiveIntensity={0.3}
                transparent
                opacity={0.8}
              />
            </mesh>
          </Float>
          
          {/* 熱點信息 */}
          {activeHotspot === hotspot.label && (
            <Html position={[0, 0.3, 0]} center>
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-blue-200 min-w-[200px]">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">{hotspot.icon}</span>
                  <span className="font-semibold text-blue-900">{hotspot.label}</span>
                </div>
                <div className="text-sm text-gray-600">{hotspot.description}</div>
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  )
}

// 預載入模型
useGLTF.preload('/models/vending-machine/狗狗販賣機_0724.gltf')
