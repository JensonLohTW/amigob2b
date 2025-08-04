'use client'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Trophy,
  Star,
  Stethoscope,
  Shield,
  DollarSign,
  Zap,
  Heart,
  CheckCircle,
} from 'lucide-react'

interface OfferTier {
  name: string
  originalPrice: number
  discountPrice: number
  discount: string
  description: string
  features: string[]
  popular?: boolean
  cta: string
}

const offers: OfferTier[] = [
  {
    name: '體驗方案',
    originalPrice: 1200,
    discountPrice: 799,
    discount: '33% OFF',
    description: '7天鮮食體驗，讓毛孩愛上天然美味',
    features: [
      '7份鮮食便當',
      '免費營養評估',
      '轉食指導手冊',
      '專屬客服支援',
      '不滿意全額退款',
    ],
    cta: '立即體驗',
  },
  {
    name: '月度訂閱',
    originalPrice: 4800,
    discountPrice: 3840,
    discount: '20% OFF',
    description: '最受歡迎的選擇，營養均衡每一天',
    features: [
      '30份鮮食便當',
      '免費配送到府',
      '彈性調整餐點',
      '營養師諮詢',
      '健康追蹤報告',
      '會員專屬優惠',
    ],
    popular: true,
    cta: '開始訂閱',
  },
  {
    name: '季度方案',
    originalPrice: 14400,
    discountPrice: 10800,
    discount: '25% OFF',
    description: '長期健康投資，享受更多優惠',
    features: [
      '90份鮮食便當',
      '免費配送到府',
      '客製化餐點',
      '定期健康檢查',
      '獸醫師諮詢',
      '優先客服支援',
      '生日驚喜禮盒',
    ],
    cta: '選擇方案',
  },
]

const OfferCard = ({ offer, index }: { offer: OfferTier; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl bg-white shadow-lg ${
        offer.popular ? 'ring-2 ring-blue-500' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {offer.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="rounded-full bg-blue-500 px-4 py-1 text-sm font-medium text-white">
            最受歡迎
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="mb-6 text-center">
          <h3 className="mb-2 text-xl font-semibold text-neutral-950">
            {offer.name}
          </h3>
          <p className="mb-4 text-sm text-neutral-600">{offer.description}</p>

          <div className="mb-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl text-neutral-400 line-through">
                NT$ {offer.originalPrice.toLocaleString()}
              </span>
              <span className="text-3xl font-bold text-neutral-950">
                NT$ {offer.discountPrice.toLocaleString()}
              </span>
            </div>
            <div className="mt-2 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
              {offer.discount}
            </div>
          </div>
        </div>

        <ul className="mb-6 space-y-3">
          {offer.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center text-sm text-neutral-700"
            >
              <svg
                className="mr-3 h-4 w-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <motion.button
          className={`w-full rounded-lg px-6 py-3 font-medium transition-colors ${
            offer.popular
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-neutral-950 text-white hover:bg-neutral-800'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {offer.cta}
        </motion.button>
      </div>
    </motion.div>
  )
}

const TrustSignals = () => {
  const signals = [
    {
      icon: Trophy,
      title: '10,000+ 滿意客戶',
      description: '超過萬名毛孩家長的信賴選擇',
    },
    {
      icon: Star,
      title: '4.9/5 星評價',
      description: '客戶滿意度高達 98%',
    },
    {
      icon: Stethoscope,
      title: '獸醫師推薦',
      description: '全台 200+ 獸醫院合作推薦',
    },
    {
      icon: Shield,
      title: '品質保證',
      description: '30天不滿意全額退款保證',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {signals.map((signal, index) => (
        <motion.div
          key={signal.title}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="mb-2">
            <signal.icon className="mx-auto h-8 w-8 text-neutral-700" />
          </div>
          <h4 className="mb-1 font-semibold text-neutral-950">
            {signal.title}
          </h4>
          <p className="text-sm text-neutral-600">{signal.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

const UrgencyTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  })

  // 這裡可以添加真實的倒計時邏輯
  // 為了演示，我們使用靜態值

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
      <div className="text-center">
        <h4 className="mb-2 font-semibold text-red-800">限時優惠即將結束</h4>
        <div className="mb-2 flex justify-center space-x-4">
          <div className="text-center">
            <div className="rounded bg-red-600 px-2 py-1 font-bold text-white">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="mt-1 text-xs text-red-700">小時</div>
          </div>
          <div className="text-center">
            <div className="rounded bg-red-600 px-2 py-1 font-bold text-white">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="mt-1 text-xs text-red-700">分鐘</div>
          </div>
          <div className="text-center">
            <div className="rounded bg-red-600 px-2 py-1 font-bold text-white">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="mt-1 text-xs text-red-700">秒鐘</div>
          </div>
        </div>
        <p className="text-sm text-red-700">
          錯過這次機會，下次優惠要等到下個月！
        </p>
      </div>
    </div>
  )
}

const TestimonialSlider = () => {
  const testimonials = [
    {
      name: '陳小姐',
      petName: '小白 (柴犬)',
      content: '轉食鮮食便當後，小白的皮膚問題明顯改善，毛髮也變得更有光澤！',
      rating: 5,
    },
    {
      name: '王先生',
      petName: '咪咪 (英短)',
      content: '咪咪現在每餐都吃得很香，體重也控制得很好，獸醫說很健康！',
      rating: 5,
    },
    {
      name: '李太太',
      petName: '豆豆 (貴賓)',
      content: '配送很準時，包裝也很用心，豆豆超愛吃，已經訂閱半年了！',
      rating: 5,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="rounded-lg bg-neutral-50 p-6">
      <h4 className="mb-4 text-center font-semibold text-neutral-950">
        客戶真實回饋
      </h4>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <div className="mb-2 flex justify-center">
          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
            <svg
              key={i}
              className="h-4 w-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <blockquote className="mb-3 text-neutral-700 italic">
          &ldquo;{testimonials[currentIndex].content}&rdquo;
        </blockquote>

        <div className="text-sm text-neutral-600">
          <strong>{testimonials[currentIndex].name}</strong> -{' '}
          {testimonials[currentIndex].petName}
        </div>
      </motion.div>

      <div className="mt-4 flex justify-center space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-500' : 'bg-neutral-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export function ComparisonCTA() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      {/* 主標題 */}
      <FadeIn className="mb-16 text-center">
        <h2 className="font-display text-4xl font-medium tracking-tight text-neutral-950 sm:text-5xl">
          給毛孩最好的，
          <span className="text-blue-600">從今天開始</span>
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-xl text-neutral-600">
          不要讓您的毛孩錯過健康美味的鮮食體驗。
          立即選擇適合的方案，開啟健康新生活！
        </p>
      </FadeIn>

      {/* 緊急感倒計時 */}
      <FadeIn className="mb-12">
        <UrgencyTimer />
      </FadeIn>

      {/* 方案選擇 */}
      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {offers.map((offer, index) => (
          <OfferCard key={offer.name} offer={offer} index={index} />
        ))}
      </div>

      {/* 信任信號 */}
      <FadeIn className="mb-16">
        <TrustSignals />
      </FadeIn>

      {/* 客戶見證 */}
      <FadeIn className="mb-16">
        <TestimonialSlider />
      </FadeIn>

      {/* 保證與承諾 */}
      <FadeIn className="mb-16">
        <div className="rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-8">
          <h3 className="mb-6 text-center text-2xl font-semibold text-neutral-950">
            我們的承諾
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-4 w-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-neutral-950">
                    30天滿意保證
                  </h4>
                  <p className="text-sm text-neutral-600">
                    如果您或毛孩不滿意，我們提供全額退款，無條件退貨
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-neutral-950">
                    品質保證
                  </h4>
                  <p className="text-sm text-neutral-600">
                    每批產品都經過嚴格檢驗，確保安全無虞
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                  <svg
                    className="h-4 w-4 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-neutral-950">
                    專業支援
                  </h4>
                  <p className="text-sm text-neutral-600">
                    獸醫師和營養師團隊提供專業諮詢服務
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100">
                  <svg
                    className="h-4 w-4 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-neutral-950">
                    彈性服務
                  </h4>
                  <p className="text-sm text-neutral-600">
                    隨時調整配送頻率和餐點內容，完全客製化
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 最終行動呼籲 */}
      <FadeIn className="text-center">
        <div className="rounded-2xl bg-neutral-950 p-8 text-white">
          <h3 className="mb-4 text-2xl font-semibold">還在猶豫嗎？</h3>
          <p className="mx-auto mb-6 max-w-2xl text-neutral-300">
            每一天的等待，都是毛孩健康的流失。
            現在就開始，讓您的毛孩享受天然鮮食的美好！
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.button
              className="rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-blue-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              立即開始體驗
            </motion.button>
            <motion.button
              className="rounded-lg border border-white bg-transparent px-8 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-neutral-950"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              預約營養師諮詢
            </motion.button>
          </div>

          <p className="mt-4 text-xs text-neutral-400">
            * 首次購買享有 30 天滿意保證，不滿意全額退款
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
