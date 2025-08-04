'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  CalculationInputs,
  CalculationResults,
  ScenarioComparison,
} from '../types/investment'
import {
  calculateResults,
  calculateScenarios,
} from '../services/investment-calculator'
import { createLogger } from '@/lib/logger'

const logger = createLogger('useInvestmentCalculator')

/**
 * 投资计算器自定义 Hook
 * 管理计算状态和逻辑
 */
export function useInvestmentCalculator() {
  // 输入参数状态
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

  // 计算结果状态
  const [results, setResults] = useState<CalculationResults>({
    monthlyRevenue: 0,
    monthlyGrossProfit: 0,
    monthlyNetProfit: 0,
    paybackMonths: 0,
    annualROI: 0,
    breakEvenPoint: 0,
    riskLevel: '计算中',
    projectedYearlyProfit: 0,
  })

  // 情景对比状态
  const [scenarios, setScenarios] = useState<ScenarioComparison>({
    conservative: {} as CalculationResults,
    realistic: {} as CalculationResults,
    optimistic: {} as CalculationResults,
  })

  // 加载状态
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 更新输入参数
  const updateInput = useCallback(
    (field: keyof CalculationInputs, value: string) => {
      const numericValue = parseFloat(value) || 0
      setInputs((prev) => ({
        ...prev,
        [field]: numericValue,
      }))
      logger.debug('更新输入参数', { field, value: numericValue })
    },
    [],
  )

  // 批量更新输入参数
  const updateInputs = useCallback((newInputs: Partial<CalculationInputs>) => {
    setInputs((prev) => ({
      ...prev,
      ...newInputs,
    }))
    logger.debug('批量更新输入参数', { newInputs })
  }, [])

  // 重置输入参数
  const resetInputs = useCallback(() => {
    setInputs({
      dailySales: 50,
      averagePrice: 180,
      monthlyRent: 15000,
      monthlyUtilities: 3000,
      initialInvestment: 500000,
      locationFactor: 1.0,
      competitionLevel: 0.8,
      seasonalFactor: 1.0,
    })
    logger.info('重置输入参数')
  }, [])

  // 执行计算
  const calculate = useCallback(async () => {
    setIsCalculating(true)
    setError(null)

    try {
      logger.info('开始执行投资计算', { inputs })

      // 计算主要结果
      const mainResults = calculateResults(inputs)
      setResults(mainResults)

      // 计算情景对比
      const scenarioResults = calculateScenarios(inputs)
      setScenarios(scenarioResults)

      logger.info('投资计算完成', { mainResults, scenarioResults })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '计算失败'
      setError(errorMessage)
      logger.error('投资计算失败', { error: err, inputs })
    } finally {
      setIsCalculating(false)
    }
  }, [inputs])

  // 当输入参数变化时自动重新计算
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      calculate()
    }, 300) // 防抖处理

    return () => clearTimeout(timeoutId)
  }, [calculate])

  // 验证输入参数
  const validateInputs = useCallback((): string[] => {
    const errors: string[] = []

    if (inputs.dailySales <= 0) {
      errors.push('日销量必须大于 0')
    }
    if (inputs.averagePrice <= 0) {
      errors.push('平均单价必须大于 0')
    }
    if (inputs.monthlyRent < 0) {
      errors.push('月租金不能为负数')
    }
    if (inputs.monthlyUtilities < 0) {
      errors.push('月水电费不能为负数')
    }
    if (inputs.initialInvestment <= 0) {
      errors.push('初始投资必须大于 0')
    }
    if (inputs.locationFactor <= 0 || inputs.locationFactor > 2) {
      errors.push('地点因子必须在 0-2 之间')
    }
    if (inputs.competitionLevel <= 0 || inputs.competitionLevel > 1) {
      errors.push('竞争水平必须在 0-1 之间')
    }
    if (inputs.seasonalFactor <= 0 || inputs.seasonalFactor > 2) {
      errors.push('季节因子必须在 0-2 之间')
    }

    return errors
  }, [inputs])

  // 获取输入验证状态
  const validationErrors = validateInputs()
  const isValid = validationErrors.length === 0

  return {
    // 状态
    inputs,
    results,
    scenarios,
    isCalculating,
    error,
    isValid,
    validationErrors,

    // 操作
    updateInput,
    updateInputs,
    resetInputs,
    calculate,
  }
}
