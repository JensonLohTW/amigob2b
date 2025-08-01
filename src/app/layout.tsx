import { type Metadata } from 'next'
import StagewiseLoader from '@/components/StagewiseLoader'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - AMIGO',
    default: 'AMIGO - 專業寵物鮮食自動販賣機加盟平台',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">
        {children}
        <StagewiseLoader />
      </body>
    </html>
  )
}
