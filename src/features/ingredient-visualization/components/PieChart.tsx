'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PieChartProps, PieSlice } from '../types'
import { ClientOnlyWrapper } from '@/components/ClientOnlyWrapper'

/**
 * 成分饼图组件
 * 展示配方中各成分的比例分布
 */
export function PieChart({
  ingredients,
  size = 200,
  showLabels = true,
  interactive = true,
  className = '',
}: PieChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const radius = size / 2 - 20
  const center = size / 2

  // 计算饼图切片数据
  const slices: PieSlice[] = []
  let cumulativePercentage = 0

  ingredients.forEach((ingredient, index) => {
    const startAngle = (cumulativePercentage / 100) * 360
    const endAngle =
      ((cumulativePercentage + ingredient.percentage) / 100) * 360

    slices.push({
      startAngle,
      endAngle,
      percentage: ingredient.percentage,
      color: ingredient.color,
      ingredient,
    })

    cumulativePercentage += ingredient.percentage
  })

  // 生成SVG路径 - 使用固定精度避免hydration mismatch
  const createPath = (slice: PieSlice, isHovered: boolean = false) => {
    const { startAngle, endAngle } = slice
    const adjustedRadius = isHovered ? radius + 5 : radius
    const largeArcFlag = slice.percentage > 50 ? 1 : 0

    const startAngleRad = (startAngle - 90) * (Math.PI / 180)
    const endAngleRad = (endAngle - 90) * (Math.PI / 180)

    // 使用固定精度避免浮點數差異
    const x1 =
      Math.round((center + adjustedRadius * Math.cos(startAngleRad)) * 1000) /
      1000
    const y1 =
      Math.round((center + adjustedRadius * Math.sin(startAngleRad)) * 1000) /
      1000
    const x2 =
      Math.round((center + adjustedRadius * Math.cos(endAngleRad)) * 1000) /
      1000
    const y2 =
      Math.round((center + adjustedRadius * Math.sin(endAngleRad)) * 1000) /
      1000

    return [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${adjustedRadius} ${adjustedRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z',
    ].join(' ')
  }

  // 计算标签位置 - 使用固定精度避免hydration mismatch
  const getLabelPosition = (slice: PieSlice) => {
    const midAngle = (slice.startAngle + slice.endAngle) / 2
    const midAngleRad = (midAngle - 90) * (Math.PI / 180)
    const labelRadius = radius + 30

    return {
      x:
        Math.round((center + labelRadius * Math.cos(midAngleRad)) * 1000) /
        1000,
      y:
        Math.round((center + labelRadius * Math.sin(midAngleRad)) * 1000) /
        1000,
    }
  }

  return (
    <ClientOnlyWrapper
      className={`relative ${className}`}
      fallback={
        <div className={`relative ${className}`}>
          <div
            style={{ width: size, height: size }}
            className="flex items-center justify-center rounded-lg bg-gray-100"
          >
            <div className="text-sm text-gray-500">載入中...</div>
          </div>
        </div>
      }
    >
      <svg width={size} height={size} className="drop-shadow-sm">
        {/* 饼图切片 */}
        {slices.map((slice, index) => {
          const isHovered = hoveredIndex === index

          return (
            <motion.path
              key={index}
              d={createPath(slice, isHovered)}
              fill={slice.color}
              stroke="white"
              strokeWidth="2"
              className={interactive ? 'cursor-pointer' : ''}
              onMouseEnter={() => interactive && setHoveredIndex(index)}
              onMouseLeave={() => interactive && setHoveredIndex(null)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={interactive ? { scale: 1.05 } : {}}
            />
          )
        })}

        {/* 标签线和文字 */}
        {showLabels &&
          slices.map((slice, index) => {
            if (slice.percentage < 5) return null // 小于5%不显示标签

            const labelPos = getLabelPosition(slice)
            const midAngle = (slice.startAngle + slice.endAngle) / 2
            const midAngleRad = (midAngle - 90) * (Math.PI / 180)
            const lineStartX =
              Math.round(
                (center + (radius + 5) * Math.cos(midAngleRad)) * 1000,
              ) / 1000
            const lineStartY =
              Math.round(
                (center + (radius + 5) * Math.sin(midAngleRad)) * 1000,
              ) / 1000

            return (
              <g key={`label-${index}`}>
                {/* 标签线 */}
                <motion.line
                  x1={lineStartX}
                  y1={lineStartY}
                  x2={labelPos.x}
                  y2={labelPos.y}
                  stroke={slice.color}
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                />

                {/* 标签文字 */}
                <motion.text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor={labelPos.x > center ? 'start' : 'end'}
                  dominantBaseline="middle"
                  className="fill-gray-700 text-xs font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  {slice.ingredient.name}
                </motion.text>

                {/* 百分比 */}
                <motion.text
                  x={labelPos.x}
                  y={labelPos.y + 12}
                  textAnchor={labelPos.x > center ? 'start' : 'end'}
                  dominantBaseline="middle"
                  className="fill-gray-900 text-xs font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  {slice.percentage}%
                </motion.text>
              </g>
            )
          })}
      </svg>

      {/* 悬停信息卡片 */}
      <AnimatePresence>
        {interactive && hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-full z-10 ml-4 min-w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
          >
            <div className="mb-3 flex items-center gap-3">
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: slices[hoveredIndex].color }}
              />
              <h4 className="font-semibold text-gray-900">
                {slices[hoveredIndex].ingredient.name}
              </h4>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">重量：</span>
                <span className="font-medium">
                  {slices[hoveredIndex].ingredient.weight}g
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">比例：</span>
                <span className="font-medium">
                  {slices[hoveredIndex].percentage}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">蛋白质：</span>
                <span className="font-medium">
                  {slices[hoveredIndex].ingredient.protein}g
                </span>
              </div>

              {slices[hoveredIndex].ingredient.benefits.length > 0 && (
                <div className="border-t border-gray-100 pt-2">
                  <div className="mb-1 text-gray-600">营养益处：</div>
                  <div className="flex flex-wrap gap-1">
                    {slices[hoveredIndex].ingredient.benefits.map(
                      (benefit, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
                        >
                          {benefit}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 中心标题 */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">成分比例</div>
          <div className="text-sm text-gray-600">
            {ingredients.length} 种成分
          </div>
        </div>
      </div>
    </ClientOnlyWrapper>
  )
}
