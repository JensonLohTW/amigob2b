import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { ProductCatalog } from '@/components/ProductCatalog'
import { SectionIntro } from '@/components/SectionIntro'
import { CentralKitchenJourney } from '@/components/CentralKitchenJourney'

export const metadata: Metadata = {
  title: '產品系列',
  description:
    '專業寵物鮮食產品系列，從幼齡到樂齡，從日常營養到功能性需求，每一款都經過專業獸醫師和營養師精心調配。',
}

export default function Products() {
  return (
    <RootLayout>
      <PageIntro eyebrow="產品系列" title="專業寵物鮮食產品">
        <p>
          我們提供全方位的寵物鮮食產品，從幼齡到樂齡，從日常營養到功能性需求，
          每一款都經過專業獸醫師和營養師精心調配，確保您的毛孩獲得最優質的營養。
        </p>
      </PageIntro>

      <ProductCatalog />

      {/* 中央廚房探索區塊 */}
      <CentralKitchenJourney />

      {/* 產品優勢說明 */}
      <SectionIntro
        eyebrow="產品優勢"
        title="為什麼選擇我們的寵物鮮食？"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          我們的每一款產品都經過嚴格的品質控制和營養分析，
          確保您的寵物獲得最優質、最安全的營養補給。
        </p>
      </SectionIntro>

      <Container className="mt-16">
        <FadeIn>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                <svg
                  className="h-8 w-8 text-neutral-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-950">
                人食等級製程
              </h3>
              <p className="text-neutral-600">
                採用與人類食品相同的安全標準，從原料採購到製作過程都經過嚴格把關。
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                <svg
                  className="h-8 w-8 text-neutral-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-950">
                專業營養配方
              </h3>
              <p className="text-neutral-600">
                獸醫博士和營養師團隊精心調配，確保每個年齡階段的營養需求都得到滿足。
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                <svg
                  className="h-8 w-8 text-neutral-600"
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
              </div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-950">
                新鮮現做
              </h3>
              <p className="text-neutral-600">
                每日新鮮製作，不添加防腐劑，保持食材的天然營養和美味口感。
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </RootLayout>
  )
}
