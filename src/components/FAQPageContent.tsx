'use client'

import { useState, useMemo } from 'react'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { FAQSearch } from '@/components/FAQSearch'
import { FAQList, FAQStats } from '@/components/FAQItem'
import {
  searchFAQs,
  type FAQCategory,
  faqCategories,
  getCategoryStats,
} from '@/lib/faq'

export function FAQPageContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<
    FAQCategory | undefined
  >()

  // 根據搜尋條件和分類篩選 FAQ
  const filteredFAQs = useMemo(() => {
    return searchFAQs(searchQuery, selectedCategory)
  }, [searchQuery, selectedCategory])

  // 獲取統計資料
  const categoryStats = getCategoryStats()
  const selectedCategoryInfo = selectedCategory
    ? faqCategories.find((cat) => cat.id === selectedCategory)
    : undefined

  return (
    <>
      {/* 搜尋和篩選區域 */}
      <Container className="mt-16">
        <FadeIn>
          <FAQSearch
            onSearch={setSearchQuery}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        </FadeIn>
      </Container>

      {/* FAQ 列表 */}
      <Container className="mt-12">
        <FadeInStagger>
          <FadeIn>
            <FAQStats
              totalCount={filteredFAQs.length}
              categoryCount={
                selectedCategory ? categoryStats[selectedCategory] : undefined
              }
              categoryName={selectedCategoryInfo?.name}
            />
          </FadeIn>

          <FadeIn>
            <FAQList faqs={filteredFAQs} searchQuery={searchQuery} />
          </FadeIn>
        </FadeInStagger>
      </Container>

      {/* 分類概覽 - 當沒有搜尋條件時顯示 */}
      {!searchQuery && !selectedCategory && (
        <Container className="mt-24 sm:mt-32">
          <FadeIn>
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-display text-2xl font-semibold text-neutral-950">
                問題分類概覽
              </h2>
              <p className="mx-auto max-w-2xl text-neutral-600">
                點擊任一分類快速瀏覽相關問題，或使用上方搜尋功能找到特定資訊。
              </p>
            </div>
          </FadeIn>

          <FadeInStagger>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {faqCategories.map((category) => (
                <FadeIn key={category.id}>
                  <button
                    onClick={() => setSelectedCategory(category.id)}
                    className="group relative w-full rounded-2xl border border-neutral-200 bg-white p-6 text-left transition-all duration-200 hover:border-neutral-300 hover:shadow-lg"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="text-3xl">{category.icon}</div>
                      <div className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-600">
                        {categoryStats[category.id]} 個問題
                      </div>
                    </div>

                    <h3 className="mb-2 font-display text-lg font-semibold text-neutral-950 transition-colors group-hover:text-neutral-700">
                      {category.name}
                    </h3>

                    <p className="text-sm leading-relaxed text-neutral-600">
                      {category.description}
                    </p>

                    {/* 箭頭圖標 */}
                    <div className="absolute top-6 right-6 opacity-0 transition-opacity group-hover:opacity-100">
                      <svg
                        className="h-5 w-5 text-neutral-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </div>
                  </button>
                </FadeIn>
              ))}
            </div>
          </FadeInStagger>
        </Container>
      )}

      {/* 幫助提示 */}
      <Container className="mt-24 sm:mt-32">
        <FadeIn>
          <div className="rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8 sm:p-12">
            <div className="text-center">
              <div className="mx-auto mb-6 h-16 w-16 text-blue-600">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
              </div>

              <h3 className="mb-4 font-display text-2xl font-semibold text-neutral-950">
                沒找到您要的答案？
              </h3>

              <p className="mx-auto mb-8 max-w-2xl text-neutral-600">
                我們的專業團隊隨時為您提供協助。您可以透過以下方式聯絡我們，
                我們會在 24 小時內回覆您的問題。
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="tel:0800-123-456"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  電話諮詢
                </a>

                <a
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-900 transition-colors hover:bg-neutral-50"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  線上諮詢
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
