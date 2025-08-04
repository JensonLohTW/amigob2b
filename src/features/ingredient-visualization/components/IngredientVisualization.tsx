'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { PieChart } from './PieChart'
import { IngredientList } from './IngredientList'
import { NutritionBreakdown } from './NutritionBreakdown'
import { ViewSelector } from './ViewSelector'
import { IngredientCardsGrid } from './InteractiveIngredientCards'
import { getDefaultRecipe, analyzeIngredients } from '../data/recipes'
import { IngredientVisualizationProps } from '../types'
import {
  SparklesIcon,
  BeakerIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline'

/**
 * 成分可视化主组件
 * 提供多种方式展示和分析配方成分
 */
export function IngredientVisualization({
  recipe = getDefaultRecipe(),
  initialView = 'pie',
  showViewSelector = true,
  className = ''
}: IngredientVisualizationProps) {
  const [activeView, setActiveView] = useState<'pie' | 'list' | 'cards' | 'nutrition'>(initialView)
  const analysis = analyzeIngredients(recipe)

  const handleViewChange = (view: 'pie' | 'list' | 'cards' | 'nutrition') => {
    setActiveView(view)
  }

  return (
    <div className={`bg-white py-24 sm:py-32 ${className}`}>
      <Container>
        <SectionIntro
          eyebrow="成分透明"
          title="配方成分可视化"
          className="mb-16"
        >
          <p>
            完全透明的成分展示，让您清楚了解每一种食材的来源、比例和营养价值。
            我们相信透明度是建立信任的基础。
          </p>
        </SectionIntro>

        {/* 配方信息卡片 */}
        <FadeIn>
          <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {recipe.name}
                </h2>
                <p className="text-gray-600 mb-4 lg:mb-0">
                  {recipe.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {analysis.totalIngredients}
                  </div>
                  <div className="text-sm text-gray-600">种成分</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {analysis.proteinSources}
                  </div>
                  <div className="text-sm text-gray-600">蛋白质来源</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {analysis.averageProtein}g
                  </div>
                  <div className="text-sm text-gray-600">平均蛋白质</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {analysis.nutritionScore}
                  </div>
                  <div className="text-sm text-gray-600">营养评分</div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 视图选择器 */}
        {showViewSelector && (
          <FadeIn>
            <div className="mb-12">
              <ViewSelector
                activeView={activeView}
                onViewChange={handleViewChange}
              />
            </div>
          </FadeIn>
        )}

        {/* 内容区域 */}
        <FadeInStagger>
          <AnimatePresence mode="wait">
            {activeView === 'pie' && (
              <motion.div
                key="pie"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <PieChart
                  ingredients={recipe.ingredients}
                  size={400}
                  showLabels={true}
                  interactive={true}
                />
              </motion.div>
            )}

            {activeView === 'list' && (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <IngredientList
                  ingredients={recipe.ingredients}
                  showDetails={true}
                  sortBy="percentage"
                />
              </motion.div>
            )}

            {activeView === 'cards' && (
              <motion.div
                key="cards"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <IngredientCardsGrid ingredients={recipe.ingredients} />
              </motion.div>
            )}

            {activeView === 'nutrition' && (
              <motion.div
                key="nutrition"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <NutritionBreakdown
                  nutrition={recipe.nutritionSummary}
                  showPercentages={true}
                  layout="horizontal"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </FadeInStagger>

        {/* 主要成分亮点 */}
        <FadeIn>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20"
          >
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                主要成分亮点
              </h3>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                  <motion.div
                    key={ingredient.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="text-center"
                  >
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
                      style={{ backgroundColor: ingredient.color }}
                    >
                      {ingredient.percentage}%
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {ingredient.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {ingredient.benefits[0]}
                    </p>
                    <div className="text-xs text-gray-500">
                      来源：{ingredient.source}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </FadeIn>

        {/* 品质保证 */}
        <FadeIn>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">品质承诺</h3>
                <p className="text-gray-300">
                  每一种成分都经过严格筛选，确保为您的毛孩提供最优质的营养
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                {[
                  { icon: SparklesIcon, title: '天然新鲜', desc: '优选新鲜食材' },
                  { icon: BeakerIcon, title: '科学配比', desc: '营养师精心调配' },
                  { icon: CheckCircleIcon, title: '品质检测', desc: '多重品质把关' },
                  { icon: ClipboardDocumentListIcon, title: '完全透明', desc: '成分来源公开' },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-3">
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-300">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </FadeIn>

        {/* 行动号召 */}
        <FadeIn>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                为您的毛孩选择透明营养
              </h3>
              <p className="text-lg mb-6 opacity-90">
                了解每一种成分，给予最好的关爱
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  查看更多配方
                </button>
                <button className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  咨询营养师
                </button>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </Container>
    </div>
  )
}
