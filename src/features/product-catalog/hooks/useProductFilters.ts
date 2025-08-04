/**
 * 产品筛选自定义 Hook
 * 处理产品筛选逻辑和状态管理
 */

import { useState, useMemo } from 'react'
import { Product, ProductFilters, SortConfig, SearchConfig } from '../types'

interface UseProductFiltersProps {
  products: Product[]
  initialFilters?: Partial<ProductFilters>
}

export function useProductFilters({
  products,
  initialFilters = {},
}: UseProductFiltersProps) {
  // 筛选状态
  const [filters, setFilters] = useState<ProductFilters>({
    category: '全部',
    ageGroup: 'all',
    petType: 'both',
    functionality: 'all',
    flavor: 'all',
    ...initialFilters,
  })

  // 排序状态
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'popularity',
    direction: 'desc',
  })

  // 搜索状态
  const [searchConfig, setSearchConfig] = useState<SearchConfig>({
    query: '',
    fields: ['name', 'description', 'mainIngredients', 'functionality'],
  })

  // 筛选后的产品
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // 分类筛选
    if (filters.category !== '全部') {
      filtered = filtered.filter(
        (product) => product.category === filters.category,
      )
    }

    // 年龄组筛选
    if (filters.ageGroup !== 'all') {
      filtered = filtered.filter(
        (product) =>
          product.ageGroup === filters.ageGroup || product.ageGroup === 'all',
      )
    }

    // 宠物类型筛选
    if (filters.petType !== 'both') {
      filtered = filtered.filter(
        (product) =>
          product.petType === filters.petType || product.petType === 'both',
      )
    }

    // 功能性筛选
    if (filters.functionality !== 'all') {
      filtered = filtered.filter((product) =>
        product.functionality.includes(filters.functionality),
      )
    }

    // 口味筛选
    if (filters.flavor !== 'all') {
      filtered = filtered.filter((product) => product.flavor === filters.flavor)
    }

    // 搜索筛选
    if (searchConfig.query.trim()) {
      const query = searchConfig.query.toLowerCase()
      filtered = filtered.filter((product) => {
        return searchConfig.fields.some((field) => {
          const value = product[field as keyof Product]
          if (Array.isArray(value)) {
            return value.some((item) => item.toLowerCase().includes(query))
          }
          return String(value).toLowerCase().includes(query)
        })
      })
    }

    // 排序
    filtered.sort((a, b) => {
      const { field, direction } = sortConfig
      let aValue: any = a[field as keyof Product]
      let bValue: any = b[field as keyof Product]

      // 特殊处理不同类型的字段
      if (field === 'price') {
        aValue = parseInt(aValue.replace(/[^\d]/g, ''))
        bValue = parseInt(bValue.replace(/[^\d]/g, ''))
      } else if (field === 'name') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [products, filters, sortConfig, searchConfig])

  // 更新筛选器
  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  // 重置筛选器
  const resetFilters = () => {
    setFilters({
      category: '全部',
      ageGroup: 'all',
      petType: 'both',
      functionality: 'all',
      flavor: 'all',
    })
    setSearchConfig((prev) => ({ ...prev, query: '' }))
  }

  // 更新排序
  const updateSort = (
    field: SortConfig['field'],
    direction?: SortConfig['direction'],
  ) => {
    setSortConfig((prev) => ({
      field,
      direction:
        direction ||
        (prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'),
    }))
  }

  // 更新搜索
  const updateSearch = (query: string) => {
    setSearchConfig((prev) => ({ ...prev, query }))
  }

  // 检查是否有活跃的筛选
  const hasActiveFilters = useMemo(() => {
    return (
      Object.entries(filters).some(([key, value]) => {
        if (key === 'category') return value !== '全部'
        return value !== 'all' && value !== 'both'
      }) || searchConfig.query.trim() !== ''
    )
  }, [filters, searchConfig.query])

  // 获取筛选统计
  const getFilterStats = () => {
    const stats = {
      total: products.length,
      filtered: filteredProducts.length,
      categories: {} as Record<string, number>,
      ageGroups: {} as Record<string, number>,
      petTypes: {} as Record<string, number>,
      functionalities: {} as Record<string, number>,
    }

    // 统计各分类的产品数量
    products.forEach((product) => {
      stats.categories[product.category] =
        (stats.categories[product.category] || 0) + 1
      stats.ageGroups[product.ageGroup] =
        (stats.ageGroups[product.ageGroup] || 0) + 1
      stats.petTypes[product.petType] =
        (stats.petTypes[product.petType] || 0) + 1

      product.functionality.forEach((func) => {
        stats.functionalities[func] = (stats.functionalities[func] || 0) + 1
      })
    })

    return stats
  }

  // 获取推荐筛选
  const getRecommendedFilters = () => {
    const stats = getFilterStats()

    return {
      popularCategories: Object.entries(stats.categories)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([category]) => category),

      popularFunctionalities: Object.entries(stats.functionalities)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([func]) => func),
    }
  }

  return {
    // 状态
    filters,
    sortConfig,
    searchConfig,
    filteredProducts,
    hasActiveFilters,

    // 操作方法
    updateFilters,
    resetFilters,
    updateSort,
    updateSearch,

    // 统计和推荐
    getFilterStats,
    getRecommendedFilters,
  }
}
