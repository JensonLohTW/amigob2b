import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'

export function ContactSection() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium text-balance text-white sm:text-4xl">
              準備開始您的加盟之路？
            </h2>
            <p className="mt-6 text-lg text-white/80">
              立即聯繫我們，獲得專業的加盟諮詢和個人化的投資建議。
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/apply" invert>
                立即申請加盟
              </Button>
              <Button href="/calculator" className="border border-white/20 bg-transparent text-white hover:bg-white/10">
                投資試算
              </Button>
            </div>
            <div className="mt-10 border-t border-white/10 pt-10">
              <h3 className="font-display text-base font-semibold text-white">
                聯絡資訊
              </h3>
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-white font-medium">客服專線</p>
                  <p className="text-white/80">0800-123-456</p>
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-white/80">franchise@amigo.com.tw</p>
                </div>
                <div>
                  <p className="text-white font-medium">總公司地址</p>
                  <p className="text-white/80">高雄市前鎮區中山二路123號</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
