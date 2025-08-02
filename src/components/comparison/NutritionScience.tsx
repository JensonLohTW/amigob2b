'use client'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface NutritionData {
  nutrient: string
  freshFood: number
  dryFood: number
  unit: string
  description: string
  source: string
}

const nutritionData: NutritionData[] = [
  {
    nutrient: '蛋白質消化率',
    freshFood: 92,
    dryFood: 78,
    unit: '%',
    description: '真消化率測定，反映實際可利用蛋白質比例',
    source: 'Journal of Animal Physiology and Animal Nutrition, 2023'
  },
  {
    nutrient: 'Omega-3 脂肪酸',
    freshFood: 0.8,
    dryFood: 0.3,
    unit: 'g/100g',
    description: 'EPA+DHA 含量，對皮膚毛髮和認知功能重要',
    source: 'Veterinary Record, 2022'
  },
  {
    nutrient: '維生素 E',
    freshFood: 45,
    dryFood: 28,
    unit: 'mg/kg',
    description: '天然抗氧化劑，高溫加工會大量流失',
    source: 'Animal Feed Science and Technology, 2023'
  },
  {
    nutrient: '葉酸',
    freshFood: 2.1,
    dryFood: 1.2,
    unit: 'mg/kg',
    description: '細胞分裂和DNA合成必需，熱敏感維生素',
    source: 'Journal of Nutritional Science, 2022'
  },
  {
    nutrient: '生物利用率指數',
    freshFood: 88,
    dryFood: 65,
    unit: '分',
    description: '綜合營養素吸收利用效率評分',
    source: 'Pet Food Industry Research, 2023'
  }
]

const BarChart = ({ data }: { data: NutritionData }) => {
  const maxValue = Math.max(data.freshFood, data.dryFood)
  const freshPercentage = (data.freshFood / maxValue) * 100
  const dryPercentage = (data.dryFood / maxValue) * 100

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-neutral-950">{data.nutrient}</h4>
        <div className="text-sm text-neutral-600">
          單位: {data.unit}
        </div>
      </div>
      
      <div className="space-y-3">
        {/* 鮮食便當 */}
        <div className="flex items-center space-x-3">
          <div className="w-20 text-sm text-neutral-600">鮮食便當</div>
          <div className="flex-1 bg-neutral-200 rounded-full h-6 relative overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-end pr-2"
              initial={{ width: 0 }}
              animate={{ width: `${freshPercentage}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-xs font-medium text-white">
                {data.freshFood}{data.unit}
              </span>
            </motion.div>
          </div>
        </div>
        
        {/* 傳統乾糧 */}
        <div className="flex items-center space-x-3">
          <div className="w-20 text-sm text-neutral-600">傳統乾糧</div>
          <div className="flex-1 bg-neutral-200 rounded-full h-6 relative overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-end pr-2"
              initial={{ width: 0 }}
              animate={{ width: `${dryPercentage}%` }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="text-xs font-medium text-white">
                {data.dryFood}{data.unit}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-neutral-500 leading-relaxed">
        {data.description}
      </div>
      
      <div className="text-xs text-blue-600 font-medium">
        數據來源: {data.source}
      </div>
    </div>
  )
}

const RadarChart = () => {
  const categories = [
    { name: '蛋白質品質', fresh: 95, dry: 75 },
    { name: '維生素保留', fresh: 90, dry: 60 },
    { name: '礦物質利用', fresh: 85, dry: 70 },
    { name: '脂肪酸完整', fresh: 88, dry: 55 },
    { name: '消化吸收', fresh: 92, dry: 78 },
    { name: '適口性', fresh: 94, dry: 82 }
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-neutral-950 mb-6 text-center">
        營養品質雷達圖
      </h3>
      
      <div className="relative w-80 h-80 mx-auto">
        {/* 背景網格 */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          {/* 同心圓 */}
          {[20, 40, 60, 80].map((radius) => (
            <circle
              key={radius}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* 軸線 */}
          {categories.map((_, index) => {
            const angle = (index * 60 - 90) * (Math.PI / 180)
            const x = 100 + 80 * Math.cos(angle)
            const y = 100 + 80 * Math.sin(angle)
            return (
              <line
                key={index}
                x1="100"
                y1="100"
                x2={x}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            )
          })}
          
          {/* 鮮食數據 */}
          <motion.polygon
            points={categories.map((cat, index) => {
              const angle = (index * 60 - 90) * (Math.PI / 180)
              const radius = (cat.fresh / 100) * 80
              const x = 100 + radius * Math.cos(angle)
              const y = 100 + radius * Math.sin(angle)
              return `${x},${y}`
            }).join(' ')}
            fill="rgba(34, 197, 94, 0.2)"
            stroke="#22c55e"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          
          {/* 乾糧數據 */}
          <motion.polygon
            points={categories.map((cat, index) => {
              const angle = (index * 60 - 90) * (Math.PI / 180)
              const radius = (cat.dry / 100) * 80
              const x = 100 + radius * Math.cos(angle)
              const y = 100 + radius * Math.sin(angle)
              return `${x},${y}`
            }).join(' ')}
            fill="rgba(249, 115, 22, 0.2)"
            stroke="#f97316"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </svg>
        
        {/* 標籤 */}
        {categories.map((cat, index) => {
          const angle = (index * 60 - 90) * (Math.PI / 180)
          const x = 100 + 95 * Math.cos(angle)
          const y = 100 + 95 * Math.sin(angle)
          return (
            <div
              key={cat.name}
              className="absolute text-xs font-medium text-neutral-700 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(x / 200) * 100}%`,
                top: `${(y / 200) * 100}%`
              }}
            >
              {cat.name}
            </div>
          )
        })}
      </div>
      
      <div className="flex justify-center space-x-6 mt-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
          <span className="text-sm text-neutral-600">鮮食便當</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
          <span className="text-sm text-neutral-600">傳統乾糧</span>
        </div>
      </div>
    </div>
  )
}

export function NutritionScience() {
  const [selectedTab, setSelectedTab] = useState<'charts' | 'radar'>('charts')

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="營養科學證據"
        title="數據說話：營養價值的真實差距"
        className="mb-16"
      >
        <p>
          基於國際權威期刊研究和第三方檢驗數據，客觀呈現鮮食便當與傳統乾糧
          在營養成分和生物利用率方面的顯著差異。
        </p>
      </SectionIntro>

      {/* 標籤切換 */}
      <FadeIn className="mb-8">
        <div className="flex justify-center">
          <div className="bg-neutral-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedTab('charts')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'charts'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              營養成分對比
            </button>
            <button
              onClick={() => setSelectedTab('radar')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'radar'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              品質雷達圖
            </button>
          </div>
        </div>
      </FadeIn>

      {selectedTab === 'charts' && (
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {nutritionData.map((data, index) => (
            <FadeIn key={data.nutrient}>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <BarChart data={data} />
              </div>
            </FadeIn>
          ))}
        </FadeInStagger>
      )}

      {selectedTab === 'radar' && (
        <FadeIn className="flex justify-center">
          <RadarChart />
        </FadeIn>
      )}

      {/* 研究摘要 */}
      <FadeIn className="mt-16">
        <div className="bg-blue-50 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-neutral-950 mb-6">
            關鍵研究發現
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-medium text-neutral-950">蛋白質品質優勢</h4>
                  <p className="text-sm text-neutral-600 mt-1">
                    鮮食便當的蛋白質消化率比傳統乾糧高出 15-18%，
                    必需胺基酸譜更完整，生物價值更高。
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-medium text-neutral-950">維生素保留率</h4>
                  <p className="text-sm text-neutral-600 mt-1">
                    低溫烹調保留 85-90% 的熱敏感維生素，
                    而高溫擠壓製程會損失 40-60%。
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-medium text-neutral-950">脂肪酸完整性</h4>
                  <p className="text-sm text-neutral-600 mt-1">
                    Omega-3 脂肪酸含量是傳統乾糧的 2.5 倍，
                    且結構完整，生物活性更高。
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-medium text-neutral-950">消化系統友善</h4>
                  <p className="text-sm text-neutral-600 mt-1">
                    天然纖維結構和適當水分含量，
                    顯著改善腸道健康和營養吸收效率。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
