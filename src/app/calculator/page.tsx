import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { InvestmentCalculator } from '@/components/InvestmentCalculator'

export const metadata: Metadata = {
  title: '投資試算',
  description: '互動式投資試算工具，輸入您的營運參數，即時計算投資回報率和回本時間。',
}

export default function Calculator() {
  return (
    <RootLayout>
      <PageIntro eyebrow="投資試算" title="投資回報計算工具">
        <p>
          使用我們的互動式投資試算工具，輸入您的營運參數，
          即時計算月毛利、淨利潤和投資回本時間，讓您清楚了解投資效益。
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <InvestmentCalculator />
      </Container>

      {/* 使用說明區塊 */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="rounded-3xl bg-neutral-50 p-8">
            <h3 className="text-xl font-semibold text-neutral-950 text-center mb-6">
              如何使用投資試算工具
            </h3>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <h4 className="font-semibold text-neutral-950 mb-2">輸入營運參數</h4>
                <p className="text-sm text-neutral-600">
                  根據您的實際情況調整日銷量、租金、水電等參數
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold text-lg">2</span>
                </div>
                <h4 className="font-semibold text-neutral-950 mb-2">即時查看結果</h4>
                <p className="text-sm text-neutral-600">
                  系統會即時計算月營收、淨利、回本時間等關鍵指標
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold text-lg">3</span>
                </div>
                <h4 className="font-semibold text-neutral-950 mb-2">評估投資決策</h4>
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
