'use client'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { motion } from 'framer-motion'

interface ComparisonItem {
  category: string
  freshFood: {
    value: string
    status: 'excellent' | 'good' | 'fair' | 'poor'
    description?: string
  }
  dryFood: {
    value: string
    status: 'excellent' | 'good' | 'fair' | 'poor'
    description?: string
  }
}

const comparisonData: ComparisonItem[] = [
  {
    category: '食材來源',
    freshFood: {
      value: '人食等級新鮮食材',
      status: 'excellent',
      description: '可追溯來源的優質肉類與蔬菜'
    },
    dryFood: {
      value: '肉粉、副產品',
      status: 'fair',
      description: '經過多次加工的動物副產品'
    }
  },
  {
    category: '加工程度',
    freshFood: {
      value: '低溫烹調',
      status: 'excellent',
      description: '60-80°C 溫和烹調保留營養'
    },
    dryFood: {
      value: '高溫擠壓',
      status: 'poor',
      description: '120-180°C 高溫破壞營養結構'
    }
  },
  {
    category: '蛋白質消化率',
    freshFood: {
      value: '90-95%',
      status: 'excellent',
      description: '接近天然肉類的消化率'
    },
    dryFood: {
      value: '75-80%',
      status: 'fair',
      description: '高溫變性降低生物利用率'
    }
  },
  {
    category: '水分含量',
    freshFood: {
      value: '70-75%',
      status: 'excellent',
      description: '接近天然獵物的水分比例'
    },
    dryFood: {
      value: '8-12%',
      status: 'poor',
      description: '極低水分，需額外補充'
    }
  },
  {
    category: '防腐劑',
    freshFood: {
      value: '無添加',
      status: 'excellent',
      description: '冷藏保鮮，無需化學防腐'
    },
    dryFood: {
      value: 'BHA/BHT/乙氧基喹',
      status: 'poor',
      description: '化學防腐劑延長保存期'
    }
  },
  {
    category: '日均成本 (5kg犬)',
    freshFood: {
      value: 'NT$ 35-45',
      status: 'good',
      description: '包含配送與客製化服務'
    },
    dryFood: {
      value: 'NT$ 22-35',
      status: 'good',
      description: '不含潛在醫療費用'
    }
  },
  {
    category: '保存方式',
    freshFood: {
      value: '冷藏 7 天',
      status: 'fair',
      description: '需冷藏保存，新鮮度佳'
    },
    dryFood: {
      value: '常溫 12-18 月',
      status: 'good',
      description: '常溫保存，方便儲存'
    }
  }
]

const statusColors = {
  excellent: 'bg-green-100 text-green-800 border-green-200',
  good: 'bg-blue-100 text-blue-800 border-blue-200',
  fair: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  poor: 'bg-red-100 text-red-800 border-red-200'
}

const statusIcons = {
  excellent: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  ),
  good: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  ),
  fair: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
  poor: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  )
}

export function QuickComparisonTable() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="快速對比"
        title="一目了然的關鍵差異"
        className="mb-16"
      >
        <p>
          透過科學數據和客觀指標，清楚比較鮮食便當與傳統乾糧在各個面向的表現，
          幫助您做出最適合毛孩的選擇。
        </p>
      </SectionIntro>

      <FadeIn>
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                    比較項目
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-green-700">
                    <div className="flex items-center justify-center">
                      <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      AMIGO 鮮食便當
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-orange-700">
                    <div className="flex items-center justify-center">
                      <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      傳統乾糧
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {comparisonData.map((item, index) => (
                  <motion.tr
                    key={item.category}
                    className="hover:bg-neutral-50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                      {item.category}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-center">
                        <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusColors[item.freshFood.status]}`}>
                          {statusIcons[item.freshFood.status]}
                          <span className="ml-1">{item.freshFood.value}</span>
                        </div>
                        {item.freshFood.description && (
                          <p className="mt-1 text-xs text-neutral-500">
                            {item.freshFood.description}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-center">
                        <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusColors[item.dryFood.status]}`}>
                          {statusIcons[item.dryFood.status]}
                          <span className="ml-1">{item.dryFood.value}</span>
                        </div>
                        {item.dryFood.description && (
                          <p className="mt-1 text-xs text-neutral-500">
                            {item.dryFood.description}
                          </p>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

      {/* 總結區塊 */}
      <FadeIn className="mt-12">
        <div className="rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-neutral-950 mb-4">
              科學數據顯示的優勢
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">15%</div>
                <div className="text-sm text-neutral-600">蛋白質消化率提升</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">60%</div>
                <div className="text-sm text-neutral-600">水分含量增加</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-neutral-600">化學防腐劑</div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
