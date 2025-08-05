'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SearchFiltersProps,
  SearchFilters as SearchFiltersType,
} from '../types'
import { locationData, getAllFeatures } from '../data/stores'

/**
 * 搜索过滤器组件
 * 提供门店搜索和过滤功能
 */
export function SearchFilters({
  onFiltersChange,
  initialFilters,
  className = '',
}: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchText, setSearchText] = useState(initialFilters?.searchText || '')
  const [selectedCity, setSelectedCity] = useState(initialFilters?.city || '')
  const [selectedDistrict, setSelectedDistrict] = useState(
    initialFilters?.district || '',
  )
  const [selectedStatus, setSelectedStatus] = useState(
    initialFilters?.status || '',
  )
  const [searchRadius, setSearchRadius] = useState(initialFilters?.radius || 10)
  const [sortBy, setSortBy] = useState(initialFilters?.sortBy || 'distance')
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    initialFilters?.features || [],
  )

  const allFeatures = getAllFeatures()
  const cities = Object.keys(locationData)
  const availableDistricts = selectedCity
    ? locationData[selectedCity] || []
    : []

  // 处理城市变化
  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    setSelectedDistrict('') // 重置地区选择
    updateFilters(
      city,
      '',
      selectedStatus,
      searchRadius,
      sortBy,
      searchText,
      selectedFeatures,
    )
  }

  // 处理地区变化
  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district)
    updateFilters(
      selectedCity,
      district,
      selectedStatus,
      searchRadius,
      sortBy,
      searchText,
      selectedFeatures,
    )
  }

  // 处理状态变化
  const handleStatusChange = (status: string) => {
    setSelectedStatus(status)
    updateFilters(
      selectedCity,
      selectedDistrict,
      status,
      searchRadius,
      sortBy,
      searchText,
      selectedFeatures,
    )
  }

  // 处理半径变化
  const handleRadiusChange = (radius: number) => {
    setSearchRadius(radius)
    updateFilters(
      selectedCity,
      selectedDistrict,
      selectedStatus,
      radius,
      sortBy,
      searchText,
      selectedFeatures,
    )
  }

  // 处理排序变化
  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    updateFilters(
      selectedCity,
      selectedDistrict,
      selectedStatus,
      searchRadius,
      sort,
      searchText,
      selectedFeatures,
    )
  }

  // 处理搜索文本变化
  const handleSearchTextChange = (text: string) => {
    setSearchText(text)
    updateFilters(
      selectedCity,
      selectedDistrict,
      selectedStatus,
      searchRadius,
      sortBy,
      text,
      selectedFeatures,
    )
  }

  // 处理特色功能变化
  const handleFeatureToggle = (feature: string) => {
    const newFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter((f) => f !== feature)
      : [...selectedFeatures, feature]

    setSelectedFeatures(newFeatures)
    updateFilters(
      selectedCity,
      selectedDistrict,
      selectedStatus,
      searchRadius,
      sortBy,
      searchText,
      newFeatures,
    )
  }

  // 更新过滤器
  const updateFilters = (
    city: string,
    district: string,
    status: string,
    radius: number,
    sort: string,
    text: string,
    features: string[],
  ) => {
    const filters: SearchFiltersType = {
      city,
      district,
      status,
      radius,
      sortBy: sort,
      searchText: text,
      features,
    }
    onFiltersChange(filters)
  }

  // 清除所有过滤器
  const clearAllFilters = () => {
    setSearchText('')
    setSelectedCity('')
    setSelectedDistrict('')
    setSelectedStatus('')
    setSearchRadius(10)
    setSortBy('distance')
    setSelectedFeatures([])
    updateFilters('', '', '', 10, 'distance', '', [])
  }

  // 获取活跃过滤器数量
  const getActiveFiltersCount = () => {
    let count = 0
    if (searchText) count++
    if (selectedCity) count++
    if (selectedDistrict) count++
    if (selectedStatus) count++
    if (selectedFeatures.length > 0) count++
    return count
  }

  return (
    <div
      className={`rounded-xl bg-white shadow-sm ring-1 ring-neutral-200 ${className}`}
    >
      {/* 搜索栏和快速过滤器 */}
      <div className="p-6">
        {/* 搜索输入框 */}
        <div className="relative mb-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="搜尋門店名稱、地址或特色..."
            value={searchText}
            onChange={(e) => handleSearchTextChange(e.target.value)}
            className="block w-full rounded-lg border border-neutral-300 py-3 pr-3 pl-10 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/20"
          />
        </div>

        {/* 快速過濾器 */}
        <div className="mb-4 flex flex-wrap gap-2">
          <select
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">所有城市</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => handleDistrictChange(e.target.value)}
            disabled={!selectedCity}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          >
            <option value="">所有地區</option>
            {availableDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">所有狀態</option>
            <option value="active">營業中</option>
            <option value="maintenance">維護中</option>
            <option value="coming_soon">即將開業</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option value="distance">按距離排序</option>
            <option value="rating">按評分排序</option>
            <option value="name">按名稱排序</option>
            <option value="newest">按最新排序</option>
          </select>
        </div>

        {/* 展開/收起高級過濾器按鈕 */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            <span>高級過濾器</span>
            {getActiveFiltersCount() > 0 && (
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                {getActiveFiltersCount()}
              </span>
            )}
            <motion.svg
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </button>

          {getActiveFiltersCount() > 0 && (
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-700"
            >
              清除过滤器
            </button>
          )}
        </div>
      </div>

      {/* 高级过滤器 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gray-200"
          >
            <div className="space-y-6 p-6">
              {/* 搜尋半徑 */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  搜尋半徑：{searchRadius} 公里
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={searchRadius}
                  onChange={(e) => handleRadiusChange(Number(e.target.value))}
                  className="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                />
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>1km</span>
                  <span>25km</span>
                  <span>50km</span>
                </div>
              </div>

              {/* 門店特色 */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  門店特色
                </label>
                <div className="flex flex-wrap gap-2">
                  {allFeatures.map((feature) => (
                    <button
                      key={feature}
                      onClick={() => handleFeatureToggle(feature)}
                      className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                        selectedFeatures.includes(feature)
                          ? 'border-blue-300 bg-blue-100 text-blue-800'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>

              {/* 应用过滤器按钮 */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  应用过滤器
                </button>
                <button
                  onClick={clearAllFilters}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                >
                  重置
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
