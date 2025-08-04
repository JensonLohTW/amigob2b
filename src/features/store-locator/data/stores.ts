/**
 * 門店數據和相關服務
 */

import { Store, LocationData, StoreStats, Location } from '../types'
import { kaohsiungStores } from './kaohsiung-stores'
import { kaohsiungLocationData } from './kaohsiung-location'

// 使用高雄市真實門店數據
export const storeData: Store[] = kaohsiungStores

// 城市和地區數據 - 使用高雄市數據
export const locationData: LocationData = kaohsiungLocationData

// 獲取所有門店
export function getAllStores(): Store[] {
  return storeData
}

// 根據城市獲取門店
export function getStoresByCity(city: string): Store[] {
  if (!city) return storeData
  return storeData.filter((store) => store.city === city)
}

// 根據地區獲取門店
export function getStoresByDistrict(district: string): Store[] {
  if (!district) return storeData
  return storeData.filter((store) => store.district === district)
}

// 根據狀態獲取門店
export function getStoresByStatus(status: string): Store[] {
  if (!status) return storeData
  return storeData.filter((store) => store.status === status)
}

// 根據ID獲取門店
export function getStoreById(id: number): Store | undefined {
  return storeData.find((store) => store.id === id)
}

// 獲取門店統計信息
export function getStoreStats(): StoreStats {
  const totalStores = storeData.length
  const activeStores = storeData.filter(
    (store) => store.status === 'active',
  ).length
  const cities = new Set(storeData.map((store) => store.city)).size
  const averageRating =
    storeData.reduce((sum, store) => sum + store.rating, 0) / totalStores

  return {
    totalStores,
    activeStores,
    cities,
    averageRating: Math.round(averageRating * 10) / 10,
  }
}

// 獲取所有城市
export function getAllCities(): string[] {
  return Array.from(new Set(storeData.map((store) => store.city)))
}

// 根據城市獲取地區
export function getDistrictsByCity(city: string): string[] {
  if (!city) return []
  return locationData[city] || []
}

// 獲取所有特色功能
export function getAllFeatures(): string[] {
  const features = new Set<string>()
  storeData.forEach((store) => {
    store.features.forEach((feature) => features.add(feature))
  })
  return Array.from(features)
}

// 搜尋門店
export function searchStores(query: string): Store[] {
  if (!query.trim()) return storeData

  const searchTerm = query.toLowerCase()
  return storeData.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm) ||
      store.address.toLowerCase().includes(searchTerm) ||
      store.district.toLowerCase().includes(searchTerm) ||
      store.city.toLowerCase().includes(searchTerm) ||
      store.features.some((feature) =>
        feature.toLowerCase().includes(searchTerm),
      ) ||
      (store.description &&
        store.description.toLowerCase().includes(searchTerm)),
  )
}

// 計算兩點間距離（公里）
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371 // 地球半徑（公里）
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// 獲取附近門店
export function getNearbyStores(
  location: Location,
  radiusKm: number = 10,
): Store[] {
  return storeData
    .map((store) => ({
      ...store,
      distance: calculateDistance(
        location.lat,
        location.lng,
        store.coordinates.lat,
        store.coordinates.lng,
      ),
    }))
    .filter((store) => store.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
}

// 根據多個條件過濾門店
export function filterStores(filters: {
  city?: string
  district?: string
  status?: string
  features?: string[]
  searchText?: string
  location?: Location
  radius?: number
}): Store[] {
  let filteredStores = storeData

  // 按城市過濾
  if (filters.city) {
    filteredStores = filteredStores.filter(
      (store) => store.city === filters.city,
    )
  }

  // 按地區過濾
  if (filters.district) {
    filteredStores = filteredStores.filter(
      (store) => store.district === filters.district,
    )
  }

  // 按狀態過濾
  if (filters.status) {
    filteredStores = filteredStores.filter(
      (store) => store.status === filters.status,
    )
  }

  // 按特色功能過濾
  if (filters.features && filters.features.length > 0) {
    filteredStores = filteredStores.filter((store) =>
      filters.features!.some((feature) => store.features.includes(feature)),
    )
  }

  // 按搜尋文字過濾
  if (filters.searchText) {
    const searchTerm = filters.searchText.toLowerCase()
    filteredStores = filteredStores.filter(
      (store) =>
        store.name.toLowerCase().includes(searchTerm) ||
        store.address.toLowerCase().includes(searchTerm) ||
        store.features.some((feature) =>
          feature.toLowerCase().includes(searchTerm),
        ) ||
        (store.description &&
          store.description.toLowerCase().includes(searchTerm)),
    )
  }

  // 按距離過濾
  if (filters.location && filters.radius) {
    filteredStores = filteredStores.filter((store) => {
      const distance = calculateDistance(
        filters.location!.lat,
        filters.location!.lng,
        store.coordinates.lat,
        store.coordinates.lng,
      )
      return distance <= filters.radius!
    })
  }

  return filteredStores
}

// 排序門店
export function sortStores(
  stores: Store[],
  sortBy: string,
  location?: Location,
): Store[] {
  const storesWithDistance = location
    ? stores.map((store) => ({
        ...store,
        distance: calculateDistance(
          location.lat,
          location.lng,
          store.coordinates.lat,
          store.coordinates.lng,
        ),
      }))
    : stores

  switch (sortBy) {
    case 'distance':
      return location
        ? storesWithDistance.sort(
            (a, b) => (a.distance || 0) - (b.distance || 0),
          )
        : stores
    case 'rating':
      return storesWithDistance.sort((a, b) => b.rating - a.rating)
    case 'name':
      return storesWithDistance.sort((a, b) => a.name.localeCompare(b.name))
    case 'newest':
      return storesWithDistance.sort((a, b) => b.id - a.id)
    default:
      return storesWithDistance
  }
}
