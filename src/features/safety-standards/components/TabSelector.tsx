'use client'

import { motion } from 'framer-motion'
import { TabSelectorProps } from '../types'

/**
 * 标签选择器组件
 * 用于切换不同的安全标准展示模式
 */
export function TabSelector({
  activeTab,
  onTabChange,
  className = '',
}: TabSelectorProps) {
  const tabs = [
    {
      id: 'certifications' as const,
      label: '安全认证',
      description: '查看所有安全认证',
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      id: 'reports' as const,
      label: '检验报告',
      description: '查看检验测试报告',
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
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: 'timeline' as const,
      label: '安全时间线',
      description: '查看安全事件时间线',
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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
      {/* 桌面版标签选择器 */}
      <div className="hidden sm:block">
        <div className="rounded-xl bg-white p-2 shadow-sm ring-1 ring-gray-200">
          <div className="grid grid-cols-3 gap-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative rounded-lg p-4 text-left transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                whileHover={{ scale: activeTab === tab.id ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`mb-2 ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`}
                  >
                    {tab.icon}
                  </div>
                  <span className="mb-1 text-sm font-medium">{tab.label}</span>
                  <span
                    className={`text-xs ${
                      activeTab === tab.id ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {tab.description}
                  </span>
                </div>

                {/* 选中指示器 */}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
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

      {/* 移动版标签选择器 */}
      <div className="sm:hidden">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
          <div className="grid grid-cols-1 gap-0">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`p-4 text-left transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${index < tabs.length - 1 ? 'border-b border-gray-200' : ''}`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`}
                  >
                    {tab.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{tab.label}</div>
                    <div
                      className={`text-xs ${
                        activeTab === tab.id ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {tab.description}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
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
          {activeTab === 'certifications' &&
            '查看我们获得的所有安全认证和质量标准'}
          {activeTab === 'reports' && '查看最新的检验测试报告和安全检测结果'}
          {activeTab === 'timeline' && '了解我们在安全管理方面的重要里程碑'}
        </p>
      </motion.div>
    </motion.div>
  )
}

/**
 * 简化版标签选择器
 * 用于空间受限的场景
 */
interface CompactTabSelectorProps {
  activeTab: 'certifications' | 'reports' | 'timeline'
  onTabChange: (tab: 'certifications' | 'reports' | 'timeline') => void
  className?: string
}

export function CompactTabSelector({
  activeTab,
  onTabChange,
  className = '',
}: CompactTabSelectorProps) {
  const tabLabels = {
    certifications: '认证',
    reports: '报告',
    timeline: '时间线',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex rounded-lg bg-gray-100 p-1 ${className}`}
    >
      {Object.entries(tabLabels).map(([tab, label]) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab as any)}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
            activeTab === tab
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
