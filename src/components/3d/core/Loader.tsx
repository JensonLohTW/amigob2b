'use client'

import { Html, useProgress } from '@react-three/drei'
import { motion } from 'framer-motion'

export function Enhanced3DLoader() {
  const { progress, loaded, total } = useProgress()
  
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-6 p-8">
        {/* 3D 載入動畫 */}
        <div className="relative">
          <motion.div
            className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 w-16 h-16 border-4 border-blue-300 border-b-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-4 w-12 h-12 border-4 border-blue-200 border-l-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* 進度信息 */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-semibold text-blue-600"
          >
            載入 3D 模型中...
          </motion.div>
          
          <div className="text-lg text-blue-500 font-mono">
            {progress.toFixed(0)}%
          </div>
          
          <div className="text-sm text-gray-600">
            已載入 {loaded} / {total} 個資源
          </div>
          
          {/* 進度條 */}
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          
          {/* 載入提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-gray-500 max-w-xs"
          >
            正在準備您的專屬 3D 販賣機體驗
          </motion.div>
        </div>

        {/* 載入階段指示 */}
        <div className="flex space-x-2">
          {['模型', '材質', '動畫'].map((stage, index) => (
            <motion.div
              key={stage}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                progress > (index + 1) * 33 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ 
                scale: progress > (index + 1) * 33 ? 1 : 0.8,
                opacity: progress > (index + 1) * 33 ? 1 : 0.5
              }}
              transition={{ duration: 0.3 }}
            >
              {stage}
            </motion.div>
          ))}
        </div>
      </div>
    </Html>
  )
}

// 簡化版載入器（用於低性能設備）
export function Simple3DLoader() {
  const { progress } = useProgress()
  
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-4 p-6">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <div className="text-lg font-medium text-blue-600">
          載入中... {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  )
}

// 錯誤載入組件
export function LoadingError({ error, retry }: { error: string; retry?: () => void }) {
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-4 p-6 bg-red-50 rounded-lg border border-red-200">
        <div className="text-4xl">⚠️</div>
        <div className="text-lg font-semibold text-red-600">載入失敗</div>
        <div className="text-sm text-red-500 text-center max-w-xs">
          {error}
        </div>
        {retry && (
          <button
            onClick={retry}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            重新載入
          </button>
        )}
      </div>
    </Html>
  )
}
