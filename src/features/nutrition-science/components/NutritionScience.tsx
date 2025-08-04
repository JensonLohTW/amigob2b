'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { TabSelector } from './TabSelector'
import { NutritionComparison } from './NutritionComparison'
import { RadarChart } from './RadarChart'
import { getAllNutritionData, getRadarData } from '../data/nutrition-data'
import { NutritionScienceProps } from '../types'

/**
 * 营养科学主组件
 * 展示鲜食与干粮的科学营养对比
 */
export function NutritionScience({
  initialTab = 'charts',
  showTabs = true,
  className = '',
}: NutritionScienceProps) {
  const [selectedTab, setSelectedTab] = useState<'charts' | 'radar'>(initialTab)
  const nutritionData = getAllNutritionData()
  const radarData = getRadarData()

  const handleTabChange = (tab: 'charts' | 'radar') => {
    setSelectedTab(tab)
  }

  return (
    <div className={`bg-white py-24 sm:py-32 ${className}`}>
      <Container>
        <SectionIntro eyebrow="科学验证" title="营养科学对比" className="mb-16">
          <p>
            基于权威科学研究和实验室检测数据，全面对比鲜食与传统干粮的营养价值。
            每项数据都有可靠的科学依据，为您的选择提供专业支持。
          </p>
        </SectionIntro>

        {/* 标签选择器 */}
        {showTabs && (
          <FadeIn>
            <div className="mb-12 flex justify-center">
              <TabSelector
                selectedTab={selectedTab}
                onTabChange={handleTabChange}
              />
            </div>
          </FadeIn>
        )}

        {/* 内容区域 */}
        <FadeInStagger>
          <AnimatePresence mode="wait">
            {selectedTab === 'charts' ? (
              <motion.div
                key="charts"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <NutritionComparison data={nutritionData} />
              </motion.div>
            ) : (
              <motion.div
                key="radar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <RadarChart categories={radarData} />
              </motion.div>
            )}
          </AnimatePresence>
        </FadeInStagger>

        {/* 科学方法说明 */}
        <FadeIn>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20"
          >
            <div className="rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 p-8 lg:p-12">
              <div className="mx-auto max-w-4xl">
                <div className="mb-8 text-center">
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    科学检测方法
                  </h3>
                  <p className="text-lg text-gray-600">
                    我们采用国际标准的实验室检测方法，确保数据的准确性和可靠性
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: '营养成分分析',
                      description:
                        '采用AOAC官方分析方法，精确测定蛋白质、脂肪、维生素等营养成分含量',
                      icon: (
                        <svg
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      ),
                    },
                    {
                      title: '消化率测试',
                      description:
                        '通过体外消化模拟和动物试验，评估营养素的真实消化吸收率',
                      icon: (
                        <svg
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      ),
                    },
                    {
                      title: '生物利用率',
                      description:
                        '测定营养素在体内的实际利用效率，反映真实的营养价值',
                      icon: (
                        <svg
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      ),
                    },
                  ].map((method, index) => (
                    <motion.div
                      key={method.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        {method.icon}
                      </div>
                      <h4 className="mb-2 text-lg font-semibold text-gray-900">
                        {method.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-600">
                        {method.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* 权威认证 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-12 text-center"
                >
                  <h4 className="mb-4 text-lg font-semibold text-gray-900">
                    权威机构认证
                  </h4>
                  <div className="flex flex-wrap items-center justify-center gap-8">
                    {[
                      'AAFCO 营养标准',
                      'NRC 营养需求指南',
                      'FEDIAF 欧洲标准',
                      'ISO 17025 实验室认证',
                    ].map((cert, index) => (
                      <motion.div
                        key={cert}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.3 + index * 0.1 }}
                        className="rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {cert}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </FadeIn>

        {/* 行动号召 */}
        <FadeIn>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="rounded-2xl bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white">
              <h3 className="mb-4 text-2xl font-bold">科学证明，鲜食更营养</h3>
              <p className="mb-6 text-lg opacity-90">
                基于严谨的科学研究，为您的毛孩选择最优质的营养方案
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button className="inline-flex items-center rounded-md border border-white bg-white px-6 py-3 text-base font-medium text-green-600 transition-colors hover:bg-gray-50">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  查看研究报告
                </button>
                <button className="inline-flex items-center rounded-md border border-white px-6 py-3 text-base font-medium text-white transition-colors hover:bg-white hover:text-green-600">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  咨询营养师
                </button>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </Container>
    </div>
  )
}
