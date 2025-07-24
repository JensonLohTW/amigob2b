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

export function EnhancedInvestmentCalculator() {
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

  const [activeTab, setActiveTab] = useState<'calculator' | 'scenarios' | 'analysis'>('calculator')

  // 增強的計算邏輯
  useEffect(() => {
    const calculateResults = (multiplier: number = 1) => {
      // 考慮地點、競爭和季節因素的調整銷量
      const adjustedDailySales = inputs.dailySales * inputs.locationFactor * inputs.competitionLevel * inputs.seasonalFactor * multiplier

      // 月營收 = 調整後日銷量 × 平均單價 × 30天
      const monthlyRevenue = adjustedDailySales * inputs.averagePrice * 30

      // 月毛利 = 月營收 × 30% (分潤比例)
      const monthlyGrossProfit = monthlyRevenue * 0.3

      // 月淨利 = 月毛利 - 月租金 - 月水電
      const monthlyNetProfit = monthlyGrossProfit - inputs.monthlyRent - inputs.monthlyUtilities

      // 回本月數 = 初始投資 ÷ 月淨利
      const paybackMonths = monthlyNetProfit > 0 ? inputs.initialInvestment / monthlyNetProfit : 0

      // 年投資報酬率 = (月淨利 × 12) ÷ 初始投資 × 100%
      const annualROI = inputs.initialInvestment > 0 ? (monthlyNetProfit * 12) / inputs.initialInvestment * 100 : 0

      // 損益平衡點 = 固定成本 ÷ (單價 × 毛利率)
      const breakEvenPoint = (inputs.monthlyRent + inputs.monthlyUtilities) / (inputs.averagePrice * 0.3)

      // 風險評估
      const riskLevel = paybackMonths <= 8 && annualROI >= 20 ? 'low' : 
                       paybackMonths <= 12 && annualROI >= 15 ? 'medium' : 'high'

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
      realistic: calculateResults(1.0),    // 現實估計：100%
      optimistic: calculateResults(1.3),   // 樂觀估計：130%
    })
  }, [inputs])

  const handleInputChange = (field: keyof CalculationInputs, value: string) => {
    const numericValue = parseFloat(value) || 0
    setInputs(prev => ({
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
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'low': return '低風險'
      case 'medium': return '中等風險'
      case 'high': return '高風險'
      default: return '未知風險'
    }
  }

  // 動畫數字組件
  const AnimatedNumber = ({ value, prefix = '', suffix = '', decimals = 0 }: {
    value: number
    prefix?: string
    suffix?: string
    decimals?: number
  }) => (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-xl font-bold text-neutral-950"
    >
      {prefix}{decimals > 0 ? formatNumber(value, decimals) : Math.round(value).toLocaleString()}{suffix}
    </motion.span>
  )

  return (
    <FadeIn>
      <div className="rounded-3xl bg-neutral-50 p-8">
        <h3 className="text-2xl font-semibold text-neutral-950 text-center mb-8">
          智能投資回報試算工具
        </h3>
        
        {/* 標籤導航 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            {[
              { key: 'calculator', label: '基礎計算' },
              { key: 'scenarios', label: '情境分析' },
              { key: 'analysis', label: '風險評估' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-neutral-950 text-white'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* 基礎參數輸入 */}
            <div className="rounded-2xl bg-white p-6">
              <h4 className="text-lg font-semibold text-neutral-950 mb-6">基礎營運參數</h4>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    日銷售數量 (件)
                  </label>
                  <input 
                    type="number" 
                    value={inputs.dailySales}
                    onChange={(e) => handleInputChange('dailySales', e.target.value)}
                    className="w-full rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 text-lg p-3"
                    placeholder="50"
                    min="0"
                  />
                  <p className="text-xs text-neutral-500 mt-1">建議範圍：30-100 件/日</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    平均單價 (元)
                  </label>
                  <input 
                    type="number" 
                    value={inputs.averagePrice}
                    onChange={(e) => handleInputChange('averagePrice', e.target.value)}
                    className="w-full rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 text-lg p-3"
                    placeholder="180"
                    min="0"
                  />
                  <p className="text-xs text-neutral-500 mt-1">建議範圍：150-250 元</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    月租金 (元)
                  </label>
                  <input 
                    type="number" 
                    value={inputs.monthlyRent}
                    onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                    className="w-full rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 text-lg p-3"
                    placeholder="15000"
                    min="0"
                  />
                  <p className="text-xs text-neutral-500 mt-1">包含場地租金</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    月水電費 (元)
                  </label>
                  <input 
                    type="number" 
                    value={inputs.monthlyUtilities}
                    onChange={(e) => handleInputChange('monthlyUtilities', e.target.value)}
                    className="w-full rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 text-lg p-3"
                    placeholder="3000"
                    min="0"
                  />
                  <p className="text-xs text-neutral-500 mt-1">包含電費、網路費等</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    初始投資 (元)
                  </label>
                  <input 
                    type="number" 
                    value={inputs.initialInvestment}
                    onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
                    className="w-full rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 text-lg p-3"
                    placeholder="500000"
                    min="0"
                  />
                  <p className="text-xs text-neutral-500 mt-1">包含機台、裝修、保證金等</p>
                </div>
              </div>

              {/* 進階參數 */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <h5 className="text-lg font-semibold text-neutral-950 mb-4">進階參數調整</h5>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      地點因子
                    </label>
                    <select
                      value={inputs.locationFactor}
                      onChange={(e) => handleInputChange('locationFactor', e.target.value)}
                      className="w-full rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 text-sm p-2"
                    >
                      <option value="0.7">偏遠地區 (0.7x)</option>
                      <option value="0.8">一般地區 (0.8x)</option>
                      <option value="1.0">市區 (1.0x)</option>
                      <option value="1.2">商業區 (1.2x)</option>
                      <option value="1.5">黃金地段 (1.5x)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      競爭程度
                    </label>
                    <select
                      value={inputs.competitionLevel}
                      onChange={(e) => handleInputChange('competitionLevel', e.target.value)}
                      className="w-full rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 text-sm p-2"
                    >
                      <option value="0.6">競爭激烈 (0.6x)</option>
                      <option value="0.8">中等競爭 (0.8x)</option>
                      <option value="1.0">一般競爭 (1.0x)</option>
                      <option value="1.2">競爭較少 (1.2x)</option>
                      <option value="1.4">獨家經營 (1.4x)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      季節因子
                    </label>
                    <select
                      value={inputs.seasonalFactor}
                      onChange={(e) => handleInputChange('seasonalFactor', e.target.value)}
                      className="w-full rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500 text-sm p-2"
                    >
                      <option value="0.8">淡季影響大 (0.8x)</option>
                      <option value="0.9">輕微季節影響 (0.9x)</option>
                      <option value="1.0">無季節影響 (1.0x)</option>
                      <option value="1.1">旺季效應 (1.1x)</option>
                      <option value="1.2">強烈旺季 (1.2x)</option>
                    </select>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mt-3">
                  💡 這些因子會影響實際銷量，請根據您的實際情況調整
                </p>
              </div>
            </div>

            {/* 計算結果顯示 */}
            <div className="rounded-2xl bg-white p-6">
              <h4 className="text-lg font-semibold text-neutral-950 mb-6">投資回報分析</h4>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-600">月營收</span>
                    <AnimatedNumber value={results.monthlyRevenue} prefix="NT$ " />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-600">月毛利 (30%)</span>
                    <AnimatedNumber value={results.monthlyGrossProfit} prefix="NT$ " />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-600">月淨利</span>
                    <AnimatedNumber value={results.monthlyNetProfit} prefix="NT$ " />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-600">回本時間</span>
                    <AnimatedNumber 
                      value={results.paybackMonths} 
                      suffix=" 個月" 
                      decimals={1}
                    />
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-600">年投資報酬率</span>
                    <AnimatedNumber 
                      value={results.annualROI} 
                      suffix="%" 
                      decimals={1}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-600">損益平衡點</span>
                    <AnimatedNumber 
                      value={results.breakEvenPoint} 
                      suffix=" 件/月" 
                      decimals={0}
                    />
                  </div>
                </div>
              </div>
              
              {/* 風險評估 */}
              <div className={`mt-6 p-4 rounded-lg border ${getRiskColor(results.riskLevel)}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">風險評估</span>
                  <span className="font-bold">{getRiskText(results.riskLevel)}</span>
                </div>
                <p className="text-sm mt-2">
                  {results.paybackMonths <= 8 && results.annualROI >= 20 
                    ? '✅ 優秀的投資機會！回本時間短且報酬率高。'
                    : results.paybackMonths <= 12 && results.annualROI >= 15
                    ? '⚠️ 可考慮的投資機會，建議評估風險。'
                    : '❌ 投資風險較高，建議重新評估參數。'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scenarios' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h4 className="text-lg font-semibold text-neutral-950 mb-2">情境分析比較</h4>
              <p className="text-neutral-600">比較保守、現實和樂觀三種情境下的投資表現</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* 保守情境 */}
              <div className="rounded-2xl bg-white p-6 border-2 border-red-100">
                <div className="text-center mb-4">
                  <h5 className="text-lg font-semibold text-red-600">保守估計</h5>
                  <p className="text-sm text-neutral-600">銷量 70%</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">月淨利</span>
                    <span className="font-semibold">{formatCurrency(scenarios.conservative.monthlyNetProfit || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">回本時間</span>
                    <span className="font-semibold">
                      {scenarios.conservative.paybackMonths > 0 ? `${formatNumber(scenarios.conservative.paybackMonths || 0)} 個月` : '無法回本'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">年報酬率</span>
                    <span className="font-semibold">{formatNumber(scenarios.conservative.annualROI || 0)}%</span>
                  </div>
                </div>
              </div>

              {/* 現實情境 */}
              <div className="rounded-2xl bg-white p-6 border-2 border-blue-100">
                <div className="text-center mb-4">
                  <h5 className="text-lg font-semibold text-blue-600">現實估計</h5>
                  <p className="text-sm text-neutral-600">銷量 100%</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">月淨利</span>
                    <span className="font-semibold">{formatCurrency(scenarios.realistic.monthlyNetProfit || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">回本時間</span>
                    <span className="font-semibold">
                      {scenarios.realistic.paybackMonths > 0 ? `${formatNumber(scenarios.realistic.paybackMonths || 0)} 個月` : '無法回本'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">年報酬率</span>
                    <span className="font-semibold">{formatNumber(scenarios.realistic.annualROI || 0)}%</span>
                  </div>
                </div>
              </div>

              {/* 樂觀情境 */}
              <div className="rounded-2xl bg-white p-6 border-2 border-green-100">
                <div className="text-center mb-4">
                  <h5 className="text-lg font-semibold text-green-600">樂觀估計</h5>
                  <p className="text-sm text-neutral-600">銷量 130%</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">月淨利</span>
                    <span className="font-semibold">{formatCurrency(scenarios.optimistic.monthlyNetProfit || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">回本時間</span>
                    <span className="font-semibold">
                      {scenarios.optimistic.paybackMonths > 0 ? `${formatNumber(scenarios.optimistic.paybackMonths || 0)} 個月` : '無法回本'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">年報酬率</span>
                    <span className="font-semibold">{formatNumber(scenarios.optimistic.annualROI || 0)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 情境說明 */}
            <div className="rounded-2xl bg-white p-6">
              <h5 className="text-lg font-semibold text-neutral-950 mb-4">情境說明</h5>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div>
                  <h6 className="font-medium text-red-600 mb-2">保守情境 (70%)</h6>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• 競爭激烈的市場</li>
                    <li>• 位置較不理想</li>
                    <li>• 淡季影響較大</li>
                    <li>• 客戶接受度較低</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-blue-600 mb-2">現實情境 (100%)</h6>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• 一般市場競爭</li>
                    <li>• 位置適中</li>
                    <li>• 季節影響正常</li>
                    <li>• 預期銷售表現</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-green-600 mb-2">樂觀情境 (130%)</h6>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    <li>• 市場競爭較少</li>
                    <li>• 黃金地段位置</li>
                    <li>• 旺季效應明顯</li>
                    <li>• 客戶接受度高</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h4 className="text-lg font-semibold text-neutral-950 mb-2">風險評估與建議</h4>
              <p className="text-neutral-600">深入分析投資風險和成功因素</p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* 風險因素分析 */}
              <div className="rounded-2xl bg-white p-6">
                <h5 className="text-lg font-semibold text-neutral-950 mb-4">風險因素分析</h5>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <h6 className="font-medium text-red-600 mb-2">高風險因素</h6>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• 回本時間超過 12 個月</li>
                      <li>• 年報酬率低於 15%</li>
                      <li>• 月淨利低於 3 萬元</li>
                      <li>• 損益平衡點過高</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                    <h6 className="font-medium text-yellow-600 mb-2">中等風險因素</h6>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• 回本時間 8-12 個月</li>
                      <li>• 年報酬率 15-20%</li>
                      <li>• 市場競爭激烈</li>
                      <li>• 季節性影響明顯</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <h6 className="font-medium text-green-600 mb-2">低風險因素</h6>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• 回本時間少於 8 個月</li>
                      <li>• 年報酬率超過 20%</li>
                      <li>• 穩定的客戶群</li>
                      <li>• 優質地段位置</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 成功建議 */}
              <div className="rounded-2xl bg-white p-6">
                <h5 className="text-lg font-semibold text-neutral-950 mb-4">成功建議</h5>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <h6 className="font-medium text-blue-600 mb-2">選址建議</h6>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• 寵物醫院或寵物店附近</li>
                      <li>• 社區密集住宅區</li>
                      <li>• 人流量穩定的商圈</li>
                      <li>• 停車方便的位置</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                    <h6 className="font-medium text-purple-600 mb-2">營運建議</h6>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• 定期檢查產品新鮮度</li>
                      <li>• 與當地寵物店合作</li>
                      <li>• 建立客戶回饋機制</li>
                      <li>• 適時調整產品組合</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
                    <h6 className="font-medium text-indigo-600 mb-2">行銷建議</h6>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• 社群媒體宣傳</li>
                      <li>• 開幕優惠活動</li>
                      <li>• 會員制度建立</li>
                      <li>• 口碑行銷推廣</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 投資決策建議 */}
            <div className="rounded-2xl bg-white p-6">
              <h5 className="text-lg font-semibold text-neutral-950 mb-4">投資決策建議</h5>
              <div className={`p-6 rounded-lg border-2 ${getRiskColor(results.riskLevel)}`}>
                <div className="text-center mb-4">
                  <h6 className="text-xl font-bold mb-2">
                    當前風險等級：{getRiskText(results.riskLevel)}
                  </h6>
                  <p className="text-sm">
                    基於您輸入的參數，系統評估的投資風險等級
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div>
                    <h6 className="font-medium mb-2">關鍵指標</h6>
                    <ul className="text-sm space-y-1">
                      <li>• 回本時間：{formatNumber(results.paybackMonths)} 個月</li>
                      <li>• 年報酬率：{formatNumber(results.annualROI)}%</li>
                      <li>• 月淨利：{formatCurrency(results.monthlyNetProfit)}</li>
                      <li>• 損益平衡：{Math.round(results.breakEvenPoint)} 件/月</li>
                    </ul>
                  </div>

                  <div>
                    <h6 className="font-medium mb-2">建議行動</h6>
                    <ul className="text-sm space-y-1">
                      {results.riskLevel === 'low' && (
                        <>
                          <li>• ✅ 建議立即投資</li>
                          <li>• ✅ 考慮多點布局</li>
                          <li>• ✅ 準備擴展計劃</li>
                        </>
                      )}
                      {results.riskLevel === 'medium' && (
                        <>
                          <li>• ⚠️ 謹慎評估後投資</li>
                          <li>• ⚠️ 先試營運觀察</li>
                          <li>• ⚠️ 準備風險應對</li>
                        </>
                      )}
                      {results.riskLevel === 'high' && (
                        <>
                          <li>• ❌ 建議重新評估</li>
                          <li>• ❌ 尋找更好位置</li>
                          <li>• ❌ 降低初始投資</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </FadeIn>
  )
}
