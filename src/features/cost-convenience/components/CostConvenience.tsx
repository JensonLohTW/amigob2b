'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { CostCalculator } from './CostCalculator'
import { DeliveryOptions } from './DeliveryOptions'
import { ConvenienceComparison } from './ConvenienceComparison'
import { TabType } from '../types'

/**
 * 成本便利性对比主组件
 * 整合成本计算、配送选项和便利性对比功能
 */
export function CostConvenience() {
  const [activeTab, setActiveTab] = useState<TabType>('cost')

  const tabs = [
    {
      id: 'cost' as const,
      name: '成本对比',
      description: '详细的成本分析和计算',
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
    },
    {
      id: 'delivery' as const,
      name: '配送服务',
      description: '灵活的配送选项和计划',
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      id: 'convenience' as const,
      name: '便利性对比',
      description: '全方位的便利性分析',
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="bg-white py-24 sm:py-32">
      <Container>
        <SectionIntro
          eyebrow="成本与便利性"
          title="全面对比分析"
          className="mb-16"
        >
          <p>
            深入了解 AMIGO 鲜食与传统宠物食品在成本、配送和便利性方面的差异，
            帮助您做出最明智的选择。
          </p>
        </SectionIntro>

        {/* 标签页导航 */}
        <FadeIn>
          <div className="mb-12">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    <div className="text-left">
                      <div>{tab.name}</div>
                      <div className="text-xs text-gray-400">
                        {tab.description}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </FadeIn>

        {/* 标签页内容 */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FadeInStagger>
            {activeTab === 'cost' && (
              <FadeIn>
                <CostCalculator />
              </FadeIn>
            )}

            {activeTab === 'delivery' && (
              <FadeIn>
                <DeliveryOptions />
              </FadeIn>
            )}

            {activeTab === 'convenience' && (
              <FadeIn>
                <ConvenienceComparison />
              </FadeIn>
            )}
          </FadeInStagger>
        </motion.div>

        {/* 行动号召 */}
        <FadeIn>
          <div className="mt-16 text-center">
            <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white">
              <h3 className="mb-4 text-2xl font-bold">
                准备好为您的宠物选择最好的了吗？
              </h3>
              <p className="mb-6 text-lg opacity-90">
                立即体验 AMIGO 鲜食，让您的毛孩享受健康美味的每一餐
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-indigo-600 transition-colors hover:bg-gray-50">
                  立即订购
                </button>
                <button className="inline-flex items-center rounded-md border border-white px-6 py-3 text-base font-medium text-white transition-colors hover:bg-white hover:text-indigo-600">
                  了解更多
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}
