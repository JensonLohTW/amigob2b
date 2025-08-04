'use client'

import { motion } from 'framer-motion'
import { TabSelectorProps } from '../types'

/**
 * 标签选择器组件
 * 用于切换不同的营养展示模式
 */
export function TabSelector({
  selectedTab,
  onTabChange,
  className = '',
}: TabSelectorProps) {
  const tabs = [
    {
      id: 'charts' as const,
      label: '详细对比',
      description: '营养成分逐项对比',
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
    {
      id: 'radar' as const,
      label: '综合评估',
      description: '六维营养雷达图',
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
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
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
      <div className="rounded-xl bg-white p-2 shadow-sm ring-1 ring-gray-200">
        <div className="grid grid-cols-2 gap-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative rounded-lg p-4 text-left transition-all duration-200 ${
                selectedTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              whileHover={{ scale: selectedTab === tab.id ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="mb-2 flex items-center gap-3">
                <div
                  className={`${selectedTab === tab.id ? 'text-white' : 'text-gray-400'}`}
                >
                  {tab.icon}
                </div>
                <span className="font-medium">{tab.label}</span>
              </div>

              <p
                className={`text-sm ${
                  selectedTab === tab.id ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {tab.description}
              </p>

              {/* 选中指示器 */}
              {selectedTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 -z-10 rounded-lg bg-blue-600"
                  initial={false}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 标签说明 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-center"
      >
        <p className="text-sm text-gray-600">
          {selectedTab === 'charts'
            ? '查看每项营养成分的详细对比数据和科学依据'
            : '通过雷达图直观了解鲜食在各营养维度的综合优势'}
        </p>
      </motion.div>
    </motion.div>
  )
}

/**
 * 简化版标签选择器
 * 用于移动端或空间受限的场景
 */
interface CompactTabSelectorProps {
  selectedTab: 'charts' | 'radar'
  onTabChange: (tab: 'charts' | 'radar') => void
  className?: string
}

export function CompactTabSelector({
  selectedTab,
  onTabChange,
  className = '',
}: CompactTabSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex rounded-lg bg-gray-100 p-1 ${className}`}
    >
      <button
        onClick={() => onTabChange('charts')}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
          selectedTab === 'charts'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        详细对比
      </button>
      <button
        onClick={() => onTabChange('radar')}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
          selectedTab === 'radar'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        综合评估
      </button>
    </motion.div>
  )
}
