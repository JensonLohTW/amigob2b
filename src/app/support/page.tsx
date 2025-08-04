import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'

export const metadata: Metadata = {
  title: '客服中心',
  description:
    'AMIGO客服中心為您提供全方位的支援服務，包括產品諮詢、技術支援、售後服務等。',
}

function SupportCategories() {
  const categories = [
    {
      title: '產品相關',
      description: '產品規格、營養成分、適用對象等問題',
      icon: (
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
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      faqs: [
        '如何選擇適合我毛孩的產品？',
        '產品的保存期限是多久？',
        '產品是否含有過敏原？',
        '如何判斷份量是否適當？',
      ],
    },
    {
      title: '購買與配送',
      description: '訂購流程、付款方式、配送相關問題',
      icon: (
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
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
      faqs: [
        '如何在自動販賣機購買產品？',
        '支援哪些付款方式？',
        '產品售完時該怎麼辦？',
        '如何查詢最近的販賣機位置？',
      ],
    },
    {
      title: '營養諮詢',
      description: '寵物營養、餵食建議、健康相關問題',
      icon: (
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      faqs: [
        '幼犬幼貓的營養需求有什麼不同？',
        '高齡寵物需要特殊的營養配方嗎？',
        '如何從傳統飼料轉換到鮮食？',
        '寵物挑食該怎麼辦？',
      ],
    },
    {
      title: '加盟支援',
      description: '加盟流程、營運支援、技術問題',
      icon: (
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      faqs: [
        '加盟的基本條件是什麼？',
        '投資回報期大約多久？',
        '如何選擇合適的設置地點？',
        '總部提供哪些支援服務？',
      ],
    },
  ]

  return (
    <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {categories.map((category, index) => (
        <FadeIn key={index}>
          <div className="rounded-3xl bg-white p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-neutral-100 p-3 text-neutral-600">
                {category.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-950">
                  {category.title}
                </h3>
                <p className="text-sm text-neutral-600">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-neutral-950">常見問題</h4>
              <ul className="mt-3 space-y-2">
                {category.faqs.map((faq, faqIndex) => (
                  <li key={faqIndex} className="text-sm text-neutral-600">
                    • {faq}
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-6 w-full rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800">
              查看更多
            </button>
          </div>
        </FadeIn>
      ))}
    </FadeInStagger>
  )
}

function ContactMethods() {
  const methods = [
    {
      title: '24小時客服專線',
      detail: '0800-123-456',
      description: '免付費專線，全年無休',
      available: '24小時',
    },
    {
      title: '線上客服',
      detail: '即時對話',
      description: '快速回應您的問題',
      available: '09:00-21:00',
    },
    {
      title: '電子郵件',
      detail: 'support@amigo.com.tw',
      description: '詳細問題諮詢',
      available: '24小時內回覆',
    },
  ]

  return (
    <div className="mt-24 sm:mt-32 lg:mt-40">
      <Container>
        <h2 className="text-2xl font-semibold text-neutral-950">聯絡客服</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {methods.map((method, index) => (
            <FadeIn key={index}>
              <div className="rounded-2xl bg-neutral-50 p-6 text-center">
                <h3 className="font-semibold text-neutral-950">
                  {method.title}
                </h3>
                <p className="mt-2 text-lg font-medium text-neutral-950">
                  {method.detail}
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  {method.description}
                </p>
                <p className="mt-2 text-xs font-medium text-neutral-500">
                  {method.available}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </div>
  )
}

function ServiceHours() {
  return (
    <div className="mt-24 sm:mt-32 lg:mt-40">
      <Container>
        <div className="rounded-3xl bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-neutral-950">服務時間</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-medium text-neutral-950">客服專線</h3>
              <p className="mt-1 text-sm text-neutral-600">24小時全年無休</p>
            </div>
            <div>
              <h3 className="font-medium text-neutral-950">線上客服</h3>
              <p className="mt-1 text-sm text-neutral-600">
                週一至週日 09:00-21:00
              </p>
            </div>
            <div>
              <h3 className="font-medium text-neutral-950">電子郵件</h3>
              <p className="mt-1 text-sm text-neutral-600">24小時內回覆</p>
            </div>
            <div>
              <h3 className="font-medium text-neutral-950">緊急支援</h3>
              <p className="mt-1 text-sm text-neutral-600">24小時技術支援</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default function SupportPage() {
  return (
    <RootLayout>
      <PageIntro eyebrow="客服中心" title="我們隨時為您提供協助">
        <p>
          無論您遇到任何問題，我們的專業客服團隊都會竭誠為您服務。
          從產品諮詢到技術支援，我們提供全方位的協助。
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <SupportCategories />
      </Container>

      <ContactMethods />
      <ServiceHours />
    </RootLayout>
  )
}
