import { type Metadata } from 'next'
import { RootLayout } from '@/components/RootLayout'
import { ComparisonHero } from '@/components/comparison/ComparisonHero'
import { QuickComparisonTable } from '@/components/comparison/QuickComparisonTable'
import { NutritionScience } from '@/components/comparison/NutritionScience'
import { HealthCaseStudies } from '@/components/comparison/HealthCaseStudies'
import { IngredientVisualization } from '@/components/comparison/IngredientVisualization'
import { SafetyStandards } from '@/components/comparison/SafetyStandards'
import { CostConvenience } from '@/components/comparison/CostConvenience'
import { ComparisonFAQ } from '@/components/comparison/ComparisonFAQ'
import { ComparisonCTA } from '@/components/comparison/ComparisonCTA'

export const metadata: Metadata = {
  title: '鮮食便當 vs 傳統乾糧 - 科學對比分析',
  description:
    '深入了解寵物鮮食便當與傳統乾糧的差異。透過科學數據、營養分析和健康案例，為您的毛孩選擇最適合的飲食方案。',
}

export default function ComparisonPage() {
  return (
    <RootLayout>
      {/* 1. 首屏 Hero */}
      <ComparisonHero />
      
      {/* 2. 快速對比表 */}
      <QuickComparisonTable />
      
      {/* 3. 營養科學證據 */}
      <NutritionScience />
      
      {/* 4. 健康成效案例 */}
      <HealthCaseStudies />
      
      {/* 5. 成分可視化 */}
      <IngredientVisualization />
      
      {/* 6. 安全與標準 */}
      <SafetyStandards />
      
      {/* 7. 成本與便利性 */}
      <CostConvenience />
      
      {/* 8. FAQ */}
      <ComparisonFAQ />
      
      {/* 9. 行動召喚 CTA */}
      <ComparisonCTA />
    </RootLayout>
  )
}
