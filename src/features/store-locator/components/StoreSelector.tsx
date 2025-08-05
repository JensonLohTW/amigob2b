'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock, Phone, Star, ChevronDown, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Store } from '../types'

interface StoreSelectorProps {
  stores: Store[]
  selectedStore?: Store | null
  onStoreSelect: (store: Store) => void
  userLocation?: { lat: number; lng: number } | null
  className?: string
}

/**
 * 優化的門店選擇器組件
 * 採用黑白灰配色方案，提供更優雅的門店選擇體驗
 */
export function StoreSelector({
  stores,
  selectedStore,
  onStoreSelect,
  userLocation,
  className = '',
}: StoreSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')

  // 計算距離的輔助函數
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371 // 地球半徑（公里）
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLng = (lng2 - lng1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // 過濾和搜索門店
  const filteredStores = useMemo(() => {
    let filtered = stores

    // 按搜索關鍵詞過濾
    if (searchQuery) {
      filtered = filtered.filter(
        (store) =>
          store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.district.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // 按地區過濾
    if (selectedDistrict) {
      filtered = filtered.filter((store) => store.district === selectedDistrict)
    }

    // 按距離排序（如果有用戶位置）
    if (userLocation) {
      filtered = filtered.sort((a, b) => {
        const distanceA = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          a.coordinates.lat,
          a.coordinates.lng
        )
        const distanceB = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          b.coordinates.lat,
          b.coordinates.lng
        )
        return distanceA - distanceB
      })
    }

    return filtered
  }, [stores, searchQuery, selectedDistrict, userLocation])

  // 獲取所有地區
  const districts = useMemo(() => {
    const uniqueDistricts = Array.from(new Set(stores.map((store) => store.district)))
    return uniqueDistricts.sort()
  }, [stores])

  // 獲取門店狀態顯示
  const getStatusBadge = (status: Store['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">營業中</Badge>
      case 'maintenance':
        return <Badge variant="warning">維護中</Badge>
      case 'coming_soon':
        return <Badge variant="secondary">即將開業</Badge>
      default:
        return <Badge variant="outline">未知狀態</Badge>
    }
  }

  // 顯示的門店數量（摺疊時只顯示前3個）
  const displayStores = isExpanded ? filteredStores : filteredStores.slice(0, 3)

  return (
    <div className={cn('space-y-4', className)}>
      {/* 搜索和篩選區域 */}
      <Card className="border-neutral-200 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-neutral-900">
            選擇門店
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="搜索門店名稱或地址..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* 地區篩選 - 響應式設計 */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedDistrict === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDistrict('')}
              className="text-xs sm:text-sm"
            >
              全部地區
            </Button>
            {districts.slice(0, 6).map((district) => (
              <Button
                key={district}
                variant={selectedDistrict === district ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDistrict(district)}
                className="text-xs sm:text-sm"
              >
                {district}
              </Button>
            ))}
            {districts.length > 6 && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
                onClick={() => {
                  // 可以實現展開更多地區的功能
                }}
              >
                +{districts.length - 6}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 門店列表 */}
      <div className="space-y-3">
        <AnimatePresence>
          {displayStores.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <StoreCard
                store={store}
                isSelected={selectedStore?.id === store.id}
                onSelect={() => onStoreSelect(store)}
                userLocation={userLocation}
                getStatusBadge={getStatusBadge}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 展開/收起按鈕 */}
        {filteredStores.length > 3 && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2"
            >
              {isExpanded ? '收起' : `查看更多 (${filteredStores.length - 3})`}
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  isExpanded && 'rotate-180'
                )}
              />
            </Button>
          </div>
        )}
      </div>

      {/* 無結果提示 */}
      {filteredStores.length === 0 && (
        <Card className="border-neutral-200 bg-neutral-50">
          <CardContent className="py-8 text-center">
            <p className="text-neutral-500">沒有找到符合條件的門店</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('')
                setSelectedDistrict('')
              }}
              className="mt-2"
            >
              清除篩選條件
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

/**
 * 門店卡片組件
 */
interface StoreCardProps {
  store: Store
  isSelected: boolean
  onSelect: () => void
  userLocation?: { lat: number; lng: number } | null
  getStatusBadge: (status: Store['status']) => React.ReactNode
}

function StoreCard({
  store,
  isSelected,
  onSelect,
  userLocation,
  getStatusBadge,
}: StoreCardProps) {
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLng = (lng2 - lng1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // 計算距離
  const distance = userLocation
    ? calculateDistance(
        userLocation.lat,
        userLocation.lng,
        store.coordinates.lat,
        store.coordinates.lng
      )
    : null

  return (
    <Card
      className={cn(
        'cursor-pointer border-neutral-200 bg-white transition-all duration-200 hover:shadow-md',
        isSelected && 'border-neutral-900 bg-neutral-50'
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-2">
            {/* 門店名稱和狀態 */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <h3 className="font-semibold text-neutral-900 text-base sm:text-lg">
                {store.name}
              </h3>
              {getStatusBadge(store.status)}
            </div>

            {/* 地址 */}
            <div className="flex items-start gap-2 text-sm text-neutral-600">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span className="break-words">{store.address}</span>
            </div>

            {/* 營業時間和電話 - 移動端垂直排列 */}
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>{store.hours}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{store.phone}</span>
              </div>
            </div>
          </div>

          {/* 右側信息 - 移動端移到底部 */}
          <div className="flex flex-row justify-between items-center sm:flex-col sm:items-end sm:gap-2">
            {/* 評分 */}
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-neutral-900">
                {store.rating}
              </span>
            </div>

            {/* 距離 */}
            {distance && (
              <span className="text-sm font-medium text-neutral-600">
                {distance.toFixed(1)} km
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
