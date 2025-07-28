'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef, useState, useEffect } from 'react'
import { 
  OrbitControls, 
  Environment, 
  useGLTF, 
  Html, 
  useProgress,
  ContactShadows
} from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// 專業載入組件
function ProfessionalLoader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-4 p-6">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-xl font-semibold text-blue-600">
          載入中... {progress.toFixed(0)}%
        </div>
        <div className="text-sm text-gray-600">正在準備您的專業 3D 展示</div>
      </div>
    </Html>
  )
}

// 專業販賣機模型組件
function ProfessionalVendingMachineModel(props: any) {
  const { scene } = useGLTF('/models/vending-machine/狗狗販賣機_0724.gltf')
  const meshRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  // 專業的微妙動畫
  useFrame((state: any) => {
    if (meshRef.current) {
      // 非常輕微的浮動效果
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02
      
      // 懸停時的輕微縮放
      const targetScale = hovered ? 1.02 : 1
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale), 
        0.1
      )
    }
  })

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={1.2}
      position={[0, -1, 0]}
      rotation={[0, Math.PI * 0.1, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      {...props}
    />
  )
}

// 相機預設控制組件（在 Canvas 內部）
function CameraControls() {
  const [currentPreset, setCurrentPreset] = useState('全景視角')
  
  const presets = [
    { name: '全景視角', position: [4, 2, 6] as [number, number, number] },
    { name: '正面視角', position: [0, 1, 4] as [number, number, number] },
    { name: '側面視角', position: [4, 1, 0] as [number, number, number] },
    { name: '俯視視角', position: [0, 5, 0] as [number, number, number] },
  ]

  return (
    <Html position={[3, 3, 0]} transform occlude>
      <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200 min-w-[160px]">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">視角選擇</h3>
        <div className="space-y-1">
          {presets.map((preset, index) => (
            <button
              key={index}
              onClick={() => setCurrentPreset(preset.name)}
              className={`w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                currentPreset === preset.name 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </Html>
  )
}

// 產品信息熱點組件
function ProductHotspots() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)
  
  const hotspots = [
    { 
      position: [-0.8, 1.2, 0.5] as [number, number, number], 
      label: "智能觸控螢幕", 
      description: "7吋高清觸控螢幕，支援多語言操作介面",
      specs: "解析度: 1024x600 | 觸控: 電容式多點觸控"
    },
    { 
      position: [0.8, 0.3, 0.5] as [number, number, number], 
      label: "安全出貨口", 
      description: "防盜設計，確保產品安全取出",
      specs: "材質: 304不鏽鋼 | 感應: 紅外線檢測"
    },
    { 
      position: [0, -0.3, 0.5] as [number, number, number], 
      label: "大容量儲存", 
      description: "可容納120份寵物鮮食，智能溫控保鮮",
      specs: "容量: 120份 | 溫度: 2-8°C | 濕度控制: 45-65%"
    },
  ]

  return (
    <>
      {hotspots.map((hotspot, index) => (
        <group key={index} position={hotspot.position}>
          <mesh
            onPointerOver={() => setActiveHotspot(hotspot.label)}
            onPointerOut={() => setActiveHotspot(null)}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial 
              color={activeHotspot === hotspot.label ? "#3b82f6" : "#6b7280"}
              emissive={activeHotspot === hotspot.label ? "#1d4ed8" : "#374151"}
              emissiveIntensity={0.2}
            />
          </mesh>
          
          {activeHotspot === hotspot.label && (
            <Html position={[0, 0.2, 0]} center>
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-gray-200 max-w-xs">
                <div className="font-semibold text-gray-900 mb-1">{hotspot.label}</div>
                <div className="text-sm text-gray-600 mb-2">{hotspot.description}</div>
                <div className="text-xs text-gray-500 border-t pt-2">{hotspot.specs}</div>
              </div>
            </Html>
          )}
        </group>
      ))}
    </>
  )
}

// 主要 3D 場景組件
function VendingMachineScene() {
  return (
    <>
      {/* 專業光照設置 */}
      <Environment preset="studio" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.7} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.2} />
      
      {/* 主要模型 */}
      <ProfessionalVendingMachineModel />
      
      {/* 產品信息熱點 */}
      <ProductHotspots />
      
      {/* 相機控制 */}
      <CameraControls />
      
      {/* 地面陰影 */}
      <ContactShadows 
        position={[0, -2, 0]} 
        opacity={0.3} 
        scale={8} 
        blur={1.5} 
        far={4} 
      />
      
      {/* 專業控制器 */}
      <OrbitControls 
        autoRotate
        autoRotateSpeed={0.2}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 4}
        minDistance={3}
        maxDistance={8}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

export default function ProfessionalVendingMachine() {
  const [showInstructions, setShowInstructions] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const timer = setTimeout(() => setShowInstructions(false), 8000)
    return () => clearTimeout(timer)
  }, [])

  if (!isClient) {
    return (
      <div className="relative mt-24 sm:mt-32 lg:mt-40">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AMIGO 智能寵物販賣機
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            專業級 3D 產品展示，了解每個細節和技術規格
          </p>
        </div>
        
        <div className="w-full h-[600px] rounded-xl shadow-2xl bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-lg font-medium text-blue-600">載入專業 3D 展示中...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative mt-24 sm:mt-32 lg:mt-40">
      {/* 標題區塊 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          AMIGO 智能寵物販賣機
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          專業級 3D 產品展示，了解每個細節和技術規格
        </p>
      </motion.div>

      {/* 3D Canvas */}
      <div className="relative">
        <Canvas
          frameloop="always"
          dpr={[1, 2]}
          camera={{ position: [4, 2, 6], fov: 50 }}
          className="w-full h-[600px] rounded-xl shadow-2xl bg-gradient-to-b from-gray-50 to-gray-100"
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <Suspense fallback={<ProfessionalLoader />}>
            <VendingMachineScene />
          </Suspense>
        </Canvas>

        {/* 操作指南 */}
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs z-10 border border-gray-200"
          >
            <h3 className="font-semibold text-gray-900 mb-2">💼 專業展示</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 拖拽旋轉查看各角度</li>
              <li>• 滾輪縮放調整距離</li>
              <li>• 點擊灰色圓點查看規格</li>
              <li>• 自動旋轉展示產品細節</li>
            </ul>
            <button 
              onClick={() => setShowInstructions(false)}
              className="mt-3 text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              我知道了 ×
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// 預載入模型
useGLTF.preload('/models/vending-machine/狗狗販賣機_0724.gltf')
