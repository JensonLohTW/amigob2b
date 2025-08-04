'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ProductCard } from './ProductCard'
import { ProductGridProps } from '../types'

/**
 * 产品网格组件
 * 以网格形式展示产品列表
 */
export function ProductGrid({
  products,
  hoveredProduct,
  onProductHover,
  onProductClick,
  className = '',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`py-12 text-center ${className}`}
      >
        <div className="mb-4 text-6xl">🔍</div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">
          没有找到符合条件的产品
        </h3>
        <p className="text-gray-600">请尝试调整筛选条件或清除所有筛选</p>
      </motion.div>
    )
  }

  return (
    <div className={`${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                layout: { duration: 0.3 },
              }}
            >
              <ProductCard
                product={product}
                isHovered={hoveredProduct === product.id}
                onHover={onProductHover}
                onClick={onProductClick}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

/**
 * 产品统计组件
 * 显示产品数量和筛选结果统计
 */
interface ProductStatsProps {
  totalProducts: number
  filteredProducts: number
  categories: string[]
  className?: string
}

export function ProductStats({
  totalProducts,
  filteredProducts,
  categories,
  className = '',
}: ProductStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between ${className}`}
    >
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">
          显示{' '}
          <span className="font-medium text-gray-900">{filteredProducts}</span>{' '}
          个产品
          {filteredProducts !== totalProducts && (
            <span> / 共 {totalProducts} 个</span>
          )}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <span className="text-sm text-gray-500">分类：</span>
          <div className="flex gap-1">
            {categories.slice(1).map((category) => (
              <span
                key={category}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">排序：</span>
        <select className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="popularity">人气排序</option>
          <option value="name">名称排序</option>
          <option value="price">价格排序</option>
          <option value="newest">最新上架</option>
        </select>
      </div>
    </motion.div>
  )
}

/**
 * 产品加载骨架屏组件
 */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200"
        >
          {/* 图片骨架 */}
          <div className="h-48 animate-pulse bg-gray-200" />

          {/* 内容骨架 */}
          <div className="space-y-3 p-4">
            <div className="flex items-start justify-between">
              <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-5 w-12 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="flex gap-2">
              <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
              <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
              <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
            </div>

            <div className="flex gap-2">
              <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <div className="mb-1 h-6 w-20 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
