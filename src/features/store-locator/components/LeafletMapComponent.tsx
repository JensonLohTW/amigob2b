'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Plus, Minus, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapComponentProps, Store } from '../types'

// 動態導入Leaflet以避免SSR問題
let L: any = null
if (typeof window !== 'undefined') {
  import('leaflet').then((leaflet) => {
    L = leaflet.default
    // 修復Leaflet圖標路徑問題
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })
  })
}

/**
 * 基於Leaflet.js和OpenStreetMap的地圖組件
 * 完全免費，無需API密鑰
 */
export function LeafletMapComponent({
  stores,
  userLocation,
  selectedStore,
  onStoreSelect,
  className = '',
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const userMarkerRef = useRef<any>(null)
  const [isMapReady, setIsMapReady] = useState(false)

  // 初始化地圖
  useEffect(() => {
    if (!mapRef.current || !L || mapInstanceRef.current) return

    // 創建地圖實例
    const map = L.map(mapRef.current, {
      center: [25.033, 121.5654], // 台北市中心
      zoom: 12,
      zoomControl: false, // 我們會自定義縮放控制
    })

    // 添加OpenStreetMap圖層
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    mapInstanceRef.current = map
    setIsMapReady(true)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // 創建自定義門店圖標
  const createStoreIcon = (store: Store, isSelected: boolean) => {
    if (!L) return null

    const color = isSelected 
      ? '#ef4444' // 紅色 - 選中狀態
      : store.status === 'active' 
        ? '#10b981' // 綠色 - 營業中
        : store.status === 'maintenance'
          ? '#f59e0b' // 黃色 - 維護中
          : '#3b82f6' // 藍色 - 即將開業

    const size = isSelected ? 40 : 30

    return L.divIcon({
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background-color: ${color};
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: ${isSelected ? '14px' : '12px'};
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transform: translate(-50%, -50%);
        ">
          ${store.id}
        </div>
      `,
      className: 'custom-store-marker',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    })
  }

  // 創建用戶位置圖標
  const createUserIcon = () => {
    if (!L) return null

    return L.divIcon({
      html: `
        <div style="
          width: 20px;
          height: 20px;
          background-color: #3b82f6;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transform: translate(-50%, -50%);
          animation: pulse 2s infinite;
        "></div>
        <style>
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
            100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
          }
        </style>
      `,
      className: 'custom-user-marker',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    })
  }

  // 更新門店標記
  useEffect(() => {
    if (!mapInstanceRef.current || !L || !isMapReady) return

    // 清除現有標記
    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker)
    })
    markersRef.current = []

    // 添加門店標記
    stores.forEach(store => {
      const isSelected = selectedStore?.id === store.id
      const icon = createStoreIcon(store, isSelected)
      
      if (icon) {
        const marker = L.marker([store.coordinates.lat, store.coordinates.lng], { icon })
          .addTo(mapInstanceRef.current)
          .on('click', () => {
            onStoreSelect?.(store)
          })

        // 添加彈出窗口
        const popupContent = `
          <div class="p-2">
            <h3 class="font-semibold text-neutral-900 mb-1">${store.name}</h3>
            <p class="text-sm text-neutral-600 mb-2">${store.address}</p>
            <div class="flex items-center justify-between text-xs">
              <span class="px-2 py-1 rounded-full ${
                store.status === 'active' 
                  ? 'bg-green-100 text-green-800'
                  : store.status === 'maintenance'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
              }">
                ${store.status === 'active' ? '營業中' : store.status === 'maintenance' ? '維護中' : '即將開業'}
              </span>
              <span class="text-neutral-500">⭐ ${store.rating}</span>
            </div>
          </div>
        `
        
        marker.bindPopup(popupContent)
        markersRef.current.push(marker)
      }
    })
  }, [stores, selectedStore, isMapReady, onStoreSelect])

  // 更新用戶位置標記
  useEffect(() => {
    if (!mapInstanceRef.current || !L || !isMapReady) return

    // 清除現有用戶標記
    if (userMarkerRef.current) {
      mapInstanceRef.current.removeLayer(userMarkerRef.current)
      userMarkerRef.current = null
    }

    // 添加用戶位置標記
    if (userLocation) {
      const icon = createUserIcon()
      if (icon) {
        userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon })
          .addTo(mapInstanceRef.current)
          .bindPopup('<div class="p-2"><strong>您的位置</strong></div>')
      }
    }
  }, [userLocation, isMapReady])

  // 當選中門店變化時，調整地圖視圖
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapReady) return

    if (selectedStore) {
      mapInstanceRef.current.setView([selectedStore.coordinates.lat, selectedStore.coordinates.lng], 15, {
        animate: true,
        duration: 1
      })
    } else if (userLocation) {
      mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 13, {
        animate: true,
        duration: 1
      })
    }
  }, [selectedStore, userLocation, isMapReady])

  // 地圖控制函數
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn()
    }
  }

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut()
    }
  }

  const handleRecenter = () => {
    if (!mapInstanceRef.current) return

    if (selectedStore) {
      mapInstanceRef.current.setView([selectedStore.coordinates.lat, selectedStore.coordinates.lng], 15)
    } else if (userLocation) {
      mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 13)
    } else {
      mapInstanceRef.current.setView([25.033, 121.5654], 12)
    }
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />

      {/* 地圖容器 - 統一使用aspect-video比例 */}
      <div ref={mapRef} className="w-full aspect-video min-h-[360px] max-h-[480px]" />

      {/* 自定義控制按鈕 - 調整位置避免與容器邊界衝突 */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-[1000]">
        <Button
          onClick={handleZoomIn}
          variant="secondary"
          size="icon"
          className="h-9 w-9 bg-white/90 backdrop-blur-sm border border-neutral-200 hover:bg-white shadow-md"
        >
          <Plus className="h-4 w-4 text-neutral-700" />
        </Button>

        <Button
          onClick={handleZoomOut}
          variant="secondary"
          size="icon"
          className="h-9 w-9 bg-white/90 backdrop-blur-sm border border-neutral-200 hover:bg-white shadow-md"
        >
          <Minus className="h-4 w-4 text-neutral-700" />
        </Button>

        <Button
          onClick={handleRecenter}
          variant="secondary"
          size="icon"
          className="h-9 w-9 bg-white/90 backdrop-blur-sm border border-neutral-200 hover:bg-white shadow-md"
        >
          <Navigation className="h-4 w-4 text-neutral-700" />
        </Button>
      </div>

      {/* 地圖圖例 - 調整位置和樣式 */}
      <Card className="absolute bottom-3 left-3 z-[1000] border-neutral-200 bg-white/90 backdrop-blur-sm shadow-md">
        <CardContent className="p-2.5">
          <div className="mb-1.5 text-xs font-semibold text-neutral-900">圖例</div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
              <span className="text-xs text-neutral-600">營業中</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
              <span className="text-xs text-neutral-600">維護中</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
              <span className="text-xs text-neutral-600">即將開業</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
              <span className="text-xs text-neutral-600">已選中</span>
            </div>
            {userLocation && (
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse"></div>
                <span className="text-xs text-neutral-600">我的位置</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 載入提示 */}
      {!isMapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 rounded-lg z-[1000]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900 mx-auto mb-2"></div>
            <div className="text-sm text-neutral-600">載入地圖中...</div>
          </div>
        </div>
      )}
    </div>
  )
}
