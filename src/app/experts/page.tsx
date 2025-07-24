import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { ExpertTeam } from '@/components/ExpertTeam'

export const metadata: Metadata = {
  title: '專家團隊',
  description: '我們的專業顧問團隊包括獸醫博士、農學博士等專家，確保產品安全與專業性。',
}

export default function Experts() {
  return (
    <RootLayout>
      <PageIntro eyebrow="專家團隊" title="科學背景與專業保證">
        <p>
          我們的專業顧問團隊包括獸醫博士、農學博士等領域專家，
          採用人食等級原料與製程，為您的寵物提供最安全、最營養的鮮食產品。
        </p>
      </PageIntro>

      <ExpertTeam />
    </RootLayout>
  )
}
