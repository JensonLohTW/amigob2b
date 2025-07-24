'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function AnimatedCounter({ 
  value, 
  duration = 2, 
  prefix = '', 
  suffix = '', 
  decimals = 0,
  className = ''
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(latest)
    })
  }, [springValue])

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals)
    }
    return Math.floor(num).toLocaleString()
  }

  return (
    <motion.span 
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {prefix}{formatNumber(displayValue)}{suffix}
    </motion.span>
  )
}

interface StatCardProps {
  title: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  description?: string
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

export function StatCard({ 
  title, 
  value, 
  prefix = '', 
  suffix = '', 
  decimals = 0, 
  description,
  icon,
  color = 'blue'
}: StatCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 text-blue-600 bg-blue-50 border-blue-200',
    green: 'from-green-500 to-green-600 text-green-600 bg-green-50 border-green-200',
    purple: 'from-purple-500 to-purple-600 text-purple-600 bg-purple-50 border-purple-200',
    orange: 'from-orange-500 to-orange-600 text-orange-600 bg-orange-50 border-orange-200'
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-neutral-200"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* 背景漸層 */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]} opacity-10 rounded-full -mr-10 -mt-10`} />
      
      <div className="relative">
        {/* 圖標 */}
        {icon && (
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${colorClasses[color].split(' ')[2]} ${colorClasses[color].split(' ')[3]} ${colorClasses[color].split(' ')[4]} mb-4`}>
            {icon}
          </div>
        )}
        
        {/* 數值 */}
        <div className="mb-2">
          <AnimatedCounter
            value={value}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
            className="text-3xl font-bold text-neutral-950"
          />
        </div>
        
        {/* 標題 */}
        <h3 className="text-lg font-semibold text-neutral-950 mb-1">
          {title}
        </h3>
        
        {/* 描述 */}
        {description && (
          <p className="text-sm text-neutral-600">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  )
}

interface ProgressBarProps {
  label: string
  value: number
  maxValue: number
  color?: 'blue' | 'green' | 'purple' | 'orange'
  showPercentage?: boolean
}

export function ProgressBar({ 
  label, 
  value, 
  maxValue, 
  color = 'blue',
  showPercentage = true 
}: ProgressBarProps) {
  const percentage = (value / maxValue) * 100
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  }

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
        {showPercentage && (
          <AnimatedCounter
            value={isInView ? percentage : 0}
            suffix="%"
            decimals={1}
            className="text-sm font-medium text-neutral-600"
          />
        )}
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-2">
        <motion.div
          className={`h-2 rounded-full ${colorClasses[color]}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>
    </div>
  )
}

interface CircularProgressProps {
  value: number
  maxValue: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
}

export function CircularProgress({ 
  value, 
  maxValue, 
  size = 120, 
  strokeWidth = 8,
  color = '#3B82F6',
  label 
}: CircularProgressProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const percentage = (value / maxValue) * 100
  
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* 背景圓圈 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* 進度圓圈 */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>
        
        {/* 中心文字 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatedCounter
            value={isInView ? percentage : 0}
            suffix="%"
            decimals={0}
            className="text-2xl font-bold text-neutral-950"
          />
          {label && (
            <span className="text-xs text-neutral-600 text-center mt-1">
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
