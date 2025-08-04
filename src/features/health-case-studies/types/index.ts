/**
 * 健康案例研究相关的类型定义
 */

export interface HealthMetric {
  name: string
  unit: string
  week0: number
  week4: number
  week12: number
  improvement: number
  type: 'improvement' | 'increase'
}

export interface CaseStudy {
  id: string
  petName: string
  breed: string
  age: number
  weight: number
  condition: string
  beforeImage: string
  afterImage: string
  metrics: HealthMetric[]
  story: string
  ownerTestimonial: string
}

export interface AnimatedNumberProps {
  value: number
  type: 'improvement' | 'increase'
  suffix?: string
  className?: string
  delay?: number
}

export interface LineChartProps {
  metrics: HealthMetric[]
}

export interface BeforeAfterCardProps {
  caseStudy: CaseStudy
}

export interface HealthCaseStudiesProps {
  initialCaseIndex?: number
  showNavigation?: boolean
}

export interface ChartPoint {
  x: number
  y: number
  value: number
  week: number
}

export interface ChartConfig {
  width: number
  height: number
  padding: number
  strokeWidth: number
  pointRadius: number
}
