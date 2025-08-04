/**
 * 投资计算器功能模块入口文件
 * 统一导出所有公共接口
 */

// 主组件
export { InvestmentCalculator } from './components/InvestmentCalculator'

// 子组件
export { CalculatorInputForm } from './components/CalculatorInputForm'
export { CalculatorResults } from './components/CalculatorResults'
export { ScenarioComparison } from './components/ScenarioComparison'

// 自定义 Hooks
export { useInvestmentCalculator } from './hooks/useInvestmentCalculator'

// 服务和工具函数
export {
  calculateResults,
  calculateScenarios,
  getRiskColor,
  getRiskText,
  formatCurrency,
  formatNumber,
} from './services/investment-calculator'

// 类型定义
export type {
  CalculationInputs,
  CalculationResults,
  ScenarioComparison,
  TabType,
  AnimatedNumberProps,
} from './types/investment'
