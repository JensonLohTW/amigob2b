'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Navigation, Grid, List, Map, Phone } from 'lucide-react'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StoreSelector } from './StoreSelector'
import { SearchFilters } from './SearchFilters'
import { StoreList, StoreStats } from './StoreList'
import { MapComponent } from './MapComponent'
import {
  getAllStores,
  calculateDistance,
  searchStores,
  getStoresByCity,
  getStoresByDistrict,
  getStoresByStatus,
} from '../data/stores'
import {
  StoreLocatorContentProps,
  Store,
  SearchFilters as SearchFiltersType,
  Location,
} from '../types'

/**
 * 门店定位主组件
 * 提供完整的门店搜索、过滤、展示功能
 */
export function StoreLocatorContent({
  initialLocation,
  showMap = true,
  showFilters = true,
  className = '',
}: StoreLocatorContentProps) {
  const [filteredStores, setFilteredStores] = useState<Store[]>(getAllStores())
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [userLocation, setUserLocation] = useState<Location | null>(
    initialLocation || null,
  )
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'map' | 'both'>('both')
  const [locationError, setLocationError] = useState<string | null>(null)

  // 默認位置（高雄市政府）
  const defaultLocation = useMemo(() => ({ lat: 22.6273, lng: 120.3014 }), [])

  // 处理过滤器变化
  const handleFiltersChange = (filters: SearchFiltersType) => {
    setIsLoading(true)

    // 模拟异步搜索
    setTimeout(() => {
      let filtered = getAllStores()

      // 文本搜索
      if (filters.searchText) {
        filtered = searchStores(filters.searchText)
      }

      // 城市过滤
      if (filters.city) {
        filtered = filtered.filter((store) => store.city === filters.city)
      }

      // 地区过滤
      if (filters.district) {
        filtered = filtered.filter(
          (store) => store.district === filters.district,
        )
      }

      // 状态过滤
      if (filters.status) {
        filtered = filtered.filter((store) => store.status === filters.status)
      }

      // 特色功能过滤
      if (filters.features && filters.features.length > 0) {
        filtered = filtered.filter((store) =>
          filters.features!.some((feature) => store.features.includes(feature)),
        )
      }

      // 计算距离并过滤半径
      const currentLocation = userLocation || defaultLocation
      filtered = filtered
        .map((store) => ({
          ...store,
          distance: calculateDistance(
            currentLocation.lat,
            currentLocation.lng,
            store.coordinates.lat,
            store.coordinates.lng,
          ),
        }))
        .filter((store) => store.distance! <= filters.radius)

      // 排序
      switch (filters.sortBy) {
        case 'distance':
          filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0))
          break
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'newest':
          filtered.sort((a, b) => b.id - a.id)
          break
      }

      setFilteredStores(filtered)
      setIsLoading(false)
    }, 500)
  }

  // 初始化时计算距离
  useMemo(() => {
    const currentLocation = userLocation || defaultLocation
    const storesWithDistance = getAllStores().map((store) => ({
      ...store,
      distance: calculateDistance(
        currentLocation.lat,
        currentLocation.lng,
        store.coordinates.lat,
        store.coordinates.lng,
      ),
    }))

    // 按距离排序
    storesWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0))
    setFilteredStores(storesWithDistance)
  }, [userLocation, defaultLocation])

  // 獲取用戶位置
  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      setIsLoading(true)
      setLocationError(null)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(location)
          setLocationError(null)
          setIsLoading(false)
        },
        (error) => {
          // 提供更詳細的錯誤信息
          let errorMessage = '未知錯誤'
          if (error) {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = '用戶拒絕了地理位置請求，將使用預設位置'
                break
              case error.POSITION_UNAVAILABLE:
                errorMessage = '位置信息不可用，將使用預設位置'
                break
              case error.TIMEOUT:
                errorMessage = '獲取位置超時，將使用預設位置'
                break
              default:
                errorMessage = `獲取位置失敗：${error.message || '未知錯誤'}，將使用預設位置`
            }
          }
          console.warn('获取位置失败:', errorMessage)
          setLocationError(errorMessage)
          setUserLocation(defaultLocation)
          setIsLoading(false)
        },
        {
          timeout: 10000, // 10秒超時
          enableHighAccuracy: true,
          maximumAge: 300000, // 5分鐘內的緩存位置可接受
        },
      )
    } else {
      const errorMessage = '瀏覽器不支持地理位置功能，將使用預設位置'
      setLocationError(errorMessage)
      setUserLocation(defaultLocation)
    }
  }, [defaultLocation])

  // 处理门店选择
  const handleStoreSelect = (store: Store) => {
    setSelectedStore(store)
  }

  // 处理视图模式切换
  const handleViewModeChange = (mode: 'list' | 'map' | 'both') => {
    setViewMode(mode)
  }

  useEffect(() => {
    // 如果沒有初始位置，嘗試獲取用戶位置
    if (!initialLocation) {
      getUserLocation()
    }
  }, [initialLocation, getUserLocation])

  return (
    <div className={className}>
      {/* 頁面標題區域 */}
      <PageIntro
        eyebrow="門店定位"
        title="找到離您最近的 AMIGO 門店"
      >
        <p>
          我們在全台各地設有多家門店，為您提供便利的取餐服務。
          使用下方的搜尋功能找到最適合您的門店位置。
        </p>
      </PageIntro>

      <Container>

        {/* 快速操作栏 - 黑白灰配色 */}
        <div className="py-6">
          <FadeIn>
            <Card className="border-neutral-200 bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <Button
                      onClick={getUserLocation}
                      disabled={isLoading}
                      variant="default"
                      className="gap-2 w-full sm:w-auto"
                    >
                      <Navigation className="h-4 w-4" />
                      {isLoading ? '定位中...' : '獲取我的位置'}
                    </Button>

                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                      {userLocation && !locationError && (
                        <Badge variant="success" className="gap-1 justify-center sm:justify-start">
                          <span>✓</span>
                          已獲取您的位置
                        </Badge>
                      )}

                      {locationError && (
                        <Badge variant="warning" className="gap-1 justify-center sm:justify-start">
                          <span>⚠</span>
                          {locationError}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* 視圖切換 - 響應式設計 */}
                  {showMap && (
                    <div className="flex w-full sm:w-auto rounded-lg bg-neutral-100 p-1">
                      <Button
                        onClick={() => handleViewModeChange('list')}
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        className="flex-1 sm:flex-none gap-1 sm:gap-2 text-xs sm:text-sm"
                      >
                        <List className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">列表視圖</span>
                        <span className="sm:hidden">列表</span>
                      </Button>
                      <Button
                        onClick={() => handleViewModeChange('map')}
                        variant={viewMode === 'map' ? 'default' : 'ghost'}
                        size="sm"
                        className="flex-1 sm:flex-none gap-1 sm:gap-2 text-xs sm:text-sm"
                      >
                        <Map className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">地圖視圖</span>
                        <span className="sm:hidden">地圖</span>
                      </Button>
                      <Button
                        onClick={() => handleViewModeChange('both')}
                        variant={viewMode === 'both' ? 'default' : 'ghost'}
                        size="sm"
                        className="flex-1 sm:flex-none gap-1 sm:gap-2 text-xs sm:text-sm"
                      >
                        <Grid className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">混合視圖</span>
                        <span className="sm:hidden">混合</span>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* 搜尋過濾器 */}
        {showFilters && (
          <FadeIn>
            <SearchFilters
              onFiltersChange={handleFiltersChange}
              className="mb-8"
            />
          </FadeIn>
        )}

        {/* 门店统计 */}
        <FadeIn>
          <StoreStats stores={filteredStores} className="mb-8" />
        </FadeIn>

        {/* 主要内容区域 - 使用新的門店選擇器 */}
        <div className="py-8">
          <FadeInStagger>
            <AnimatePresence mode="wait">
              {viewMode === 'list' && (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <StoreSelector
                    stores={filteredStores}
                    selectedStore={selectedStore}
                    onStoreSelect={handleStoreSelect}
                    userLocation={userLocation}
                  />
                </motion.div>
              )}

              {viewMode === 'map' && showMap && (
                <motion.div
                  key="map"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-neutral-200 bg-white">
                    <CardHeader>
                      <CardTitle className="text-neutral-900">門店地圖</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <MapComponent
                        stores={filteredStores}
                        userLocation={userLocation}
                        selectedStore={selectedStore}
                        onStoreSelect={handleStoreSelect}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {viewMode === 'both' && (
                <motion.div
                  key="both"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 gap-8 lg:grid-cols-2"
                >
                  {showMap && (
                    <Card className="border-neutral-200 bg-white">
                      <CardHeader>
                        <CardTitle className="text-neutral-900">門店地圖</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <MapComponent
                          stores={filteredStores}
                          userLocation={userLocation}
                          selectedStore={selectedStore}
                          onStoreSelect={handleStoreSelect}
                        />
                      </CardContent>
                    </Card>
                  )}

                  <div>
                    <StoreSelector
                      stores={filteredStores}
                      selectedStore={selectedStore}
                      onStoreSelect={handleStoreSelect}
                      userLocation={userLocation}
                    />
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
        </FadeInStagger>
        </div>

        {/* 聯繫我們區域 - 黑白灰配色 */}
        <div className="py-8">
          <FadeIn>
            <Card className="border-neutral-200 bg-neutral-900 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="mb-4 text-2xl font-bold">找不到合適的門店？</h3>
                <p className="mb-6 text-lg text-neutral-300">
                  我們持續擴展服務範圍，如果您的地區暫時沒有門店，請聯繫我們了解配送服務
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button variant="secondary" className="gap-2">
                    <Phone className="h-4 w-4" />
                    聯繫客服
                  </Button>
                  <Button variant="outline" className="gap-2 border-white text-white hover:bg-white hover:text-neutral-900">
                    <MapPin className="h-4 w-4" />
                    申請新門店
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </div>
  )
}
