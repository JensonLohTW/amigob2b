import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { StatList, StatListItem } from '@/components/StatList'
import { InvestmentAnalysis } from '@/components/InvestmentAnalysis'
import { FranchiseFAQ } from '@/components/FranchiseFAQ'

export const metadata: Metadata = {
  title: '加盟流程',
  description:
    '詳細的加盟條件、分潤機制與操作模式說明，8個月回本，月毛利超過7萬元。',
}

export default function Franchise() {
  return (
    <RootLayout>
      <PageIntro eyebrow="加盟流程" title="招商加盟說明">
        <p>
          革命性的寵物鮮食自動販賣機加盟機會，詳細的加盟條件、分潤機制與操作模式，
          讓您輕鬆開啟寵物鮮食事業，8個月回本，月毛利超過7萬元。
        </p>
      </PageIntro>

      {/* 投資回報數據 */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <h2 className="text-center font-display text-2xl font-semibold text-neutral-950">
            投資回報一目了然
          </h2>
          <StatList className="mt-16">
            <StatListItem value="30%" label="利潤分潤比例" />
            <StatListItem value="7萬+" label="單機月毛利預估" />
            <StatListItem value="8個月" label="投資回本時間" />
            <StatListItem value="500公尺" label="建議設置間距" />
          </StatList>
        </FadeIn>
      </Container>

      <InvestmentAnalysis />

      <Container>
        <FranchiseFAQ />
      </Container>
    </RootLayout>
  )
}
