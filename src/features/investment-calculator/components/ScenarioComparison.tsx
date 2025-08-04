'use client'

import { ScenarioComparison as ScenarioComparisonType } from '../types/investment'
import {
  formatCurrency,
  formatNumber,
  getRiskColor,
} from '../services/investment-calculator'

interface ScenarioComparisonProps {
  scenarios: ScenarioComparisonType
  isCalculating: boolean
}

/**
 * 情景对比组件
 * 展示保守、现实、乐观三种情景的对比分析
 */
export function ScenarioComparison({
  scenarios,
  isCalculating,
}: ScenarioComparisonProps) {
  const scenarioData = [
    {
      key: 'conservative',
      title: '保守估计',
      subtitle: '销量 × 70%',
      description: '考虑市场竞争激烈、位置一般等不利因素',
      data: scenarios.conservative,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
    },
    {
      key: 'realistic',
      title: '现实估计',
      subtitle: '销量 × 100%',
      description: '基于当前输入参数的标准预测',
      data: scenarios.realistic,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
    },
    {
      key: 'optimistic',
      title: '乐观估计',
      subtitle: '销量 × 130%',
      description: '考虑位置优越、营销成功等有利因素',
      data: scenarios.optimistic,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
    },
  ]

  if (isCalculating) {
    return (
      <div className="py-12 text-center">
        <div className="inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 text-sm leading-6 font-semibold text-white shadow">
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
          计算情景对比中...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 情景对比说明 */}
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">情景对比分析</h3>
        <p className="mt-2 text-sm text-gray-600">
          基于不同市场条件和经营状况的三种预测情景
        </p>
      </div>

      {/* 情景卡片 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {scenarioData.map((scenario) => (
          <div
            key={scenario.key}
            className={`rounded-lg border-2 ${scenario.borderColor} ${scenario.bgColor} p-6`}
          >
            {/* 情景标题 */}
            <div className="mb-4 text-center">
              <h4 className={`text-lg font-semibold ${scenario.textColor}`}>
                {scenario.title}
              </h4>
              <p className="mt-1 text-sm text-gray-600">{scenario.subtitle}</p>
              <p className="mt-2 text-xs text-gray-500">
                {scenario.description}
              </p>
            </div>

            {/* 关键指标 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  月净利
                </span>
                <span className={`text-lg font-bold ${scenario.textColor}`}>
                  {formatCurrency(scenario.data.monthlyNetProfit || 0)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  回本时间
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatNumber(scenario.data.paybackMonths || 0)} 个月
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  年投资报酬率
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatNumber(scenario.data.annualROI || 0)}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  风险等级
                </span>
                <span
                  className={`text-sm font-semibold ${getRiskColor(scenario.data.riskLevel || '计算中')}`}
                >
                  {scenario.data.riskLevel || '计算中'}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    年预计利润
                  </span>
                  <span className={`text-base font-bold ${scenario.textColor}`}>
                    {formatCurrency(scenario.data.projectedYearlyProfit || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 对比总结 */}
      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <h4 className="mb-4 text-lg font-medium text-gray-900">情景分析总结</h4>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-gray-500">最佳情况</dt>
            <dd className="mt-1 text-sm text-gray-900">
              年利润可达{' '}
              {formatCurrency(scenarios.optimistic.projectedYearlyProfit || 0)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">最差情况</dt>
            <dd className="mt-1 text-sm text-gray-900">
              年利润约为{' '}
              {formatCurrency(
                scenarios.conservative.projectedYearlyProfit || 0,
              )}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">利润区间</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatCurrency(
                (scenarios.optimistic.projectedYearlyProfit || 0) -
                  (scenarios.conservative.projectedYearlyProfit || 0),
              )}{' '}
              差距
            </dd>
          </div>
        </div>

        {/* 投资建议 */}
        <div className="mt-6 rounded-lg bg-gray-50 p-4">
          <h5 className="mb-2 text-sm font-medium text-gray-900">投资建议</h5>
          <div className="space-y-1 text-sm text-gray-700">
            {scenarios.conservative.monthlyNetProfit > 0 &&
              scenarios.conservative.paybackMonths <= 24 && (
                <p>✅ 即使在保守情况下也能盈利，投资风险较低</p>
              )}
            {scenarios.realistic.annualROI >= 15 && (
              <p>✅ 现实情况下投资报酬率良好，值得考虑</p>
            )}
            {scenarios.optimistic.paybackMonths <= 12 && (
              <p>✅ 乐观情况下回本速度快，具有较大潜力</p>
            )}
            {scenarios.conservative.monthlyNetProfit <= 0 && (
              <p>⚠️ 保守情况下可能亏损，需要谨慎评估风险</p>
            )}
            {scenarios.realistic.paybackMonths > 18 && (
              <p>⚠️ 回本时间较长，建议优化经营策略</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
