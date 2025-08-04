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
import { StoreLocatorContent } from './components/StoreLocatorContent'

export const metadata: Metadata = generateSEOMetadata({
  title: '門店定位 | 找到離您最近的AMIGO門店',
  description: generatePageDescription('stores'),
  keywords: generatePageKeywords('stores'),
  url: '/store-locator',
  type: 'website',
})

export default function StoreLocatorPage() {
  return <StoreLocatorContent />
}
