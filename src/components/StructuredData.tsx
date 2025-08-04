import Script from 'next/script'

interface StructuredDataProps {
  type:
    | 'organization'
    | 'localBusiness'
    | 'product'
    | 'article'
    | 'breadcrumb'
    | 'faq'
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
    }

    switch (type) {
      case 'organization':
        return {
          ...baseData,
          '@type': 'Organization',
          name: 'AMIGO寵物鮮食',
          url: 'https://amigo-pet.com',
          logo: 'https://amigo-pet.com/images/logo.png',
          description:
            '台灣領先的寵物鮮食自動販賣機品牌，提供加盟創業機會與優質寵物鮮食',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+886-2-1234-5678',
            contactType: 'customer service',
            availableLanguage: ['Chinese', 'English'],
          },
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'TW',
            addressRegion: '台北市',
            addressLocality: '信義區',
            streetAddress: '信義路五段7號',
            postalCode: '110',
          },
          sameAs: [
            'https://www.facebook.com/amigo-pet',
            'https://www.instagram.com/amigo-pet',
            'https://line.me/R/ti/p/@amigo-pet',
          ],
          ...data,
        }

      case 'localBusiness':
        return {
          ...baseData,
          '@type': 'LocalBusiness',
          name: data.name || 'AMIGO寵物鮮食門店',
          description: '提供新鮮、營養的寵物鮮食，專業營養師調配',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'TW',
            addressRegion: data.region,
            addressLocality: data.city,
            streetAddress: data.address,
            postalCode: data.postalCode,
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: data.latitude,
            longitude: data.longitude,
          },
          telephone: data.phone,
          openingHours: data.openingHours || ['Mo-Su 06:00-22:00'],
          priceRange: '$$',
          servesCuisine: '寵物食品',
          acceptsReservations: false,
          ...data,
        }

      case 'product':
        return {
          ...baseData,
          '@type': 'Product',
          name: data.name,
          description: data.description,
          brand: {
            '@type': 'Brand',
            name: 'AMIGO',
          },
          category: '寵物食品',
          offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: 'TWD',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'AMIGO寵物鮮食',
            },
          },
          aggregateRating: data.rating
            ? {
                '@type': 'AggregateRating',
                ratingValue: data.rating.value,
                reviewCount: data.rating.count,
                bestRating: 5,
                worstRating: 1,
              }
            : undefined,
          ...data,
        }

      case 'article':
        return {
          ...baseData,
          '@type': 'Article',
          headline: data.title,
          description: data.description,
          author: {
            '@type': 'Person',
            name: data.author.name,
          },
          publisher: {
            '@type': 'Organization',
            name: 'AMIGO寵物鮮食',
            logo: {
              '@type': 'ImageObject',
              url: 'https://amigo-pet.com/images/logo.png',
            },
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished,
          image: data.image,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url,
          },
          ...data,
        }

      case 'breadcrumb':
        return {
          ...baseData,
          '@type': 'BreadcrumbList',
          itemListElement: data.items.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        }

      case 'faq':
        return {
          ...baseData,
          '@type': 'FAQPage',
          mainEntity: data.questions.map((qa: any) => ({
            '@type': 'Question',
            name: qa.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: qa.answer,
            },
          })),
        }

      default:
        return { ...baseData, ...data }
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  )
}

// 預設的組織結構化數據
export function OrganizationStructuredData() {
  return <StructuredData type="organization" data={{}} />
}

// 麵包屑結構化數據
export function BreadcrumbStructuredData({
  items,
}: {
  items: Array<{ name: string; url: string }>
}) {
  return <StructuredData type="breadcrumb" data={{ items }} />
}

// 產品結構化數據
export function ProductStructuredData({ product }: { product: any }) {
  return <StructuredData type="product" data={product} />
}

// 文章結構化數據
export function ArticleStructuredData({ article }: { article: any }) {
  return <StructuredData type="article" data={article} />
}

// 門店結構化數據
export function LocalBusinessStructuredData({ business }: { business: any }) {
  return <StructuredData type="localBusiness" data={business} />
}

// FAQ結構化數據
export function FAQStructuredData({
  questions,
}: {
  questions: Array<{ question: string; answer: string }>
}) {
  return <StructuredData type="faq" data={{ questions }} />
}
