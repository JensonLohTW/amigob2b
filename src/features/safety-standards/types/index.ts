/**
 * 安全标准相关的类型定义
 */

export interface Certification {
  id: string
  name: string
  description: string
  icon: string
  details: string[]
  validUntil: string
  certNumber: string
  issuer: string
  category: 'food-safety' | 'quality' | 'environmental' | 'management'
  priority: 'high' | 'medium' | 'low'
  status: 'active' | 'expired' | 'pending'
}

export interface TestReport {
  id: string
  testType: string
  testDate: string
  result: 'pass' | 'excellent' | 'fail'
  laboratory: string
  reportNumber: string
  category: 'microbiological' | 'chemical' | 'nutritional' | 'physical'
  details: TestParameter[]
}

export interface TestParameter {
  parameter: string
  standard: string
  result: string
  unit: string
  status: 'pass' | 'excellent' | 'fail'
  limit?: string
  method?: string
}

export interface CertificationCardProps {
  certification: Certification
  isExpanded?: boolean
  onToggle?: () => void
  className?: string
}

export interface TestReportCardProps {
  report: TestReport
  isExpanded?: boolean
  onToggle?: () => void
  className?: string
}

export interface SafetyStandardsProps {
  initialTab?: 'certifications' | 'reports' | 'timeline'
  showTabs?: boolean
  className?: string
}

export interface TabSelectorProps {
  activeTab: 'certifications' | 'reports' | 'timeline'
  onTabChange: (tab: 'certifications' | 'reports' | 'timeline') => void
  className?: string
}

export interface CertificationGridProps {
  certifications: Certification[]
  className?: string
}

export interface TestReportGridProps {
  reports: TestReport[]
  className?: string
}

export interface SafetyTimelineProps {
  events: TimelineEvent[]
  className?: string
}

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: 'certification' | 'inspection' | 'test' | 'audit'
  status: 'completed' | 'scheduled' | 'in-progress'
  icon: string
  details?: string[]
}

export interface SafetyStatsProps {
  stats: SafetyStats
  className?: string
}

export interface SafetyStats {
  totalCertifications: number
  activeCertifications: number
  testReports: number
  passRate: number
  lastInspection: string
  nextInspection: string
}

// 筛选和排序类型
export type CertificationFilter = 'all' | 'food-safety' | 'quality' | 'environmental' | 'management'
export type ReportFilter = 'all' | 'microbiological' | 'chemical' | 'nutritional' | 'physical'
export type SortOption = 'date' | 'name' | 'status' | 'priority'

export interface FilterState {
  certificationFilter: CertificationFilter
  reportFilter: ReportFilter
  sortBy: SortOption
  sortDirection: 'asc' | 'desc'
}

// 动画相关类型
export interface AnimationConfig {
  duration: number
  delay: number
  ease: string
}

// 图标映射类型
export interface IconMap {
  [key: string]: string
}
