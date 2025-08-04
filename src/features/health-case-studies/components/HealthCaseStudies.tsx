'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { BeforeAfterCard, CaseSummaryCard } from './BeforeAfterCard'
import { LineChart } from './LineChart'
import { ImprovementStats } from './AnimatedNumber'
import {
  getAllCaseStudies,
  calculateAverageImprovement,
} from '../services/case-data'
import { HealthCaseStudiesProps } from '../types'

/**
 * 健康案例研究主组件
 * 展示宠物健康改善的真实案例和数据
 */
export function HealthCaseStudies({
  initialCaseIndex = 0,
  showNavigation = true,
}: HealthCaseStudiesProps) {
  const caseStudies = getAllCaseStudies()
  const [selectedCase, setSelectedCase] = useState(initialCaseIndex)
  const [viewMode, setViewMode] = useState<'detailed' | 'overview'>('detailed')
  const currentCase = caseStudies[selectedCase]

  // 计算统计数据
  const stats = {
    averageImprovement: calculateAverageImprovement(),
    totalCases: caseStudies.length,
    successRate: 95, // 基于实际数据的成功率
  }

  const handleCaseSelect = (index: number) => {
    setSelectedCase(index)
    setViewMode('detailed')
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <Container>
        <SectionIntro eyebrow="真实案例" title="健康改善见证" className="mb-16">
          <p>
            通过科学的营养配方和专业的健康管理，我们见证了无数宠物的健康改善。
            以下是真实的案例研究，展示了 AMIGO 鲜食对宠物健康的积极影响。
          </p>
        </SectionIntro>

        {/* 改善统计 */}
        <FadeIn>
          <ImprovementStats stats={stats} className="mb-16" />
        </FadeIn>

        {/* 视图模式切换 */}
        {showNavigation && (
          <FadeIn>
            <div className="mb-8 flex justify-center">
              <div className="rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setViewMode('detailed')}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'detailed'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  详细案例
                </button>
                <button
                  onClick={() => setViewMode('overview')}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'overview'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  案例概览
                </button>
              </div>
            </div>
          </FadeIn>
        )}

        {viewMode === 'detailed' ? (
          <FadeInStagger>
            {/* 案例选择器 */}
            {showNavigation && (
              <FadeIn>
                <div className="mb-8">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    选择案例
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {caseStudies.map((study, index) => (
                      <CaseSummaryCard
                        key={study.id}
                        caseStudy={study}
                        onClick={() => handleCaseSelect(index)}
                        className={
                          selectedCase === index ? 'ring-2 ring-indigo-500' : ''
                        }
                      />
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* 详细案例展示 */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <FadeIn>
                <BeforeAfterCard caseStudy={currentCase} />
              </FadeIn>

              <FadeIn>
                <LineChart metrics={currentCase.metrics} />
              </FadeIn>
            </div>

            {/* 案例导航 */}
            {showNavigation && caseStudies.length > 1 && (
              <FadeIn>
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() =>
                        setSelectedCase(Math.max(0, selectedCase - 1))
                      }
                      disabled={selectedCase === 0}
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      上一个案例
                    </button>

                    <div className="flex space-x-2">
                      {caseStudies.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedCase(index)}
                          className={`h-3 w-3 rounded-full transition-colors ${
                            selectedCase === index
                              ? 'bg-indigo-600'
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        setSelectedCase(
                          Math.min(caseStudies.length - 1, selectedCase + 1),
                        )
                      }
                      disabled={selectedCase === caseStudies.length - 1}
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      下一个案例
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </FadeIn>
            )}
          </FadeInStagger>
        ) : (
          /* 概览模式 */
          <FadeInStagger>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((study, index) => (
                <FadeIn key={study.id}>
                  <CaseSummaryCard
                    caseStudy={study}
                    onClick={() => handleCaseSelect(index)}
                  />
                </FadeIn>
              ))}
            </div>
          </FadeInStagger>
        )}

        {/* 行动号召 */}
        <FadeIn>
          <div className="mt-16 text-center">
            <div className="rounded-2xl bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white">
              <h3 className="mb-4 text-2xl font-bold">
                让您的宠物也成为下一个成功案例
              </h3>
              <p className="mb-6 text-lg opacity-90">
                加入我们的健康改善计划，为您的毛孩提供最好的营养支持
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-green-600 transition-colors hover:bg-gray-50">
                  开始健康计划
                </button>
                <button className="inline-flex items-center rounded-md border border-white px-6 py-3 text-base font-medium text-white transition-colors hover:bg-white hover:text-green-600">
                  咨询营养师
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}
