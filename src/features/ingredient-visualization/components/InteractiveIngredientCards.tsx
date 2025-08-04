'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { InteractiveIngredientCardProps, Ingredient } from '../types'
import {
  BeakerIcon,
  SparklesIcon,
  CubeIcon,
  HeartIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline'

/**
 * 交互式成分卡片组件
 * 以卡片形式展示成分信息，支持展开查看详情
 */
export function InteractiveIngredientCard({ 
  ingredient, 
  index, 
  isExpanded = false, 
  onToggle,
  className = '' 
}: InteractiveIngredientCardProps) {
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'protein':
        return <BeakerIcon className="h-5 w-5" />
      case 'vegetable':
        return <SparklesIcon className="h-5 w-5" />
      case 'grain':
        return <CubeIcon className="h-5 w-5" />
      case 'supplement':
        return <HeartIcon className="h-5 w-5" />
      default:
        return <ArchiveBoxIcon className="h-5 w-5" />
    }
  }

  const getFreshnessIcon = (freshness: string) => {
    switch (freshness) {
      case 'fresh':
        return <SparklesIcon className="h-4 w-4" />
      case 'frozen':
        return <CubeIcon className="h-4 w-4" />
      case 'dried':
        return <ArchiveBoxIcon className="h-4 w-4" />
      default:
        return <ArchiveBoxIcon className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'protein':
        return 'from-blue-500 to-blue-600'
      case 'vegetable':
        return 'from-green-500 to-green-600'
      case 'grain':
        return 'from-yellow-500 to-yellow-600'
      case 'supplement':
        return 'from-purple-500 to-purple-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-white rounded-xl shadow-sm ring-1 ring-gray-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md ${className}`}
      onClick={() => onToggle?.(index)}
      whileHover={{ y: -2 }}
    >
      {/* 卡片头部 */}
      <div className={`bg-gradient-to-r ${getCategoryColor(ingredient.category)} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getCategoryIcon(ingredient.category)}</span>
            <div>
              <h3 className="font-bold text-lg">{ingredient.name}</h3>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <span>{getFreshnessIcon(ingredient.freshness)}</span>
                <span>
                  {ingredient.freshness === 'fresh' ? '新鲜' :
                   ingredient.freshness === 'frozen' ? '冷冻' : '干燥'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold">{ingredient.percentage}%</div>
            <div className="text-sm opacity-90">{ingredient.weight}g</div>
          </div>
        </div>
      </div>

      {/* 卡片内容 */}
      <div className="p-4">
        {/* 基本信息 */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{ingredient.protein}g</div>
            <div className="text-xs text-gray-600">蛋白质</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{ingredient.weight}g</div>
            <div className="text-xs text-gray-600">重量</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{ingredient.percentage}%</div>
            <div className="text-xs text-gray-600">比例</div>
          </div>
        </div>

        {/* 营养益处预览 */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">主要益处</div>
          <div className="flex flex-wrap gap-1">
            {ingredient.benefits.slice(0, 2).map((benefit, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {benefit}
              </span>
            ))}
            {ingredient.benefits.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{ingredient.benefits.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* 展开/收起指示器 */}
        <div className="flex items-center justify-center">
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-400"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* 展开的详细信息 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 bg-gray-50 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* 完整营养益处 */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">所有营养益处</div>
                <div className="flex flex-wrap gap-2">
                  {ingredient.benefits.map((benefit, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {benefit}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* 来源信息 */}
              {ingredient.source && (
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">来源</div>
                  <div className="text-sm text-gray-600">{ingredient.source}</div>
                </div>
              )}

              {/* 营养密度指示器 */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">营养密度</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(ingredient.category)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((ingredient.protein / ingredient.weight) * 100 * 5, 100)}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">
                    {Math.round((ingredient.protein / ingredient.weight) * 100)}%
                  </span>
                </div>
              </div>

              {/* 品质指标 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {ingredient.freshness === 'fresh' ? 'A+' :
                     ingredient.freshness === 'frozen' ? 'A' : 'B+'}
                  </div>
                  <div className="text-xs text-gray-600">新鲜度</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {ingredient.category === 'protein' ? 'A+' :
                     ingredient.category === 'vegetable' ? 'A' : 'B+'}
                  </div>
                  <div className="text-xs text-gray-600">营养价值</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/**
 * 成分卡片网格组件
 * 管理多个成分卡片的展示和交互
 */
interface IngredientCardsGridProps {
  ingredients: Ingredient[]
  className?: string
}

export function IngredientCardsGrid({ ingredients, className = '' }: IngredientCardsGridProps) {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  const handleToggle = (index: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ingredients.map((ingredient, index) => (
          <InteractiveIngredientCard
            key={ingredient.name}
            ingredient={ingredient}
            index={index}
            isExpanded={expandedCards.has(index)}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {/* 操作提示 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-gray-600">
          点击卡片查看详细的营养信息和来源说明
        </p>
      </motion.div>
    </div>
  )
}
