import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import { StatList, StatListItem } from '@/components/StatList'
import { Button } from '@/components/Button'
import {
  StatCard,
  ProgressBar,
  CircularProgress,
} from '@/components/AnimatedCounter'
// 暫時保留原有的 logo 圖片，後續會替換為合作夥伴 logo
import logoBrightPath from '@/images/clients/bright-path/logo-light.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-light.svg'
import logoGreenLife from '@/images/clients/green-life/logo-light.svg'
import logoHomeWork from '@/images/clients/home-work/logo-light.svg'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-light.svg'
import logoNorthAdventures from '@/images/clients/north-adventures/logo-light.svg'
import logoPhobiaDark from '@/images/clients/phobia/logo-dark.svg'
import logoPhobiaLight from '@/images/clients/phobia/logo-light.svg'
import logoUnseal from '@/images/clients/unseal/logo-light.svg'
import imageLaptop from '@/images/laptop.jpg'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'
import { RootLayout } from '@/components/RootLayout'

// 合作夥伴和成功案例 - 暫時使用現有 logo，後續會替換為實際合作夥伴
const partners = [
  ['寵物連鎖 A', logoPhobiaLight],
  ['動物醫院 B', logoFamilyFund],
  ['寵物用品 C', logoUnseal],
  ['寵物食品 D', logoMailSmirk],
  ['寵物美容 E', logoHomeWork],
  ['寵物旅館 F', logoGreenLife],
  ['寵物訓練 G', logoBrightPath],
  ['寵物保險 H', logoNorthAdventures],
]

// 合作夥伴展示區塊 - 展示已合作的寵物相關企業
function Partners() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            已有數百家寵物相關企業選擇與我們合作
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {partners.map(([partner, logo]) => (
              <li key={partner}>
                <FadeIn>
                  <Image src={logo} alt={partner} unoptimized />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <>
      <SectionIntro
        title="專業寵物鮮食產品系列"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          我們提供全方位的寵物鮮食產品，從幼齡到樂齡，從日常營養到功能性需求，
          每一款都經過專業獸醫師和營養師精心調配，確保您的毛孩獲得最優質的營養。{' '}
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split('-')[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function FranchiseAdvantages() {
  return (
    <>
      <SectionIntro
        eyebrow="加盟優勢"
        title="為什麼選擇我們的寵物鮮食自動販賣機？"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          我們提供完整的加盟支援體系，從產品供應到技術維護，
          讓您輕鬆經營寵物鮮食事業，享受穩定的被動收入。
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-135 flex-none lg:w-180">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-132 lg:pl-4">
            <ListItem title="AI智能管理">
              先進的AI自動販賣機系統，24小時無人值守營業，
              自動溫控保鮮，智能庫存管理，手機即可監控營運狀況。
            </ListItem>
            <ListItem title="專業產品供應">
              獸醫博士和農學博士團隊研發，人食等級製程，
              提供幼齡到樂齡的完整產品線，滿足不同寵物需求。
            </ListItem>
            <ListItem title="穩定獲利模式">
              30%分潤比例，月毛利超過7萬元，8個月快速回本，
              透明的分潤機制，讓您清楚掌握每一分收益，
              年投資報酬率可達20%以上，被動收入穩定可靠。
            </ListItem>
            <ListItem title="全方位支援">
              從選址評估、機台安裝到後續維護，提供完整支援服務，
              專業團隊全程協助，確保營運順利無阻。
              24小時技術客服，讓您安心經營無後顧之憂。
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  description:
    'AMIGO 是專業的寵物鮮食自動販賣機加盟平台，提供AI智能管理系統、完整加盟支援，讓您輕鬆開啟寵物鮮食事業。',
}

export default async function Home() {
  let caseStudies = (await loadCaseStudies()).slice(0, 3)

  return (
    <RootLayout>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
            寵物鮮食 AI 自動販賣機加盟商機
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            革命性的寵物鮮食自動販賣機，結合 AI 智能管理與人食等級製程。 8
            個月回本，月毛利超過 7 萬元，搶佔高雄 400 台機台商機。{' '}
          </p>
        </FadeIn>
      </Container>

      <Partners />

      {/* 市場數據展示區塊 - 展示關鍵投資數據 */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <h2 className="text-center font-display text-3xl font-medium tracking-tight [text-wrap:balance] text-neutral-950 sm:text-4xl">
            市場潛力與投資機會
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xl text-neutral-600">
            台灣寵物市場規模已突破600億元，其中寵物食品佔比超過40%。
            隨著飼主對寵物健康意識提升，高品質鮮食需求快速成長。
          </p>
        </FadeIn>

        <FadeInStagger>
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-4">
            <FadeIn>
              <StatCard
                title="機台潛力"
                value={400}
                suffix="台"
                description="全台預計可設置機台數量"
                color="blue"
                icon={
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
                }
              />
            </FadeIn>
            <FadeIn>
              <StatCard
                title="目標寵物數"
                value={340000}
                suffix="隻"
                description="服務範圍內寵物數量"
                color="green"
                icon={
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
                }
              />
            </FadeIn>
            <FadeIn>
              <StatCard
                title="月毛利潛力"
                value={70000}
                prefix="NT$ "
                suffix="+"
                description="單台機器月毛利預估"
                color="purple"
                icon={
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                }
              />
            </FadeIn>
            <FadeIn>
              <StatCard
                title="回本時間"
                value={8}
                suffix="個月"
                description="平均投資回本時間"
                color="orange"
                icon={
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
              />
            </FadeIn>
          </div>
        </FadeInStagger>

        {/* 快速導航按鈕 */}
        <FadeIn>
          <div className="mt-16 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/calculator">立即試算投資回報</Button>
            <Button
              href="/franchise"
              className="border border-neutral-300 !bg-white !text-neutral-950 hover:!bg-neutral-50"
            >
              了解加盟詳情
            </Button>
            <Button
              href="/apply"
              className="border border-neutral-300 !bg-white !text-neutral-950 hover:!bg-neutral-50"
            >
              申請加盟合作
            </Button>
          </div>
        </FadeIn>
      </Container>

      <CaseStudies caseStudies={caseStudies} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: '台北寵物連鎖 A', logo: logoPhobiaDark }}
      >
        AMIGO 的自動販賣機讓我們的門市營收增加了 30%， 客戶可以 24
        小時購買新鮮的寵物食品， 而且 AI 管理系統讓我們完全不用擔心庫存問題。
      </Testimonial>

      <FranchiseAdvantages />

      <ContactSection />
    </RootLayout>
  )
}
