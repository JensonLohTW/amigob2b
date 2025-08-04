/**
 * 营养科学功能模块入口文件
 * 统一导出所有公共接口
 */

// 主组件
export { NutritionScience } from './components/NutritionScience'

// 子组件
export { BarChart, NutritionStatsCard } from './components/BarChart'
export { RadarChart } from './components/RadarChart'
export { NutritionComparison } from './components/NutritionComparison'
export { TabSelector, CompactTabSelector } from './components/TabSelector'

// 数据和服务
export {
  getAllNutritionData,
  getNutritionDataByCategory,
  getNutritionCategories,
  calculateNutritionSummary,
  getComparisonResults,
  getRadarData,
  getCategoryLabels,
  nutritionData,
  radarCategories,
} from './data/nutrition-data'

// 类型定义
export type {
  NutritionData,
  RadarCategory,
  ChartPoint,
  BarChartProps,
  RadarChartProps,
  NutritionComparisonProps,
  TabSelectorProps,
  NutritionScienceProps,
  NutritionStatsProps,
  CategoryFilterProps,
  AnimationVariants,
  ChartAnimationConfig,
  ChartConfig,
  NutritionSummary,
  ComparisonResult,
} from './types'
