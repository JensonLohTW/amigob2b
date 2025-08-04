'use client'

import { CalculationResults } from '../types/investment'
import {
  formatCurrency,
  formatNumber,
  getRiskColor,
  getRiskText,
} from '../services/investment-calculator'
import { AnimatedNumberCard } from '@/components/ui/AnimatedNumber'

interface CalculatorResultsProps {
  results: CalculationResults
  isCalculating: boolean
}

/**
 * 投资计算器结果显示组件
 * 展示计算结果的关键指标
 */
export function CalculatorResults({
  results,
  isCalculating,
}: CalculatorResultsProps) {
  const resultCards = [
    {
      title: '月营收',
      value: results.monthlyRevenue,
      formatter: formatCurrency,
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
      trend: results.monthlyRevenue > 0 ? 'up' : ('neutral' as const),
    },
    {
      title: '月毛利',
      value: results.monthlyGrossProfit,
      formatter: formatCurrency,
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      trend: results.monthlyGrossProfit > 0 ? 'up' : ('neutral' as const),
    },
    {
      title: '月净利',
      value: results.monthlyNetProfit,
      formatter: formatCurrency,
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      trend:
        results.monthlyNetProfit > 0
          ? 'up'
          : results.monthlyNetProfit < 0
            ? 'down'
            : ('neutral' as const),
    },
    {
      title: '回本时间',
      value: results.paybackMonths,
      formatter: (value: number) => `${formatNumber(value)} 个月`,
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      trend:
        results.paybackMonths <= 12
          ? 'up'
          : results.paybackMonths <= 24
            ? 'neutral'
            : ('down' as const),
    },
    {
      title: '年投资报酬率',
      value: results.annualROI,
      formatter: (value: number) => `${formatNumber(value)}%`,
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
      ),
      trend:
        results.annualROI >= 20
          ? 'up'
          : results.annualROI >= 10
            ? 'neutral'
            : ('down' as const),
    },
    {
      title: '损益平衡点',
      value: results.breakEvenPoint,
      formatter: (value: number) => `${formatNumber(value)} 份/月`,
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      trend: 'neutral' as const,
    },
  ]

  if (isCalculating) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex cursor-not-allowed items-center rounded-md bg-indigo-500 px-4 py-2 text-sm leading-6 font-semibold text-white shadow transition duration-150 ease-in-out hover:bg-indigo-400">
            <svg
              className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            计算中...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resultCards.map((card) => (
          <AnimatedNumberCard
            key={card.title}
            title={card.title}
            value={card.value}
            formatter={card.formatter}
            icon={card.icon}
            trend={['up', 'down', 'neutral'].includes(card.trend) ? (card.trend as 'up' | 'down' | 'neutral') : 'neutral'}
          />
        ))}
      </div>

      {/* 风险评估 */}
      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">风险评估</h3>
          <div className="flex items-center space-x-2">
            <div
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getRiskColor(results.riskLevel)} bg-opacity-10 bg-current`}
            >
              {results.riskLevel}
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {getRiskText(results.riskLevel)}
        </p>

        {/* 风险指标 */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">回本时间评估</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {results.paybackMonths <= 8 && '✅ 快速回本'}
              {results.paybackMonths > 8 &&
                results.paybackMonths <= 12 &&
                '⚠️ 正常回本'}
              {results.paybackMonths > 12 &&
                results.paybackMonths <= 18 &&
                '⚠️ 较慢回本'}
              {results.paybackMonths > 18 && '❌ 回本困难'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">
              投资报酬率评估
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {results.annualROI >= 20 && '✅ 高回报'}
              {results.annualROI >= 15 &&
                results.annualROI < 20 &&
                '⚠️ 中等回报'}
              {results.annualROI >= 10 &&
                results.annualROI < 15 &&
                '⚠️ 一般回报'}
              {results.annualROI < 10 && '❌ 低回报'}
            </dd>
          </div>
        </div>
      </div>

      {/* 年度预测 */}
      <div className="rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 p-6">
        <h3 className="mb-4 text-lg font-medium text-gray-900">年度预测</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">预计年利润</dt>
            <dd className="mt-1 text-2xl font-bold text-indigo-600">
              {formatCurrency(results.projectedYearlyProfit)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">月均净利润</dt>
            <dd className="mt-1 text-2xl font-bold text-indigo-600">
              {formatCurrency(results.monthlyNetProfit)}
            </dd>
          </div>
        </div>
      </div>
    </div>
  )
}
