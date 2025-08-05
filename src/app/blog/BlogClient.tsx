'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo } from 'react'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { formatDate } from '@/lib/formatDate'

// 文章分類定義
const categories = [
  { id: 'all', name: '所有文章', color: 'bg-neutral-100 text-neutral-700' },
  { id: 'nutrition', name: '營養知識', color: 'bg-green-100 text-green-800' },
  { id: 'health', name: '健康照護', color: 'bg-blue-100 text-blue-800' },
  { id: 'feeding', name: '餵食技巧', color: 'bg-orange-100 text-orange-800' },
  { id: 'lifestyle', name: '生活照護', color: 'bg-purple-100 text-purple-800' },
  { id: 'senior', name: '樂齡照護', color: 'bg-amber-100 text-amber-800' },
  { id: 'puppy', name: '幼齡照護', color: 'bg-pink-100 text-pink-800' },
]

// 為現有文章添加分類和標籤
const enhanceArticles = (articles: any[]) => {
  return articles.map((article) => {
    let category = 'nutrition'
    let tags: string[] = []

    // 根據文章標題和內容推斷分類
    const title = article.title.toLowerCase()
    if (title.includes('營養') || title.includes('nutrition')) {
      category = 'nutrition'
      tags.push('營養均衡', '食材選擇')
    } else if (title.includes('健康') || title.includes('照護')) {
      category = 'health'
      tags.push('健康管理', '疾病預防')
    } else if (title.includes('樂齡') || title.includes('senior')) {
      category = 'senior'
      tags.push('樂齡照護', '關節保健')
    } else if (title.includes('季節') || title.includes('seasonal')) {
      category = 'lifestyle'
      tags.push('季節照護', '環境適應')
    }

    // 基於文章標題長度計算確定性的閱讀時間，避免 SSR 水合錯誤
    const titleLength = article.title.length
    const readTime = Math.ceil((titleLength % 7) + 3) // 3-9 分鐘的確定性範圍

    // 基於文章描述長度計算確定性的難度等級
    const descriptionLength = article.description.length
    const difficultyIndex = descriptionLength % 3
    const difficulty = ['初級', '中級', '進階'][difficultyIndex]

    return {
      ...article,
      category,
      tags,
      readTime,
      difficulty,
    }
  })
}

// 搜尋和篩選組件
function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  articlesCount,
}: {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  articlesCount: number
}) {
  return (
    <div className="mb-12 space-y-6">
      {/* 搜尋框 */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="搜尋文章標題或內容..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full rounded-2xl border border-neutral-300 bg-white py-3 pr-3 pl-10 leading-5 placeholder-neutral-500 focus:border-neutral-950 focus:placeholder-neutral-400 focus:ring-1 focus:ring-neutral-950 focus:outline-none"
        />
      </div>

      {/* 分類篩選 */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-neutral-950 text-white'
                : category.color + ' hover:opacity-80'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 結果統計 */}
      <div className="flex items-center justify-between text-sm text-neutral-600">
        <span>找到 {articlesCount} 篇文章</span>
        <div className="flex items-center gap-4">
          <span>排序：</span>
          <select className="rounded-lg border border-neutral-300 px-3 py-1 text-sm focus:ring-1 focus:ring-neutral-950 focus:outline-none">
            <option value="date">最新發布</option>
            <option value="popular">最受歡迎</option>
            <option value="readTime">閱讀時間</option>
          </select>
        </div>
      </div>
    </div>
  )
}

// 增強版文章卡片組件
function ArticleCard({ article }: { article: any }) {
  const categoryInfo =
    categories.find((cat) => cat.id === article.category) || categories[0]

  return (
    <FadeIn>
      <article className="group relative rounded-3xl bg-white p-6 ring-1 ring-neutral-950/5 transition-all duration-300 hover:bg-neutral-50 hover:ring-neutral-950/10 sm:p-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* 分類標籤 */}
            <div className="mb-4 flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${categoryInfo.color}`}
              >
                {categoryInfo.name}
              </span>
              <span className="text-xs text-neutral-500">
                {article.readTime} 分鐘閱讀
              </span>
              <span className="text-xs text-neutral-500">
                {article.difficulty}
              </span>
            </div>

            <h2 className="font-display text-xl font-semibold text-neutral-950 group-hover:text-neutral-700 sm:text-2xl">
              <Link href={article.href} className="stretched-link">
                {article.title}
              </Link>
            </h2>

            <p className="mt-3 line-clamp-3 text-neutral-600">
              {article.description}
            </p>

            {/* 標籤 */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.slice(0, 3).map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* 作者和日期 */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 overflow-hidden rounded-full bg-neutral-100">
                  {article.author.image?.src ? (
                    <Image
                      src={article.author.image.src}
                      alt={article.author.name}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover grayscale"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-xs font-medium text-neutral-600">
                      {article.author.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="text-sm">
                  <div className="font-medium text-neutral-950">
                    {article.author.name}
                  </div>
                  <div className="text-neutral-600">{article.author.role}</div>
                </div>
              </div>
              <div className="ml-auto text-sm text-neutral-500">
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </div>
            </div>
          </div>

          {/* 文章圖片 */}
          {article.author.image?.src && (
            <div className="ml-6 w-24 flex-shrink-0 sm:w-32">
              <div className="aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                  src={article.author.image.src}
                  alt={article.title}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                />
              </div>
            </div>
          )}
        </div>
      </article>
    </FadeIn>
  )
}

export function BlogClient({ initialArticles }: { initialArticles: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // 增強文章數據
  const enhancedArticles = useMemo(
    () => enhanceArticles(initialArticles),
    [initialArticles],
  )

  // 篩選文章
  const filteredArticles = useMemo(() => {
    let filtered = enhancedArticles

    // 分類篩選
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory,
      )
    }

    // 搜尋篩選
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchLower) ||
          article.description.toLowerCase().includes(searchLower) ||
          article.tags.some((tag: string) =>
            tag.toLowerCase().includes(searchLower),
          ),
      )
    }

    return filtered
  }, [enhancedArticles, selectedCategory, searchTerm])

  return (
    <RootLayout>
      <PageIntro eyebrow="寵物營養知識" title="專業的寵物照護資訊與營養建議">
        <p>
          我們的獸醫師和營養師團隊定期分享最新的寵物營養知識、
          健康照護技巧和飼養建議，幫助您為毛孩提供最好的照護。
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        {/* 搜尋和篩選 */}
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          articlesCount={filteredArticles.length}
        />

        {/* 文章列表 */}
        {filteredArticles.length > 0 ? (
          <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.href} article={article} />
            ))}
          </FadeInStagger>
        ) : (
          <div className="rounded-3xl bg-neutral-50 p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.33"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-neutral-950">
              沒有找到相關文章
            </h3>
            <p className="mt-2 text-neutral-600">
              請嘗試調整搜尋關鍵詞或選擇其他分類
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="mt-4 rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              清除篩選條件
            </button>
          </div>
        )}
      </Container>

      <ContactSection />
    </RootLayout>
  )
}
