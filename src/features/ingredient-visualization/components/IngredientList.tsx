'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { IngredientListProps, SortOption, Ingredient } from '../types'

/**
 * 成分列表组件
 * 以列表形式展示配方中的所有成分
 */
export function IngredientList({ 
  ingredients, 
  showDetails = true, 
  sortBy = 'percentage',
  className = '' 
}: IngredientListProps) {
  const [currentSort, setCurrentSort] = useState<SortOption>(sortBy)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  // 排序后的成分列表
  const sortedIngredients = useMemo(() => {
    const sorted = [...ingredients].sort((a, b) => {
      let aValue: number | string
      let bValue: number | string

      switch (currentSort) {
        case 'weight':
          aValue = a.weight
          bValue = b.weight
          break
        case 'percentage':
          aValue = a.percentage
          bValue = b.percentage
          break
        case 'protein':
          aValue = a.protein
          bValue = b.protein
          break
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        default:
          aValue = a.percentage
          bValue = b.percentage
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      return sortDirection === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number)
    })

    return sorted
  }, [ingredients, currentSort, sortDirection])

  const handleSort = (newSort: SortOption) => {
    if (currentSort === newSort) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setCurrentSort(newSort)
      setSortDirection('desc')
    }
  }

  const getSortIcon = (sortType: SortOption) => {
    if (currentSort !== sortType) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )
    }

    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
      </svg>
    )
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'protein':
        return '🥩'
      case 'vegetable':
        return '🥕'
      case 'grain':
        return '🌾'
      case 'supplement':
        return '💊'
      default:
        return '🍽️'
    }
  }

  const getFreshnessColor = (freshness: string) => {
    switch (freshness) {
      case 'fresh':
        return 'bg-green-100 text-green-800'
      case 'frozen':
        return 'bg-blue-100 text-blue-800'
      case 'dried':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm ring-1 ring-gray-200 overflow-hidden ${className}`}>
      {/* 表头 */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-700">
          <div className="col-span-4">
            <button
              onClick={() => handleSort('name')}
              className="flex items-center gap-2 hover:text-gray-900"
            >
              成分名称
              {getSortIcon('name')}
            </button>
          </div>
          <div className="col-span-2 text-center">
            <button
              onClick={() => handleSort('weight')}
              className="flex items-center gap-2 hover:text-gray-900"
            >
              重量
              {getSortIcon('weight')}
            </button>
          </div>
          <div className="col-span-2 text-center">
            <button
              onClick={() => handleSort('percentage')}
              className="flex items-center gap-2 hover:text-gray-900"
            >
              比例
              {getSortIcon('percentage')}
            </button>
          </div>
          <div className="col-span-2 text-center">
            <button
              onClick={() => handleSort('protein')}
              className="flex items-center gap-2 hover:text-gray-900"
            >
              蛋白质
              {getSortIcon('protein')}
            </button>
          </div>
          <div className="col-span-2 text-center">类别</div>
        </div>
      </div>

      {/* 成分列表 */}
      <div className="divide-y divide-gray-200">
        {sortedIngredients.map((ingredient, index) => (
          <motion.div
            key={ingredient.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* 成分名称 */}
              <div className="col-span-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: ingredient.color }}
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      {ingredient.name}
                    </div>
                    {showDetails && ingredient.source && (
                      <div className="text-xs text-gray-500">
                        来源：{ingredient.source}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 重量 */}
              <div className="col-span-2 text-center">
                <span className="font-medium text-gray-900">
                  {ingredient.weight}g
                </span>
              </div>

              {/* 比例 */}
              <div className="col-span-2 text-center">
                <div className="flex items-center justify-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: ingredient.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${ingredient.percentage}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  </div>
                  <span className="font-medium text-gray-900 text-sm">
                    {ingredient.percentage}%
                  </span>
                </div>
              </div>

              {/* 蛋白质 */}
              <div className="col-span-2 text-center">
                <span className="font-medium text-gray-900">
                  {ingredient.protein}g
                </span>
              </div>

              {/* 类别 */}
              <div className="col-span-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">
                    {getCategoryIcon(ingredient.category || 'other')}
                  </span>
                  {showDetails && ingredient.freshness && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFreshnessColor(ingredient.freshness)}`}>
                      {ingredient.freshness === 'fresh' ? '新鲜' :
                       ingredient.freshness === 'frozen' ? '冷冻' : '干燥'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 营养益处 */}
            {showDetails && ingredient.benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                className="mt-3 pt-3 border-t border-gray-100"
              >
                <div className="text-sm text-gray-600 mb-2">营养益处：</div>
                <div className="flex flex-wrap gap-2">
                  {ingredient.benefits.map((benefit, benefitIndex) => (
                    <motion.span
                      key={benefitIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.3 + index * 0.05 + benefitIndex * 0.05 }}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {benefit}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 统计摘要 */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {ingredients.length}
            </div>
            <div className="text-sm text-gray-600">总成分数</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {ingredients.reduce((sum, ing) => sum + ing.weight, 0)}g
            </div>
            <div className="text-sm text-gray-600">总重量</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {Math.round(ingredients.reduce((sum, ing) => sum + ing.protein, 0) * 10) / 10}g
            </div>
            <div className="text-sm text-gray-600">总蛋白质</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {ingredients.filter(ing => ing.category === 'protein').length}
            </div>
            <div className="text-sm text-gray-600">蛋白质来源</div>
          </div>
        </div>
      </div>
    </div>
  )
}
