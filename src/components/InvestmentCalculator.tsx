'use client'

import { useState, useEffect } from 'react'
import { FadeIn } from '@/components/FadeIn'
import { motion } from 'framer-motion'

interface CalculationInputs {
  dailySales: number
  averagePrice: number
  monthlyRent: number
  monthlyUtilities: number
  initialInvestment: number
  locationFactor: number
  competitionLevel: number
  seasonalFactor: number
}

interface CalculationResults {
  monthlyRevenue: number
  monthlyGrossProfit: number
  monthlyNetProfit: number
  paybackMonths: number
  annualROI: number
  breakEvenPoint: number
  riskLevel: string
  projectedYearlyProfit: number
}

interface ScenarioComparison {
  conservative: CalculationResults
  realistic: CalculationResults
  optimistic: CalculationResults
}

export function InvestmentCalculator() {
  const [inputs, setInputs] = useState<CalculationInputs>({
    dailySales: 50,
    averagePrice: 180,
    monthlyRent: 15000,
    monthlyUtilities: 3000,
    initialInvestment: 500000,
    locationFactor: 1.0,
    competitionLevel: 0.8,
    seasonalFactor: 1.0,
  })

  const [results, setResults] = useState<CalculationResults>({
    monthlyRevenue: 0,
    monthlyGrossProfit: 0,
    monthlyNetProfit: 0,
    paybackMonths: 0,
    annualROI: 0,
    breakEvenPoint: 0,
    riskLevel: 'medium',
    projectedYearlyProfit: 0,
  })

  const [scenarios, setScenarios] = useState<ScenarioComparison>({
    conservative: {} as CalculationResults,
    realistic: {} as CalculationResults,
    optimistic: {} as CalculationResults,
  })

  const [activeTab, setActiveTab] = useState<
    'calculator' | 'scenarios' | 'analysis'
  >('calculator')

  // 增強的計算邏輯
  useEffect(() => {
    const calculateResults = (multiplier: number = 1) => {
      // 考慮地點、競爭和季節因素的調整銷量
      const adjustedDailySales =
        inputs.dailySales *
        inputs.locationFactor *
        inputs.competitionLevel *
        inputs.seasonalFactor *
        multiplier

      // 月營收 = 調整後日銷量 × 平均單價 × 30天
      const monthlyRevenue = adjustedDailySales * inputs.averagePrice * 30

      // 月毛利 = 月營收 × 30% (分潤比例)
      const monthlyGrossProfit = monthlyRevenue * 0.3

      // 月淨利 = 月毛利 - 月租金 - 月水電
      const monthlyNetProfit =
        monthlyGrossProfit - inputs.monthlyRent - inputs.monthlyUtilities

      // 回本月數 = 初始投資 ÷ 月淨利
      const paybackMonths =
        monthlyNetProfit > 0 ? inputs.initialInvestment / monthlyNetProfit : 0

      // 年投資報酬率 = (月淨利 × 12) ÷ 初始投資 × 100%
      const annualROI =
        inputs.initialInvestment > 0
          ? ((monthlyNetProfit * 12) / inputs.initialInvestment) * 100
          : 0

      // 損益平衡點 = 固定成本 ÷ (單價 × 毛利率)
      const breakEvenPoint =
        (inputs.monthlyRent + inputs.monthlyUtilities) /
        (inputs.averagePrice * 0.3)

      // 風險評估
      const riskLevel =
        paybackMonths <= 8 && annualROI >= 20
          ? 'low'
          : paybackMonths <= 12 && annualROI >= 15
            ? 'medium'
            : 'high'

      // 預計年利潤
      const projectedYearlyProfit = monthlyNetProfit * 12

      return {
        monthlyRevenue,
        monthlyGrossProfit,
        monthlyNetProfit,
        paybackMonths,
        annualROI,
        breakEvenPoint,
        riskLevel,
        projectedYearlyProfit,
      }
    }

    // 計算主要結果
    const mainResults = calculateResults()
    setResults(mainResults)

    // 計算三種情境
    setScenarios({
      conservative: calculateResults(0.7), // 保守估計：70%
      realistic: calculateResults(1.0), // 現實估計：100%
      optimistic: calculateResults(1.3), // 樂觀估計：130%
    })
  }, [inputs])

  const handleInputChange = (field: keyof CalculationInputs, value: string) => {
    const numericValue = parseFloat(value) || 0
    setInputs((prev) => ({
      ...prev,
      [field]: numericValue,
    }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number, decimals: number = 1) => {
    return num.toFixed(decimals)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'low':
        return '低風險'
      case 'medium':
        return '中等風險'
      case 'high':
        return '高風險'
      default:
        return '未知風險'
    }
  }

  return (
    <FadeIn>
      <div className="rounded-3xl bg-neutral-50 p-8">
        <h3 className="mb-8 text-center text-2xl font-semibold text-neutral-950">
          投資回報試算工具
        </h3>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 輸入參數區域 */}
          <div className="rounded-2xl bg-white p-6">
            <h4 className="mb-6 text-lg font-semibold text-neutral-950">
              營運參數設定
            </h4>
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  日銷售數量 (件)
                </label>
                <input
                  type="number"
                  value={inputs.dailySales}
                  onChange={(e) =>
                    handleInputChange('dailySales', e.target.value)
                  }
                  className="w-full rounded-md border-neutral-300 p-3 text-lg shadow-sm focus:border-neutral-500 focus:ring-neutral-500"
                  placeholder="50"
                  min="0"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  平均單價 (元)
                </label>
                <input
                  type="number"
                  value={inputs.averagePrice}
                  onChange={(e) =>
                    handleInputChange('averagePrice', e.target.value)
                  }
                  className="w-full rounded-md border-neutral-300 p-3 text-lg shadow-sm focus:border-neutral-500 focus:ring-neutral-500"
                  placeholder="180"
                  min="0"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  月租金 (元)
                </label>
                <input
                  type="number"
                  value={inputs.monthlyRent}
                  onChange={(e) =>
                    handleInputChange('monthlyRent', e.target.value)
                  }
                  className="w-full rounded-md border-neutral-300 p-3 text-lg shadow-sm focus:border-neutral-500 focus:ring-neutral-500"
                  placeholder="15000"
                  min="0"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  月水電費 (元)
                </label>
                <input
                  type="number"
                  value={inputs.monthlyUtilities}
                  onChange={(e) =>
                    handleInputChange('monthlyUtilities', e.target.value)
                  }
                  className="w-full rounded-md border-neutral-300 p-3 text-lg shadow-sm focus:border-neutral-500 focus:ring-neutral-500"
                  placeholder="3000"
                  min="0"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  初始投資 (元)
                </label>
                <input
                  type="number"
                  value={inputs.initialInvestment}
                  onChange={(e) =>
                    handleInputChange('initialInvestment', e.target.value)
                  }
                  className="w-full rounded-md border-neutral-300 p-3 text-lg shadow-sm focus:border-neutral-500 focus:ring-neutral-500"
                  placeholder="500000"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* 計算結果區域 */}
          <div className="rounded-2xl bg-white p-6">
            <h4 className="mb-6 text-lg font-semibold text-neutral-950">
              投資回報分析
            </h4>
            <div className="space-y-6">
              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-600">
                    月營收
                  </span>
                  <span className="text-xl font-bold text-neutral-950">
                    {formatCurrency(results.monthlyRevenue)}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-600">
                    月毛利 (30%)
                  </span>
                  <span className="text-xl font-bold text-neutral-950">
                    {formatCurrency(results.monthlyGrossProfit)}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-600">
                    月淨利
                  </span>
                  <span className="text-xl font-bold text-neutral-950">
                    {formatCurrency(results.monthlyNetProfit)}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-600">
                    回本時間
                  </span>
                  <span className="text-xl font-bold text-neutral-950">
                    {results.paybackMonths > 0
                      ? `${formatNumber(results.paybackMonths)} 個月`
                      : '無法回本'}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-600">
                    年投資報酬率
                  </span>
                  <span className="text-xl font-bold text-neutral-950">
                    {formatNumber(results.annualROI)}%
                  </span>
                </div>
              </div>
            </div>

            {/* 投資建議 */}
            <div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <h5 className="mb-2 font-medium text-neutral-950">投資建議</h5>
              <p className="text-sm text-neutral-600">
                {results.paybackMonths <= 8 && results.annualROI >= 20
                  ? '✅ 優秀的投資機會！回本時間短且報酬率高。'
                  : results.paybackMonths <= 12 && results.annualROI >= 15
                    ? '⚠️ 可考慮的投資機會，建議評估風險。'
                    : '❌ 投資風險較高，建議重新評估參數。'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
