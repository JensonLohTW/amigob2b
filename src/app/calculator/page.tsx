import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { InvestmentCalculator } from '@/features/investment-calculator'

export const metadata: Metadata = {
  title: '智能投資試算 - AMIGO 寵物鮮食自動販賣機',
  description:
    '使用我們的智能投資試算工具，包含情境分析、風險評估和詳細的投資回報計算，幫助您做出明智的投資決策。',
}

export default function Calculator() {
  return (
    <RootLayout>
      <PageIntro eyebrow="智能投資試算" title="全方位投資分析工具">
        <p>
          使用我們的智能投資試算工具，不僅能計算基礎的投資回報，
          還提供情境分析、風險評估和專業建議，讓您全面了解投資機會，做出最明智的決策。
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <InvestmentCalculator />
      </Container>

      {/* 使用說明區塊 */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="rounded-3xl bg-neutral-50 p-8">
            <h3 className="mb-6 text-center text-xl font-semibold text-neutral-950">
              如何使用投資試算工具
            </h3>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-lg font-bold text-blue-600">1</span>
                </div>
                <h4 className="mb-2 font-semibold text-neutral-950">
                  輸入營運參數
                </h4>
                <p className="text-sm text-neutral-600">
                  根據您的實際情況調整日銷量、租金、水電等參數
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <span className="text-lg font-bold text-green-600">2</span>
                </div>
                <h4 className="mb-2 font-semibold text-neutral-950">
                  即時查看結果
                </h4>
                <p className="text-sm text-neutral-600">
                  系統會即時計算月營收、淨利、回本時間等關鍵指標
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <span className="text-lg font-bold text-purple-600">3</span>
                </div>
                <h4 className="mb-2 font-semibold text-neutral-950">
                  評估投資決策
                </h4>
                <p className="text-sm text-neutral-600">
                  參考系統建議，做出最適合的投資決策
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </RootLayout>
  )
}
