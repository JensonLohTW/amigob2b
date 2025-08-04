import { type Metadata } from 'next'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - AMIGO',
    default: 'AMIGO - 專業寵物鮮食自動販賣機 | 加盟創業 | 寵物營養專家',
  },
  description:
    '台灣領先的寵物鮮食自動販賣機品牌，提供加盟創業機會與優質寵物鮮食。專業營養師調配，新鮮製作，讓您的毛孩吃得健康又安心。立即了解加盟方案或尋找附近門店。',
  keywords: [
    '寵物鮮食',
    '自動販賣機',
    '寵物食品',
    '加盟創業',
    '狗狗鮮食',
    '貓咪鮮食',
    '寵物營養',
    '健康寵物食品',
    '台灣寵物',
    '寵物便當',
    '新鮮寵物食品',
    '寵物健康',
    '營養師調配',
    '無添加寵物食品',
  ],
  authors: [{ name: 'AMIGO寵物鮮食' }],
  creator: 'AMIGO寵物鮮食',
  publisher: 'AMIGO寵物鮮食',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: 'https://amigo-pet.com',
    siteName: 'AMIGO寵物鮮食',
    title: 'AMIGO - 專業寵物鮮食自動販賣機 | 加盟創業 | 寵物營養專家',
    description:
      '台灣領先的寵物鮮食自動販賣機品牌，提供加盟創業機會與優質寵物鮮食。專業營養師調配，新鮮製作，讓您的毛孩吃得健康又安心。',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AMIGO寵物鮮食自動販賣機',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMIGO - 專業寵物鮮食自動販賣機',
    description: '台灣領先的寵物鮮食品牌，提供加盟創業機會與優質寵物鮮食。',
    images: ['/images/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://amigo-pet.com',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
