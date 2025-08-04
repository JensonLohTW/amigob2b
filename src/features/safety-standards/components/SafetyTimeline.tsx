'use client'

import { motion } from 'framer-motion'
import { SafetyTimelineProps } from '../types'
import {
  BeakerIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'

/**
 * 安全时间线组件
 * 展示安全相关事件的时间线
 */
export function SafetyTimeline({
  events,
  className = '',
}: SafetyTimelineProps) {
  const getEventIcon = (iconType: string) => {
    switch (iconType) {
      case '🔬':
        return <BeakerIcon className="h-8 w-8" />
      case '⚗️':
        return <ChartBarIcon className="h-8 w-8" />
      case '📋':
        return <ClipboardDocumentListIcon className="h-8 w-8" />
      case '🏆':
        return <TrophyIcon className="h-8 w-8" />
      default:
        return <BeakerIcon className="h-8 w-8" />
    }
  }
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-blue-500'
      case 'scheduled':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成'
      case 'in-progress':
        return '进行中'
      case 'scheduled':
        return '已安排'
      default:
        return '未知'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'certification':
        return 'from-blue-500 to-blue-600'
      case 'inspection':
        return 'from-purple-500 to-purple-600'
      case 'test':
        return 'from-green-500 to-green-600'
      case 'audit':
        return 'from-orange-500 to-orange-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'certification':
        return '认证'
      case 'inspection':
        return '检查'
      case 'test':
        return '检验'
      case 'audit':
        return '审查'
      default:
        return '其他'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      monthName: date.toLocaleDateString('zh-TW', { month: 'long' }),
    }
  }

  return (
    <div className={`${className}`}>
      <div className="relative">
        {/* 时间线主线 */}
        <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gray-300"></div>

        {/* 时间线事件 */}
        <div className="space-y-8">
          {events.map((event, index) => {
            const date = formatDate(event.date)

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-start gap-6"
              >
                {/* 时间线节点 */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`h-16 w-16 rounded-full ${getStatusColor(event.status)} flex items-center justify-center text-white shadow-lg`}
                  >
                    {getEventIcon(event.icon)}
                  </div>

                  {/* 状态指示器 */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        event.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : event.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : event.status === 'scheduled'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {getStatusLabel(event.status)}
                    </span>
                  </div>
                </div>

                {/* 事件内容 */}
                <div className="min-w-0 flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200"
                  >
                    {/* 事件头部 */}
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="mb-1 text-lg font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {event.description}
                        </p>
                      </div>

                      <div className="ml-4 flex-shrink-0 text-right">
                        <div className="mb-1 text-sm text-gray-500">
                          {date.year}年{date.month}月{date.day}日
                        </div>
                        <span
                          className={`rounded-full bg-gradient-to-r px-2 py-1 text-xs font-medium ${getTypeColor(event.type)} text-white`}
                        >
                          {getTypeLabel(event.type)}
                        </span>
                      </div>
                    </div>

                    {/* 事件详情 */}
                    {event.details && event.details.length > 0 && (
                      <div className="border-t border-gray-100 pt-4">
                        <h4 className="mb-2 text-sm font-medium text-gray-700">
                          详细内容
                        </h4>
                        <div className="space-y-2">
                          {event.details.map((detail, detailIndex) => (
                            <motion.div
                              key={detailIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.1 + 0.3 + detailIndex * 0.05,
                              }}
                              className="flex items-center gap-2"
                            >
                              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></div>
                              <span className="text-sm text-gray-600">
                                {detail}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 进度指示器（仅对进行中的事件） */}
                    {event.status === 'in-progress' && (
                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
                          <span>进度</span>
                          <span>75%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <motion.div
                            className="h-2 rounded-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            transition={{
                              duration: 1,
                              delay: index * 0.1 + 0.5,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* 时间线统计 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 p-6"
      >
        <h3 className="mb-4 text-lg font-semibold text-gray-900">时间线统计</h3>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {events.filter((e) => e.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">已完成</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {events.filter((e) => e.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-600">进行中</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {events.filter((e) => e.status === 'scheduled').length}
            </div>
            <div className="text-sm text-gray-600">已安排</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {events.length}
            </div>
            <div className="text-sm text-gray-600">总事件</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
