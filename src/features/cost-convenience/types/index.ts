/**
 * 成本便利性对比相关的类型定义
 */

export interface CostCalculation {
  petWeight: number
  dailyPortion: number
  freshFoodCost: number
  dryFoodCost: number
  monthlyFreshFood: number
  monthlyDryFood: number
  yearlyFreshFood: number
  yearlyDryFood: number
  potentialVetSavings: number
}

export interface DeliveryPlan {
  id: string
  name: string
  description: string
  frequency: string
  discount: number
  minOrder: number
  freeShipping: boolean
  features: string[]
  price: string
  popular?: boolean
}

export interface ConvenienceItem {
  id: string
  title: string
  freshFood: {
    rating: number
    description: string
    details: string[]
  }
  traditionalFood: {
    rating: number
    description: string
    details: string[]
  }
  icon: React.ReactNode
}

export type TabType = 'cost' | 'delivery' | 'convenience'

export interface CostCalculatorProps {
  initialWeight?: number
  onWeightChange?: (weight: number) => void
}

export interface DeliveryOptionsProps {
  selectedPlan?: string
  onPlanSelect?: (planId: string) => void
}

export interface ConvenienceComparisonProps {
  showDetails?: boolean
}
