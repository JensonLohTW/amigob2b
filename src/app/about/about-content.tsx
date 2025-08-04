import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'

// 品牌價值觀組件
export function BrandValues() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="品牌理念"
        title="用心守護每一隻毛孩的健康與幸福"
        invert
      >
        <p>
          我們相信，每一隻毛孩都值得擁有最好的營養與照護。
          AMIGO致力於結合科技創新與專業營養，為寵物主人和加盟商創造雙贏價值。
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="專業品質" invert>
            與專業獸醫師和營養師合作，確保每一份鮮食都符合最高營養標準，
            讓寵物主人安心，讓毛孩健康成長。
          </GridListItem>
          <GridListItem title="創新科技" invert>
            運用AI智能管理系統和自動販賣機技術，為加盟商提供高效營運模式，
            為消費者提供24小時便利服務。
          </GridListItem>
          <GridListItem title="永續經營" invert>
            建立可持續發展的商業模式，與加盟商共同成長，
            為寵物產業帶來正面影響與長期價值。
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

// 品牌故事組件
export function BrandStory() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-medium text-neutral-950 sm:text-4xl">
              從愛出發的創新之路
            </h2>
            <div className="mt-6 space-y-6 text-base text-neutral-600">
              <p>
                AMIGO的故事始於一個簡單的信念：每一隻毛孩都應該享受到新鮮、營養、安全的食物。
                作為寵物主人，我們深知為毛孩選擇食物時的擔憂與期待。
              </p>
              <p>
                結合多年的寵物營養研究與科技創新，我們開發出革命性的寵物鮮食自動販賣機系統。
                不僅為寵物主人提供便利的購買體驗，更為有志創業的夥伴提供穩定的事業機會。
              </p>
              <p>
                今天，AMIGO已成為台灣領先的寵物鮮食品牌，我們的使命是讓每一隻毛孩都能享受到
                最好的營養照護，同時幫助更多人實現創業夢想。
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <h3 className="font-display text-base font-semibold text-neutral-950">
              我們的承諾
            </h3>
            <dl className="mt-6 space-y-6">
              <div>
                <dt className="font-semibold text-neutral-950">對寵物主人</dt>
                <dd className="mt-1 text-neutral-600">
                  提供最新鮮、最營養的寵物鮮食，讓您的毛孩健康快樂成長
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-950">對加盟商</dt>
                <dd className="mt-1 text-neutral-600">
                  提供完整的創業支援與持續的營運輔導，確保事業成功
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-950">對社會</dt>
                <dd className="mt-1 text-neutral-600">
                  推動寵物產業的健康發展，創造更美好的人寵共生環境
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

// 成就統計組件
export function Achievements() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="mb-16 text-center font-display text-3xl font-medium text-neutral-950 sm:text-4xl">
          我們的成就與影響
        </h2>
        <StatList>
          <StatListItem value="1000+" label="滿意的寵物主人" />
          <StatListItem value="50+" label="加盟門店" />
          <StatListItem value="10000+" label="健康餐點製作" />
          <StatListItem value="95%" label="客戶滿意度" />
        </StatList>
      </FadeIn>
    </Container>
  )
}

// 專業團隊組件
export function ProfessionalTeam() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <SectionIntro
          title="專業團隊，值得信賴"
          className="mt-24 sm:mt-32 lg:mt-40"
        >
          <p>
            我們的團隊由資深獸醫師、寵物營養師、食品科學專家和商業顧問組成，
            為您提供最專業的產品和服務。
          </p>
        </SectionIntro>
      </FadeIn>
      <Container className="mt-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FadeIn>
            <div className="rounded-3xl bg-neutral-50 p-8">
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                獸醫師團隊
              </h3>
              <p className="mt-4 text-neutral-600">
                擁有豐富臨床經驗的專業獸醫師，確保每一份鮮食都符合寵物的營養需求和健康標準。
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="rounded-3xl bg-neutral-50 p-8">
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                營養師團隊
              </h3>
              <p className="mt-4 text-neutral-600">
                專業寵物營養師精心調配每一款產品，確保營養均衡，滿足不同年齡和健康狀況的需求。
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="rounded-3xl bg-neutral-50 p-8">
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                技術團隊
              </h3>
              <p className="mt-4 text-neutral-600">
                資深工程師和數據分析師，持續優化AI智能管理系統，提升營運效率和用戶體驗。
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Container>
  )
}

// 品質保證組件
export function QualityAssurance() {
  return (
    <div className="mt-24 rounded-4xl bg-blue-50 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro eyebrow="品質保證" title="嚴格把關，安心品質">
        <p>
          從食材採購到製作配送，每一個環節都經過嚴格把關，
          確保您的毛孩享用到最安全、最營養的鮮食。
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-600 p-2">
                <svg
                  className="h-6 w-6 text-white"
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
              <div>
                <h3 className="font-semibold text-neutral-950">食材溯源</h3>
                <p className="mt-2 text-neutral-600">
                  所有食材均來自合格供應商，建立完整的溯源系統，確保食材新鮮安全。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-600 p-2">
                <svg
                  className="h-6 w-6 text-white"
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
              <div>
                <h3 className="font-semibold text-neutral-950">製程管控</h3>
                <p className="mt-2 text-neutral-600">
                  採用人食等級的製作標準，全程低溫製作，保持食材的營養價值和新鮮度。
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-600 p-2">
                <svg
                  className="h-6 w-6 text-white"
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
              </div>
              <div>
                <h3 className="font-semibold text-neutral-950">冷鏈配送</h3>
                <p className="mt-2 text-neutral-600">
                  建立完整的冷鏈物流系統，確保產品從製作到販售全程保持最佳溫度。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-600 p-2">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-950">品質檢驗</h3>
                <p className="mt-2 text-neutral-600">
                  每批產品都經過嚴格的品質檢驗，確保符合食品安全標準和營養規格。
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
