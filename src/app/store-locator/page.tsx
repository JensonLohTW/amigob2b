import { type Metadata } from 'next'

import {
  generateSEOMetadata,
  generatePageKeywords,
  generatePageDescription,
} from '@/components/SEO'
import {
  BreadcrumbStructuredData,
  LocalBusinessStructuredData,
} from '@/components/StructuredData'
import { RootLayout } from '@/components/RootLayout'
import { StoreLocatorContent } from './components/StoreLocatorContent'

export const metadata: Metadata = generateSEOMetadata({
  title: '門店定位 | 找到離您最近的AMIGO門店',
  description: generatePageDescription('stores'),
  keywords: generatePageKeywords('stores'),
  url: '/store-locator',
  type: 'website',
})

export default function StoreLocatorPage() {
  return (
    <RootLayout>
      <BreadcrumbStructuredData
        items={[
          { name: '首頁', url: '/' },
          { name: '門店定位', url: '/store-locator' },
        ]}
      />
      <LocalBusinessStructuredData
        business={{
          name: 'AMIGO寵物鮮食門店',
          description: '提供新鮮、營養的寵物鮮食，專業營養師調配',
          address: '台灣各地門店',
          phone: '0800-123-456',
          url: 'https://amigo.com.tw'
        }}
      />
      <StoreLocatorContent />
    </RootLayout>
  )
}
