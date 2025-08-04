import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { ContactSection } from '@/components/ContactSection'

export const metadata: Metadata = {
  title: '服務條款 - AMIGO 寵物鮮食自動販賣機',
  description:
    'AMIGO 寵物鮮食自動販賣機加盟合作服務條款，包含服務範圍、雙方權利義務、免責聲明及爭議處理機制。',
  openGraph: {
    title: '服務條款 - AMIGO 寵物鮮食自動販賣機',
    description:
      'AMIGO 寵物鮮食自動販賣機加盟合作服務條款，包含服務範圍、雙方權利義務、免責聲明及爭議處理機制。',
    type: 'website',
    locale: 'zh_TW',
  },
  twitter: {
    card: 'summary',
    title: '服務條款 - AMIGO 寵物鮮食自動販賣機',
    description:
      'AMIGO 寵物鮮食自動販賣機加盟合作服務條款，包含服務範圍、雙方權利義務、免責聲明及爭議處理機制。',
  },
}

export default function TermsOfService() {
  return (
    <RootLayout>
      <PageIntro eyebrow="法律條款" title="服務條款">
        <p>
          本服務條款規範您與 AMIGO 寵物鮮食自動販賣機之間的加盟合作關係，
          請仔細閱讀以下條款，使用我們的服務即表示您同意遵守這些條款。
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="prose prose-neutral prose-lg mx-auto max-w-4xl">
            <div className="mb-8 rounded-lg bg-neutral-50 p-6">
              <p className="mb-0 text-sm text-neutral-600">
                <strong>最後更新日期：</strong>2025年1月25日
                <br />
                <strong>生效日期：</strong>2025年1月25日
              </p>
            </div>

            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-neutral-950">
                1. 服務範圍定義
              </h2>

              <h3 className="mb-4 text-xl font-semibold text-neutral-950">
                1.1 服務內容
              </h3>
              <p>AMIGO 提供以下服務：</p>
              <ul>
                <li>寵物鮮食自動販賣機設備租賃或銷售</li>
                <li>專業選址評估與建議</li>
                <li>機台安裝與設定服務</li>
                <li>產品供應與配送服務</li>
                <li>技術支援與維護服務</li>
                <li>營運管理系統與培訓</li>
                <li>行銷支援與品牌授權</li>
              </ul>

              <h3 className="mb-4 text-xl font-semibold text-neutral-950">
                1.2 加盟條件
              </h3>
              <p>申請加盟需符合以下條件：</p>
              <ul>
                <li>具備合法營業資格</li>
                <li>擁有適當的營業場所</li>
                <li>具備基本的營運資金</li>
                <li>同意遵守品牌經營規範</li>
                <li>完成必要的培訓課程</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-neutral-950">
                2. 雙方權利義務
              </h2>

              <h3 className="mb-4 text-xl font-semibold text-neutral-950">
                2.1 AMIGO 的權利與義務
              </h3>
              <p>
                <strong>權利：</strong>
              </p>
              <ul>
                <li>收取加盟費用與分潤</li>
                <li>監督加盟主的營運品質</li>
                <li>要求遵守品牌標準</li>
                <li>在違約時終止合作關係</li>
              </ul>

              <p>
                <strong>義務：</strong>
              </p>
              <ul>
                <li>提供完整的技術支援</li>
                <li>確保產品品質與供應穩定</li>
                <li>提供營運培訓與指導</li>
                <li>維護品牌形象與聲譽</li>
                <li>提供24小時客服支援</li>
              </ul>

              <h3 className="mb-4 text-xl font-semibold text-neutral-950">
                2.2 加盟主的權利與義務
              </h3>
              <p>
                <strong>權利：</strong>
              </p>
              <ul>
                <li>使用 AMIGO 品牌與商標</li>
                <li>獲得技術支援與培訓</li>
                <li>享有區域保護權益</li>
                <li>參與品牌行銷活動</li>
              </ul>

              <p>
                <strong>義務：</strong>
              </p>
              <ul>
                <li>遵守品牌經營標準</li>
                <li>維護機台設備與環境</li>
                <li>按時支付相關費用</li>
                <li>配合品牌行銷活動</li>
                <li>保護商業機密資訊</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-neutral-950">
                3. 費用與分潤機制
              </h2>

              <h3 className="mb-4 text-xl font-semibold text-neutral-950">
                3.1 費用結構
              </h3>
              <ul>
                <li>
                  <strong>加盟費：</strong>依據不同方案而定
                </li>
                <li>
                  <strong>設備費：</strong>機台購買或租賃費用
                </li>
                <li>
                  <strong>保證金：</strong>履約保證金
                </li>
                <li>
                  <strong>月費：</strong>系統使用與維護費用
                </li>
              </ul>

              <h3 className="mb-4 text-xl font-semibold text-neutral-950">
                3.2 分潤方式
              </h3>
              <ul>
                <li>加盟主享有營收30%的分潤</li>
                <li>分潤計算以實際銷售金額為準</li>
                <li>每月結算一次，次月15日前支付</li>
                <li>相關稅費由各方自行負擔</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-neutral-950">
                4. 免責聲明
              </h2>

              <h3 className="mb-4 text-xl font-semibold text-neutral-950">
                4.1 服務限制
              </h3>
              <ul>
                <li>我們不保證特定的營收或獲利</li>
                <li>市場風險由加盟主自行承擔</li>
                <li>不可抗力因素造成的損失不負責任</li>
                <li>第三方服務中斷不承擔責任</li>
              </ul>

              <h3 className="mb-4 text-xl font-semibold text-neutral-950">
                4.2 責任限制
              </h3>
              <ul>
                <li>間接損失不承擔賠償責任</li>
                <li>賠償金額以實際損失為限</li>
                <li>不承擔懲罰性賠償</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-neutral-950">
                5. 合約終止
              </h2>

              <h3 className="mb-4 text-xl font-semibold text-neutral-950">
                5.1 終止條件
              </h3>
              <p>在以下情況下，任一方可終止合約：</p>
              <ul>
                <li>合約期滿且未續約</li>
                <li>雙方協議終止</li>
                <li>一方嚴重違約</li>
                <li>不可抗力持續超過3個月</li>
              </ul>

              <h3 className="mb-4 text-xl font-semibold text-neutral-950">
                5.2 終止後處理
              </h3>
              <ul>
                <li>停止使用品牌與商標</li>
                <li>結清所有費用</li>
                <li>歸還相關設備與資料</li>
                <li>履行保密義務</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-neutral-950">
                6. 爭議處理機制
              </h2>

              <h3 className="mb-4 text-xl font-semibold text-neutral-950">
                6.1 協商解決
              </h3>
              <p>發生爭議時，雙方應先透過友好協商解決。</p>

              <h3 className="mb-4 text-xl font-semibold text-neutral-950">
                6.2 調解仲裁
              </h3>
              <p>協商不成時，可申請調解或仲裁：</p>
              <ul>
                <li>適用中華民國法律</li>
                <li>以台北地方法院為管轄法院</li>
                <li>可選擇仲裁方式解決</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-neutral-950">
                7. 其他條款
              </h2>

              <h3 className="mb-4 text-xl font-semibold text-neutral-950">
                7.1 條款修改
              </h3>
              <p>
                我們保留修改本條款的權利，修改後將在網站上公告，繼續使用服務視為同意修改。
              </p>

              <h3 className="mb-4 text-xl font-semibold text-neutral-950">
                7.2 可分割性
              </h3>
              <p>若本條款任何部分被認定無效，其餘部分仍然有效。</p>

              <h3 className="mb-4 text-xl font-semibold text-neutral-950">
                7.3 完整協議
              </h3>
              <p>本條款構成雙方完整的協議，取代所有先前的口頭或書面協議。</p>
            </section>

            <div className="rounded-lg bg-blue-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-blue-900">
                聯絡資訊
              </h3>
              <p className="mb-2 text-blue-800">
                如對本服務條款有任何疑問，請聯絡我們：
              </p>
              <ul className="space-y-1 text-blue-800">
                <li>
                  <strong>電話：</strong>0800-123-456
                </li>
                <li>
                  <strong>電子郵件：</strong>legal@amigo.com.tw
                </li>
                <li>
                  <strong>地址：</strong>台北市信義區信義路五段7號
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>
      </Container>

      <ContactSection />
    </RootLayout>
  )
}
