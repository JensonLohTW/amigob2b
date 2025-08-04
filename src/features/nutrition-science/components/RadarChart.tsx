'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { RadarChartProps } from '../types'

/**
 * 营养雷达图组件
 * 展示鲜食与干粮在各个营养维度的对比
 */
export function RadarChart({ categories, className = '' }: RadarChartProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  }

  const polygonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  // 计算雷达图的点坐标
  const getRadarPoint = (value: number, index: number, maxRadius = 80) => {
    const angle = (index * 60 - 90) * (Math.PI / 180) // 6个点，每个60度
    const radius = (value / 100) * maxRadius
    const x = 100 + radius * Math.cos(angle)
    const y = 100 + radius * Math.sin(angle)
    return { x, y }
  }

  // 生成多边形路径
  const generatePolygonPath = (values: number[]) => {
    return values
      .map((value, index) => {
        const point = getRadarPoint(value, index)
        return `${point.x},${point.y}`
      })
      .join(' ')
  }

  const freshPath = generatePolygonPath(categories.map((cat) => cat.fresh))
  const dryPath = generatePolygonPath(categories.map((cat) => cat.dry))

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className={`rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 ${className}`}
    >
      <div className="mb-6 text-center">
        <h3 className="mb-2 text-xl font-bold text-gray-900">营养综合对比</h3>
        <p className="text-sm text-gray-600">
          六个维度全面评估鲜食与干粮的营养价值
        </p>
      </div>

      <div className="flex flex-col items-center gap-8 lg:flex-row">
        {/* 雷达图 */}
        <div className="flex-shrink-0">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="h-64 w-64"
          >
            {/* 背景网格 */}
            <g className="opacity-30">
              {/* 同心圆 */}
              {[20, 40, 60, 80].map((radius, index) => (
                <circle
                  key={index}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}

              {/* 射线 */}
              {categories.map((_, index) => {
                const angle = (index * 60 - 90) * (Math.PI / 180)
                const x = 100 + 80 * Math.cos(angle)
                const y = 100 + 80 * Math.sin(angle)
                return (
                  <line
                    key={index}
                    x1="100"
                    y1="100"
                    x2={x}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                )
              })}
            </g>

            {/* 鲜食数据多边形 */}
            <motion.polygon
              variants={polygonVariants}
              points={freshPath}
              fill="rgba(34, 197, 94, 0.2)"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* 干粮数据多边形 */}
            <motion.polygon
              variants={polygonVariants}
              points={dryPath}
              fill="rgba(156, 163, 175, 0.2)"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* 数据点 */}
            {categories.map((cat, index) => {
              const freshPoint = getRadarPoint(cat.fresh, index)
              const dryPoint = getRadarPoint(cat.dry, index)

              return (
                <g key={index}>
                  {/* 鲜食数据点 */}
                  <motion.circle
                    cx={freshPoint.x}
                    cy={freshPoint.y}
                    r="4"
                    fill="#22c55e"
                    stroke="white"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  />

                  {/* 干粮数据点 */}
                  <motion.circle
                    cx={dryPoint.x}
                    cy={dryPoint.y}
                    r="4"
                    fill="#9ca3af"
                    stroke="white"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  />
                </g>
              )
            })}

            {/* 标签 */}
            {categories.map((cat, index) => {
              const angle = (index * 60 - 90) * (Math.PI / 180)
              const x = 100 + 100 * Math.cos(angle)
              const y = 100 + 100 * Math.sin(angle)

              return (
                <motion.text
                  key={index}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-700 text-xs font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  {cat.name}
                </motion.text>
              )
            })}
          </svg>
        </div>

        {/* 图例和数据 */}
        <div className="flex-1 space-y-4">
          {/* 图例 */}
          <div className="flex items-center justify-center gap-6 lg:justify-start">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-gray-700">鲜食</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-gray-400"></div>
              <span className="text-sm font-medium text-gray-700">干粮</span>
            </div>
          </div>

          {/* 详细数据 */}
          <div className="space-y-3">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <span className="text-sm font-medium text-gray-700">
                  {cat.name}
                </span>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">
                      {cat.fresh}
                    </div>
                    <div className="text-xs text-gray-500">鲜食</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-600">
                      {cat.dry}
                    </div>
                    <div className="text-xs text-gray-500">干粮</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-600">
                      +{cat.fresh - cat.dry}
                    </div>
                    <div className="text-xs text-gray-500">差值</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 总结 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <svg
                className="h-5 w-5 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium text-green-800">
                营养优势总结
              </span>
            </div>
            <p className="text-sm text-green-700">
              鲜食在所有六个营养维度都显著优于干粮，平均优势达到
              <span className="font-bold">
                {Math.round(
                  categories.reduce(
                    (sum, cat) => sum + (cat.fresh - cat.dry),
                    0,
                  ) / categories.length,
                )}
                分
              </span>
              ，特别在抗氧化能力方面表现突出。
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
