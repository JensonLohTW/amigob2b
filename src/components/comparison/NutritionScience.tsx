'use client'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { motion, useInView, useAnimation } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface NutritionData {
  nutrient: string
  freshFood: number
  dryFood: number
  unit: string
  description: string
  source: string
  category: 'protein' | 'vitamin' | 'mineral' | 'overall'
}

const nutritionData: NutritionData[] = [
  {
    nutrient: '蛋白質消化率',
    freshFood: 92,
    dryFood: 78,
    unit: '%',
    description: '真消化率測定，反映實際可利用蛋白質比例',
    source: 'Journal of Animal Physiology and Animal Nutrition, 2023',
    category: 'protein',
  },
  {
    nutrient: 'Omega-3 脂肪酸',
    freshFood: 0.8,
    dryFood: 0.3,
    unit: 'g/100g',
    description: 'EPA+DHA 含量，對皮膚毛髮和認知功能重要',
    source: 'Veterinary Record, 2022',
    category: 'vitamin',
  },
  {
    nutrient: '維生素 E',
    freshFood: 45,
    dryFood: 28,
    unit: 'mg/kg',
    description: '天然抗氧化劑，高溫加工會大量流失',
    source: 'Animal Feed Science and Technology, 2023',
    category: 'vitamin',
  },
  {
    nutrient: '葉酸',
    freshFood: 2.1,
    dryFood: 1.2,
    unit: 'mg/kg',
    description: '細胞分裂和DNA合成必需，熱敏感維生素',
    source: 'Journal of Nutritional Science, 2022',
    category: 'vitamin',
  },
  {
    nutrient: '生物利用率指數',
    freshFood: 88,
    dryFood: 65,
    unit: '分',
    description: '綜合營養素吸收利用效率評分',
    source: 'Pet Food Industry Research, 2023',
    category: 'overall',
  },
]

const BarChart = ({ data, index }: { data: NutritionData; index: number }) => {
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
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const barVariants = {
    hidden: { width: 0 },
    visible: (percentage: number) => ({
      width: `${percentage}%`,
      transition: {
        duration: 1.2,
        delay: 0.3 + index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  return (
    <motion.div
      ref={ref}
      className="space-y-6 rounded-xl border border-neutral-200/60 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h4 className="text-lg font-semibold text-neutral-900">
            {data.nutrient}
          </h4>
          <div className="text-sm text-neutral-500">單位: {data.unit}</div>
        </div>
        <div
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            data.category === 'protein'
              ? 'bg-blue-50 text-blue-700'
              : data.category === 'vitamin'
                ? 'bg-purple-50 text-purple-700'
                : data.category === 'mineral'
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-neutral-100 text-neutral-700'
          }`}
        >
          {data.category === 'protein'
            ? '蛋白質'
            : data.category === 'vitamin'
              ? '維生素'
              : data.category === 'mineral'
                ? '礦物質'
                : '綜合指標'}
        </div>
      </div>

      <div className="space-y-4">
        {/* 鮮食便當 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700">
              鮮食便當
            </span>
            <span className="text-sm font-semibold text-emerald-700">
              {data.freshFood}
              {data.unit}
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-neutral-100">
            <motion.div
              className="relative h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"
              variants={barVariants}
              custom={freshPercentage}
              initial="hidden"
              animate={controls}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-white/20" />
            </motion.div>
          </div>
        </div>

        {/* 傳統乾糧 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700">
              傳統乾糧
            </span>
            <span className="text-sm font-semibold text-orange-700">
              {data.dryFood}
              {data.unit}
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-neutral-100">
            <motion.div
              className="relative h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600"
              variants={barVariants}
              custom={dryPercentage}
              initial="hidden"
              animate={controls}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-white/20" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-100 pt-4">
        <p className="mb-3 text-sm leading-relaxed text-neutral-600">
          {data.description}
        </p>
        <div className="text-xs font-medium text-neutral-500">
          數據來源: {data.source}
        </div>
      </div>
    </motion.div>
  )
}

const RadarChart = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const controls = useAnimation()

  const categories = [
    { name: '蛋白質品質', fresh: 95, dry: 75 },
    { name: '維生素保留', fresh: 90, dry: 60 },
    { name: '礦物質利用', fresh: 85, dry: 70 },
    { name: '脂肪酸完整', fresh: 88, dry: 55 },
    { name: '消化吸收', fresh: 92, dry: 78 },
    { name: '適口性', fresh: 94, dry: 82 },
  ]

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const polygonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className="rounded-xl border border-neutral-200/60 bg-white p-8 shadow-sm"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="mb-8 text-center">
        <h3 className="mb-2 text-xl font-semibold text-neutral-900">
          營養品質雷達圖
        </h3>
        <p className="text-sm text-neutral-600">六大營養指標全方位比較</p>
      </div>

      <div className="relative mx-auto h-80 w-80">
        {/* 背景網格 */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 200">
          {/* 同心圓 */}
          {[20, 40, 60, 80].map((radius, index) => (
            <motion.circle
              key={radius}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            />
          ))}

          {/* 軸線 */}
          {categories.map((_, index) => {
            const angle = (index * 60 - 90) * (Math.PI / 180)
            const x = 100 + 80 * Math.cos(angle)
            const y = 100 + 80 * Math.sin(angle)
            return (
              <motion.line
                key={index}
                x1="100"
                y1="100"
                x2={x}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
              />
            )
          })}

          {/* 鮮食數據 */}
          <motion.polygon
            points={categories
              .map((cat, index) => {
                const angle = (index * 60 - 90) * (Math.PI / 180)
                const radius = (cat.fresh / 100) * 80
                const x = 100 + radius * Math.cos(angle)
                const y = 100 + radius * Math.sin(angle)
                return `${x},${y}`
              })
              .join(' ')}
            fill="rgba(16, 185, 129, 0.15)"
            stroke="#10b981"
            strokeWidth="2.5"
            variants={polygonVariants}
            initial="hidden"
            animate={controls}
            style={{ filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.1))' }}
          />

          {/* 乾糧數據 */}
          <motion.polygon
            points={categories
              .map((cat, index) => {
                const angle = (index * 60 - 90) * (Math.PI / 180)
                const radius = (cat.dry / 100) * 80
                const x = 100 + radius * Math.cos(angle)
                const y = 100 + radius * Math.sin(angle)
                return `${x},${y}`
              })
              .join(' ')}
            fill="rgba(249, 115, 22, 0.15)"
            stroke="#f97316"
            strokeWidth="2.5"
            variants={polygonVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.3 }}
            style={{ filter: 'drop-shadow(0 2px 4px rgba(249, 115, 22, 0.1))' }}
          />

          {/* 數據點 */}
          {categories.map((cat, index) => {
            const angle = (index * 60 - 90) * (Math.PI / 180)
            const freshRadius = (cat.fresh / 100) * 80
            const dryRadius = (cat.dry / 100) * 80
            const freshX = 100 + freshRadius * Math.cos(angle)
            const freshY = 100 + freshRadius * Math.sin(angle)
            const dryX = 100 + dryRadius * Math.cos(angle)
            const dryY = 100 + dryRadius * Math.sin(angle)

            return (
              <g key={`points-${index}`}>
                <motion.circle
                  cx={freshX}
                  cy={freshY}
                  r="4"
                  fill="#10b981"
                  stroke="white"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                />
                <motion.circle
                  cx={dryX}
                  cy={dryY}
                  r="4"
                  fill="#f97316"
                  stroke="white"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.1, duration: 0.3 }}
                />
              </g>
            )
          })}
        </svg>

        {/* 標籤 */}
        {categories.map((cat, index) => {
          const angle = (index * 60 - 90) * (Math.PI / 180)
          const x = 100 + 100 * Math.cos(angle)
          const y = 100 + 100 * Math.sin(angle)
          return (
            <motion.div
              key={cat.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 transform rounded-md border border-neutral-200/60 bg-white px-2 py-1 text-xs font-medium text-neutral-700 shadow-sm"
              style={{
                left: `${(x / 200) * 100}%`,
                top: `${(y / 200) * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + index * 0.1, duration: 0.3 }}
            >
              {cat.name}
            </motion.div>
          )
        })}
      </div>

      <div className="mt-8 flex items-center justify-center space-x-8 border-t border-neutral-100 pt-6">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
          <span className="text-sm font-medium text-neutral-700">鮮食便當</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-orange-500"></div>
          <span className="text-sm font-medium text-neutral-700">傳統乾糧</span>
        </div>
      </div>
    </motion.div>
  )
}

export function NutritionScience() {
  const [selectedTab, setSelectedTab] = useState<'charts' | 'radar'>('charts')

  const tabVariants = {
    inactive: {
      scale: 1,
      backgroundColor: 'transparent',
      color: '#6b7280',
    },
    active: {
      scale: 1.02,
      backgroundColor: '#ffffff',
      color: '#111827',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
  }

  return (
    <Container className="mt-32 sm:mt-40 lg:mt-48">
      <SectionIntro
        eyebrow="營養科學證據"
        title="數據說話：營養價值的真實差距"
        className="mb-20"
      >
        <p className="text-lg leading-relaxed text-neutral-600">
          基於國際權威期刊研究和第三方檢驗數據，客觀呈現鮮食便當與傳統乾糧
          在營養成分和生物利用率方面的顯著差異。
        </p>
      </SectionIntro>

      {/* 標籤切換 */}
      <FadeIn className="mb-12">
        <div className="flex justify-center">
          <div className="rounded-xl border border-neutral-200/60 bg-neutral-50 p-1.5">
            <motion.button
              onClick={() => setSelectedTab('charts')}
              className="relative rounded-lg px-8 py-3 text-sm font-medium transition-all duration-200"
              variants={tabVariants}
              animate={selectedTab === 'charts' ? 'active' : 'inactive'}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              營養成分對比
              {selectedTab === 'charts' && (
                <motion.div
                  className="absolute inset-0 rounded-lg border border-neutral-200/60 bg-white shadow-sm"
                  layoutId="activeTab"
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{ zIndex: -1 }}
                />
              )}
            </motion.button>
            <motion.button
              onClick={() => setSelectedTab('radar')}
              className="relative rounded-lg px-8 py-3 text-sm font-medium transition-all duration-200"
              variants={tabVariants}
              animate={selectedTab === 'radar' ? 'active' : 'inactive'}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              品質雷達圖
              {selectedTab === 'radar' && (
                <motion.div
                  className="absolute inset-0 rounded-lg border border-neutral-200/60 bg-white shadow-sm"
                  layoutId="activeTab"
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{ zIndex: -1 }}
                />
              )}
            </motion.button>
          </div>
        </div>
      </FadeIn>

      <motion.div
        key={selectedTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {selectedTab === 'charts' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:gap-10">
            {nutritionData.map((data, index) => (
              <BarChart key={data.nutrient} data={data} index={index} />
            ))}
          </div>
        )}

        {selectedTab === 'radar' && (
          <div className="flex justify-center">
            <RadarChart />
          </div>
        )}
      </motion.div>

      {/* 研究摘要 */}
      <FadeIn className="mt-20">
        <motion.div
          className="rounded-2xl border border-neutral-200/60 bg-gradient-to-br from-neutral-50 to-neutral-100/50 p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mb-10 text-center">
            <h3 className="mb-3 text-2xl font-semibold text-neutral-900">
              關鍵研究發現
            </h3>
            <p className="text-neutral-600">基於多項國際研究的科學證據</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              {[
                {
                  title: '蛋白質品質優勢',
                  content:
                    '鮮食便當的蛋白質消化率比傳統乾糧高出 15-18%，必需胺基酸譜更完整，生物價值更高。',
                },
                {
                  title: '維生素保留率',
                  content:
                    '低溫烹調保留 85-90% 的熱敏感維生素，而高溫擠壓製程會損失 40-60%。',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500"></div>
                  <div>
                    <h4 className="mb-2 font-semibold text-neutral-900">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6">
              {[
                {
                  title: '脂肪酸完整性',
                  content:
                    'Omega-3 脂肪酸含量是傳統乾糧的 2.5 倍，且結構完整，生物活性更高。',
                },
                {
                  title: '消化系統友善',
                  content:
                    '天然纖維結構和適當水分含量，顯著改善腸道健康和營養吸收效率。',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
                >
                  <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500"></div>
                  <div>
                    <h4 className="mb-2 font-semibold text-neutral-900">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </FadeIn>
    </Container>
  )
}
