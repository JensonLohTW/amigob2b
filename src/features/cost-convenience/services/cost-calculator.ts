/**
 * 成本计算服务
 * 处理宠物食品成本相关的计算逻辑
 */

import { CostCalculation } from '../types'
import { createLogger } from '@/lib/logger'

const logger = createLogger('CostCalculator')

// 成本计算常量
export const COST_CONSTANTS = {
  // 每公斤体重的日需求量 (克)
  DAILY_PORTION_PER_KG: 25,

  // 每100克的价格 (新台币)
  FRESH_FOOD_PRICE_PER_100G: 18,
  DRY_FOOD_PRICE_PER_100G: 12,

  // 健康改善带来的潜在兽医费用节省比例
  VET_SAVINGS_RATIO: 0.3,

  // 时间常量
  DAYS_PER_MONTH: 30,
  DAYS_PER_YEAR: 365,
} as const

/**
 * 计算宠物食品成本
 * @param weight 宠物体重 (公斤)
 * @returns 详细的成本计算结果
 */
export function calculateCost(weight: number): CostCalculation {
  logger.debug('开始计算宠物食品成本', { weight })

  try {
    // 输入验证
    if (weight <= 0 || weight > 100) {
      throw new Error('宠物体重必须在 0-100 公斤之间')
    }

    // 每日食物需求量 (克)
    const dailyPortion = weight * COST_CONSTANTS.DAILY_PORTION_PER_KG

    // 每日成本计算
    const freshFoodCost =
      (dailyPortion / 100) * COST_CONSTANTS.FRESH_FOOD_PRICE_PER_100G
    const dryFoodCost =
      (dailyPortion / 100) * COST_CONSTANTS.DRY_FOOD_PRICE_PER_100G

    // 月度成本
    const monthlyFreshFood = freshFoodCost * COST_CONSTANTS.DAYS_PER_MONTH
    const monthlyDryFood = dryFoodCost * COST_CONSTANTS.DAYS_PER_MONTH

    // 年度成本
    const yearlyFreshFood = freshFoodCost * COST_CONSTANTS.DAYS_PER_YEAR
    const yearlyDryFood = dryFoodCost * COST_CONSTANTS.DAYS_PER_YEAR

    // 潜在兽医费用节省 (基于健康改善统计)
    const potentialVetSavings =
      yearlyFreshFood * COST_CONSTANTS.VET_SAVINGS_RATIO

    const result: CostCalculation = {
      petWeight: weight,
      dailyPortion,
      freshFoodCost,
      dryFoodCost,
      monthlyFreshFood,
      monthlyDryFood,
      yearlyFreshFood,
      yearlyDryFood,
      potentialVetSavings,
    }

    logger.info('成本计算完成', { weight, result })
    return result
  } catch (error) {
    logger.error('成本计算失败', { error, weight })
    throw error
  }
}

/**
 * 计算成本节省百分比
 * @param freshCost 鲜食成本
 * @param dryCost 干粮成本
 * @returns 节省百分比
 */
export function calculateSavingsPercentage(
  freshCost: number,
  dryCost: number,
): number {
  if (dryCost === 0) return 0
  return ((dryCost - freshCost) / dryCost) * 100
}

/**
 * 格式化货币显示
 * @param amount 金额
 * @returns 格式化后的货币字符串
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * 格式化重量显示
 * @param weight 重量 (克)
 * @returns 格式化后的重量字符串
 */
export function formatWeight(weight: number): string {
  if (weight >= 1000) {
    return `${(weight / 1000).toFixed(1)} 公斤`
  }
  return `${weight.toFixed(0)} 克`
}

/**
 * 获取体重建议范围
 * @param petType 宠物类型
 * @returns 建议体重范围
 */
export function getWeightRecommendation(petType: 'dog' | 'cat' = 'dog'): {
  min: number
  max: number
  typical: number
} {
  const recommendations = {
    dog: { min: 2, max: 50, typical: 15 },
    cat: { min: 2, max: 8, typical: 4 },
  }

  return recommendations[petType]
}

/**
 * 计算年度总节省 (包括兽医费用)
 * @param calculation 成本计算结果
 * @returns 年度总节省金额
 */
export function calculateTotalYearlySavings(
  calculation: CostCalculation,
): number {
  const foodSavings = calculation.yearlyDryFood - calculation.yearlyFreshFood
  const vetSavings = calculation.potentialVetSavings
  return Math.max(0, foodSavings + vetSavings)
}
