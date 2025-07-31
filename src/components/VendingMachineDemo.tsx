'use client'

import { useState } from 'react'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Container } from '@/components/Container'

interface Feature {
  id: string
  title: string
  description: string
  details: string[]
}

const features: Feature[] = [
  {
    id: 'ai-management',
    title: 'AI智能管理系統',
    description: '先進的人工智能技術，實現全自動化管理',
    details: [
      '自動溫控系統，確保鮮食品質',
      '智能庫存管理，自動提醒補貨',
      '消費數據分析，優化商品配置',
      '異常狀況自動通知',
      '遠程監控功能，即時掌握狀況',
    ],
  },
  {
    id: 'unmanned-store',
    title: '24小時無人商店',
    description: '全天候無人值守營業，最大化營收機會',
    details: [
      '24小時無人值守營業',
      '多元支付方式支援（現金、信用卡、行動支付）',
      '自動找零和收據列印',
      '防盜和安全監控系統',
      '語音導購功能',
    ],
  },
  {
    id: 'mobile-backend',
    title: '手機後台管理',
    description: '隨時隨地掌握營運狀況，管理更輕鬆',
    details: [
      '即時營收查看和統計分析',
      '庫存狀態監控和補貨提醒',
      '詳細銷售報表和趨勢分析',
      '異常狀況即時通知',
      '遠程設定和參數調整',
    ],
  },
  {
    id: 'installation',
    title: '專業安裝維護',
    description: '完整的安裝和維護服務，讓您安心經營',
    details: [
      '專業團隊到府安裝調試',
      '建議設置間距500公尺',
      '定期維護保養服務',
      '24小時技術支援熱線',
      '故障快速維修服務',
    ],
  },
]

const specifications = [
  { label: '機台尺寸', value: '180cm(H) × 120cm(W) × 80cm(D)' },
  { label: '儲存容量', value: '120個商品位，6種不同溫層' },
  { label: '溫控範圍', value: '冷藏 2-8°C，冷凍 -18°C' },
  { label: '支付方式', value: '現金、信用卡、悠遊卡、行動支付' },
  { label: '電力需求', value: 'AC 220V，功耗 ≤ 2.5kW' },
  { label: '網路連接', value: '4G/5G、WiFi、有線網路' },
  { label: '安全防護', value: '防盜警報、監控攝影、防破壞設計' },
  { label: '保固期間', value: '機台保固2年，軟體終身更新' },
]

function getFeatureIcon(featureId: string) {
  const iconClass = 'w-8 h-8 text-neutral-600'

  switch (featureId) {
    case 'ai-management':
      return (
        <svg
          className={iconClass}
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
      )
    case 'unmanned-store':
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      )
    case 'mobile-backend':
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"
          />
        </svg>
      )
    case 'installation':
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      )
    default:
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
  }
}

export function VendingMachineDemo() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)

  return (
    <>
      {/* 主要功能展示 */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {features.map((feature) => (
            <FadeIn key={feature.id}>
              <div
                className="group relative cursor-pointer rounded-3xl bg-neutral-50 p-8 transition-all hover:bg-neutral-100"
                onClick={() => setSelectedFeature(feature)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100">
                    {getFeatureIcon(feature.id)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-950 transition-colors group-hover:text-neutral-700">
                      {feature.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-neutral-600">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center font-medium text-neutral-700">
                      <span className="text-sm">查看詳細功能</span>
                      <svg
                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
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
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>

      {/* 技術規格 */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="rounded-3xl bg-neutral-50 p-8 lg:p-12">
            <h2 className="mb-8 text-center text-2xl font-semibold text-neutral-950">
              技術規格與特色
            </h2>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-white p-4"
                >
                  <span className="font-medium text-neutral-950">
                    {spec.label}
                  </span>
                  <span className="text-right text-neutral-600">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>

      {/* 安裝流程 */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-semibold text-neutral-950">
              安裝流程
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
              從簽約到正式營運，我們提供完整的安裝和培訓服務
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {[
              {
                step: '1',
                title: '場地評估',
                description: '專業團隊到場評估，確認最佳安裝位置',
              },
              {
                step: '2',
                title: '合約簽署',
                description: '簽署加盟合約，確認機台規格和配置',
              },
              {
                step: '3',
                title: '機台安裝',
                description: '專業安裝團隊到場安裝調試機台',
              },
              {
                step: '4',
                title: '教育訓練',
                description: '提供完整的操作培訓和營運指導',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-950 text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 font-semibold text-neutral-950">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>

      {/* 功能詳細說明彈窗 */}
      {selectedFeature && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100">
                  {getFeatureIcon(selectedFeature.id)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-950">
                    {selectedFeature.title}
                  </h2>
                  <p className="mt-1 text-neutral-600">
                    {selectedFeature.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="text-neutral-400 transition-colors hover:text-neutral-600"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-neutral-950">詳細功能</h3>
              <ul className="space-y-3">
                {selectedFeature.details.map((detail, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-neutral-600">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
