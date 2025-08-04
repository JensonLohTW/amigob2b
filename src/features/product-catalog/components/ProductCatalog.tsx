'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
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
    <div className={`min-h-screen bg-gray-50 py-12 ${className}`}>
      <Container>
        {/* 页面标题 */}
        <FadeIn>
          <div className="mb-12 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 sm:text-5xl"
            >
              产品目录
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-lg text-gray-600"
            >
              为您的毛孩精心挑选营养均衡的鲜食便当
            </motion.p>
          </div>
        </FadeIn>

        {/* 搜索栏 */}
        <FadeIn>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative mx-auto max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
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
                placeholder="搜索产品名称、成分或功能..."
                onChange={(e) => handleSearchChange(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white py-3 pr-3 pl-10 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </motion.div>
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

        {/* 无结果提示 */}
        {filteredProducts.length === 0 && hasActiveFilters && (
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-16 text-center"
            >
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                没有找到符合条件的产品
              </h3>
              <p className="mb-6 text-gray-600">
                请尝试调整筛选条件或使用不同的搜索关键词
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                清除所有筛选
              </button>
            </motion.div>
          </FadeIn>
        )}

        {/* 推荐产品 */}
        {filteredProducts.length > 0 && (
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-16 text-center"
            >
              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                <h3 className="mb-4 text-2xl font-bold">
                  找到心仪的产品了吗？
                </h3>
                <p className="mb-6 text-lg opacity-90">
                  我们的营养师团队随时为您提供专业的喂养建议
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <button className="inline-flex items-center rounded-md border border-white bg-white px-6 py-3 text-base font-medium text-blue-600 transition-colors hover:bg-gray-50">
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    咨询营养师
                  </button>
                  <button className="inline-flex items-center rounded-md border border-white px-6 py-3 text-base font-medium text-white transition-colors hover:bg-white hover:text-blue-600">
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0L17 18"
                      />
                    </svg>
                    查看购物车
                  </button>
                </div>
              </div>
            </motion.div>
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
