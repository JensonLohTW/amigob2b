import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { VendingMachineDemo } from '@/components/VendingMachineDemo'
import ProfessionalVendingMachine from '@/components/ProfessionalVendingMachine'

export const metadata: Metadata = {
  title: '智能販賣機',
  description: 'AI自動販賣機的優勢與應用場景，無人商店、自動化管理、手機後台查看營收。',
}

export default function VendingMachine() {
  return (
    <RootLayout>
      <PageIntro eyebrow="智能販賣機" title="AI自動販賣機展示">
        <p>
          革命性的AI自動販賣機，結合無人商店概念與智能管理系統，
          讓您輕鬆經營寵物鮮食事業，手機即可查看營收和管理庫存。
        </p>
      </PageIntro>

      <ProfessionalVendingMachine />

      <VendingMachineDemo />
    </RootLayout>
  )
}
