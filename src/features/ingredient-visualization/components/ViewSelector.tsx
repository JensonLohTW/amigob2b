'use client'

import { motion } from 'framer-motion'
import { ViewSelectorProps } from '../types'

/**
 * 视图选择器组件
 * 用于切换不同的成分展示模式
 */
export function ViewSelector({
  activeView,
  onViewChange,
  className = '',
}: ViewSelectorProps) {
  const views = [
    {
      id: 'pie' as const,
      label: '饼图视图',
      description: '直观的比例展示',
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
          />
        </svg>
      ),
    },
    {
      id: 'list' as const,
      label: '列表视图',
      description: '详细的成分信息',
      icon: (
        <svg
          className="h-5 w-5"
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
      ),
    },
    {
      id: 'cards' as const,
      label: '卡片视图',
      description: '交互式成分卡片',
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      id: 'nutrition' as const,
      label: '营养分析',
      description: '营养成分分解',
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${className}`}
    >
      {/* 桌面版视图选择器 */}
      <div className="hidden sm:block">
        <div className="rounded-xl bg-white p-2 shadow-sm ring-1 ring-gray-200">
          <div className="grid grid-cols-4 gap-2">
            {views.map((view) => (
              <motion.button
                key={view.id}
                onClick={() => onViewChange(view.id)}
                className={`relative rounded-lg p-4 text-left transition-all duration-200 ${
                  activeView === view.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                whileHover={{ scale: activeView === view.id ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`mb-2 ${activeView === view.id ? 'text-white' : 'text-gray-400'}`}
                  >
                    {view.icon}
                  </div>
                  <span className="mb-1 text-sm font-medium">{view.label}</span>
                  <span
                    className={`text-xs ${
                      activeView === view.id ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {view.description}
                  </span>
                </div>

                {/* 选中指示器 */}
                {activeView === view.id && (
                  <motion.div
                    layoutId="activeViewIndicator"
                    className="absolute inset-0 -z-10 rounded-lg bg-blue-600"
                    initial={false}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* 移动版视图选择器 */}
      <div className="sm:hidden">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
          <div className="grid grid-cols-2 gap-0">
            {views.map((view, index) => (
              <motion.button
                key={view.id}
                onClick={() => onViewChange(view.id)}
                className={`p-4 text-left transition-all duration-200 ${
                  activeView === view.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${index % 2 === 0 ? 'border-r border-gray-200' : ''} ${
                  index < 2 ? 'border-b border-gray-200' : ''
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`${activeView === view.id ? 'text-white' : 'text-gray-400'}`}
                  >
                    {view.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{view.label}</div>
                    <div
                      className={`text-xs ${
                        activeView === view.id
                          ? 'text-blue-100'
                          : 'text-gray-500'
                      }`}
                    >
                      {view.description}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* 视图说明 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-center"
      >
        <p className="text-sm text-gray-600">
          {activeView === 'pie' && '通过饼图直观展示各成分的重量比例'}
          {activeView === 'list' && '以表格形式展示所有成分的详细信息'}
          {activeView === 'cards' && '交互式卡片展示每个成分的营养益处'}
          {activeView === 'nutrition' && '深入分析配方的营养成分构成'}
        </p>
      </motion.div>
    </motion.div>
  )
}

/**
 * 简化版视图选择器
 * 用于空间受限的场景
 */
interface CompactViewSelectorProps {
  activeView: 'pie' | 'list' | 'cards' | 'nutrition'
  onViewChange: (view: 'pie' | 'list' | 'cards' | 'nutrition') => void
  className?: string
}

export function CompactViewSelector({
  activeView,
  onViewChange,
  className = '',
}: CompactViewSelectorProps) {
  const viewLabels = {
    pie: '饼图',
    list: '列表',
    cards: '卡片',
    nutrition: '营养',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex rounded-lg bg-gray-100 p-1 ${className}`}
    >
      {Object.entries(viewLabels).map(([view, label]) => (
        <button
          key={view}
          onClick={() => onViewChange(view as any)}
          className={`rounded-md px-3 py-2 text-sm font-medium transition-all ${
            activeView === view
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {label}
        </button>
      ))}
    </motion.div>
  )
}
