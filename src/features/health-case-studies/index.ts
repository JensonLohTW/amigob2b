/**
 * 健康案例研究功能模块入口文件
 * 统一导出所有公共接口
 */

// 主组件
export { HealthCaseStudies } from './components/HealthCaseStudies'

// 子组件
export { BeforeAfterCard, CaseSummaryCard } from './components/BeforeAfterCard'
export { LineChart, MiniLineChart } from './components/LineChart'
export { AnimatedNumber, HealthMetricCard, ImprovementStats } from './components/AnimatedNumber'

// 服务和数据
export {
  getAllCaseStudies,
  getCaseStudyById,
  getCaseStudyCount,
  calculateAverageImprovement,
  getBestImprovementCase,
  getCasesByBreed,
  getCasesByAgeRange,
  caseStudies,
} from './services/case-data'

// 类型定义
export type {
  HealthMetric,
  CaseStudy,
  AnimatedNumberProps,
  LineChartProps,
  BeforeAfterCardProps,
  HealthCaseStudiesProps,
  ChartPoint,
  ChartConfig,
} from './types'
