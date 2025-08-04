'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TestReportCardProps } from '../types'
import {
  BeakerIcon,
  ChartBarIcon,
  CubeIcon,
  RectangleStackIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline'

/**
 * 测试报告卡片组件
 * 展示单个测试报告的详细信息
 */
export function TestReportCard({
  report,
  isExpanded = false,
  onToggle,
  className = '',
}: TestReportCardProps) {
  const [expanded, setExpanded] = useState(isExpanded)

  const handleToggle = () => {
    setExpanded(!expanded)
    onToggle?.()
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'microbiological':
        return 'from-blue-500 to-blue-600'
      case 'chemical':
        return 'from-purple-500 to-purple-600'
      case 'nutritional':
        return 'from-green-500 to-green-600'
      case 'physical':
        return 'from-orange-500 to-orange-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'microbiological':
        return '微生物检验'
      case 'chemical':
        return '化学检验'
      case 'nutritional':
        return '营养成分'
      case 'physical':
        return '物理检验'
      default:
        return '其他检验'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'microbiological':
        return <BeakerIcon className="h-5 w-5" />
      case 'chemical':
        return <ChartBarIcon className="h-5 w-5" />
      case 'nutritional':
        return <CubeIcon className="h-5 w-5" />
      case 'physical':
        return <RectangleStackIcon className="h-5 w-5" />
      default:
        return <ClipboardDocumentListIcon className="h-5 w-5" />
    }
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case 'excellent':
        return 'bg-green-100 text-green-800'
      case 'pass':
        return 'bg-blue-100 text-blue-800'
      case 'fail':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getResultLabel = (result: string) => {
    switch (result) {
      case 'excellent':
        return '优秀'
      case 'pass':
        return '合格'
      case 'fail':
        return '不合格'
      default:
        return '未知'
    }
  }

  const getParameterStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600'
      case 'pass':
        return 'text-blue-600'
      case 'fail':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getParameterStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return '🌟'
      case 'pass':
        return '✅'
      case 'fail':
        return '❌'
      default:
        return '❓'
    }
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
        className={`bg-gradient-to-r ${getCategoryColor(report.category)} p-6 text-white`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
              {getCategoryIcon(report.category)}
            </div>
            <div>
              <h3 className="mb-1 text-xl font-bold">{report.testType}</h3>
              <p className="text-sm opacity-90">
                {getCategoryLabel(report.category)}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${getResultColor(report.result)}`}
            >
              {getResultLabel(report.result)}
            </span>
            <div className="mt-2 text-sm opacity-90">{report.testDate}</div>
          </div>
        </div>
      </div>

      {/* 卡片内容 */}
      <div className="p-6">
        {/* 基本信息 */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <div className="mb-1 text-sm text-gray-600">检验机构</div>
            <div className="font-medium text-gray-900">{report.laboratory}</div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-600">报告编号</div>
            <div className="font-medium text-gray-900">
              {report.reportNumber}
            </div>
          </div>
        </div>

        {/* 检验结果摘要 */}
        <div className="mb-6">
          <h4 className="mb-3 text-sm font-medium text-gray-700">
            检验结果摘要
          </h4>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {report.details.slice(0, 4).map((parameter, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {getParameterStatusIcon(parameter.status)}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {parameter.parameter}
                  </span>
                </div>
                <span
                  className={`text-sm font-medium ${getParameterStatusColor(parameter.status)}`}
                >
                  {parameter.result}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 展开/收起按钮 */}
        <button
          onClick={handleToggle}
          className="flex w-full items-center justify-center gap-2 border-t border-gray-200 py-3 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <span>{expanded ? '收起详情' : '查看完整报告'}</span>
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
                详细检验数据
              </h4>

              {/* 检验参数表格 */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-2 py-3 text-left font-medium text-gray-700">
                        检验项目
                      </th>
                      <th className="px-2 py-3 text-left font-medium text-gray-700">
                        标准值
                      </th>
                      <th className="px-2 py-3 text-left font-medium text-gray-700">
                        检验结果
                      </th>
                      <th className="px-2 py-3 text-left font-medium text-gray-700">
                        检验方法
                      </th>
                      <th className="px-2 py-3 text-center font-medium text-gray-700">
                        状态
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.details.map((parameter, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b border-gray-100"
                      >
                        <td className="px-2 py-3 font-medium text-gray-900">
                          {parameter.parameter}
                        </td>
                        <td className="px-2 py-3 text-gray-600">
                          {parameter.standard}
                        </td>
                        <td className="px-2 py-3">
                          <span
                            className={`font-medium ${getParameterStatusColor(parameter.status)}`}
                          >
                            {parameter.result} {parameter.unit}
                          </span>
                        </td>
                        <td className="px-2 py-3 text-gray-600">
                          {parameter.method || '-'}
                        </td>
                        <td className="px-2 py-3 text-center">
                          <span className="text-lg">
                            {getParameterStatusIcon(parameter.status)}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 检验结论 */}
              <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="mb-1 font-medium text-gray-900">检验结论</h5>
                    <p className="text-sm text-gray-600">
                      根据检验结果，本批次产品
                      <span
                        className={`ml-1 font-medium ${
                          report.result === 'excellent'
                            ? 'text-green-600'
                            : report.result === 'pass'
                              ? 'text-blue-600'
                              : 'text-red-600'
                        }`}
                      >
                        {getResultLabel(report.result)}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl">
                      {report.result === 'excellent'
                        ? '🌟'
                        : report.result === 'pass'
                          ? '✅'
                          : '❌'}
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
 * 测试报告网格组件
 * 管理多个测试报告卡片的展示
 */
interface TestReportGridProps {
  reports: any[]
  className?: string
}

export function TestReportGrid({
  reports,
  className = '',
}: TestReportGridProps) {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  const handleToggle = (reportId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(reportId)) {
        newSet.delete(reportId)
      } else {
        newSet.add(reportId)
      }
      return newSet
    })
  }

  return (
    <div className={`grid grid-cols-1 gap-6 lg:grid-cols-2 ${className}`}>
      {reports.map((report, index) => (
        <motion.div
          key={report.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <TestReportCard
            report={report}
            isExpanded={expandedCards.has(report.id)}
            onToggle={() => handleToggle(report.id)}
          />
        </motion.div>
      ))}
    </div>
  )
}
