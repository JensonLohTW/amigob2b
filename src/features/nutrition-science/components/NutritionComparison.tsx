'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, NutritionStatsCard } from './BarChart'
import { NutritionComparisonProps } from '../types'
import {
  calculateNutritionSummary,
  getCategoryLabels,
} from '../data/nutrition-data'

/**
 * 营养对比组件
 * 展示详细的营养成分对比图表
 */
export function NutritionComparison({
  data,
  className = '',
}: NutritionComparisonProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const summary = calculateNutritionSummary()
  const categoryLabels = getCategoryLabels()

  // 根据选择的分类筛选数据
  const filteredData =
    selectedCategory === 'all'
      ? data
      : data.filter((item) => item.category === selectedCategory)

  const categories = ['all', ...new Set(data.map((item) => item.category))]

  return (
    <div className={`${className}`}>
      {/* 统计卡片 */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <NutritionStatsCard
          title="营养指标"
          value={summary.totalNutrients}
          description="项专业检测"
          icon={
            <svg
              className="h-6 w-6 text-white"
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
          }
          color="bg-blue-500"
        />

        <NutritionStatsCard
          title="平均优势"
          value={`${summary.averageImprovement}%`}
          description="鲜食营养优势"
          icon={
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          }
          color="bg-green-500"
        />

        <NutritionStatsCard
          title="显著差异"
          value={summary.significantDifferences}
          description="项营养指标"
          icon={
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v13m0-13V6a2 2 0 112 0v1m-2 0V6a2 2 0 00-2 0v1m2 0V9.5m0 0v3m0-3h3m-3 0h-3"
              />
            </svg>
          }
          color="bg-orange-500"
        />

        <NutritionStatsCard
          title="最佳分类"
          value={categoryLabels[summary.bestCategory] || summary.bestCategory}
          description="营养优势最明显"
          icon={
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          }
          color="bg-purple-500"
        />
      </div>

      {/* 分类筛选器 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700">筛选分类：</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {categoryLabels[category] || category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* 营养对比图表 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredData.map((item, index) => (
          <BarChart key={item.nutrient} data={item} index={index} />
        ))}
      </div>

      {/* 科学说明 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-xl font-bold text-gray-900">
              科学研究支持
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                以上数据来自多项同行评议的科学研究，采用标准化的实验室检测方法。
                所有对比均基于相同的营养密度基础进行计算。
              </p>
              <p>鲜食的营养优势主要体现在：</p>
              <ul className="ml-4 list-inside list-disc space-y-1">
                <li>最小化加工过程保留更多天然营养素</li>
                <li>新鲜食材提供更高的生物利用率</li>
                <li>避免高温处理对热敏感营养素的破坏</li>
                <li>天然水分含量有助于营养吸收</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
