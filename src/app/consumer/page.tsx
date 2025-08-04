'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { Button } from '@/components/Button'
import { RootLayout } from '@/components/RootLayout'
import { StatList, StatListItem } from '@/components/StatList'
import {
  BeakerIcon,
  UserIcon,
  SparklesIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline'

// 暫時使用現有圖片，後續會替換
import imageLaptop from '@/images/laptop.jpg'

function HeroSection() {
  return (
    <Container className="mt-24 sm:mt-32 md:mt-56">
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
          給毛孩最好的營養呵護
        </h1>
        <p className="mt-6 text-xl text-neutral-600">
          AMIGO專業寵物鮮食，採用人食等級原料與製程，
          由獸醫博士團隊精心調配，為您的愛寵提供營養均衡、 新鮮美味的每一餐。
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/store-locator">找到附近門店</Button>
          <Button
            href="/products"
            className="border border-neutral-300 !bg-white !text-neutral-950 hover:!bg-neutral-50"
          >
            瀏覽產品系列
          </Button>
        </div>
      </motion.div>
    </Container>
  )
}

function ProductHighlights() {
  const highlights = [
    {
      title: '人食等級原料',
      description: '嚴選新鮮食材，符合人類食品安全標準，讓您安心餵食',
      icon: BeakerIcon,
    },
    {
      title: '獸醫師調配',
      description: '專業獸醫博士團隊研發，確保營養均衡與健康需求',
      icon: UserIcon,
    },
    {
      title: '新鮮製作',
      description: '每日新鮮製作，保持最佳營養價值與口感',
      icon: SparklesIcon,
    },
    {
      title: '客製化配方',
      description: '針對不同年齡、體型、健康狀況提供專屬配方',
      icon: AdjustmentsHorizontalIcon,
    },
  ]

  return (
    <div className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        title="為什麼選擇AMIGO寵物鮮食？"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          我們堅持使用最高品質的原料和最嚴格的製程標準，
          為您的毛孩提供如同家庭料理般的營養與美味。
        </p>
      </SectionIntro>

      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {highlights.map((highlight, index) => (
            <FadeIn key={index} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-950 text-white">
                    <highlight.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-950">
                      {highlight.title}
                    </h3>
                    <p className="mt-2 text-neutral-600">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </div>
  )
}

function QuickActions() {
  const actions = [
    {
      title: '門店查找',
      description: '找到離您最近的AMIGO自動販賣機',
      href: '/store-locator',
      primary: true,
    },
    {
      title: '營養計算器',
      description: '計算您毛孩的每日營養需求',
      href: '/pet-health-tools',
      primary: false,
    },
    {
      title: '營養知識',
      description: '學習專業的寵物營養知識',
      href: '/blog',
      primary: false,
    },
  ]

  return (
    <div className="mt-24 sm:mt-32 lg:mt-40">
      <Container>
        <SectionIntro title="快速開始">
          <p>立即使用我們的專業工具和服務，為您的毛孩找到最適合的營養方案。</p>
        </SectionIntro>

        <FadeInStagger className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {actions.map((action, index) => (
            <FadeIn key={index}>
              <Link
                href={action.href}
                className={`group relative flex flex-col rounded-3xl p-6 transition-all duration-300 sm:p-8 ${
                  action.primary
                    ? 'bg-neutral-950 text-white hover:bg-neutral-800'
                    : 'bg-neutral-50 hover:bg-neutral-100'
                }`}
              >
                <h3
                  className={`text-lg font-semibold sm:text-xl ${
                    action.primary ? 'text-white' : 'text-neutral-950'
                  }`}
                >
                  {action.title}
                </h3>
                <p
                  className={`mt-2 text-sm sm:text-base ${
                    action.primary ? 'text-neutral-300' : 'text-neutral-600'
                  }`}
                >
                  {action.description}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      action.primary ? 'text-white' : 'text-neutral-950'
                    }`}
                  >
                    立即使用
                  </span>
                  <svg
                    className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                      action.primary ? 'text-white' : 'text-neutral-950'
                    }`}
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
              </Link>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </div>
  )
}

function HealthStats() {
  return (
    <div className="mt-24 sm:mt-32 lg:mt-40">
      <Container>
        <SectionIntro title="數據說話">
          <p>超過千位寵物主人的信賴選擇，見證毛孩健康成長的每一刻。</p>
        </SectionIntro>

        <StatList className="mt-16">
          <StatListItem value="95%" label="客戶滿意度" />
          <StatListItem value="1000+" label="信賴家庭" />
          <StatListItem value="24小時" label="新鮮保證" />
          <StatListItem value="100%" label="人食等級" />
        </StatList>
      </Container>
    </div>
  )
}

export default function ConsumerPage() {
  return (
    <RootLayout>
      <HeroSection />
      <ProductHighlights />
      <QuickActions />
      <HealthStats />
    </RootLayout>
  )
}
