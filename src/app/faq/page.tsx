import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { ContactSection } from '@/components/ContactSection'
import { FAQPageContent } from '@/components/FAQPageContent'

export const metadata: Metadata = {
  title: '常見問題 - AMIGO 寵物鮮食自動販賣機',
  description:
    '查看 AMIGO 寵物鮮食自動販賣機加盟的常見問題，包含投資相關、技術規格、營運管理、客戶支援等詳細解答。',
}

export default function FAQ() {
  return (
    <RootLayout>
      <PageIntro eyebrow="常見問題" title="快速找到您需要的答案">
        <p>
          我們整理了加盟主最關心的問題和詳細解答，涵蓋投資、技術、營運、支援等各個方面。
          使用搜尋功能或選擇分類，快速找到您需要的資訊。
        </p>
      </PageIntro>

      <FAQPageContent />

      <ContactSection />
    </RootLayout>
  )
}
