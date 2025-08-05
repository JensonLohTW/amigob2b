'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { ProductFiltersProps } from '../types'
import { filterOptions } from '../data/products'

/**
 * 产品筛选器组件
 * 提供多维度的产品筛选功能
 */
export function ProductFilters({
  filters,
  onFiltersChange,
  className = '',
}: ProductFiltersProps) {
  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const resetFilters = () => {
    onFiltersChange({
      category: '全部',
      ageGroup: 'all',
      petType: 'both',
      functionality: 'all',
      flavor: 'all',
    })
  }

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'category') return value !== '全部'
    return value !== 'all' && value !== 'both'
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-lg bg-white p-4 shadow-sm ring-1 ring-neutral-200 ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium text-neutral-950">篩選</h3>
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={resetFilters}
            className="text-sm font-medium text-neutral-600 hover:text-neutral-950"
          >
            清除篩選
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* 年龄组筛选 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            年齡階段
          </label>
          <select
            value={filters.ageGroup}
            onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 focus:outline-none"
          >
            {filterOptions.ageGroup.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 宠物类型筛选 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            寵物類型
          </label>
          <select
            value={filters.petType}
            onChange={(e) => handleFilterChange('petType', e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 focus:outline-none"
          >
            {filterOptions.petType.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 功能性筛选 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            功能特性
          </label>
          <select
            value={filters.functionality}
            onChange={(e) =>
              handleFilterChange('functionality', e.target.value)
            }
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 focus:outline-none"
          >
            {filterOptions.functionality.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 口味筛选 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            口味選擇
          </label>
          <select
            value={filters.flavor}
            onChange={(e) => handleFilterChange('flavor', e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 focus:outline-none"
          >
            {filterOptions.flavor.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 活跃筛选标签 */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-6 border-t border-gray-200 pt-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">当前筛选：</span>
            {Object.entries(filters).map(([key, value]) => {
              if (key === 'category' && value === '全部') return null
              if (key !== 'category' && (value === 'all' || value === 'both'))
                return null

              const getFilterLabel = () => {
                switch (key) {
                  case 'category':
                    return value
                  case 'ageGroup':
                    return filterOptions.ageGroup.find(
                      (opt) => opt.value === value,
                    )?.label
                  case 'petType':
                    return filterOptions.petType.find(
                      (opt) => opt.value === value,
                    )?.label
                  case 'functionality':
                    return filterOptions.functionality.find(
                      (opt) => opt.value === value,
                    )?.label
                  case 'flavor':
                    return filterOptions.flavor.find(
                      (opt) => opt.value === value,
                    )?.label
                  default:
                    return value
                }
              }

              return (
                <motion.span
                  key={key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
                >
                  {getFilterLabel()}
                  <button
                    onClick={() => {
                      const resetValue =
                        key === 'category'
                          ? '全部'
                          : key === 'petType'
                            ? 'both'
                            : 'all'
                      handleFilterChange(
                        key as keyof typeof filters,
                        resetValue,
                      )
                    }}
                    className="ml-1 hover:text-blue-600"
                  >
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </motion.span>
              )
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

/**
 * 快速筛选组件
 * 提供常用筛选选项的快速访问
 */
interface QuickFiltersProps {
  onFilterClick: (filterType: string, value: string) => void
  className?: string
}

export function QuickFilters({
  onFilterClick,
  className = '',
}: QuickFiltersProps) {
  const quickFilters = [
    {
      label: '幼齡專用',
      type: 'ageGroup',
      value: 'puppy',
    },
    {
      label: '成年維持',
      type: 'ageGroup',
      value: 'adult',
    },
    {
      label: '樂齡照護',
      type: 'ageGroup',
      value: 'senior',
    },
    {
      label: '體重管理',
      type: 'functionality',
      value: '体重管理',
    },
    {
      label: '關節保健',
      type: 'functionality',
      value: '关节保健',
    },
    {
      label: '毛髮護理',
      type: 'functionality',
      value: '毛发护理',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`${className}`}
    >
      <h4 className="mb-3 text-sm font-medium text-neutral-700">快速篩選</h4>
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((filter, index) => (
          <motion.div
            key={filter.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Badge
              variant="outline"
              className="cursor-pointer text-xs hover:bg-neutral-100 transition-colors"
              onClick={() => onFilterClick(filter.type, filter.value)}
            >
              {filter.label}
            </Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
