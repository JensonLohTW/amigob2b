'use client'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface Ingredient {
  name: string
  weight: number
  percentage: number
  protein: number
  benefits: string[]
  color: string
}

interface Recipe {
  name: string
  totalWeight: number
  ingredients: Ingredient[]
  nutritionSummary: {
    protein: number
    fat: number
    carbs: number
    fiber: number
    moisture: number
  }
}

const freshFoodRecipe: Recipe = {
  name: '成犬鮮食便當',
  totalWeight: 200,
  ingredients: [
    {
      name: '新鮮雞胸肉',
      weight: 74,
      percentage: 37,
      protein: 23,
      benefits: ['優質完全蛋白質', '必需胺基酸完整', '易消化吸收'],
      color: '#f87171',
    },
    {
      name: '鮭魚肉',
      weight: 30,
      percentage: 15,
      protein: 6,
      benefits: ['Omega-3 脂肪酸', '促進毛髮光澤', '抗發炎'],
      color: '#fb923c',
    },
    {
      name: '地瓜',
      weight: 40,
      percentage: 20,
      protein: 1.6,
      benefits: ['複合碳水化合物', '膳食纖維', '維生素A'],
      color: '#fbbf24',
    },
    {
      name: '胡蘿蔔',
      weight: 20,
      percentage: 10,
      protein: 0.9,
      benefits: ['β-胡蘿蔔素', '維生素K', '抗氧化'],
      color: '#f97316',
    },
    {
      name: '菠菜',
      weight: 16,
      percentage: 8,
      protein: 2.9,
      benefits: ['葉酸', '鐵質', '維生素K'],
      color: '#22c55e',
    },
    {
      name: '亞麻籽油',
      weight: 6,
      percentage: 3,
      protein: 0,
      benefits: ['植物性Omega-3', '維生素E', '必需脂肪酸'],
      color: '#eab308',
    },
    {
      name: '綜合維生素',
      weight: 14,
      percentage: 7,
      protein: 0,
      benefits: ['維生素B群', '礦物質', '營養平衡'],
      color: '#8b5cf6',
    },
  ],
  nutritionSummary: {
    protein: 32,
    fat: 12,
    carbs: 8,
    fiber: 4,
    moisture: 72,
  },
}

const PieChart = ({ ingredients }: { ingredients: Ingredient[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  let cumulativePercentage = 0

  return (
    <div className="relative">
      <svg className="h-80 w-80" viewBox="0 0 200 200">
        {ingredients.map((ingredient, index) => {
          const startAngle = (cumulativePercentage / 100) * 360
          const endAngle =
            ((cumulativePercentage + ingredient.percentage) / 100) * 360
          const largeArcFlag = ingredient.percentage > 50 ? 1 : 0

          const startAngleRad = (startAngle - 90) * (Math.PI / 180)
          const endAngleRad = (endAngle - 90) * (Math.PI / 180)

          const x1 = 100 + 80 * Math.cos(startAngleRad)
          const y1 = 100 + 80 * Math.sin(startAngleRad)
          const x2 = 100 + 80 * Math.cos(endAngleRad)
          const y2 = 100 + 80 * Math.sin(endAngleRad)

          const pathData = [
            `M 100 100`,
            `L ${x1} ${y1}`,
            `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z',
          ].join(' ')

          cumulativePercentage += ingredient.percentage

          return (
            <motion.path
              key={ingredient.name}
              d={pathData}
              fill={ingredient.color}
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer"
              initial={{ scale: 0 }}
              animate={{
                scale: hoveredIndex === index ? 1.05 : 1,
                opacity:
                  hoveredIndex !== null && hoveredIndex !== index ? 0.7 : 1,
              }}
              transition={{ duration: 0.3 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            />
          )
        })}

        {/* 中心文字 */}
        <text
          x="100"
          y="95"
          textAnchor="middle"
          className="fill-neutral-950 text-sm font-semibold"
        >
          總重量
        </text>
        <text
          x="100"
          y="110"
          textAnchor="middle"
          className="fill-neutral-950 text-lg font-bold"
        >
          {freshFoodRecipe.totalWeight}g
        </text>
      </svg>

      {/* 懸停信息 */}
      {hoveredIndex !== null && (
        <motion.div
          className="absolute top-4 right-4 max-w-xs rounded-lg bg-white p-4 shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <h4 className="mb-2 font-semibold text-neutral-950">
            {ingredients[hoveredIndex].name}
          </h4>
          <div className="space-y-1 text-sm text-neutral-600">
            <div>
              重量: {ingredients[hoveredIndex].weight}g (
              {ingredients[hoveredIndex].percentage}%)
            </div>
            <div>蛋白質: {ingredients[hoveredIndex].protein}g</div>
          </div>
          <div className="mt-2">
            <div className="mb-1 text-xs font-medium text-neutral-950">
              營養益處:
            </div>
            <ul className="space-y-1 text-xs text-neutral-600">
              {ingredients[hoveredIndex].benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center">
                  <div className="mr-2 h-1 w-1 rounded-full bg-neutral-400"></div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  )
}

const IngredientList = ({ ingredients }: { ingredients: Ingredient[] }) => {
  return (
    <div className="space-y-3">
      {ingredients.map((ingredient, index) => (
        <motion.div
          key={ingredient.name}
          className="flex items-center rounded-lg bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div
            className="mr-3 h-4 w-4 rounded-full"
            style={{ backgroundColor: ingredient.color }}
          ></div>
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between">
              <h4 className="font-medium text-neutral-950">
                {ingredient.name}
              </h4>
              <div className="text-sm text-neutral-600">
                {ingredient.weight}g ({ingredient.percentage}%)
              </div>
            </div>
            <div className="text-xs text-neutral-500">
              蛋白質: {ingredient.protein}g
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const NutritionBreakdown = ({
  nutrition,
}: {
  nutrition: Recipe['nutritionSummary']
}) => {
  const nutrients = [
    { name: '蛋白質', value: nutrition.protein, color: '#ef4444', unit: '%' },
    { name: '脂肪', value: nutrition.fat, color: '#f97316', unit: '%' },
    { name: '碳水化合物', value: nutrition.carbs, color: '#eab308', unit: '%' },
    { name: '纖維', value: nutrition.fiber, color: '#22c55e', unit: '%' },
    { name: '水分', value: nutrition.moisture, color: '#3b82f6', unit: '%' },
  ]

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h3 className="mb-6 text-lg font-semibold text-neutral-950">
        營養成分分析
      </h3>
      <div className="space-y-4">
        {nutrients.map((nutrient, index) => (
          <div key={nutrient.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-950">
                {nutrient.name}
              </span>
              <span className="text-sm text-neutral-600">
                {nutrient.value}
                {nutrient.unit}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-neutral-200">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: nutrient.color }}
                initial={{ width: 0 }}
                animate={{ width: `${nutrient.value}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-green-50 p-4">
        <h4 className="mb-2 font-medium text-green-800">營養特色</h4>
        <ul className="space-y-1 text-sm text-green-700">
          <li>• 高蛋白質含量，支持肌肉發育</li>
          <li>• 適量脂肪，提供必需脂肪酸</li>
          <li>• 高水分含量，促進腎臟健康</li>
          <li>• 天然纖維，改善消化系統</li>
        </ul>
      </div>
    </div>
  )
}

const InteractiveIngredientCard = ({
  ingredient,
  index,
}: {
  ingredient: Ingredient
  index: number
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="cursor-pointer rounded-xl bg-white p-4 shadow-lg"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setIsExpanded(!isExpanded)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center">
          <div
            className="mr-3 h-6 w-6 rounded-full"
            style={{ backgroundColor: ingredient.color }}
          ></div>
          <h3 className="font-semibold text-neutral-950">{ingredient.name}</h3>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-neutral-950">
            {ingredient.weight}g
          </div>
          <div className="text-sm text-neutral-600">
            {ingredient.percentage}%
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="mb-1 text-sm text-neutral-600">蛋白質含量</div>
        <div className="h-2 w-full rounded-full bg-neutral-200">
          <motion.div
            className="h-2 rounded-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${(ingredient.protein / 25) * 100}%` }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          />
        </div>
        <div className="mt-1 text-xs text-neutral-500">
          {ingredient.protein}g
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="border-t border-neutral-200 pt-3">
          <h4 className="mb-2 text-sm font-medium text-neutral-950">
            營養益處
          </h4>
          <ul className="space-y-1">
            {ingredient.benefits.map((benefit, idx) => (
              <li
                key={idx}
                className="flex items-center text-xs text-neutral-600"
              >
                <svg
                  className="mr-2 h-3 w-3 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="mt-3 text-center">
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="mx-auto h-4 w-4 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function IngredientVisualization() {
  const [activeView, setActiveView] = useState<'pie' | 'list' | 'cards'>('pie')

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="成分可視化"
        title="透明食材，營養看得見"
        className="mb-16"
      >
        <p>
          每一份鮮食便當的成分配比都經過精密計算，
          點擊互動圖表深入了解各種食材的營養價值和健康益處。
        </p>
      </SectionIntro>

      {/* 視圖切換 */}
      <FadeIn className="mb-8">
        <div className="flex justify-center">
          <div className="rounded-lg bg-neutral-100 p-1">
            <button
              onClick={() => setActiveView('pie')}
              className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                activeView === 'pie'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              配比圓餅圖
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                activeView === 'list'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              成分列表
            </button>
            <button
              onClick={() => setActiveView('cards')}
              className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                activeView === 'cards'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              互動卡片
            </button>
          </div>
        </div>
      </FadeIn>

      {/* 內容區域 */}
      {activeView === 'pie' && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <FadeIn className="flex justify-center">
            <PieChart ingredients={freshFoodRecipe.ingredients} />
          </FadeIn>
          <FadeIn>
            <NutritionBreakdown nutrition={freshFoodRecipe.nutritionSummary} />
          </FadeIn>
        </div>
      )}

      {activeView === 'list' && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="rounded-2xl bg-neutral-50 p-6">
              <h3 className="mb-6 text-lg font-semibold text-neutral-950">
                食材清單
              </h3>
              <IngredientList ingredients={freshFoodRecipe.ingredients} />
            </div>
          </FadeIn>
          <FadeIn>
            <NutritionBreakdown nutrition={freshFoodRecipe.nutritionSummary} />
          </FadeIn>
        </div>
      )}

      {activeView === 'cards' && (
        <FadeInStagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {freshFoodRecipe.ingredients.map((ingredient, index) => (
            <FadeIn key={ingredient.name}>
              <InteractiveIngredientCard
                ingredient={ingredient}
                index={index}
              />
            </FadeIn>
          ))}
        </FadeInStagger>
      )}

      {/* 品質保證 */}
      <FadeIn className="mt-16">
        <div className="rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-8">
          <h3 className="mb-6 text-center text-xl font-semibold text-neutral-950">
            食材品質保證
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="mb-2 font-semibold text-neutral-950">人食等級</h4>
              <p className="text-sm text-neutral-600">
                所有食材均符合人類食品安全標準， 可追溯來源，品質有保障
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="mb-2 font-semibold text-neutral-950">新鮮直送</h4>
              <p className="text-sm text-neutral-600">
                當日製作，冷鏈配送， 確保食材新鮮度和營養價值
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <svg
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h4 className="mb-2 font-semibold text-neutral-950">科學配方</h4>
              <p className="text-sm text-neutral-600">
                獸醫師和營養師聯合調配， 確保營養均衡和適口性
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
