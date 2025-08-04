/**
 * 成分可视化功能模块入口文件
 * 统一导出所有公共接口
 */

// 主组件
export { IngredientVisualization } from './components/IngredientVisualization'

// 子组件
export { PieChart } from './components/PieChart'
export { IngredientList } from './components/IngredientList'
export { NutritionBreakdown } from './components/NutritionBreakdown'
export { ViewSelector, CompactViewSelector } from './components/ViewSelector'
export { 
  InteractiveIngredientCard, 
  IngredientCardsGrid 
} from './components/InteractiveIngredientCards'

// 数据和服务
export {
  getAllRecipes,
  getRecipesByAge,
  analyzeIngredients,
  getDefaultRecipe,
  freshFoodRecipe,
  dryFoodRecipe,
  puppyRecipe,
} from './data/recipes'

// 类型定义
export type {
  Ingredient,
  Recipe,
  NutritionSummary,
  PieChartProps,
  IngredientListProps,
  NutritionBreakdownProps,
  InteractiveIngredientCardProps,
  IngredientVisualizationProps,
  ViewSelectorProps,
  RecipeComparisonProps,
  PieSlice,
  ChartPoint,
  AnimationConfig,
  HoverState,
  SortOption,
  FilterOption,
  FilterState,
  Nutrient,
  IngredientAnalysis,
} from './types'
