'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { BarChartProps } from '../types'

/**
 * 营养对比条形图组件
 * 展示鲜食与干粮的营养成分对比
 */
export function BarChart({ data, index, className = '' }: BarChartProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const controls = useAnimation()

  const maxValue = Math.max(data.freshFood, data.dryFood)
  const freshPercentage = (data.freshFood / maxValue) * 100
  const dryPercentage = (data.dryFood / maxValue) * 100

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      },
    },
  }

  const barVariants = {
    hidden: { width: 0 },
    visible: {
      width: '100%',
      transition: {
        duration: 1.2,
        delay: index * 0.1 + 0.3,
        ease: 'easeOut',
      },
    },
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'protein':
        return 'from-red-500 to-red-600'
      case 'vitamin':
        return 'from-yellow-500 to-orange-500'
      case 'mineral':
        return 'from-blue-500 to-blue-600'
      case 'overall':
        return 'from-green-500 to-green-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getImprovementPercentage = () => {
    return Math.round(((data.freshFood - data.dryFood) / data.dryFood) * 100)
  }

  const improvement = getImprovementPercentage()

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className={`rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 ${className}`}
    >
      {/* 营养素标题 */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {data.nutrient}
          </h3>
          <p className="text-sm text-gray-600">{data.description}</p>
        </div>

        {improvement > 0 && (
          <div className="text-right">
            <div className="text-sm text-gray-500">鲜食优势</div>
            <div className="text-lg font-bold text-green-600">
              +{improvement}%
            </div>
          </div>
        )}
      </div>

      {/* 条形图 */}
      <div className="mb-4 space-y-4">
        {/* 鲜食条形 */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">鲜食</span>
            <span className="text-sm font-bold text-gray-900">
              {data.freshFood} {data.unit}
            </span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-gray-200">
            <motion.div
              variants={barVariants}
              className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getCategoryColor(data.category)} rounded-full`}
              style={{ width: `${freshPercentage}%` }}
            />
          </div>
        </div>

        {/* 干粮条形 */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">干粮</span>
            <span className="text-sm font-bold text-gray-900">
              {data.dryFood} {data.unit}
            </span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-gray-200">
            <motion.div
              variants={barVariants}
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-gray-400 to-gray-500"
              style={{ width: `${dryPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 数据来源 */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">数据来源：{data.source}</div>
          <div
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              data.category === 'protein'
                ? 'bg-red-100 text-red-800'
                : data.category === 'vitamin'
                  ? 'bg-yellow-100 text-yellow-800'
                  : data.category === 'mineral'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
            }`}
          >
            {data.category === 'protein'
              ? '蛋白质'
              : data.category === 'vitamin'
                ? '维生素'
                : data.category === 'mineral'
                  ? '矿物质'
                  : '整体营养'}
          </div>
        </div>
      </div>

      {/* 悬停效果 */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}

/**
 * 营养统计卡片组件
 * 显示营养对比的统计摘要
 */
interface NutritionStatsCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  color: string
  className?: string
}

export function NutritionStatsCard({
  title,
  value,
  description,
  icon,
  color,
  className = '',
}: NutritionStatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={`rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 ${className}`}
    >
      <div className="flex items-center">
        <div className={`rounded-lg p-3 ${color}`}>{icon}</div>
        <div className="ml-4">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-sm font-medium text-gray-700">{title}</div>
          <div className="text-xs text-gray-500">{description}</div>
        </div>
      </div>
    </motion.div>
  )
}
