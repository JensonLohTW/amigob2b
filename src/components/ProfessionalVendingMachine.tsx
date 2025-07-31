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
  Float,
  Center,
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
          <div className="h-20 w-20 rounded-full border-4 border-blue-500/30"></div>
          <div
            className="absolute inset-0 h-20 w-20 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
            style={{ borderTopColor: 'transparent' }}
          ></div>
        </div>
        <div className="space-y-2 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {progress.toFixed(0)}%
          </div>
          <div className="text-sm font-medium text-gray-600">
            正在載入 3D 展示模型
          </div>
          <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Html>
  )
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const modelPath = `${basePath}/models/vending-machine/vending_machine_dog_0724.gltf`

// 增強的販賣機模型組件
function EnhancedVendingMachineModel(props: any) {
  const { scene } = useGLTF(modelPath)
  const meshRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state: any) => {
    if (meshRef.current) {
      // 懸停和點擊效果
      const targetScale = clicked ? 1.1 : hovered ? 1.05 : 1
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.15,
      )
    }
  })

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={1.4}
      rotation={[0, Math.PI * 0.15, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        setClicked(!clicked)
        setTimeout(() => setClicked(false), 200)
      }}
      {...props}
    />
  )
}

// 互動式信息標籤
function InfoHotspot({
  position,
  title,
  description,
  onClick,
}: {
  position: [number, number, number]
  title: string
  description: string
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Html position={position} center>
      <div
        className={`relative transform cursor-pointer transition-all duration-300 ${hovered ? 'scale-110' : 'scale-100'} `}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        {hovered && (
          <div className="absolute h-4 w-4 animate-ping rounded-full bg-blue-500"></div>
        )}
        <div className="h-4 w-4 rounded-full border-2 border-white bg-blue-600 shadow-lg"></div>

        {hovered && (
          <div className="absolute top-0 left-6 z-10 min-w-48 rounded-lg bg-white p-3 shadow-xl">
            <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
            <p className="mt-1 text-xs text-gray-600">{description}</p>
          </div>
        )}
      </div>
    </Html>
  )
}

// 3D 場景組件
function Enhanced3DScene({
  onHotspotClick,
  controlsRef,
}: {
  onHotspotClick: (info: any) => void
  controlsRef: any
}) {
  // 儲存模型的位置和尺寸
  const [modelPosition, setModelPosition] = useState(new THREE.Vector3(0, 0, 0))
  const [modelSize, setModelSize] = useState(new THREE.Vector3(0, 0, 0))

  const centeredRef = useRef(false)
  const handleCentered = ({
    container,
    width,
    height,
    depth,
  }: {
    container: THREE.Group
    width: number
    height: number
    depth: number
  }) => {
    if (centeredRef.current) return
    centeredRef.current = true

    const boundingBox = new THREE.Box3().setFromObject(container)
    setModelSize(new THREE.Vector3(width, height, depth))
    // 將模型向上移動其高度的一半，使其底部接觸 y=0 平面
    setModelPosition(new THREE.Vector3(0, -boundingBox.min.y, 0))
  }

  return (
    <>
      {/* 專業光照設置 */}
      <Environment preset="city" />
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[10, 15, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4F9FFF" />

      {/* 主要模型，穩固放置在地面上 */}
      <Center onCentered={handleCentered} position={modelPosition}>
        <EnhancedVendingMachineModel />
      </Center>

      {/* 增強的地面效果 */}
      <ContactShadows
        position={[0, 0.001, 0]} // 固定在地面，輕微偏移以避免Z-fighting
        opacity={0.75}
        scale={15}
        blur={1.2}
        far={5}
        resolution={512}
        color="#1e293b"
      />
      <gridHelper
        args={[20, 20, '#555', '#bbb']}
        position={[0, 0, 0]}
      />

      {/* 互動式熱點 */}
      {/* 智能觸控面板熱點已移除 */}

      {/* 溫控系統熱點已移除 */}

      {/* AI 監控系統熱點已移除 */}

      {/* 改良版控制器設置 */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.1}
        autoRotate={false} // 預設關閉自動旋轉
        enablePan={true} // 重新啟用平移以便更好地觀察地面
        rotateSpeed={0.6}
        zoomSpeed={0.8}
        minDistance={3}
        maxDistance={15}
        minPolarAngle={0} // 允許從頂部查看
        maxPolarAngle={Math.PI / 2.1} // 防止視角穿到地下
        target={[0, modelSize.y / 2, 0]} // 將目標設置為模型的幾何中心
      />
    </>
  )
}

// 功能展示卡片
function FeatureModal({
  isOpen,
  onClose,
  feature,
}: {
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 transition-colors hover:text-gray-600"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              {feature.features?.map((item: string, index: number) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
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
    <div className="absolute top-4 left-4 z-10 rounded-xl bg-white/90 p-4 shadow-lg backdrop-blur-sm">
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-700">3D 控制</div>
        <div className="space-y-2 text-xs text-gray-600">
          <div>滑鼠拖拽：旋轉視角</div>
          <div>滾輪：縮放</div>
          <div>點擊熱點：查看詳情</div>
        </div>
        <button
          onClick={onReset}
          className="w-full rounded-lg bg-blue-500 px-3 py-2 text-xs text-white transition-colors hover:bg-blue-600"
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
  const controlsRef = useRef<any>(null)
  const idleTimer = useRef<any>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 監聽 OrbitControls 互動，實現 idle auto-rotate
  useEffect(() => {
    if (!controlsRef.current) return
    const controls = controlsRef.current

    const handleStart = () => {
      controls.autoRotate = false
      clearTimeout(idleTimer.current)
    }

    const handleEnd = () => {
      clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => {
        controls.autoRotate = true
      }, 5000) // 5 秒無操作後自動旋轉
    }

    controls.addEventListener('start', handleStart)
    controls.addEventListener('end', handleEnd)

    return () => {
      controls.removeEventListener('start', handleStart)
      controls.removeEventListener('end', handleEnd)
    }
  }, [])

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  if (!isClient) {
    return (
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              AMIGO 智能寵物販賣機
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              專業級 3D 互動展示，探索每個細節和創新技術
            </p>
          </div>

          <div className="relative flex h-[70vh] max-h-[800px] min-h-[500px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50 shadow-2xl">
            <div className="space-y-4 text-center">
              <div className="mx-auto h-20 w-20 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
              <div className="text-xl font-semibold text-blue-600">
                載入 3D 展示中...
              </div>
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
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            AMIGO 智能寵物販賣機
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            專業級 3D 互動展示，探索每個細節和創新技術
          </p>
        </motion.div>

        {/* 3D Canvas 容器 */}
        <div className="relative h-[70vh] max-h-[800px] min-h-[500px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50 shadow-2xl">
          <Canvas
            ref={canvasRef}
            frameloop="always"
            dpr={[1, 2]}
            camera={{ position: [0, 3, 8], fov: 45 }}
            className="h-full w-full"
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
              stencil: false,
              depth: true,
            }}
            onCreated={({ gl }: { gl: THREE.WebGLRenderer }) => {
              gl.setClearColor('#f8fafc', 1)
            }}
          >
            <Suspense fallback={<ModernLoader />}>
              <Enhanced3DScene
                onHotspotClick={setSelectedFeature}
                controlsRef={controlsRef}
              />
            </Suspense>
          </Canvas>

          {/* 控制面板已移除 */}

          {/* 品質標籤已移除 */}
        </div>
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
useGLTF.preload(modelPath)
