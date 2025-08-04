/**
 * 投资计算相关的类型定义
 */

export interface CalculationInputs {
  dailySales: number
  averagePrice: number
  monthlyRent: number
  monthlyUtilities: number
  initialInvestment: number
  locationFactor: number
  competitionLevel: number
  seasonalFactor: number
}

export interface CalculationResults {
  monthlyRevenue: number
  monthlyGrossProfit: number
  monthlyNetProfit: number
  paybackMonths: number
  annualROI: number
  breakEvenPoint: number
  riskLevel: string
  projectedYearlyProfit: number
}

export interface ScenarioComparisonData {
  conservative: CalculationResults
  realistic: CalculationResults
  optimistic: CalculationResults
}

export type TabType = 'calculator' | 'scenarios' | 'analysis'

export interface AnimatedNumberProps {
  value: number
  duration?: number
  formatter?: (value: number) => string
  className?: string
}
