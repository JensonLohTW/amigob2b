'use client'

import { motion } from 'framer-motion'
import { SafetyStatsProps } from '../types'
import {
  TrophyIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  ViewfinderCircleIcon,
  CalendarDaysIcon,
  ClockIcon,
  ShieldCheckIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline'

/**
 * 安全统计组件
 * 展示安全相关的统计数据
 */
export function SafetyStats({ stats, className = '' }: SafetyStatsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const statCards = [
    {
      title: '总认证数',
      value: stats.totalCertifications,
      icon: TrophyIcon,
      color: 'from-blue-500 to-blue-600',
      description: '获得的安全认证总数',
    },
    {
      title: '有效认证',
      value: stats.activeCertifications,
      icon: CheckCircleIcon,
      color: 'from-green-500 to-green-600',
      description: '目前有效的认证数量',
    },
    {
      title: '检验报告',
      value: stats.testReports,
      icon: ClipboardDocumentListIcon,
      color: 'from-purple-500 to-purple-600',
      description: '完成的检验报告数量',
    },
    {
      title: '合格率',
      value: `${stats.passRate}%`,
      icon: ViewfinderCircleIcon,
      color: 'from-orange-500 to-orange-600',
      description: '检验测试通过率',
    },
  ]

  return (
    <div className={`${className}`}>
      {/* 统计卡片网格 */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200"
          >
            <div className={`bg-gradient-to-r ${card.color} p-4`}>
              <div className="flex items-center justify-between text-white">
                <div>
                  <div className="mb-1 text-2xl font-bold">{card.value}</div>
                  <div className="text-sm opacity-90">{card.title}</div>
                </div>
                <card.icon className="h-8 w-8" />
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 检查时间信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* 最近检查 */}
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <CalendarDaysIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">最近检查</h3>
              <p className="text-sm text-gray-600">上次安全检查时间</p>
            </div>
          </div>

          <div className="mb-2 text-2xl font-bold text-gray-900">
            {formatDate(stats.lastInspection)}
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-green-600">检查通过</span>
          </div>
        </div>

        {/* 下次检查 */}
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <ClockIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">下次检查</h3>
              <p className="text-sm text-gray-600">预定检查时间</p>
            </div>
          </div>

          <div className="mb-2 text-2xl font-bold text-gray-900">
            {formatDate(stats.nextInspection)}
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium text-blue-600">已安排</span>
          </div>
        </div>
      </motion.div>

      {/* 安全等级指示器 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-8 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 p-6"
      >
        <div className="mb-6 text-center">
          <h3 className="mb-2 text-xl font-bold text-gray-900">安全等级评估</h3>
          <p className="text-gray-600">基于认证状态和检验结果的综合评估</p>
        </div>

        <div className="mb-6 flex items-center justify-center">
          <div className="relative h-32 w-32">
            {/* 圆形进度条背景 */}
            <svg
              className="h-32 w-32 -rotate-90 transform"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#10b981"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                animate={{
                  strokeDashoffset:
                    2 * Math.PI * 50 * (1 - stats.passRate / 100),
                }}
                transition={{ duration: 2, delay: 0.8 }}
              />
            </svg>

            {/* 中心文字 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">A+</div>
                <div className="text-xs text-gray-600">优秀</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">优秀</div>
            <div className="text-sm text-gray-600">认证完整</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">100%</div>
            <div className="text-sm text-gray-600">检验通过</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">持续</div>
            <div className="text-sm text-gray-600">改进中</div>
          </div>
        </div>
      </motion.div>

      {/* 安全承诺 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="mt-8 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white"
      >
        <div className="text-center">
          <h3 className="mb-4 text-xl font-bold">我们的安全承诺</h3>
          <p className="mb-6 text-gray-300">
            持续维持最高标准的食品安全管理，为您的毛孩提供最安全、最优质的鲜食产品
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheckIcon, text: '全程安全管控' },
              { icon: BeakerIcon, text: '定期检验测试' },
              { icon: ClipboardDocumentListIcon, text: '透明信息公开' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex items-center justify-center gap-2"
              >
                <item.icon className="h-6 w-6 text-white" />
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
