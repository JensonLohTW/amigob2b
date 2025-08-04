'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CostCalculatorProps } from '../types'
import {
  calculateCost,
  formatCurrency,
  formatWeight,
  getWeightRecommendation,
} from '../services/cost-calculator'

/**
 * 成本计算器组件
 * 允许用户输入宠物体重并计算食品成本对比
 */
export function CostCalculator({
  initialWeight = 10,
  onWeightChange,
}: CostCalculatorProps) {
  const [petWeight, setPetWeight] = useState(initialWeight)
  const calculation = calculateCost(petWeight)
  const weightRec = getWeightRecommendation('dog')

  const handleWeightChange = (weight: number) => {
    setPetWeight(weight)
    onWeightChange?.(weight)
  }

  const costItems = [
    {
      label: '每日食物量',
      value: formatWeight(calculation.dailyPortion),
      description: '根据体重计算的建议食量',
    },
    {
      label: '每日鲜食成本',
      value: formatCurrency(calculation.freshFoodCost),
      description: '新鲜食品的每日费用',
      highlight: true,
    },
    {
      label: '每日干粮成本',
      value: formatCurrency(calculation.dryFoodCost),
      description: '传统干粮的每日费用',
    },
    {
      label: '月度鲜食成本',
      value: formatCurrency(calculation.monthlyFreshFood),
      description: '新鲜食品的月度费用',
      highlight: true,
    },
    {
      label: '月度干粮成本',
      value: formatCurrency(calculation.monthlyDryFood),
      description: '传统干粮的月度费用',
    },
    {
      label: '年度鲜食成本',
      value: formatCurrency(calculation.yearlyFreshFood),
      description: '新鲜食品的年度费用',
      highlight: true,
    },
    {
      label: '年度干粮成本',
      value: formatCurrency(calculation.yearlyDryFood),
      description: '传统干粮的年度费用',
    },
    {
      label: '潜在兽医费节省',
      value: formatCurrency(calculation.potentialVetSavings),
      description: '因健康改善可能节省的兽医费用',
      highlight: true,
      positive: true,
    },
  ]

  return (
    <div className="space-y-8">
      {/* 体重输入控制 */}
      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          宠物体重设置
        </h3>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="pet-weight"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              宠物体重: {petWeight} 公斤
            </label>
            <input
              type="range"
              id="pet-weight"
              min={weightRec.min}
              max={weightRec.max}
              step="0.5"
              value={petWeight}
              onChange={(e) => handleWeightChange(parseFloat(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>{weightRec.min} 公斤</span>
              <span>建议: {weightRec.typical} 公斤</span>
              <span>{weightRec.max} 公斤</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={petWeight}
              onChange={(e) =>
                handleWeightChange(parseFloat(e.target.value) || 0)
              }
              min={weightRec.min}
              max={weightRec.max}
              step="0.1"
              className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <span className="text-sm text-gray-600">公斤</span>
          </div>
        </div>
      </div>

      {/* 成本对比结果 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {costItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`rounded-lg p-4 ${
              item.highlight
                ? item.positive
                  ? 'bg-green-50 ring-1 ring-green-200'
                  : 'bg-blue-50 ring-1 ring-blue-200'
                : 'bg-gray-50 ring-1 ring-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">
                {item.label}
              </h4>
              {item.positive && (
                <svg
                  className="h-4 w-4 text-green-500"
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
              )}
            </div>
            <p
              className={`mt-1 text-lg font-semibold ${
                item.highlight
                  ? item.positive
                    ? 'text-green-600'
                    : 'text-blue-600'
                  : 'text-gray-900'
              }`}
            >
              {item.value}
            </p>
            <p className="mt-1 text-xs text-gray-500">{item.description}</p>
          </motion.div>
        ))}
      </div>

      {/* 成本对比总结 */}
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          成本分析总结
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(
                calculation.yearlyFreshFood - calculation.yearlyDryFood,
              )}
            </div>
            <div className="text-sm text-gray-600">年度食品成本差异</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(calculation.potentialVetSavings)}
            </div>
            <div className="text-sm text-gray-600">潜在兽医费节省</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {formatCurrency(
                calculation.potentialVetSavings -
                  (calculation.yearlyFreshFood - calculation.yearlyDryFood),
              )}
            </div>
            <div className="text-sm text-gray-600">净节省 (含健康效益)</div>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-white p-4">
          <p className="text-sm text-gray-700">
            <strong>分析结果:</strong>
            虽然鲜食的直接成本较高，但考虑到健康改善带来的兽医费用节省，
            长期来看可能实现净节省。更重要的是，您的宠物将获得更好的营养和健康。
          </p>
        </div>
      </div>
    </div>
  )
}
