'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInvestmentCalculator } from '../hooks/useInvestmentCalculator'
import { CalculatorInputForm } from './CalculatorInputForm'
import { CalculatorResults } from './CalculatorResults'
import { ScenarioComparison } from './ScenarioComparison'
import { TabType } from '../types/investment'

/**
 * 投资计算器主组件
 * 整合输入表单、结果显示和情景对比功能
 */
export function InvestmentCalculator() {
  const [activeTab, setActiveTab] = useState<TabType>('calculator')

  const {
    inputs,
    results,
    scenarios,
    isCalculating,
    error,
    isValid,
    validationErrors,
    updateInput,
    resetInputs,
  } = useInvestmentCalculator()

  const tabs = [
    {
      id: 'calculator' as const,
      name: '投资计算',
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
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 'scenarios' as const,
      name: '情景对比',
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
    {
      id: 'analysis' as const,
      name: '详细分析',
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
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 页面标题 */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          投资回报计算器
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          精确计算您的投资回报，助您做出明智的商业决策
        </p>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">计算错误</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 标签页导航 */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group inline-flex items-center border-b-2 px-1 py-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 标签页内容 */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* 输入表单 */}
            <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                计算参数
              </h2>
              <CalculatorInputForm
                inputs={inputs}
                onInputChange={updateInput}
                onReset={resetInputs}
                validationErrors={validationErrors}
                isCalculating={isCalculating}
              />
            </div>

            {/* 计算结果 */}
            <div>
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                计算结果
              </h2>
              <CalculatorResults
                results={results}
                isCalculating={isCalculating}
              />
            </div>
          </div>
        )}

        {activeTab === 'scenarios' && (
          <ScenarioComparison
            scenarios={scenarios}
            isCalculating={isCalculating}
          />
        )}

        {activeTab === 'analysis' && (
          <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">
              详细分析
            </h2>
            <div className="py-12 text-center text-gray-500">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-4">详细分析功能正在开发中...</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* 免责声明 */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>
          *
          本计算器仅供参考，实际投资回报可能因市场条件、经营策略等因素而有所不同。
          投资有风险，决策需谨慎。
        </p>
      </div>
    </div>
  )
}
