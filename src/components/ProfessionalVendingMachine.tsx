'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef, useState, useEffect } from 'react'
import {
  OrbitControls,
  Environment,
  useGLTF,
  Html,
  useProgress,
  ContactShadows,
  Text,
  Float
} from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

// 現代化載入組件
function ModernLoader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-6 p-8">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-500/30 rounded-full"></div>
          <div 
            className="absolute inset-0 w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            style={{ borderTopColor: 'transparent' }}
          ></div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold text-blue-600">
            {progress.toFixed(0)}%
          </div>
          <div className="text-sm text-gray-600 font-medium">
            正在載入 3D 展示模型
          </div>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Html>
  )
}

// 增強的販賣機模型組件
function EnhancedVendingMachineModel(props: any) {
  const { scene } = useGLTF('/models/vending-machine/狗狗販賣機_0724.gltf')
  const meshRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state: any) => {
    if (meshRef.current) {
      // 更自然的浮動動畫
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      
      // 懸停和點擊效果
      const targetScale = clicked ? 1.1 : hovered ? 1.05 : 1
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale), 
        0.15
      )
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.5}>
      <primitive
        ref={meshRef}
        object={scene}
        scale={1.4}
        position={[0, -1.2, 0]}
        rotation={[0, Math.PI * 0.15, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => {
          setClicked(!clicked)
          setTimeout(() => setClicked(false), 200)
        }}
        {...props}
      />
    </Float>
  )
}

// 互動式信息標籤
function InfoHotspot({ position, title, description, onClick }: {
  position: [number, number, number]
  title: string
  description: string
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Html position={position} center>
      <div 
        className={`
          relative cursor-pointer transition-all duration-300 transform
          ${hovered ? 'scale-110' : 'scale-100'}
        `}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping absolute"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
        
        {hovered && (
          <div className="absolute left-6 top-0 bg-white p-3 rounded-lg shadow-xl min-w-48 z-10">
            <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
            <p className="text-xs text-gray-600 mt-1">{description}</p>
          </div>
        )}
      </div>
    </Html>
  )
}

// 3D 場景組件
function Enhanced3DScene({ onHotspotClick }: { onHotspotClick: (info: any) => void }) {
  return (
    <>
      {/* 專業光照設置 */}
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#4F9FFF" />

      {/* 主要模型 */}
      <EnhancedVendingMachineModel />

      {/* 增強的地面效果 */}
      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.4}
        scale={12}
        blur={2}
        far={4}
        color="#1e293b"
      />

      {/* 互動式熱點 */}
      <InfoHotspot 
        position={[1.5, 0.5, 0]}
        title="智能觸控面板"
        description="7吋高清觸控螢幕，支援多語言介面"
        onClick={() => onHotspotClick({
          title: "智能觸控面板",
          features: ["7吋 IPS 高清螢幕", "多點觸控技術", "防刮防水設計", "多語言支援", "無障礙操作介面"]
        })}
      />
      
      <InfoHotspot 
        position={[-1.2, -0.5, 0]}
        title="溫控系統"
        description="智能溫控，確保食品新鮮"
        onClick={() => onHotspotClick({
          title: "智能溫控系統",
          features: ["±1°C 精準控溫", "6層獨立溫控", "節能變頻技術", "溫度異常警報", "自動除霜功能"]
        })}
      />

      <InfoHotspot 
        position={[0, 1.8, 0]}
        title="AI 監控系統"
        description="24小時智能監控管理"
        onClick={() => onHotspotClick({
          title: "AI 智能監控",
          features: ["HD 攝影機監控", "異常行為檢測", "庫存自動統計", "遠程實時監控", "數據分析報告"]
        })}
      />

             {/* 高級控制器設置 */}
       <OrbitControls
         autoRotate={false}
         enablePan={false}
         maxPolarAngle={Math.PI / 1.4}
         minPolarAngle={Math.PI / 6}
         minDistance={4}
         maxDistance={12}
         enableDamping
         dampingFactor={0.08}
         rotateSpeed={0.5}
         zoomSpeed={0.8}
       />
    </>
  )
}

// 功能展示卡片
function FeatureModal({ isOpen, onClose, feature }: {
  isOpen: boolean
  onClose: () => void
  feature: any
}) {
  return (
    <AnimatePresence>
      {isOpen && feature && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3">
              {feature.features?.map((item: string, index: number) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// 控制面板
function ControlPanel({ onReset }: { onReset: () => void }) {
  return (
    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-700">3D 控制</div>
        <div className="space-y-2 text-xs text-gray-600">
          <div>🖱️ 滑鼠拖拽：旋轉視角</div>
          <div>🔍 滾輪：縮放</div>
          <div>📍 點擊熱點：查看詳情</div>
        </div>
        <button
          onClick={onReset}
          className="w-full px-3 py-2 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
        >
          重置視角
        </button>
      </div>
    </div>
  )
}

export default function ProfessionalVendingMachine() {
  const [isClient, setIsClient] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<any>(null)
  const canvasRef = useRef<any>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleReset = () => {
    if (canvasRef.current) {
      // 重置相機位置的邏輯
      console.log('重置相機視角')
    }
  }

  if (!isClient) {
    return (
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AMIGO 智能寵物販賣機
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              專業級 3D 互動展示，探索每個細節和創新技術
            </p>
          </div>
          
          <div className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] rounded-2xl shadow-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center overflow-hidden">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="text-xl font-semibold text-blue-600">載入 3D 展示中...</div>
              <div className="text-sm text-gray-500">準備您的專業體驗</div>
            </div>
          </div>
        </FadeIn>
      </Container>
    )
  }

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        {/* 標題區塊 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AMIGO 智能寵物販賣機
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            專業級 3D 互動展示，探索每個細節和創新技術
          </p>
                     <div className="mt-6 flex justify-center space-x-4 text-sm text-gray-500">
             <span className="flex items-center">
               <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
               點擊藍色標籤查看詳情
             </span>
             <span className="flex items-center">
               <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
               拖拽旋轉視角
             </span>
           </div>
        </motion.div>

        {/* 3D Canvas 容器 */}
        <div className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] rounded-2xl shadow-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
          <Canvas
            ref={canvasRef}
            frameloop="always"
            dpr={[1, 2]}
            camera={{ position: [5, 3, 8], fov: 45 }}
            className="w-full h-full"
            gl={{ 
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              stencil: false,
              depth: true
            }}
                         onCreated={({ gl }: { gl: THREE.WebGLRenderer }) => {
               gl.setClearColor('#f8fafc', 1)
             }}
          >
            <Suspense fallback={<ModernLoader />}>
              <Enhanced3DScene onHotspotClick={setSelectedFeature} />
            </Suspense>
          </Canvas>

          {/* 控制面板 */}
          <ControlPanel onReset={handleReset} />

          {/* 品質標籤 */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">高品質 3D 展示</span>
            </div>
          </div>
        </div>

        {/* 技術亮點 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
                     {[
             { icon: "🎯", title: "互動式探索", description: "點擊藍色標籤深入了解各項功能" },
             { icon: "🔄", title: "手動旋轉", description: "拖拽滑鼠，從各個角度檢視產品" },
             { icon: "📱", title: "響應式設計", description: "支援各種裝置，完美適配螢幕" }
           ].map((item, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </FadeIn>

      {/* 功能詳情彈窗 */}
      <FeatureModal 
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        feature={selectedFeature}
      />
    </Container>
  )
}

// 預載入模型
useGLTF.preload('/models/vending-machine/狗狗販賣機_0724.gltf')
