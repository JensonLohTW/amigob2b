/**
 * 成分可视化相关的类型定义
 */

export interface Ingredient {
  name: string
  weight: number
  percentage: number
  protein: number
  benefits: string[]
  color: string
  category?: 'protein' | 'vegetable' | 'grain' | 'supplement'
  source?: string
  freshness?: 'fresh' | 'frozen' | 'dried'
}

export interface Recipe {
  name: string
  totalWeight: number
  ingredients: Ingredient[]
  nutritionSummary: NutritionSummary
  description?: string
  targetAge?: 'puppy' | 'adult' | 'senior' | 'all'
  targetSize?: 'small' | 'medium' | 'large' | 'all'
}

export interface NutritionSummary {
  protein: number
  fat: number
  carbs: number
  fiber: number
  moisture: number
  calories?: number
  vitamins?: Record<string, number>
  minerals?: Record<string, number>
}

export interface PieChartProps {
  ingredients: Ingredient[]
  size?: number
  showLabels?: boolean
  interactive?: boolean
  className?: string
}

export interface IngredientListProps {
  ingredients: Ingredient[]
  showDetails?: boolean
  sortBy?: 'weight' | 'percentage' | 'protein' | 'name'
  className?: string
}

export interface NutritionBreakdownProps {
  nutrition: NutritionSummary
  showPercentages?: boolean
  layout?: 'horizontal' | 'vertical'
  className?: string
}

export interface InteractiveIngredientCardProps {
  ingredient: Ingredient
  index: number
  isExpanded?: boolean
  onToggle?: (index: number) => void
  className?: string
}

export interface IngredientVisualizationProps {
  recipe?: Recipe
  initialView?: 'pie' | 'list' | 'cards' | 'nutrition'
  showViewSelector?: boolean
  className?: string
}

export interface ViewSelectorProps {
  activeView: 'pie' | 'list' | 'cards' | 'nutrition'
  onViewChange: (view: 'pie' | 'list' | 'cards' | 'nutrition') => void
  className?: string
}

export interface RecipeComparisonProps {
  recipes: Recipe[]
  comparisonType?: 'ingredients' | 'nutrition' | 'both'
  className?: string
}

// 图表相关类型
export interface PieSlice {
  startAngle: number
  endAngle: number
  percentage: number
  color: string
  ingredient: Ingredient
}

export interface ChartPoint {
  x: number
  y: number
  value: number
  label: string
}

// 动画相关类型
export interface AnimationConfig {
  duration: number
  delay: number
  ease: string
}

export interface HoverState {
  isHovered: boolean
  hoveredIndex: number | null
}

// 筛选和排序类型
export type SortOption = 'weight' | 'percentage' | 'protein' | 'name'
export type FilterOption = 'all' | 'protein' | 'vegetable' | 'grain' | 'supplement'

export interface FilterState {
  category: FilterOption
  minPercentage: number
  showBenefits: boolean
}

// 营养素类型
export interface Nutrient {
  name: string
  value: number
  color: string
  unit: string
  description?: string
  dailyValue?: number
}

// 成分分析类型
export interface IngredientAnalysis {
  totalIngredients: number
  proteinSources: number
  vegetableSources: number
  averageProtein: number
  topIngredient: Ingredient
  nutritionScore: number
}
