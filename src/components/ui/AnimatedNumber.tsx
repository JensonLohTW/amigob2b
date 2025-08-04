'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AnimatedNumberProps } from '@/features/investment-calculator/types/investment'

/**
 * 动画数字组件
 * 提供平滑的数字变化动画效果
 */
export function AnimatedNumber({
  value,
  duration = 1000,
  formatter = (val) => val.toString(),
  className = '',
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // 使用缓动函数创建平滑动画
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentValue = displayValue + (value - displayValue) * easeOutCubic

      setDisplayValue(currentValue)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration, displayValue])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {formatter(displayValue)}
    </motion.span>
  )
}

/**
 * 带有图标的动画数字卡片
 */
interface AnimatedNumberCardProps {
  title: string
  value: number
  formatter?: (value: number) => string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function AnimatedNumberCard({
  title,
  value,
  formatter,
  icon,
  trend = 'neutral',
  className = '',
}: AnimatedNumberCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return (
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17l9.2-9.2M17 17V7H7"
            />
          </svg>
        )
      case 'down':
        return (
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 7l-9.2 9.2M7 7v10h10"
            />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className={`rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon && <div className="text-gray-400">{icon}</div>}
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        </div>
        {getTrendIcon() && (
          <div className={getTrendColor()}>{getTrendIcon()}</div>
        )}
      </div>
      <div className="mt-2">
        <AnimatedNumber
          value={value}
          formatter={formatter}
          className={`text-2xl font-bold ${getTrendColor()}`}
        />
      </div>
    </motion.div>
  )
}
