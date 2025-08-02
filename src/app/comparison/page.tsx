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
      <div id="hero">
        <ComparisonHero />
      </div>

      {/* 2. 快速對比表 */}
      <div id="comparison-table">
        <QuickComparisonTable />
      </div>

      {/* 3. 營養科學證據 */}
      <div id="nutrition-science">
        <NutritionScience />
      </div>

      {/* 4. 健康成效案例 */}
      <div id="health-cases">
        <HealthCaseStudies />
      </div>

      {/* 5. 成分可視化 */}
      <div id="ingredients">
        <IngredientVisualization />
      </div>

      {/* 6. 安全與標準 */}
      <div id="safety">
        <SafetyStandards />
      </div>

      {/* 7. 成本與便利性 */}
      <div id="cost">
        <CostConvenience />
      </div>

      {/* 8. FAQ */}
      <div id="faq">
        <ComparisonFAQ />
      </div>

      {/* 9. 行動召喚 CTA */}
      <div id="cta">
        <ComparisonCTA />
      </div>
    </RootLayout>
  )
}
