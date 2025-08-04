import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { formatDate } from '@/lib/formatDate'
import { loadArticles } from '@/lib/mdx'
import { BlogClient } from './BlogClient'
import { generateSEOMetadata, generatePageKeywords, generatePageDescription } from '@/components/SEO'
import { BreadcrumbStructuredData } from '@/components/StructuredData'

export const metadata: Metadata = generateSEOMetadata({
  title: '寵物營養知識部落格 | 專業寵物照護資訊',
  description: generatePageDescription('blog'),
  keywords: generatePageKeywords('blog'),
  url: '/blog',
  type: 'website'
})



export default async function BlogPage() {
  const articles = await loadArticles()
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: '首頁', url: 'https://amigo-pet.com' },
          { name: '營養知識', url: 'https://amigo-pet.com/blog' }
        ]}
      />
      <BlogClient initialArticles={articles} />
    </>
  )
}
