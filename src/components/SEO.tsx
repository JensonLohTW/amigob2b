import Head from 'next/head'
import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  noIndex?: boolean
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image = '/images/og-image.jpg',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  noIndex = false,
}: SEOProps): Metadata {
  const baseUrl = 'https://amigo-pet.com'
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullTitle = title
    ? `${title} - AMIGO`
    : 'AMIGO - 專業寵物鮮食自動販賣機'
  const defaultDescription =
    '台灣領先的寵物鮮食自動販賣機品牌，提供加盟創業機會與優質寵物鮮食。專業營養師調配，新鮮製作，讓您的毛孩吃得健康又安心。'

  const metadata: Metadata = {
    title: fullTitle,
    description: description || defaultDescription,
    keywords:
      keywords.length > 0
        ? keywords
        : [
            '寵物鮮食',
            '自動販賣機',
            '寵物食品',
            '加盟創業',
            '狗狗鮮食',
            '貓咪鮮食',
            '寵物營養',
          ],
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
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
      type: type === 'product' ? 'website' : type,
      locale: 'zh_TW',
      url: fullUrl,
      siteName: 'AMIGO寵物鮮食',
      title: fullTitle,
      description: description || defaultDescription,
      images: [
        {
          url: image.startsWith('http') ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title || 'AMIGO寵物鮮食',
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || defaultDescription,
      images: [image.startsWith('http') ? image : `${baseUrl}${image}`],
    },
    alternates: {
      canonical: fullUrl,
    },
  }

  return metadata
}

// 預設的SEO關鍵詞庫
export const SEOKeywords = {
  // 核心關鍵詞
  core: ['寵物鮮食', '自動販賣機', '寵物食品', 'AMIGO', '寵物便當'],

  // B2B相關關鍵詞
  b2b: [
    '加盟創業',
    '寵物食品加盟',
    '自動販賣機加盟',
    '創業機會',
    '投資項目',
    '被動收入',
    '小本創業',
    '加盟商機',
  ],

  // C端相關關鍵詞
  c2c: [
    '狗狗鮮食',
    '貓咪鮮食',
    '寵物營養',
    '健康寵物食品',
    '新鮮寵物食品',
    '寵物健康',
    '營養師調配',
    '無添加寵物食品',
    '天然寵物食品',
    '寵物餐廳',
  ],

  // 地區相關關鍵詞
  location: [
    '台北寵物食品',
    '台中寵物鮮食',
    '高雄寵物便當',
    '新北寵物食品',
    '桃園寵物鮮食',
    '台南寵物便當',
    '台灣寵物食品',
  ],

  // 功能相關關鍵詞
  functional: [
    '幼犬食品',
    '成犬食品',
    '老犬食品',
    '幼貓食品',
    '成貓食品',
    '老貓食品',
    '減重寵物食品',
    '過敏寵物食品',
    '腸胃敏感',
    '關節保健',
  ],

  // 品質相關關鍵詞
  quality: [
    '新鮮製作',
    '當日製作',
    '冷凍保鮮',
    '營養均衡',
    '食材安全',
    '品質保證',
    '獸醫推薦',
    '專業調配',
  ],
}

// 生成頁面特定的關鍵詞
export function generatePageKeywords(
  pageType: 'home' | 'products' | 'franchise' | 'stores' | 'blog' | 'about',
  additional: string[] = [],
): string[] {
  const baseKeywords = SEOKeywords.core

  let specificKeywords: string[] = []

  switch (pageType) {
    case 'home':
      specificKeywords = [
        ...SEOKeywords.b2b.slice(0, 4),
        ...SEOKeywords.c2c.slice(0, 4),
        ...SEOKeywords.quality.slice(0, 3),
      ]
      break
    case 'products':
      specificKeywords = [
        ...SEOKeywords.c2c,
        ...SEOKeywords.functional.slice(0, 6),
        ...SEOKeywords.quality.slice(0, 4),
      ]
      break
    case 'franchise':
      specificKeywords = [
        ...SEOKeywords.b2b,
        ...SEOKeywords.quality.slice(0, 3),
      ]
      break
    case 'stores':
      specificKeywords = [
        ...SEOKeywords.location,
        ...SEOKeywords.c2c.slice(0, 5),
      ]
      break
    case 'blog':
      specificKeywords = [
        ...SEOKeywords.c2c.slice(0, 6),
        ...SEOKeywords.functional.slice(0, 4),
        '寵物知識',
        '寵物照護',
        '營養知識',
      ]
      break
    case 'about':
      specificKeywords = [
        ...SEOKeywords.quality,
        '寵物食品品牌',
        '台灣製造',
        '食品安全',
      ]
      break
  }

  return [...baseKeywords, ...specificKeywords, ...additional]
}

// 生成頁面描述
export function generatePageDescription(
  pageType: 'home' | 'products' | 'franchise' | 'stores' | 'blog' | 'about',
  customDescription?: string,
): string {
  if (customDescription) return customDescription

  const descriptions = {
    home: '台灣領先的寵物鮮食自動販賣機品牌，提供加盟創業機會與優質寵物鮮食。專業營養師調配，新鮮製作，讓您的毛孩吃得健康又安心。立即了解加盟方案或尋找附近門店。',
    products:
      '探索AMIGO專業寵物鮮食產品系列，包含幼齡、成年、樂齡等不同階段的營養配方。新鮮製作，營養均衡，滿足您毛孩的健康需求。',
    franchise:
      '加入AMIGO寵物鮮食自動販賣機加盟體系，低門檻創業機會，完整教育訓練與營運支援。投資寵物產業，創造穩定被動收入。',
    stores:
      '尋找您附近的AMIGO寵物鮮食門店，提供新鮮製作的寵物便當與專業營養諮詢。全台多點服務，讓您的毛孩隨時享用健康美食。',
    blog: '獲取最新的寵物營養知識、飼養技巧和健康資訊。AMIGO專業團隊分享實用的寵物照護建議，幫助您的毛孩健康成長。',
    about:
      '了解AMIGO寵物鮮食的品牌故事、經營理念與品質承諾。我們致力於提供最優質的寵物鮮食，讓每隻毛孩都能享受健康美味的餐點。',
  }

  return descriptions[pageType]
}

// 生成結構化數據的常用配置
export const StructuredDataConfigs = {
  organization: {
    name: 'AMIGO寵物鮮食',
    url: 'https://amigo-pet.com',
    logo: 'https://amigo-pet.com/images/logo.png',
    description: '台灣領先的寵物鮮食自動販賣機品牌',
    contactPoint: {
      telephone: '+886-2-1234-5678',
      contactType: 'customer service',
    },
  },

  website: {
    name: 'AMIGO寵物鮮食',
    url: 'https://amigo-pet.com',
    description: '專業寵物鮮食自動販賣機品牌，提供加盟創業機會與優質寵物鮮食',
  },
}
