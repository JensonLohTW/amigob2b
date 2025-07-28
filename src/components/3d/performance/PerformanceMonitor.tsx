'use client'

import { useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'

interface AdaptiveQualityProps {
  children: React.ReactNode
  onQualityChange?: (quality: 'high' | 'medium' | 'low') => void
}

export function AdaptiveQuality({ children, onQualityChange }: AdaptiveQualityProps) {
  const [dpr, setDpr] = useState(1.5)
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high')
  const setPixelRatio = useThree((state) => state.setDpr)

  useEffect(() => {
    // 限制最大 DPR 以避免性能問題
    const maxDpr = Math.min(window.devicePixelRatio * dpr, 2)
    setPixelRatio(maxDpr)
  }, [dpr, setPixelRatio])

  useEffect(() => {
    onQualityChange?.(quality)
  }, [quality, onQualityChange])

  const handleIncline = () => {
    setDpr(2)
    setQuality('high')
    console.log('Performance improved - switching to high quality')
  }

  const handleDecline = () => {
    setDpr(1)
    setQuality('medium')
    console.log('Performance declined - switching to medium quality')
  }

  const handleFallback = () => {
    setDpr(0.5)
    setQuality('low')
    console.log('Performance critical - switching to low quality')
  }

  return (
    <PerformanceMonitor
      onIncline={handleIncline}
      onDecline={handleDecline}
      onFallback={handleFallback}
      flipflops={3}
    >
      {children}
    </PerformanceMonitor>
  )
}

// 自適應像素比組件
export function AdaptivePixelRatio() {
  const current = useThree((state) => state.performance.current)
  const setPixelRatio = useThree((state) => state.setDpr)
  
  useEffect(() => {
    const adaptiveDpr = window.devicePixelRatio * current
    setPixelRatio(Math.min(adaptiveDpr, 2))
  }, [current, setPixelRatio])
  
  return null
}

// 性能統計組件
export function PerformanceStats() {
  const [stats, setStats] = useState({
    fps: 0,
    memory: 0,
    drawCalls: 0
  })

  const gl = useThree((state) => state.gl)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()

    const updateStats = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        const memory = (performance as any).memory?.usedJSHeapSize || 0
        const drawCalls = gl.info.render.calls

        setStats({
          fps,
          memory: Math.round(memory / 1024 / 1024),
          drawCalls
        })

        frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(updateStats)
    }

    updateStats()
  }, [gl])

  return (
    <div className="absolute top-4 left-4 bg-black/70 text-white p-2 rounded text-xs font-mono">
      <div>FPS: {stats.fps}</div>
      <div>Memory: {stats.memory}MB</div>
      <div>Draw Calls: {stats.drawCalls}</div>
    </div>
  )
}
