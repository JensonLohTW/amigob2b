'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Button } from '@/components/ui/button'
import { ProductFilters, QuickFilters } from './ProductFilters'
import { ProductGrid, ProductStats } from './ProductGrid'
import { ProductModal } from './ProductModal'
import { useProductFilters } from '../hooks/useProductFilters'
import { getAllProducts, categories } from '../data/products'
import { Product, ProductCatalogProps } from '../types'

/**
 * 产品目录主组件
 * 完整的产品展示和筛选功能
 */
export function ProductCatalog({
  initialFilters = {},
  showFilters = true,
  showQuickFilters = true,
  className = '',
}: ProductCatalogProps) {
  const products = getAllProducts()
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    filters,
    filteredProducts,
    hasActiveFilters,
    updateFilters,
    resetFilters,
    updateSearch,
    getFilterStats,
  } = useProductFilters({
    products,
    initialFilters,
  })

  const stats = getFilterStats()

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleQuickFilterClick = (filterType: string, value: string) => {
    updateFilters({ [filterType]: value })
  }

  const handleSearchChange = (query: string) => {
    updateSearch(query)
  }

  return (
    <div className={`${className}`}>
      <Container className="mt-16">{/* 移除背景色和重複標題，直接開始內容 */}

        {/* 簡化搜索栏 */}
        <FadeIn>
          <div className="mb-8">
            <div className="relative mx-auto max-w-md">
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
                placeholder="搜尋產品..."
                onChange={(e) => handleSearchChange(e.target.value)}
                className="block w-full rounded-lg border border-neutral-200 bg-white py-3 pr-3 pl-10 leading-5 placeholder-neutral-500 focus:border-neutral-950 focus:placeholder-neutral-400 focus:ring-1 focus:ring-neutral-950 focus:outline-none"
              />
            </div>
          </div>
        </FadeIn>

        {/* 快速筛选 */}
        {showQuickFilters && (
          <FadeIn>
            <QuickFilters
              onFilterClick={handleQuickFilterClick}
              className="mb-8"
            />
          </FadeIn>
        )}

        {/* 筛选器 */}
        {showFilters && (
          <FadeIn>
            <ProductFilters
              filters={filters}
              onFiltersChange={updateFilters}
              className="mb-8"
            />
          </FadeIn>
        )}

        {/* 产品统计 */}
        <FadeIn>
          <ProductStats
            totalProducts={stats.total}
            filteredProducts={stats.filtered}
            categories={categories}
            className="mb-8"
          />
        </FadeIn>

        {/* 产品网格 */}
        <FadeInStagger>
          <ProductGrid
            products={filteredProducts}
            hoveredProduct={hoveredProduct}
            onProductHover={setHoveredProduct}
            onProductClick={handleProductClick}
          />
        </FadeInStagger>

        {/* 簡化無結果提示 */}
        {filteredProducts.length === 0 && hasActiveFilters && (
          <FadeIn>
            <div className="py-16 text-center">
              <h3 className="mb-2 text-lg font-medium text-neutral-950">
                沒有找到符合條件的產品
              </h3>
              <p className="mb-6 text-neutral-600">
                請嘗試調整篩選條件或使用不同的搜尋關鍵詞
              </p>
              <Button
                variant="outline"
                onClick={resetFilters}
              >
                清除所有篩選
              </Button>
            </div>
          </FadeIn>
        )}
      </Container>

      {/* 产品详情模态框 */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  )
}
