/**
 * 投资计算核心逻辑
 */

import { CalculationInputs, CalculationResults, ScenarioComparison } from '@/types/investment'
import { createLogger } from '@/lib/logger'

const logger = createLogger('InvestmentCalculator')

/**
 * 计算投资回报结果
 */
export function calculateResults(
  inputs: CalculationInputs,
  multiplier: number = 1
): CalculationResults {
  logger.debug('开始计算投资回报', { inputs, multiplier })

  try {
    // 考虑地点、竞争和季节因素的调整销量
    const adjustedDailySales =
      inputs.dailySales *
      inputs.locationFactor *
      inputs.competitionLevel *
      inputs.seasonalFactor *
      multiplier

    // 月营收 = 调整后日销量 × 平均单价 × 30天
    const monthlyRevenue = adjustedDailySales * inputs.averagePrice * 30

    // 月毛利 = 月营收 × 30% (分润比例)
    const monthlyGrossProfit = monthlyRevenue * 0.3

    // 月净利 = 月毛利 - 月租金 - 月水电
    const monthlyNetProfit =
      monthlyGrossProfit - inputs.monthlyRent - inputs.monthlyUtilities

    // 回本月数 = 初始投资 ÷ 月净利
    const paybackMonths =
      monthlyNetProfit > 0 ? inputs.initialInvestment / monthlyNetProfit : 0

    // 年投资报酬率 = (月净利 × 12) ÷ 初始投资 × 100%
    const annualROI =
      inputs.initialInvestment > 0
        ? ((monthlyNetProfit * 12) / inputs.initialInvestment) * 100
        : 0

    // 损益平衡点 = 固定成本 ÷ (单价 × 毛利率)
    const breakEvenPoint =
      (inputs.monthlyRent + inputs.monthlyUtilities) /
      (inputs.averagePrice * 0.3)

    // 风险评估
    const riskLevel = getRiskLevel(paybackMonths, annualROI)

    // 预计年利润
    const projectedYearlyProfit = monthlyNetProfit * 12

    const results: CalculationResults = {
      monthlyRevenue,
      monthlyGrossProfit,
      monthlyNetProfit,
      paybackMonths,
      annualROI,
      breakEvenPoint,
      riskLevel,
      projectedYearlyProfit,
    }

    logger.info('投资回报计算完成', { results })
    return results
  } catch (error) {
    logger.error('投资回报计算失败', { error, inputs })
    throw error
  }
}

/**
 * 计算多种情景对比
 */
export function calculateScenarios(inputs: CalculationInputs): ScenarioComparison {
  logger.debug('开始计算情景对比', { inputs })

  const scenarios: ScenarioComparison = {
    conservative: calculateResults(inputs, 0.7), // 保守估计：70%
    realistic: calculateResults(inputs, 1.0),    // 现实估计：100%
    optimistic: calculateResults(inputs, 1.3),   // 乐观估计：130%
  }

  logger.info('情景对比计算完成', { scenarios })
  return scenarios
}

/**
 * 获取风险等级
 */
function getRiskLevel(paybackMonths: number, annualROI: number): string {
  if (paybackMonths <= 8 && annualROI >= 20) {
    return '低风险'
  } else if (paybackMonths <= 12 && annualROI >= 15) {
    return '中等风险'
  } else if (paybackMonths <= 18 && annualROI >= 10) {
    return '中高风险'
  } else {
    return '高风险'
  }
}

/**
 * 获取风险等级对应的颜色
 */
export function getRiskColor(risk: string): string {
  switch (risk) {
    case '低风险':
      return 'text-green-600'
    case '中等风险':
      return 'text-yellow-600'
    case '中高风险':
      return 'text-orange-600'
    case '高风险':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}

/**
 * 获取风险等级描述
 */
export function getRiskText(risk: string): string {
  switch (risk) {
    case '低风险':
      return '投资回报稳定，风险较低'
    case '中等风险':
      return '投资回报合理，风险可控'
    case '中高风险':
      return '投资回报一般，需谨慎评估'
    case '高风险':
      return '投资风险较高，建议重新考虑'
    default:
      return '风险评估中'
  }
}

/**
 * 格式化货币
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * 格式化数字
 */
export function formatNumber(num: number, decimals: number = 1): string {
  return num.toFixed(decimals)
}
