/**
 * 成本便利性对比功能模块入口文件
 * 统一导出所有公共接口
 */

// 主组件
export { CostConvenience } from './components/CostConvenience'

// 子组件
export { CostCalculator } from './components/CostCalculator'
export { DeliveryOptions } from './components/DeliveryOptions'
export { ConvenienceComparison } from './components/ConvenienceComparison'

// 服务和工具函数
export {
  calculateCost,
  calculateSavingsPercentage,
  formatCurrency,
  formatWeight,
  getWeightRecommendation,
  calculateTotalYearlySavings,
  COST_CONSTANTS,
} from './services/cost-calculator'

// 类型定义
export type {
  CostCalculation,
  DeliveryPlan,
  ConvenienceItem,
  TabType,
  CostCalculatorProps,
  DeliveryOptionsProps,
  ConvenienceComparisonProps,
} from './types'
