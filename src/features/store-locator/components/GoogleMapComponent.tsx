'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { motion } from 'framer-motion'
import { MapComponentProps, Store } from '../types'

/**
 * Google Maps 地圖組件
 * 使用真實的Google Maps API展示門店位置和用戶位置
 */
export function GoogleMapComponent({
  stores,
  userLocation,
  selectedStore,
  onStoreSelect,
  className = '',
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const userMarkerRef = useRef<google.maps.Marker | null>(null)
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Google Maps API 密鑰 - 在生產環境中應該從環境變量獲取
  const API_KEY =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE'

  // 初始化Google Maps
  const initializeMap = useCallback(async () => {
    if (!mapRef.current) return

    try {
      setIsLoading(true)
      setError(null)

      const loader = new Loader({
        apiKey: API_KEY,
        version: 'weekly',
        libraries: ['places', 'geometry'],
      })

      const google = await loader.load()

      // 設置地圖中心點（高雄市中心）
      const mapCenter = selectedStore?.coordinates ||
        userLocation || { lat: 22.6273, lng: 120.3014 } // 高雄市政府

      const map = new google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: selectedStore ? 15 : userLocation ? 13 : 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      })

      mapInstanceRef.current = map

      // 創建InfoWindow
      infoWindowRef.current = new google.maps.InfoWindow()

      setIsLoading(false)
    } catch (err) {
      console.error('Google Maps 初始化失敗:', err)
      setError('地圖載入失敗，請檢查網路連接或稍後再試')
      setIsLoading(false)
    }
  }, [API_KEY, selectedStore, userLocation])

  // 獲取標記圖標
  const getMarkerIcon = useCallback(
    (store: Store) => {
      const color =
        selectedStore?.id === store.id
          ? '#ef4444'
          : store.status === 'active'
            ? '#10b981'
            : store.status === 'maintenance'
              ? '#f59e0b'
              : store.status === 'coming_soon'
                ? '#3b82f6'
                : '#6b7280'

      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2C13.383 2 8 7.383 8 14c0 8.5 12 22 12 22s12-13.5 12-22c0-6.617-5.383-12-12-12z" fill="${color}" stroke="#ffffff" stroke-width="2"/>
        <circle cx="20" cy="14" r="6" fill="#ffffff"/>
        <text x="20" y="18" text-anchor="middle" fill="${color}" font-size="10" font-weight="bold">${store.id}</text>
      </svg>
    `)}`
    },
    [selectedStore],
  )

  // 創建門店標記
  const createStoreMarkers = useCallback(() => {
    if (!mapInstanceRef.current || !window.google) return

    // 清除現有標記
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    stores.forEach((store) => {
      const marker = new google.maps.Marker({
        position: store.coordinates,
        map: mapInstanceRef.current,
        title: store.name,
        icon: {
          url: getMarkerIcon(store),
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 40),
        },
        animation:
          selectedStore?.id === store.id
            ? google.maps.Animation.BOUNCE
            : undefined,
      })

      // 點擊標記事件
      marker.addListener('click', () => {
        onStoreSelect?.(store)
        showStoreInfo(store, marker)
      })

      markersRef.current.push(marker)
    })
  }, [stores, selectedStore, onStoreSelect, getMarkerIcon])

  // 創建用戶位置標記
  const createUserMarker = useCallback(() => {
    if (!mapInstanceRef.current || !userLocation || !window.google) return

    // 清除現有用戶標記
    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null)
    }

    userMarkerRef.current = new google.maps.Marker({
      position: userLocation,
      map: mapInstanceRef.current,
      title: '您的位置',
      icon: {
        url:
          'data:image/svg+xml;charset=UTF-8,' +
          encodeURIComponent(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" fill="#4285F4" stroke="#ffffff" stroke-width="2"/>
            <circle cx="12" cy="12" r="3" fill="#ffffff"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(24, 24),
        anchor: new google.maps.Point(12, 12),
      },
    })
  }, [userLocation])

  // 顯示門店信息
  const showStoreInfo = (store: Store, marker: google.maps.Marker) => {
    if (!infoWindowRef.current) return

    const content = `
      <div class="p-4 max-w-sm">
        <h3 class="font-bold text-lg text-gray-900 mb-2">${store.name}</h3>
        <p class="text-gray-600 mb-2">${store.address}</p>
        <div class="flex items-center gap-2 mb-2">
          <span class="px-2 py-1 text-xs rounded-full ${
            store.status === 'active'
              ? 'bg-green-100 text-green-800'
              : store.status === 'maintenance'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-blue-100 text-blue-800'
          }">
            ${
              store.status === 'active'
                ? '營業中'
                : store.status === 'maintenance'
                  ? '維護中'
                  : '即將開業'
            }
          </span>
          <span class="text-sm text-gray-500">${store.hours}</span>
        </div>
        <div class="flex items-center gap-1 mb-2">
          <span class="text-yellow-400">★</span>
          <span class="text-sm font-medium">${store.rating}</span>
          <span class="text-sm text-gray-500">(${store.productCount} 種商品)</span>
        </div>
        <p class="text-sm text-gray-600 mb-3">${store.description}</p>
        <div class="flex gap-2">
          <a href="tel:${store.phone}" class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
            撥打電話
          </a>
          <a href="https://maps.google.com/maps?daddr=${store.coordinates.lat},${store.coordinates.lng}" 
             target="_blank" 
             class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
            導航
          </a>
        </div>
      </div>
    `

    infoWindowRef.current.setContent(content)
    infoWindowRef.current.open(mapInstanceRef.current, marker)
  }

  // 調整地圖視野以包含所有標記
  const fitMapBounds = useCallback(() => {
    if (!mapInstanceRef.current || !window.google) return

    const bounds = new google.maps.LatLngBounds()

    // 添加門店位置
    stores.forEach((store) => {
      bounds.extend(store.coordinates)
    })

    // 添加用戶位置
    if (userLocation) {
      bounds.extend(userLocation)
    }

    if (!bounds.isEmpty()) {
      mapInstanceRef.current.fitBounds(bounds)

      // 如果只有一個點，設置合適的縮放級別
      if (stores.length === 1 && !userLocation) {
        mapInstanceRef.current.setZoom(15)
      }
    }
  }, [stores, userLocation])

  // 初始化地圖
  useEffect(() => {
    initializeMap()
  }, [initializeMap])

  // 更新標記
  useEffect(() => {
    if (mapInstanceRef.current) {
      createStoreMarkers()
      createUserMarker()

      // 如果有選中的門店，居中顯示
      if (selectedStore) {
        mapInstanceRef.current.setCenter(selectedStore.coordinates)
        mapInstanceRef.current.setZoom(15)
      } else {
        fitMapBounds()
      }
    }
  }, [
    stores,
    userLocation,
    selectedStore,
    createStoreMarkers,
    createUserMarker,
    fitMapBounds,
  ])

  // 清理資源
  useEffect(() => {
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null))
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null)
      }
      if (infoWindowRef.current) {
        infoWindowRef.current.close()
      }
    }
  }, [])

  if (error) {
    return (
      <div
        className={`relative overflow-hidden rounded-xl bg-gray-100 ${className}`}
      >
        <div className="flex aspect-video w-full items-center justify-center">
          <div className="p-8 text-center">
            <div className="mb-4 text-red-500">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              地圖載入失敗
            </h3>
            <p className="mb-4 text-gray-600">{error}</p>
            <button
              onClick={initializeMap}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              重新載入
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gray-100 ${className}`}
    >
      <div
        ref={mapRef}
        className="aspect-video w-full"
        style={{ minHeight: '400px' }}
      />

      {isLoading && (
        <div className="bg-opacity-75 absolute inset-0 flex items-center justify-center bg-white">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="h-8 w-8 rounded-full border-2 border-blue-600 border-t-transparent"
          />
          <span className="ml-3 text-gray-600">載入地圖中...</span>
        </div>
      )}
    </div>
  )
}

// 地圖骨架屏組件
export function GoogleMapSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative animate-pulse overflow-hidden rounded-xl bg-gray-100 ${className}`}
    >
      <div className="aspect-video w-full bg-gray-200" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-gray-400">
          <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
