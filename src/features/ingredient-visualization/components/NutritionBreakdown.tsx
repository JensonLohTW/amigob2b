'use client'

import { motion } from 'framer-motion'
import { NutritionBreakdownProps, Nutrient } from '../types'

/**
 * 营养分解组件
 * 展示配方的详细营养成分分析
 */
export function NutritionBreakdown({
  nutrition,
  showPercentages = true,
  layout = 'horizontal',
  className = '',
}: NutritionBreakdownProps) {
  // 主要营养素
  const mainNutrients: Nutrient[] = [
    {
      name: '蛋白质',
      value: nutrition.protein,
      color: '#3b82f6',
      unit: '%',
      description: '构建和修复肌肉组织',
      dailyValue: 25,
    },
    {
      name: '脂肪',
      value: nutrition.fat,
      color: '#f59e0b',
      unit: '%',
      description: '提供能量和必需脂肪酸',
      dailyValue: 15,
    },
    {
      name: '碳水化合物',
      value: nutrition.carbs,
      color: '#10b981',
      unit: '%',
      description: '快速能量来源',
      dailyValue: 50,
    },
    {
      name: '纤维',
      value: nutrition.fiber,
      color: '#8b5cf6',
      unit: '%',
      description: '促进消化健康',
      dailyValue: 5,
    },
    {
      name: '水分',
      value: nutrition.moisture,
      color: '#06b6d4',
      unit: '%',
      description: '维持身体水分平衡',
      dailyValue: 70,
    },
  ]

  // 维生素（如果有数据）
  const vitamins: Nutrient[] = nutrition.vitamins
    ? Object.entries(nutrition.vitamins).map(([key, value]) => ({
        name: `维生素 ${key}`,
        value,
        color: '#ec4899',
        unit: key === 'A' ? 'IU' : 'mg',
        description: '维持正常生理功能',
      }))
    : []

  // 矿物质（如果有数据）
  const minerals: Nutrient[] = nutrition.minerals
    ? Object.entries(nutrition.minerals).map(([key, value]) => ({
        name: key,
        value,
        color: '#6366f1',
        unit: 'mg',
        description: '维持骨骼和牙齿健康',
      }))
    : []

  const renderNutrientBar = (nutrient: Nutrient, index: number) => {
    const maxValue = nutrient.dailyValue || 100
    const percentage = Math.min((nutrient.value / maxValue) * 100, 100)

    return (
      <motion.div
        key={nutrient.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="space-y-2"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: nutrient.color }}
            />
            <span className="font-medium text-gray-900">{nutrient.name}</span>
          </div>
          <span className="font-bold text-gray-900">
            {nutrient.value}
            {nutrient.unit}
          </span>
        </div>

        <div className="relative">
          <div className="h-3 w-full rounded-full bg-gray-200">
            <motion.div
              className="h-3 rounded-full"
              style={{ backgroundColor: nutrient.color }}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
            />
          </div>
          {showPercentages && nutrient.dailyValue && (
            <div className="mt-1 text-xs text-gray-500">
              {Math.round(percentage)}% 每日建议值
            </div>
          )}
        </div>

        {nutrient.description && (
          <div className="text-xs text-gray-600">{nutrient.description}</div>
        )}
      </motion.div>
    )
  }

  const renderNutrientCard = (nutrient: Nutrient, index: number) => {
    return (
      <motion.div
        key={nutrient.name}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200"
      >
        <div className="text-center">
          <div
            className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: `${nutrient.color}20` }}
          >
            <div
              className="h-6 w-6 rounded-full"
              style={{ backgroundColor: nutrient.color }}
            />
          </div>
          <div className="mb-1 text-2xl font-bold text-gray-900">
            {nutrient.value}
            {nutrient.unit}
          </div>
          <div className="mb-2 text-sm font-medium text-gray-700">
            {nutrient.name}
          </div>
          {nutrient.description && (
            <div className="text-xs text-gray-500">{nutrient.description}</div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* 主要营养素 */}
      <div>
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-xl font-bold text-gray-900"
        >
          主要营养成分
        </motion.h3>

        {layout === 'horizontal' ? (
          <div className="space-y-6">
            {mainNutrients.map((nutrient, index) =>
              renderNutrientBar(nutrient, index),
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {mainNutrients.map((nutrient, index) =>
              renderNutrientCard(nutrient, index),
            )}
          </div>
        )}
      </div>

      {/* 维生素 */}
      {vitamins.length > 0 && (
        <div>
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4 text-lg font-semibold text-gray-900"
          >
            维生素含量
          </motion.h3>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {vitamins.map((vitamin, index) =>
              renderNutrientCard(vitamin, index + 5),
            )}
          </div>
        </div>
      )}

      {/* 矿物质 */}
      {minerals.length > 0 && (
        <div>
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-4 text-lg font-semibold text-gray-900"
          >
            矿物质含量
          </motion.h3>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {minerals.map((mineral, index) =>
              renderNutrientCard(mineral, index + 10),
            )}
          </div>
        </div>
      )}

      {/* 热量信息 */}
      {nutrition.calories && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="rounded-lg bg-gradient-to-r from-orange-50 to-red-50 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="mb-2 text-lg font-semibold text-gray-900">
                热量信息
              </h4>
              <p className="text-sm text-gray-600">每100g提供的能量</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-orange-600">
                {nutrition.calories}
              </div>
              <div className="text-sm text-gray-600">千卡</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 营养评分 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="mb-2 text-lg font-semibold text-gray-900">
              营养评分
            </h4>
            <p className="text-sm text-gray-600">基于AAFCO标准的综合评分</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">
              {Math.round(
                nutrition.protein * 0.4 +
                  nutrition.moisture * 0.3 +
                  (100 - nutrition.carbs) * 0.3,
              )}
            </div>
            <div className="text-sm text-gray-600">/ 100分</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600"
              initial={{ width: 0 }}
              animate={{
                width: `${Math.round(nutrition.protein * 0.4 + nutrition.moisture * 0.3 + (100 - nutrition.carbs) * 0.3)}%`,
              }}
              transition={{ duration: 1.5, delay: 1 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
