import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { Button } from '@/components/Button'
import { ApplicationForm } from '@/components/ApplicationForm'

export const metadata: Metadata = {
  title: '合作申請',
  description: '立即申請加盟合作，填寫線上諮詢表單，我們將盡快與您聯繫。',
}

export default function Apply() {
  return (
    <RootLayout>
      <PageIntro eyebrow="合作申請" title="立即開始您的加盟之路">
        <p>
          填寫以下表單，我們的專業團隊將在24小時內與您聯繫，
          為您提供詳細的加盟說明和個人化的投資建議。
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* 申請表單 */}
          <div className="lg:col-span-2">
            <ApplicationForm />
          </div>

          {/* 聯絡資訊 */}
          <div className="lg:col-span-1">
            <FadeIn>
              <div className="rounded-3xl bg-neutral-50 p-8 sticky top-8">
                <h3 className="text-xl font-semibold text-neutral-950">聯絡我們</h3>
                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="font-medium text-neutral-950">客服專線</h4>
                    <p className="text-neutral-600">0800-123-456</p>
                    <p className="text-sm text-neutral-500">服務時間：週一至週五 9:00-18:00</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-neutral-950">Email</h4>
                    <p className="text-neutral-600">franchise@amigo.com.tw</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-neutral-950">地址</h4>
                    <p className="text-neutral-600">高雄市前鎮區中山二路123號</p>
                  </div>

                  <div className="pt-4 border-t border-neutral-200">
                    <h4 className="font-medium text-neutral-950">下載資源</h4>
                    <div className="mt-2 space-y-2">
                      <Button href="#" className="w-full border border-neutral-300 bg-white text-neutral-950 hover:bg-neutral-50">
                        下載招商簡報
                      </Button>
                      <Button href="#" className="w-full border border-neutral-300 bg-white text-neutral-950 hover:bg-neutral-50">
                        下載加盟意願表
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200">
                    <h4 className="font-medium text-neutral-950">快速連結</h4>
                    <div className="mt-2 space-y-2">
                      <Button href="/calculator" className="w-full border border-neutral-300 bg-white text-neutral-950 hover:bg-neutral-50">
                        投資試算工具
                      </Button>
                      <Button href="/franchise" className="w-full border border-neutral-300 bg-white text-neutral-950 hover:bg-neutral-50">
                        加盟詳細資訊
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </RootLayout>
  )
}
