'use client'

import { CalculationInputs } from '../types/investment'

interface CalculatorInputFormProps {
  inputs: CalculationInputs
  onInputChange: (field: keyof CalculationInputs, value: string) => void
  onReset: () => void
  validationErrors: string[]
  isCalculating: boolean
}

/**
 * 投资计算器输入表单组件
 * 负责收集用户输入的计算参数
 */
export function CalculatorInputForm({
  inputs,
  onInputChange,
  onReset,
  validationErrors,
  isCalculating,
}: CalculatorInputFormProps) {
  const inputFields = [
    {
      key: 'dailySales' as const,
      label: '预估日销量',
      unit: '份',
      min: 1,
      max: 500,
      step: 1,
      description: '每日预计销售的产品数量',
    },
    {
      key: 'averagePrice' as const,
      label: '平均单价',
      unit: '元',
      min: 50,
      max: 500,
      step: 10,
      description: '每份产品的平均售价',
    },
    {
      key: 'monthlyRent' as const,
      label: '月租金',
      unit: '元',
      min: 0,
      max: 100000,
      step: 1000,
      description: '机台摆放位置的月租金',
    },
    {
      key: 'monthlyUtilities' as const,
      label: '月水电费',
      unit: '元',
      min: 0,
      max: 20000,
      step: 500,
      description: '机台运行的月水电费用',
    },
    {
      key: 'initialInvestment' as const,
      label: '初始投资',
      unit: '元',
      min: 100000,
      max: 2000000,
      step: 10000,
      description: '购买机台和初期投入的总金额',
    },
  ]

  const factorFields = [
    {
      key: 'locationFactor' as const,
      label: '地点因子',
      min: 0.5,
      max: 2.0,
      step: 0.1,
      description: '地理位置对销量的影响系数',
    },
    {
      key: 'competitionLevel' as const,
      label: '竞争水平',
      min: 0.3,
      max: 1.0,
      step: 0.1,
      description: '周边竞争对销量的影响系数',
    },
    {
      key: 'seasonalFactor' as const,
      label: '季节因子',
      min: 0.7,
      max: 1.5,
      step: 0.1,
      description: '季节性变化对销量的影响系数',
    },
  ]

  return (
    <div className="space-y-8">
      {/* 验证错误提示 */}
      {validationErrors.length > 0 && (
        <div className="rounded-lg bg-red-50 p-4">
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
              <h3 className="text-sm font-medium text-red-800">输入验证错误</h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc space-y-1 pl-5">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 基础参数 */}
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">基础参数</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {inputFields.map((field) => (
            <div key={field.key}>
              <label
                htmlFor={field.key}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="number"
                  id={field.key}
                  value={inputs[field.key]}
                  onChange={(e) => onInputChange(field.key, e.target.value)}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  disabled={isCalculating}
                  className="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
                  placeholder={`${field.min} - ${field.max}`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 sm:text-sm">{field.unit}</span>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">{field.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 调整因子 */}
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">调整因子</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {factorFields.map((field) => (
            <div key={field.key}>
              <label
                htmlFor={field.key}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <div className="mt-1">
                <input
                  type="range"
                  id={field.key}
                  value={inputs[field.key]}
                  onChange={(e) => onInputChange(field.key, e.target.value)}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  disabled={isCalculating}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 disabled:cursor-not-allowed"
                />
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>{field.min}</span>
                  <span className="font-medium">
                    {inputs[field.key].toFixed(1)}
                  </span>
                  <span>{field.max}</span>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">{field.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onReset}
          disabled={isCalculating}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          重置参数
        </button>
      </div>
    </div>
  )
}
