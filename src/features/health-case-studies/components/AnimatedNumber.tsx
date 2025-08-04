'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { AnimatedNumberProps } from '../types'

/**
 * 动画数字组件
 * 提供平滑的数字变化动画效果，专为健康指标设计
 */
export function AnimatedNumber({
  value,
  type,
  suffix = '%',
  className = '',
  delay = 0,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // 统一动画时长
      const startDelay = delay * 1000

      const timer = setTimeout(() => {
        let startTime: number

        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)

          // 使用统一的缓动函数 - 更流畅的动画
          const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
          const easedProgress = easeOutQuart(progress)
          const currentValue = easedProgress * value

          setDisplayValue(Math.round(currentValue))

          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }

        requestAnimationFrame(animate)
      }, startDelay)

      return () => clearTimeout(timer)
    }
  }, [isInView, value, delay])

  // 使用统一的色彩系统
  const getColorClass = () => {
    return 'text-foreground' // 使用主题色彩
  }

  const getDirectionIndicator = () => {
    const indicatorClass =
      type === 'improvement' ? 'text-muted-foreground' : 'text-muted-foreground'

    const arrow = type === 'improvement' ? '↓' : '↑'

    return (
      <span className={`ml-1 text-xs ${indicatorClass}`}>
        {type === 'improvement' ? '改善' : '增加'} {arrow}
      </span>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={controls}
      className={`inline-flex items-center ${className}`}
    >
      <span className={`font-bold ${getColorClass()}`}>
        {displayValue}
        {suffix}
      </span>
      {getDirectionIndicator()}
    </motion.div>
  )
}

/**
 * 健康指标卡片组件
 * 展示单个健康指标的改善情况
 */
interface HealthMetricCardProps {
  name: string
  improvement: number
  type: 'improvement' | 'increase'
  unit: string
  delay?: number
  className?: string
}

export function HealthMetricCard({
  name,
  improvement,
  type,
  unit,
  delay = 0,
  className = '',
}: HealthMetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 ${className}`}
    >
      <h4 className="mb-2 text-sm font-medium text-gray-700">{name}</h4>
      <div className="flex items-center justify-between">
        <AnimatedNumber
          value={improvement}
          type={type}
          suffix={unit === '分' ? '分' : '%'}
          className="text-lg"
          delay={delay}
        />
        <div className="text-xs text-gray-500">
          {type === 'improvement' ? '改善' : '增加'}
        </div>
      </div>
    </motion.div>
  )
}

/**
 * 改善统计组件
 * 展示整体改善统计数据
 */
interface ImprovementStatsProps {
  stats: {
    averageImprovement: number
    totalCases: number
    successRate: number
  }
  className?: string
}

export function ImprovementStats({
  stats,
  className = '',
}: ImprovementStatsProps) {
  const statItems = [
    {
      label: '平均改善率',
      value: stats.averageImprovement,
      suffix: '%',
      type: 'improvement' as const,
      delay: 0,
    },
    {
      label: '成功案例',
      value: stats.totalCases,
      suffix: '个',
      type: 'increase' as const,
      delay: 0.2,
    },
    {
      label: '成功率',
      value: stats.successRate,
      suffix: '%',
      type: 'improvement' as const,
      delay: 0.4,
    },
  ]

  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-3 ${className}`}>
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: item.delay }}
          className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-center"
        >
          <div className="mb-2 text-2xl font-bold">
            <AnimatedNumber
              value={item.value}
              type={item.type}
              suffix={item.suffix}
              delay={item.delay}
            />
          </div>
          <div className="text-sm text-gray-600">{item.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
