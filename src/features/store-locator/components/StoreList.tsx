'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StoreListProps } from '../types'
import { StoreCard, StoreCardSkeleton } from './StoreCard'

/**
 * 门店列表组件
 * 展示门店列表，支持不同的展示模式
 */
export function StoreList({
  stores,
  onStoreSelect,
  loading = false,
  className = '',
}: StoreListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // 分页逻辑
  const totalPages = Math.ceil(stores.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentStores = stores.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // 滚动到列表顶部
    document
      .getElementById('store-list-top')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleStoreSelect = (store: any) => {
    onStoreSelect?.(store)
  }

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <StoreCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (stores.length === 0) {
    return (
      <div className={`${className}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-12 text-center"
        >
          <div className="mb-4 text-6xl">🏪</div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            没有找到符合条件的门店
          </h3>
          <p className="mb-6 text-gray-600">请尝试调整搜索条件或扩大搜索范围</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700">
              重置搜索条件
            </button>
            <button className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50">
              查看所有门店
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <div id="store-list-top" />

      {/* 列表头部 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            找到 {stores.length} 家门店
          </h2>
          <p className="text-sm text-gray-600">
            第 {startIndex + 1}-{Math.min(endIndex, stores.length)} 家，共{' '}
            {stores.length} 家
          </p>
        </div>

        {/* 视图切换 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">视图：</span>
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-md px-3 py-1 text-sm transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-md px-3 py-1 text-sm transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 门店列表 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
              : 'space-y-4'
          }
        >
          {currentStores.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <StoreCard
                store={store}
                onSelect={handleStoreSelect}
                showDistance={true}
                className={viewMode === 'list' ? 'flex-row' : ''}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* 分页 */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex items-center justify-center"
        >
          <nav className="flex items-center gap-2">
            {/* 上一页 */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              上一页
            </button>

            {/* 页码 */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // 显示逻辑：当前页前后各2页
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              } else if (page === currentPage - 3 || page === currentPage + 3) {
                return (
                  <span key={page} className="px-2 py-2 text-gray-500">
                    ...
                  </span>
                )
              }
              return null
            })}

            {/* 下一页 */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              下一页
            </button>
          </nav>
        </motion.div>
      )}

      {/* 页面信息 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4 text-center"
      >
        <p className="text-sm text-gray-600">
          显示第 {startIndex + 1}-{Math.min(endIndex, stores.length)} 家门店，
          共 {stores.length} 家门店，第 {currentPage} 页，共 {totalPages} 页
        </p>
      </motion.div>
    </div>
  )
}

/**
 * 门店统计组件
 */
interface StoreStatsProps {
  stores: any[]
  className?: string
}

export function StoreStats({ stores, className = '' }: StoreStatsProps) {
  const activeStores = stores.filter(
    (store) => store.status === 'active',
  ).length
  const averageRating =
    stores.reduce((sum, store) => sum + store.rating, 0) / stores.length
  const cities = new Set(stores.map((store) => store.city)).size

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 ${className}`}
    >
      <h3 className="mb-4 text-lg font-semibold text-gray-900">门店统计</h3>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {stores.length}
          </div>
          <div className="text-sm text-gray-600">总门店数</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {activeStores}
          </div>
          <div className="text-sm text-gray-600">营业中</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{cities}</div>
          <div className="text-sm text-gray-600">覆盖城市</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {averageRating ? averageRating.toFixed(1) : '0.0'}
          </div>
          <div className="text-sm text-gray-600">平均评分</div>
        </div>
      </div>
    </motion.div>
  )
}
