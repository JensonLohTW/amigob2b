'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChartProps, HealthMetric, ChartPoint } from '../types'

/**
 * 健康指标折线图组件
 * 展示健康指标随时间的变化趋势
 */
export function LineChart({ metrics }: LineChartProps) {
  const [selectedMetric, setSelectedMetric] = useState(0)
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
  const metric = metrics[selectedMetric]

  const weeks = [0, 4, 12]
  const values = [metric.week0, metric.week4, metric.week12]
  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)
  const range = maxValue - minValue

  const getY = (value: number) => {
    if (range === 0) return 50
    return 80 - ((value - minValue) / range) * 60
  }

  const pathData = weeks
    .map((week, index) => {
      const x = 20 + (week / 12) * 160
      const y = getY(values[index])
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  const chartPoints: ChartPoint[] = weeks.map((week, index) => ({
    x: 20 + (week / 12) * 160,
    y: getY(values[index]),
    value: values[index],
    week,
  }))

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          健康指标变化趋势
        </h3>

        {/* 指标选择器 */}
        <div className="flex flex-wrap gap-2">
          {metrics.map((m, index) => (
            <button
              key={m.name}
              onClick={() => setSelectedMetric(index)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                selectedMetric === index
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* 图表区域 */}
      <div className="relative">
        <svg
          width="200"
          height="120"
          viewBox="0 0 200 120"
          className="h-32 w-full rounded-lg border border-gray-200 bg-gray-50"
        >
          {/* 网格线 */}
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Y轴标签 */}
          <text
            x="10"
            y="25"
            className="fill-gray-500 text-xs"
            textAnchor="middle"
          >
            {maxValue}
          </text>
          <text
            x="10"
            y="65"
            className="fill-gray-500 text-xs"
            textAnchor="middle"
          >
            {Math.round((maxValue + minValue) / 2)}
          </text>
          <text
            x="10"
            y="105"
            className="fill-gray-500 text-xs"
            textAnchor="middle"
          >
            {minValue}
          </text>

          {/* 趋势线 */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#4f46e5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {/* 数据点 */}
          {chartPoints.map((point, index) => {
            const isHovered = hoveredPoint === index
            return (
              <g key={index}>
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r={isHovered ? 6 : 4}
                  fill="#4f46e5"
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.2 }}
                />

                {/* 悬停时显示数值 */}
                {isHovered && (
                  <motion.g
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <rect
                      x={point.x - 15}
                      y={point.y - 25}
                      width="30"
                      height="18"
                      rx="4"
                      fill="#1f2937"
                      fillOpacity="0.9"
                    />
                    <text
                      x={point.x}
                      y={point.y - 12}
                      className="fill-white text-xs"
                      textAnchor="middle"
                    >
                      {point.value}
                      {metric.unit}
                    </text>
                  </motion.g>
                )}
              </g>
            )
          })}

          {/* X轴标签 */}
          {chartPoints.map((point, index) => (
            <text
              key={index}
              x={point.x}
              y="115"
              className="fill-gray-500 text-xs"
              textAnchor="middle"
            >
              第{point.week}周
            </text>
          ))}
        </svg>

        {/* 图表说明 */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-indigo-600"></div>
            <span>
              {metric.name} ({metric.unit})
            </span>
          </div>
          <div className="text-right">
            <div className="font-medium text-green-600">
              改善 {metric.improvement}%
            </div>
            <div className="text-xs">12周期间</div>
          </div>
        </div>
      </div>

      {/* 改善总结 */}
      <div className="mt-6 rounded-lg bg-green-50 p-4">
        <div className="flex items-center">
          <svg
            className="mr-2 h-5 w-5 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          <span className="text-sm font-medium text-green-800">
            {metric.name}在12周内改善了 {metric.improvement}%
          </span>
        </div>
        <p className="mt-1 text-xs text-green-700">
          从第{weeks[0]}周的 {values[0]}
          {metric.unit} 提升到第{weeks[2]}周的 {values[2]}
          {metric.unit}
        </p>
      </div>
    </div>
  )
}

/**
 * 简化版图表组件
 * 用于概览展示
 */
interface MiniLineChartProps {
  metric: HealthMetric
  className?: string
}

export function MiniLineChart({ metric, className = '' }: MiniLineChartProps) {
  const weeks = [0, 4, 12]
  const values = [metric.week0, metric.week4, metric.week12]
  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)
  const range = maxValue - minValue

  const getY = (value: number) => {
    if (range === 0) return 25
    return 40 - ((value - minValue) / range) * 30
  }

  const pathData = weeks
    .map((week, index) => {
      const x = 10 + (week / 12) * 80
      const y = getY(values[index])
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  return (
    <div className={`${className}`}>
      <svg width="100" height="50" viewBox="0 0 100 50" className="h-12 w-full">
        <motion.path
          d={pathData}
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />

        {weeks.map((week, index) => {
          const x = 10 + (week / 12) * 80
          const y = getY(values[index])
          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill="#10b981"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            />
          )
        })}
      </svg>
    </div>
  )
}
