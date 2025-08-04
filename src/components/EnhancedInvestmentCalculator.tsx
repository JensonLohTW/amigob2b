/**
 * 增强投资计算器组件
 * 重构后的简化版本，使用模块化架构
 */

'use client'

import { FadeIn } from '@/components/FadeIn'
import { InvestmentCalculator } from '@/features/investment-calculator'

export function EnhancedInvestmentCalculator() {
  return (
    <FadeIn>
      <InvestmentCalculator />
    </FadeIn>
  )
}
