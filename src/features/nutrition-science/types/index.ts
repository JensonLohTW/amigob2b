/**
 * 营养科学相关的类型定义
 */

export interface NutritionData {
  nutrient: string
  freshFood: number
  dryFood: number
  unit: string
  description: string
  source: string
  category: 'protein' | 'vitamin' | 'mineral' | 'overall'
}

export interface RadarCategory {
  name: string
  fresh: number
  dry: number
}

export interface ChartPoint {
  x: number
  y: number
  value: number
  label: string
}

export interface BarChartProps {
  data: NutritionData
  index: number
  className?: string
}

export interface RadarChartProps {
  categories: RadarCategory[]
  className?: string
}

export interface NutritionComparisonProps {
  data: NutritionData[]
  className?: string
}

export interface TabSelectorProps {
  selectedTab: 'charts' | 'radar'
  onTabChange: (tab: 'charts' | 'radar') => void
  className?: string
}

export interface NutritionScienceProps {
  initialTab?: 'charts' | 'radar'
  showTabs?: boolean
  className?: string
}

export interface NutritionStatsProps {
  data: NutritionData[]
  className?: string
}

export interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  className?: string
}

// 动画相关类型
export interface AnimationVariants {
  hidden: Record<string, any>
  visible: Record<string, any>
}

export interface ChartAnimationConfig {
  duration: number
  delay: number
  ease: string
}

// 图表配置类型
export interface ChartConfig {
  width: number
  height: number
  margin: {
    top: number
    right: number
    bottom: number
    left: number
  }
  colors: {
    fresh: string
    dry: string
    grid: string
    text: string
  }
}

// 数据处理相关类型
export interface NutritionSummary {
  totalNutrients: number
  averageImprovement: number
  bestCategory: string
  significantDifferences: number
}

export interface ComparisonResult {
  nutrient: string
  difference: number
  percentageImprovement: number
  significance: 'high' | 'medium' | 'low'
}
