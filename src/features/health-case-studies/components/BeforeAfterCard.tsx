'use client'

import { motion } from 'framer-motion'
import { BeforeAfterCardProps } from '../types'
import { HealthMetricCard } from './AnimatedNumber'
import { MiniLineChart } from './LineChart'

/**
 * 前后对比卡片组件
 * 展示宠物健康改善的前后对比
 */
export function BeforeAfterCard({ caseStudy }: BeforeAfterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-2xl bg-white shadow-lg"
    >
      {/* 宠物基本信息 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{caseStudy.petName}</h3>
            <p className="text-blue-100">
              {caseStudy.breed} • {caseStudy.age}岁 • {caseStudy.weight}kg
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">改善案例</div>
            <div className="text-lg font-semibold">
              #{caseStudy.id.split('-')[0]}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-white/10 p-3">
          <div className="mb-1 text-sm text-blue-100">主要症状</div>
          <div className="font-medium">{caseStudy.condition}</div>
        </div>
      </div>

      {/* 前后对比图片 */}
      <div className="grid grid-cols-2 gap-0">
        <div className="relative">
          <div className="flex aspect-square items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="text-sm font-medium text-gray-700">改善前</div>
              <div className="text-xs text-gray-500">症状明显</div>
            </div>
          </div>
          <div className="absolute top-2 left-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
            Before
          </div>
        </div>

        <div className="relative">
          <div className="flex aspect-square items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="text-sm font-medium text-gray-700">改善后</div>
              <div className="text-xs text-gray-500">健康活泼</div>
            </div>
          </div>
          <div className="absolute top-2 right-2 rounded-full bg-green-500 px-2 py-1 text-xs text-white">
            After
          </div>
        </div>
      </div>

      {/* 健康指标改善 */}
      <div className="p-6">
        <h4 className="mb-4 text-lg font-semibold text-gray-900">
          健康指标改善
        </h4>

        <div className="mb-6 grid grid-cols-2 gap-4">
          {caseStudy.metrics.slice(0, 4).map((metric, index) => (
            <div
              key={metric.name}
              className="rounded-lg bg-gray-50 p-3 text-center"
            >
              <div className="mb-1 text-xs text-gray-600">{metric.name}</div>
              <div className="text-lg font-bold text-green-600">
                +{metric.improvement}%
              </div>
              <MiniLineChart metric={metric} className="mt-2" />
            </div>
          ))}
        </div>

        {/* 改善时间线 */}
        <div className="mb-6">
          <h5 className="mb-3 text-sm font-medium text-gray-700">改善时间线</h5>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                <span className="text-xs font-bold text-red-600">0</span>
              </div>
              <div className="text-xs text-gray-600">开始</div>
            </div>

            <div className="mx-2 h-0.5 flex-1 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200"></div>

            <div className="text-center">
              <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                <span className="text-xs font-bold text-yellow-600">4</span>
              </div>
              <div className="text-xs text-gray-600">4周</div>
            </div>

            <div className="mx-2 h-0.5 flex-1 bg-gradient-to-r from-yellow-200 to-green-200"></div>

            <div className="text-center">
              <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <span className="text-xs font-bold text-green-600">12</span>
              </div>
              <div className="text-xs text-gray-600">12周</div>
            </div>
          </div>
        </div>

        {/* 案例故事 */}
        <div className="mb-6">
          <h5 className="mb-2 text-sm font-medium text-gray-700">改善过程</h5>
          <p className="text-sm leading-relaxed text-gray-600">
            {caseStudy.story}
          </p>
        </div>

        {/* 主人见证 */}
        <div className="rounded-lg bg-blue-50 p-4">
          <div className="flex items-start">
            <svg
              className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <div className="mb-1 text-xs font-medium text-blue-600">
                主人见证
              </div>
              <p className="text-sm text-blue-800 italic">
                "{caseStudy.ownerTestimonial}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * 简化版案例卡片
 * 用于列表展示
 */
interface CaseSummaryCardProps {
  caseStudy: BeforeAfterCardProps['caseStudy']
  onClick?: () => void
  className?: string
}

export function CaseSummaryCard({
  caseStudy,
  onClick,
  className = '',
}: CaseSummaryCardProps) {
  const averageImprovement = Math.round(
    caseStudy.metrics.reduce((sum, metric) => sum + metric.improvement, 0) /
      caseStudy.metrics.length,
  )

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`cursor-pointer rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-md ${className}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-gray-900">{caseStudy.petName}</h4>
          <p className="text-sm text-gray-600">
            {caseStudy.breed} • {caseStudy.age}岁
          </p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-green-600">
            +{averageImprovement}%
          </div>
          <div className="text-xs text-gray-500">平均改善</div>
        </div>
      </div>

      <div className="mb-3 text-sm text-gray-600">
        <span className="font-medium">症状：</span>
        {caseStudy.condition}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-1">
          {caseStudy.metrics.slice(0, 3).map((_, index) => (
            <div
              key={index}
              className="h-2 w-2 rounded-full bg-green-400"
            ></div>
          ))}
          {caseStudy.metrics.length > 3 && (
            <div className="text-xs text-gray-400">
              +{caseStudy.metrics.length - 3}
            </div>
          )}
        </div>
        <div className="text-xs font-medium text-blue-600">查看详情 →</div>
      </div>
    </motion.div>
  )
}
