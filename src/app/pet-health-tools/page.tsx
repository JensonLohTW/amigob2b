import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { NutritionCalculator } from './components/NutritionCalculator'

export const metadata: Metadata = {
  title: '寵物健康工具',
  description:
    '使用AMIGO專業的寵物健康工具，包括營養需求計算器、餐量建議器和健康評估表，為您的毛孩制定最適合的營養方案。',
}

function ToolCard({
  title,
  description,
  features,
  comingSoon = false,
}: {
  title: string
  description: string
  features: string[]
  comingSoon?: boolean
}) {
  return (
    <FadeIn>
      <div className="relative rounded-3xl bg-white p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
        {comingSoon && (
          <div className="absolute top-4 right-4">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
              即將推出
            </span>
          </div>
        )}

        <h3 className="text-xl font-semibold text-neutral-950">{title}</h3>
        <p className="mt-2 text-neutral-600">{description}</p>

        <ul className="mt-4 space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm text-neutral-700"
            >
              <svg
                className="h-4 w-4 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <button
          className={`mt-6 w-full rounded-lg px-4 py-2 text-sm font-medium transition ${
            comingSoon
              ? 'cursor-not-allowed bg-neutral-100 text-neutral-400'
              : 'bg-neutral-950 text-white hover:bg-neutral-800'
          }`}
          disabled={comingSoon}
        >
          {comingSoon ? '即將推出' : '立即使用'}
        </button>
      </div>
    </FadeIn>
  )
}

function HealthTips() {
  const tips = [
    {
      title: '定期體重監測',
      description: '每週為寵物量體重，維持理想體態',
    },
    {
      title: '觀察食慾變化',
      description: '注意寵物的食慾和進食習慣變化',
    },
    {
      title: '適量運動',
      description: '根據寵物年齡和體型安排適當運動',
    },
    {
      title: '定期健檢',
      description: '建議每年至少進行一次全面健康檢查',
    },
  ]

  return (
    <div className="mt-24 sm:mt-32 lg:mt-40">
      <Container>
        <div className="rounded-3xl bg-neutral-50 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-neutral-950">
            寵物健康小貼士
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map((tip, index) => (
              <div key={index} className="rounded-lg bg-white p-4">
                <h3 className="font-medium text-neutral-950">{tip.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default function PetHealthToolsPage() {
  const tools = [
    {
      title: '營養需求計算器',
      description: '根據寵物的基本資料，計算每日所需的卡路里和營養素',
      features: [
        '個人化營養建議',
        '卡路里需求計算',
        '蛋白質脂肪比例',
        '餵食頻率建議',
      ],
    },
    {
      title: '餐量建議器',
      description: '依據寵物的體重、年齡和活動量，提供精確的餵食份量建議',
      features: [
        '精確份量計算',
        '餵食時間規劃',
        '體重管理建議',
        '成長追蹤記錄',
      ],
      comingSoon: true,
    },
    {
      title: '健康評估表',
      description: '透過簡單的問卷，評估寵物的整體健康狀況',
      features: [
        '健康狀況評分',
        '風險因子分析',
        '改善建議提供',
        '獸醫諮詢建議',
      ],
      comingSoon: true,
    },
  ]

  return (
    <RootLayout>
      <PageIntro eyebrow="健康工具" title="專業的寵物健康管理工具">
        <p>
          使用我們的專業工具，為您的毛孩制定個人化的營養方案和健康管理計劃。
          所有工具都基於獸醫學專業知識開發，確保科學性和準確性。
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        {/* 營養需求計算器 */}
        <NutritionCalculator />

        {/* 工具列表 */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-neutral-950">
            所有健康工具
          </h2>
          <FadeInStagger className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {tools.map((tool, index) => (
              <ToolCard key={index} {...tool} />
            ))}
          </FadeInStagger>
        </div>
      </Container>

      <HealthTips />
    </RootLayout>
  )
}
