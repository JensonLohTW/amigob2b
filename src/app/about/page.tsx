import { type Metadata } from 'next'

import { ContactSection } from '@/components/ContactSection'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import {
  generateSEOMetadata,
  generatePageKeywords,
  generatePageDescription,
} from '@/components/SEO'
import { BreadcrumbStructuredData } from '@/components/StructuredData'
import {
  BrandValues,
  BrandStory,
  Achievements,
  ProfessionalTeam,
  QualityAssurance,
} from './about-content'

export const metadata: Metadata = generateSEOMetadata({
  title: '關於AMIGO | 專業寵物鮮食品牌故事',
  description: generatePageDescription('about'),
  keywords: generatePageKeywords('about'),
  url: '/about',
  type: 'website',
})

export default function About() {
  return (
    <RootLayout>
      <BreadcrumbStructuredData
        items={[
          { name: '首頁', url: 'https://amigo-pet.com' },
          { name: '關於我們', url: 'https://amigo-pet.com/about' },
        ]}
      />

      <PageIntro eyebrow="關於 AMIGO" title="專業寵物鮮食，創新科技服務">
        <p>
          AMIGO 致力於為台灣的寵物主人提供最優質的鮮食產品，
          同時為有志創業的夥伴提供完整的加盟支援。
          我們結合專業營養知識與創新科技，打造雙贏的商業模式。
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            從一個簡單的想法開始：讓每一隻毛孩都能享受到新鮮、營養、安全的食物。
            今天，我們已成為台灣領先的寵物鮮食自動販賣機品牌，
            服務超過千位寵物主人，並協助50多位加盟商成功創業。
          </p>
          <p>
            無論您是關心毛孩健康的寵物主人，還是尋找創業機會的投資者， AMIGO
            都能為您提供最專業的產品和服務。
          </p>
        </div>
      </PageIntro>

      <BrandStory />
      <Achievements />
      <BrandValues />
      <ProfessionalTeam />
      <QualityAssurance />

      <ContactSection />
    </RootLayout>
  )
}
