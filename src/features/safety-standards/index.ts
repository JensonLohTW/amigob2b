/**
 * 安全标准功能模块入口文件
 * 统一导出所有公共接口
 */

// 主组件
export { SafetyStandards } from './components/SafetyStandards'

// 子组件
export { CertificationCard, CertificationGrid } from './components/CertificationCard'
export { TestReportCard, TestReportGrid } from './components/TestReportCard'
export { SafetyTimeline } from './components/SafetyTimeline'
export { TabSelector, CompactTabSelector } from './components/TabSelector'
export { SafetyStats } from './components/SafetyStats'

// 数据和服务
export {
  getAllCertifications,
  getCertificationsByCategory,
  getAllTestReports,
  getTestReportsByCategory,
  getTimelineEvents,
  getSafetyStats,
  getCertificationCategories,
  getReportCategories,
  certifications,
  testReports,
  timelineEvents,
  safetyStats,
} from './data/certifications'

// 类型定义
export type {
  Certification,
  TestReport,
  TestParameter,
  CertificationCardProps,
  TestReportCardProps,
  SafetyStandardsProps,
  TabSelectorProps,
  CertificationGridProps,
  TestReportGridProps,
  SafetyTimelineProps,
  TimelineEvent,
  SafetyStatsProps,
  SafetyStats,
  CertificationFilter,
  ReportFilter,
  SortOption,
  FilterState,
  AnimationConfig,
  IconMap,
} from './types'
