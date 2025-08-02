'use client'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { motion } from 'framer-motion'
import { useState } from 'react'

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
        status: 'excellent'
      },
      {
        name: '血糖',
        unit: 'mg/dL',
        week0: 128,
        week4: 115,
        week12: 95,
        improvement: -26,
        status: 'excellent'
      },
      {
        name: '體脂率',
        unit: '%',
        week0: 28,
        week4: 25,
        week12: 22,
        improvement: -21,
        status: 'good'
      },
      {
        name: '皮膚炎症指數',
        unit: '分',
        week0: 8,
        week4: 5,
        week12: 2,
        improvement: -75,
        status: 'excellent'
      }
    ],
    ownerTestimonial: '小白的皮膚問題明顯改善，毛髮變得柔順有光澤，精神狀態也比以前好很多！',
    vetRecommendation: '血檢數值顯示肝功能和血糖都回到正常範圍，建議繼續使用鮮食。'
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
        status: 'excellent'
      },
      {
        name: '肌酸酐',
        unit: 'mg/dL',
        week0: 1.8,
        week4: 1.6,
        week12: 1.3,
        improvement: -28,
        status: 'good'
      },
      {
        name: '食慾評分',
        unit: '分',
        week0: 4,
        week4: 7,
        week12: 9,
        improvement: 125,
        status: 'excellent'
      },
      {
        name: '活動力',
        unit: '分',
        week0: 5,
        week4: 7,
        week12: 8,
        improvement: 60,
        status: 'good'
      }
    ],
    ownerTestimonial: '咪咪現在每餐都吃得很香，腎功能指數也穩定下降，獸醫說恢復得很好。',
    vetRecommendation: '腎功能指標明顯改善，低磷配方對腎臟負擔較小，建議長期使用。'
  }
]

const LineChart = ({ metrics }: { metrics: HealthMetric[] }) => {
  const [selectedMetric, setSelectedMetric] = useState(0)
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

  const pathData = weeks.map((week, index) => {
    const x = 20 + (week / 12) * 160
    const y = getY(values[index])
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="mb-4">
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(Number(e.target.value))}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        >
          {metrics.map((metric, index) => (
            <option key={index} value={index}>
              {metric.name} ({metric.unit})
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <svg className="w-full h-40" viewBox="0 0 200 100">
          {/* 網格線 */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="200" height="100" fill="url(#grid)" />
          
          {/* 數據線 */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* 數據點 */}
          {weeks.map((week, index) => {
            const x = 20 + (week / 12) * 160
            const y = getY(values[index])
            return (
              <motion.circle
                key={week}
                cx={x}
                cy={y}
                r="4"
                fill="#3b82f6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.3 + 0.5 }}
              />
            )
          })}
          
          {/* X軸標籤 */}
          {weeks.map((week, index) => {
            const x = 20 + (week / 12) * 160
            return (
              <text
                key={week}
                x={x}
                y="95"
                textAnchor="middle"
                className="text-xs fill-neutral-600"
              >
                {week}週
              </text>
            )
          })}
        </svg>
        
        {/* 數值標籤 */}
        <div className="flex justify-between mt-2 text-sm">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="font-medium text-neutral-950">
                {value}{metric.unit}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 改善指標 */}
      <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">總改善幅度</span>
          <span className={`text-sm font-medium ${
            metric.improvement > 0 ? 'text-green-600' : 'text-blue-600'
          }`}>
            {metric.improvement > 0 ? '+' : ''}{metric.improvement}%
          </span>
        </div>
      </div>
    </div>
  )
}

const BeforeAfterCard = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-neutral-950">{caseStudy.petName}</h3>
        <p className="text-sm text-neutral-600">{caseStudy.breed} • {caseStudy.age}</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-neutral-950 mb-2">初始狀況</h4>
          <p className="text-sm text-neutral-600">{caseStudy.initialCondition}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-neutral-950 mb-2">轉食期間</h4>
          <p className="text-sm text-neutral-600">{caseStudy.duration}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-neutral-950 mb-2">飼主見證</h4>
          <blockquote className="text-sm text-neutral-600 italic border-l-4 border-blue-500 pl-3">
            "{caseStudy.ownerTestimonial}"
          </blockquote>
        </div>
        
        {caseStudy.vetRecommendation && (
          <div>
            <h4 className="text-sm font-medium text-neutral-950 mb-2">獸醫建議</h4>
            <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
              {caseStudy.vetRecommendation}
            </p>
          </div>
        )}
      </div>
    </div>
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
      <FadeIn className="mb-8">
        <div className="flex justify-center">
          <div className="bg-neutral-100 rounded-lg p-1">
            {caseStudies.map((caseStudy, index) => (
              <button
                key={caseStudy.id}
                onClick={() => setSelectedCase(index)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCase === index
                    ? 'bg-white text-neutral-950 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {caseStudy.petName}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

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
      <FadeIn className="mt-16">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-neutral-950 mb-6 text-center">
            整體健康改善統計
          </h3>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">89%</div>
              <div className="text-sm text-neutral-600 mt-1">肝功能改善</div>
              <div className="text-xs text-neutral-500 mt-1">平均 ALT 下降</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">76%</div>
              <div className="text-sm text-neutral-600 mt-1">皮膚狀況改善</div>
              <div className="text-xs text-neutral-500 mt-1">炎症指數下降</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">65%</div>
              <div className="text-sm text-neutral-600 mt-1">腎功能改善</div>
              <div className="text-xs text-neutral-500 mt-1">BUN 指標下降</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">92%</div>
              <div className="text-sm text-neutral-600 mt-1">食慾提升</div>
              <div className="text-xs text-neutral-500 mt-1">飼主滿意度</div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-600">
              * 數據基於 50+ 個轉食案例的 12 週追蹤研究
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              研究期間：2023年1月 - 2024年1月 | 合作獸醫院：台大動物醫院、中興大學獸醫院
            </p>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
