'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CertificationCardProps } from '../types'

/**
 * 认证卡片组件
 * 展示单个安全认证的详细信息
 */
export function CertificationCard({
  certification,
  isExpanded = false,
  onToggle,
  className = '',
}: CertificationCardProps) {
  const [expanded, setExpanded] = useState(isExpanded)

  const handleToggle = () => {
    setExpanded(!expanded)
    onToggle?.()
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'food-safety':
        return 'from-red-500 to-red-600'
      case 'quality':
        return 'from-blue-500 to-blue-600'
      case 'environmental':
        return 'from-green-500 to-green-600'
      case 'management':
        return 'from-purple-500 to-purple-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'food-safety':
        return '食品安全'
      case 'quality':
        return '品质管理'
      case 'environmental':
        return '环境管理'
      case 'management':
        return '管理系统'
      default:
        return '其他'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const isExpiring = () => {
    const validDate = new Date(certification.validUntil)
    const now = new Date()
    const diffTime = validDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 90 && diffDays > 0
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 ${className}`}
    >
      {/* 卡片头部 */}
      <div
        className={`bg-gradient-to-r ${getCategoryColor(certification.category)} p-6 text-white`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <span className="text-3xl">{certification.icon}</span>
            <div>
              <h3 className="mb-1 text-xl font-bold">{certification.name}</h3>
              <p className="text-sm opacity-90">{certification.description}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(certification.status)}`}
            >
              {certification.status === 'active'
                ? '有效'
                : certification.status === 'expired'
                  ? '已过期'
                  : '待审核'}
            </span>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(certification.priority)}`}
            >
              {certification.priority === 'high'
                ? '高优先级'
                : certification.priority === 'medium'
                  ? '中优先级'
                  : '低优先级'}
            </span>
          </div>
        </div>
      </div>

      {/* 卡片内容 */}
      <div className="p-6">
        {/* 基本信息 */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <div className="mb-1 text-sm text-gray-600">认证编号</div>
            <div className="font-medium text-gray-900">
              {certification.certNumber}
            </div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-600">发证机构</div>
            <div className="font-medium text-gray-900">
              {certification.issuer}
            </div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-600">有效期至</div>
            <div
              className={`font-medium ${isExpiring() ? 'text-orange-600' : 'text-gray-900'}`}
            >
              {certification.validUntil}
              {isExpiring() && (
                <span className="ml-2 rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-800">
                  即将到期
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-600">认证类别</div>
            <div className="font-medium text-gray-900">
              {getCategoryLabel(certification.category)}
            </div>
          </div>
        </div>

        {/* 展开/收起按钮 */}
        <button
          onClick={handleToggle}
          className="flex w-full items-center justify-center gap-2 border-t border-gray-200 py-3 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <span>{expanded ? '收起详情' : '查看详情'}</span>
          <motion.svg
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="h-4 w-4"
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
          </motion.svg>
        </button>
      </div>

      {/* 展开的详细信息 */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gray-200 bg-gray-50"
          >
            <div className="p-6">
              <h4 className="mb-4 text-lg font-semibold text-gray-900">
                认证详细要求
              </h4>
              <div className="space-y-3">
                {certification.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                    <span className="text-gray-700">{detail}</span>
                  </motion.div>
                ))}
              </div>

              {/* 认证状态详情 */}
              <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="mb-1 font-medium text-gray-900">认证状态</h5>
                    <p className="text-sm text-gray-600">
                      此认证目前状态为
                      <span
                        className={`ml-1 font-medium ${
                          certification.status === 'active'
                            ? 'text-green-600'
                            : certification.status === 'expired'
                              ? 'text-red-600'
                              : 'text-yellow-600'
                        }`}
                      >
                        {certification.status === 'active'
                          ? '有效'
                          : certification.status === 'expired'
                            ? '已过期'
                            : '待审核'}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl">
                      {certification.status === 'active'
                        ? '✅'
                        : certification.status === 'expired'
                          ? '❌'
                          : '⏳'}
                    </div>
                  </div>
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
 * 认证网格组件
 * 管理多个认证卡片的展示
 */
interface CertificationGridProps {
  certifications: any[]
  className?: string
}

export function CertificationGrid({
  certifications,
  className = '',
}: CertificationGridProps) {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  const handleToggle = (certId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(certId)) {
        newSet.delete(certId)
      } else {
        newSet.add(certId)
      }
      return newSet
    })
  }

  return (
    <div className={`grid grid-cols-1 gap-6 lg:grid-cols-2 ${className}`}>
      {certifications.map((certification, index) => (
        <motion.div
          key={certification.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <CertificationCard
            certification={certification}
            isExpanded={expandedCards.has(certification.id)}
            onToggle={() => handleToggle(certification.id)}
          />
        </motion.div>
      ))}
    </div>
  )
}
