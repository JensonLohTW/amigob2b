'use client'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

// 動畫數字組件
interface AnimatedNumberProps {
  value: number
  type: 'improvement' | 'increase'
  suffix?: string
  className?: string
  delay?: number
}

const AnimatedNumber = ({
  value,
  type,
  suffix = '%',
  className = '',
  delay = 0,
}: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // 統一動畫時長
      const startDelay = delay * 1000

      const timer = setTimeout(() => {
        let startTime: number

        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)

          // 使用統一的緩動函數 - 更流暢的動畫
          const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
          const easedProgress = easeOutQuart(progress)
          const currentValue = easedProgress * value

          setDisplayValue(Math.round(currentValue))

          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }

        requestAnimationFrame(animate)

        // 更柔和的縮放動畫
        controls.start({
          scale: [1, 1.05, 1],
          transition: {
            duration: 0.8,
            delay: startDelay / 1000,
            ease: 'easeOut',
          },
        })
      }, startDelay)

      return () => clearTimeout(timer)
    }
  }, [isInView, value, type, delay, controls])

  // 使用統一的色彩系統
  const getColorClass = () => {
    return 'text-foreground' // 使用主題色彩
  }

  const getDirectionIndicator = () => {
    const indicatorClass =
      type === 'improvement' ? 'text-muted-foreground' : 'text-muted-foreground'

    const arrow = type === 'improvement' ? '↓' : '↑'

    return (
      <motion.span
        className={`ml-1 inline-block ${indicatorClass}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.8,
        }}
        transition={{
          delay: delay + 1.2,
          duration: 0.5,
          ease: 'easeOut',
        }}
      >
        {arrow}
      </motion.span>
    )
  }

  return (
    <motion.span
      ref={ref}
      className={`${getColorClass()} ${className}`}
      animate={controls}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: delay }}
    >
      {displayValue}
      {suffix}
      {getDirectionIndicator()}
    </motion.span>
  )
}

interface HealthMetric {
  name: string
  unit: string
  week0: number
  week4: number
  week12: number
  improvement: number
  status: 'excellent' | 'good' | 'fair'
}

interface CaseStudy {
  id: string
  petName: string
  breed: string
  age: string
  initialCondition: string
  duration: string
  metrics: HealthMetric[]
  ownerTestimonial: string
  vetRecommendation?: string
}

const caseStudies: CaseStudy[] = [
  {
    id: 'case1',
    petName: '小白 (柴犬)',
    breed: '柴犬',
    age: '5歲',
    initialCondition: '皮膚過敏、毛髮粗糙、消化不良',
    duration: '12週轉食計畫',
    metrics: [
      {
        name: 'ALT (肝功能)',
        unit: 'U/L',
        week0: 85,
        week4: 72,
        week12: 45,
        improvement: -47,
        status: 'excellent',
      },
      {
        name: '血糖',
        unit: 'mg/dL',
        week0: 128,
        week4: 115,
        week12: 95,
        improvement: -26,
        status: 'excellent',
      },
      {
        name: '體脂率',
        unit: '%',
        week0: 28,
        week4: 25,
        week12: 22,
        improvement: -21,
        status: 'good',
      },
      {
        name: '皮膚炎症指數',
        unit: '分',
        week0: 8,
        week4: 5,
        week12: 2,
        improvement: -75,
        status: 'excellent',
      },
    ],
    ownerTestimonial:
      '小白的皮膚問題明顯改善，毛髮變得柔順有光澤，精神狀態也比以前好很多！',
    vetRecommendation:
      '血檢數值顯示肝功能和血糖都回到正常範圍，建議繼續使用鮮食。',
  },
  {
    id: 'case2',
    petName: '咪咪 (英短)',
    breed: '英國短毛貓',
    age: '7歲',
    initialCondition: '腎功能輕微異常、食慾不振',
    duration: '16週轉食計畫',
    metrics: [
      {
        name: 'BUN (腎功能)',
        unit: 'mg/dL',
        week0: 32,
        week4: 28,
        week12: 22,
        improvement: -31,
        status: 'excellent',
      },
      {
        name: '肌酸酐',
        unit: 'mg/dL',
        week0: 1.8,
        week4: 1.6,
        week12: 1.3,
        improvement: -28,
        status: 'good',
      },
      {
        name: '食慾評分',
        unit: '分',
        week0: 4,
        week4: 7,
        week12: 9,
        improvement: 125,
        status: 'excellent',
      },
      {
        name: '活動力',
        unit: '分',
        week0: 5,
        week4: 7,
        week12: 8,
        improvement: 60,
        status: 'good',
      },
    ],
    ownerTestimonial:
      '咪咪現在每餐都吃得很香，腎功能指數也穩定下降，獸醫說恢復得很好。',
    vetRecommendation:
      '腎功能指標明顯改善，低磷配方對腎臟負擔較小，建議長期使用。',
  },
]

const LineChart = ({ metrics }: { metrics: HealthMetric[] }) => {
  const [selectedMetric, setSelectedMetric] = useState(0)
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
  const metric = metrics[selectedMetric]

  const weeks = [0, 4, 12]
  const values = [metric.week0, metric.week4, metric.week12]
  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)
  const range = maxValue - minValue

  const getY = (value: number) => {
    if (range === 0) return 50
    return 80 - ((value - minValue) / range) * 60
  }

  const pathData = weeks
    .map((week, index) => {
      const x = 20 + (week / 12) * 160
      const y = getY(values[index])
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  return (
    <motion.div
      className="group bg-card rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 指標選擇器 - shadcn/ui 風格 */}
      <div className="bg-muted mb-6 flex flex-wrap gap-1 rounded-lg p-1">
        {metrics.map((m, index) => (
          <motion.button
            key={m.name}
            onClick={() => setSelectedMetric(index)}
            className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
              selectedMetric === index
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {selectedMetric === index && (
              <motion.div
                className="bg-background absolute inset-0 rounded-md shadow-sm"
                layoutId="activeTab"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{m.name}</span>
          </motion.button>
        ))}
      </div>

      {/* 圖表標題 */}
      <motion.div
        className="mb-6"
        key={selectedMetric}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h4 className="text-foreground text-lg font-semibold">{metric.name}</h4>
        <p className="text-muted-foreground text-sm">單位: {metric.unit}</p>
      </motion.div>

      {/* 圖表區域 */}
      <div className="relative">
        <svg className="h-48 w-full" viewBox="0 0 200 120">
          {/* 背景網格 */}
          <defs>
            <linearGradient
              id="chartGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.2"
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.05"
              />
            </linearGradient>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="200" height="100" fill="url(#grid)" />

          {/* 區域填充 */}
          <motion.path
            d={`${pathData} L 180 80 L 20 80 Z`}
            fill="url(#chartGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* 數據線 */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* 數據點 */}
          {weeks.map((week, index) => {
            const x = 20 + (week / 12) * 160
            const y = getY(values[index])
            const isHovered = hoveredPoint === index

            return (
              <g key={week}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isHovered ? '6' : '4'}
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--background))"
                  strokeWidth="2"
                  className="cursor-pointer"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: index * 0.2 + 1,
                    type: 'spring',
                    bounce: 0.4,
                  }}
                  whileHover={{ scale: 1.2 }}
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />

                {/* 懸停時顯示數值 */}
                {isHovered && (
                  <motion.g
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <rect
                      x={x - 25}
                      y={y - 30}
                      width="50"
                      height="24"
                      rx="6"
                      fill="rgba(0, 0, 0, 0.8)"
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y={y - 15}
                      textAnchor="middle"
                      fill="white"
                      fontSize="11"
                      fontWeight="500"
                    >
                      {values[index]}
                      {metric.unit}
                    </text>
                  </motion.g>
                )}
              </g>
            )
          })}

          {/* X軸標籤 */}
          {weeks.map((week, index) => {
            const x = 20 + (week / 12) * 160
            return (
              <motion.text
                key={week}
                x={x}
                y="110"
                textAnchor="middle"
                className="fill-muted-foreground text-xs font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 1.5 }}
              >
                {week}週
              </motion.text>
            )
          })}
        </svg>
      </div>

      {/* 改善指標卡片 */}
      <motion.div
        className="bg-muted/50 mt-6 rounded-lg border p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm font-medium">
            總改善幅度
          </span>
          <motion.span
            className="text-lg font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: 'spring', bounce: 0.5 }}
          >
            {metric.improvement > 0 ? '+' : ''}
            <AnimatedNumber
              value={Math.abs(metric.improvement)}
              type={metric.improvement > 0 ? 'increase' : 'improvement'}
              delay={1.2}
              className="text-lg font-bold"
            />
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  )
}

const BeforeAfterCard = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  return (
    <motion.div
      className="bg-card rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 寵物資訊 */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-foreground text-xl font-semibold">
          {caseStudy.petName}
        </h3>
        <p className="text-muted-foreground text-sm">
          {caseStudy.breed} • {caseStudy.age}
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* 初始狀況 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="text-foreground mb-2 text-sm font-medium">初始狀況</h4>
          <p className="text-muted-foreground text-sm">
            {caseStudy.initialCondition}
          </p>
        </motion.div>

        {/* 轉食期間 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-foreground mb-2 text-sm font-medium">轉食期間</h4>
          <div className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
            {caseStudy.duration}
          </div>
        </motion.div>

        {/* 飼主見證 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-foreground mb-3 text-sm font-medium">飼主見證</h4>
          <blockquote className="border-primary bg-muted/50 relative rounded-lg border-l-4 p-4">
            <div className="bg-primary/20 absolute -top-2 -left-2 h-4 w-4 rounded-full"></div>
            <p className="text-muted-foreground text-sm italic">
              "{caseStudy.ownerTestimonial}"
            </p>
          </blockquote>
        </motion.div>

        {/* 獸醫師建議 */}
        {caseStudy.vetRecommendation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="text-foreground mb-3 text-sm font-medium">
              獸醫師建議
            </h4>
            <div className="bg-muted/50 rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary mt-0.5 h-2 w-2 rounded-full"></div>
                <p className="text-muted-foreground text-sm">
                  {caseStudy.vetRecommendation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export function HealthCaseStudies() {
  const [selectedCase, setSelectedCase] = useState(0)
  const currentCase = caseStudies[selectedCase]

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="健康成效案例"
        title="真實數據見證健康轉變"
        className="mb-16"
      >
        <p>
          透過專業獸醫監督的轉食計畫，記錄寵物健康指標的實際變化。
          每個案例都有完整的血檢數據和獸醫評估報告。
        </p>
      </SectionIntro>

      {/* 案例選擇 */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-center">
          <div className="bg-muted inline-flex items-center rounded-lg p-1 shadow-sm">
            {caseStudies.map((caseStudy, index) => (
              <motion.button
                key={caseStudy.id}
                onClick={() => setSelectedCase(index)}
                className={`relative rounded-md px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                  selectedCase === index
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {selectedCase === index && (
                  <motion.div
                    className="bg-background absolute inset-0 rounded-md shadow-sm"
                    layoutId="activeCase"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{caseStudy.petName}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 案例內容 */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <FadeIn>
          <BeforeAfterCard caseStudy={currentCase} />
        </FadeIn>

        <FadeIn>
          <LineChart metrics={currentCase.metrics} />
        </FadeIn>
      </div>

      {/* 統計摘要 */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="from-primary/5 via-background to-secondary/5 rounded-2xl border bg-gradient-to-br p-8 shadow-sm">
          <motion.h3
            className="text-foreground mb-8 text-center text-2xl font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            整體健康改善統計
          </motion.h3>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              {
                value: 89,
                label: '肝功能改善',
                subtitle: '平均 ALT 下降',
                type: 'improvement' as const,
                delay: 0.3,
              },
              {
                value: 76,
                label: '皮膚狀況改善',
                subtitle: '炎症指數下降',
                type: 'improvement' as const,
                delay: 0.4,
              },
              {
                value: 65,
                label: '腎功能改善',
                subtitle: 'BUN 指標下降',
                type: 'improvement' as const,
                delay: 0.5,
              },
              {
                value: 92,
                label: '食慾提升',
                subtitle: '飼主滿意度',
                type: 'increase' as const,
                delay: 0.6,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group text-center"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: stat.delay, type: 'spring', bounce: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold transition-colors duration-300 group-hover:scale-110">
                  <AnimatedNumber
                    value={stat.value}
                    type={stat.type}
                    delay={stat.delay + 0.4}
                    className="text-4xl font-bold"
                  />
                </div>
                <motion.div
                  className="text-foreground mt-2 text-sm font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: stat.delay + 0.3 }}
                >
                  {stat.label}
                </motion.div>
                <motion.div
                  className="text-muted-foreground mt-1 text-xs"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: stat.delay + 0.4 }}
                >
                  {stat.subtitle}
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            <p className="text-muted-foreground text-sm">
              * 數據基於 50+ 個轉食案例的 12 週追蹤研究
            </p>
            <p className="text-muted-foreground/80 mt-1 text-xs">
              研究期間：2023年1月 - 2024年1月 |
              合作獸醫院：台大動物醫院、中興大學獸醫院
            </p>
          </motion.div>
        </div>
      </motion.div>
    </Container>
  )
}
