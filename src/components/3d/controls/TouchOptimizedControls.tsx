'use client'

import { useRef, useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface TouchOptimizedControlsProps {
  autoRotate?: boolean
  autoRotateSpeed?: number
  enablePan?: boolean
  enableZoom?: boolean
  enableRotate?: boolean
  minDistance?: number
  maxDistance?: number
  minPolarAngle?: number
  maxPolarAngle?: number
}

export function TouchOptimizedControls({
  autoRotate = true,
  autoRotateSpeed = 0.3,
  enablePan = false,
  enableZoom = true,
  enableRotate = true,
  minDistance = 3,
  maxDistance = 10,
  minPolarAngle = Math.PI / 6,
  maxPolarAngle = Math.PI / 1.5
}: TouchOptimizedControlsProps) {
  const controlsRef = useRef<any>()
  const { camera, gl, invalidate } = useThree()
  const [isMobile, setIsMobile] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)

  // 檢測設備類型
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsMobile(mobile || touchDevice)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

    // 移動端特殊優化
    if (isMobile) {
      controls.enablePan = false
      controls.enableDamping = true
      controls.dampingFactor = 0.1
      controls.rotateSpeed = 0.5
      controls.zoomSpeed = 0.8
      controls.touches = {
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN
      }
    } else {
      controls.enablePan = enablePan
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.rotateSpeed = 1.0
      controls.zoomSpeed = 1.0
    }

    // 性能優化：只在控制變化時渲染
    const handleChange = () => {
      invalidate()
    }

    const handleStart = () => {
      setIsInteracting(true)
      controls.autoRotate = false
      // 在交互開始時提高渲染質量
      invalidate()
    }

    const handleEnd = () => {
      setIsInteracting(false)
      // 延遲恢復自動旋轉
      setTimeout(() => {
        if (controls && autoRotate) {
          controls.autoRotate = true
        }
      }, 2000)
    }

    // 添加事件監聽器
    controls.addEventListener('change', handleChange)
    controls.addEventListener('start', handleStart)
    controls.addEventListener('end', handleEnd)
    
    return () => {
      controls.removeEventListener('change', handleChange)
      controls.removeEventListener('start', handleStart)
      controls.removeEventListener('end', handleEnd)
    }
  }, [invalidate, isMobile, enablePan, autoRotate])

  // 手勢識別增強
  useEffect(() => {
    if (!isMobile) return

    let lastTouchDistance = 0
    let lastTouchTime = 0

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        const touch1 = event.touches[0]
        const touch2 = event.touches[1]
        lastTouchDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        )
      }
      lastTouchTime = Date.now()
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        const touch1 = event.touches[0]
        const touch2 = event.touches[1]
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        )
        
        // 縮放手勢檢測
        if (lastTouchDistance > 0) {
          const scale = currentDistance / lastTouchDistance
          if (Math.abs(scale - 1) > 0.1) {
            invalidate()
          }
        }
        lastTouchDistance = currentDistance
      }
    }

    const handleTouchEnd = (event: TouchEvent) => {
      const touchTime = Date.now() - lastTouchTime
      
      // 雙擊檢測
      if (touchTime < 300 && event.changedTouches.length === 1) {
        // 重置相機位置
        if (controlsRef.current) {
          controlsRef.current.reset()
          invalidate()
        }
      }
    }

    const canvas = gl.domElement
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true })
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
    }
  }, [gl.domElement, isMobile, invalidate])

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      autoRotate={autoRotate && !isInteracting}
      autoRotateSpeed={autoRotateSpeed}
      enableDamping
      dampingFactor={isMobile ? 0.1 : 0.05}
      enablePan={isMobile ? false : enablePan}
      enableZoom={enableZoom}
      enableRotate={enableRotate}
      minDistance={minDistance}
      maxDistance={maxDistance}
      minPolarAngle={minPolarAngle}
      maxPolarAngle={maxPolarAngle}
      zoomSpeed={isMobile ? 0.8 : 1.0}
      rotateSpeed={isMobile ? 0.5 : 1.0}
    />
  )
}

// 智能相機預設組件
interface CameraPreset {
  position: [number, number, number]
  target: [number, number, number]
  name: string
  icon: string
}

const CAMERA_PRESETS: CameraPreset[] = [
  { position: [4, 2, 6], target: [0, 0, 0], name: '全景視角', icon: '🌐' },
  { position: [2, 1, 2], target: [0, 0.5, 0], name: '正面視角', icon: '👁️' },
  { position: [-2, 1, 2], target: [0, 0.5, 0], name: '側面視角', icon: '↔️' },
  { position: [0, 4, 0], target: [0, 0, 0], name: '俯視視角', icon: '⬇️' },
]

export function SmartCameraControls() {
  const { camera, controls } = useThree()
  const [isAnimating, setIsAnimating] = useState(false)

  const switchToPreset = async (preset: CameraPreset) => {
    if (isAnimating || !controls) return
    
    setIsAnimating(true)
    
    // 平滑過渡到新位置
    const startPosition = camera.position.clone()
    const endPosition = new THREE.Vector3(...preset.position)
    const startTarget = controls.target.clone()
    const endTarget = new THREE.Vector3(...preset.target)
    
    const duration = 1500 // 1.5秒動畫
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOut cubic
      
      camera.position.lerpVectors(startPosition, endPosition, eased)
      controls.target.lerpVectors(startTarget, endTarget, eased)
      controls.update()
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }
    
    animate()
  }

  return (
    <div className="absolute top-4 right-4 space-y-2 z-10">
      {CAMERA_PRESETS.map((preset, index) => (
        <button
          key={index}
          onClick={() => switchToPreset(preset)}
          disabled={isAnimating}
          className="flex items-center space-x-2 w-full px-3 py-2 text-sm bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{preset.icon}</span>
          <span>{preset.name}</span>
        </button>
      ))}
    </div>
  )
}
