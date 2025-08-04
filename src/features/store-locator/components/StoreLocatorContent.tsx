'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
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
    <div className={`bg-white ${className}`}>
      <Container>
        <PageIntro
          eyebrow="門店定位"
          title="找到離您最近的 AMIGO 門店"
        >
          <p>
            我們在全台各地設有多家門店，為您提供便利的取餐服務。
            使用下方的搜尋功能找到最適合您的門店位置。
          </p>
        </PageIntro>

        {/* 快速操作栏 */}
        <FadeIn>
          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-4">
              <button
                onClick={getUserLocation}
                disabled={isLoading}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  className="h-4 w-4"
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
                {isLoading ? '定位中...' : '獲取我的位置'}
              </button>

              {userLocation && !locationError && (
                <span className="text-sm font-medium text-green-600">
                  ✓ 已獲取您的位置
                </span>
              )}

              {locationError && (
                <span className="text-sm font-medium text-amber-600">
                  ⚠ {locationError}
                </span>
              )}
            </div>

            {/* 視圖切換 */}
            {showMap && (
              <div className="flex rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  列表視圖
                </button>
                <button
                  onClick={() => handleViewModeChange('map')}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    viewMode === 'map'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  地圖視圖
                </button>
                <button
                  onClick={() => handleViewModeChange('both')}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    viewMode === 'both'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  混合視圖
                </button>
              </div>
            )}
          </div>
        </FadeIn>

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

        {/* 主要内容区域 */}
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
                <StoreList
                  stores={filteredStores}
                  onStoreSelect={handleStoreSelect}
                  loading={isLoading}
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
                <MapComponent
                  stores={filteredStores}
                  userLocation={userLocation}
                  selectedStore={selectedStore}
                  onStoreSelect={handleStoreSelect}
                  className="h-96"
                />
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
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      門店地圖
                    </h3>
                    <MapComponent
                      stores={filteredStores}
                      userLocation={userLocation}
                      selectedStore={selectedStore}
                      onStoreSelect={handleStoreSelect}
                      className="h-96"
                    />
                  </div>
                )}

                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    門店列表
                  </h3>
                  <StoreList
                    stores={filteredStores}
                    onStoreSelect={handleStoreSelect}
                    loading={isLoading}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeInStagger>

        {/* 聯繫我們 */}
        <FadeIn>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
              <h3 className="mb-4 text-2xl font-bold">找不到合適的門店？</h3>
              <p className="mb-6 text-lg opacity-90">
                我們持續擴展服務範圍，如果您的地區暫時沒有門店，請聯繫我們了解配送服務
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button className="inline-flex items-center rounded-md border border-white bg-white px-6 py-3 text-base font-medium text-blue-600 transition-colors hover:bg-gray-50">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    suppressHydrationWarning={true}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  聯繫客服
                </button>
                <button className="inline-flex items-center rounded-md border border-white px-6 py-3 text-base font-medium text-white transition-colors hover:bg-white hover:text-blue-600">
                  <svg
                    className="mr-2 h-5 w-5"
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
                  申請新門店
                </button>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </Container>
    </div>
  )
}
