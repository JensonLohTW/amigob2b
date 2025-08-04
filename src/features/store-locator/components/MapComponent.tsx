'use client'

// 暫時使用模擬地圖組件，避免 Google Maps API 金鑰錯誤
// export { GoogleMapComponent as MapComponent, GoogleMapSkeleton as MapSkeleton } from './GoogleMapComponent'

// 使用模擬地圖組件作為主要組件
export { MockMapComponent as MapComponent, MockMapSkeleton as MapSkeleton }

// 保留原有的模擬地圖組件作為備用
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapComponentProps, Store } from '../types'

/**
 * 模擬地圖組件（備用）
 * 展示門店位置和用戶位置的模擬版本
 */
export function MockMapComponent({
  stores,
  userLocation,
  selectedStore,
  onStoreSelect,
  className = '',
}: MapComponentProps) {
  const [mapCenter, setMapCenter] = useState({ lat: 25.033, lng: 121.5654 }) // 默认台北
  const [zoomLevel, setZoomLevel] = useState(12)

  // 当选中门店变化时，更新地图中心
  useEffect(() => {
    if (selectedStore) {
      setMapCenter(selectedStore.coordinates)
      setZoomLevel(15)
    } else if (userLocation) {
      setMapCenter(userLocation)
      setZoomLevel(13)
    }
  }, [selectedStore, userLocation])

  const getMarkerColor = (store: Store) => {
    if (selectedStore && selectedStore.id === store.id) {
      return '#ef4444' // 红色 - 选中状态
    }
    switch (store.status) {
      case 'active':
        return '#10b981' // 绿色 - 营业中
      case 'maintenance':
        return '#f59e0b' // 黄色 - 维护中
      case 'coming_soon':
        return '#3b82f6' // 蓝色 - 即将开业
      default:
        return '#6b7280' // 灰色 - 未知状态
    }
  }

  const handleMarkerClick = (store: Store) => {
    onStoreSelect?.(store)
    setMapCenter(store.coordinates)
    setZoomLevel(15)
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 1, 18))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 1, 8))
  }

  const handleRecenter = () => {
    if (selectedStore) {
      setMapCenter(selectedStore.coordinates)
      setZoomLevel(15)
    } else if (userLocation) {
      setMapCenter(userLocation)
      setZoomLevel(13)
    } else {
      setMapCenter({ lat: 25.033, lng: 121.5654 })
      setZoomLevel(12)
    }
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gray-100 ${className}`}
    >
      {/* 地图占位符 */}
      <div className="relative aspect-video w-full bg-gradient-to-br from-blue-100 to-green-100">
        {/* 地图背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-100 to-yellow-100 opacity-50" />

        {/* 网格线 */}
        <svg
          className="absolute inset-0 h-full w-full opacity-20"
          suppressHydrationWarning={true}
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#374151"
                strokeWidth="1"
                suppressHydrationWarning={true}
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid)"
            suppressHydrationWarning={true}
          />
        </svg>

        {/* 门店标记 */}
        {stores.map((store, index) => {
          // 简化的坐标转换（实际应用中需要使用真实的地图投影）
          const x = ((store.coordinates.lng - 120) * 200) % 100
          const y = ((25.5 - store.coordinates.lat) * 200) % 100

          return (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
              style={{
                left: `${20 + x * 0.6}%`,
                top: `${20 + y * 0.6}%`,
              }}
              onClick={() => handleMarkerClick(store)}
            >
              {/* 门店标记 */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-lg transition-all duration-300 hover:scale-110 ${
                  selectedStore && selectedStore.id === store.id
                    ? 'z-20 h-10 w-10'
                    : 'z-10'
                }`}
                style={{ backgroundColor: getMarkerColor(store) }}
                suppressHydrationWarning={true}
              >
                {store.id}
              </div>

              {/* 门店信息气泡 */}
              {selectedStore && selectedStore.id === store.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-full left-1/2 z-30 mb-2 min-w-48 -translate-x-1/2 transform rounded-lg bg-white p-3 shadow-lg"
                >
                  <div className="mb-1 text-sm font-semibold text-gray-900">
                    {store.name}
                  </div>
                  <div className="mb-2 text-xs text-gray-600">
                    {store.address}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`rounded-full px-2 py-1 ${
                        store.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : store.status === 'maintenance'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {store.status === 'active'
                        ? '营业中'
                        : store.status === 'maintenance'
                          ? '维护中'
                          : '即将开业'}
                    </span>
                    <span className="text-gray-500">⭐ {store.rating}</span>
                  </div>

                  {/* 气泡箭头 */}
                  <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-4 border-r-4 border-l-4 border-transparent border-t-white"></div>
                </motion.div>
              )}
            </motion.div>
          )
        })}

        {/* 用户位置标记 */}
        {userLocation && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transform"
            style={{
              left: `${20 + (((userLocation.lng - 120) * 200) % 100) * 0.6}%`,
              top: `${20 + (((25.5 - userLocation.lat) * 200) % 100) * 0.6}%`,
            }}
          >
            <div className="h-4 w-4 animate-pulse rounded-full border-2 border-white bg-blue-600 shadow-lg">
              <div className="absolute -top-2 -left-2 h-8 w-8 animate-ping rounded-full bg-blue-600 opacity-25"></div>
            </div>
          </motion.div>
        )}

        {/* 地图控制按钮 */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-700 shadow-md transition-colors hover:bg-gray-50"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              suppressHydrationWarning={true}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>

          <button
            onClick={handleZoomOut}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-700 shadow-md transition-colors hover:bg-gray-50"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              suppressHydrationWarning={true}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 12H6"
              />
            </svg>
          </button>

          <button
            onClick={handleRecenter}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-700 shadow-md transition-colors hover:bg-gray-50"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              suppressHydrationWarning={true}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>

        {/* 地图图例 */}
        <div className="absolute bottom-4 left-4 rounded-lg bg-white p-3 shadow-md">
          <div className="mb-2 text-xs font-semibold text-gray-900">图例</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-600">营业中</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs text-gray-600">维护中</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-600">即将开业</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-600">已选中</span>
            </div>
            {userLocation && (
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 animate-pulse rounded-full bg-blue-600"></div>
                <span className="text-xs text-gray-600">我的位置</span>
              </div>
            )}
          </div>
        </div>

        {/* 缩放级别显示 */}
        <div className="absolute right-4 bottom-4 rounded-lg bg-white px-3 py-1 shadow-md">
          <span className="text-xs text-gray-600">缩放: {zoomLevel}</span>
        </div>
      </div>

      {/* 地图加载提示 */}
      <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
        <div className="text-center">
          <div className="mb-2 text-lg font-semibold">地图预览</div>
          <div className="text-sm opacity-75">
            这是一个地图占位符，实际应用中会集成真实的地图服务
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 模擬地圖加載骨架屏
 */
export function MockMapSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`aspect-video w-full animate-pulse rounded-xl bg-gray-200 ${className}`}
    >
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-400">
          <svg
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            suppressHydrationWarning={true}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
