'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { type FAQCategory, faqCategories, getCategoryStats } from '@/lib/faq'

interface FAQSearchProps {
  onSearch: (query: string) => void
  onCategoryChange: (category: FAQCategory | undefined) => void
  searchQuery: string
  selectedCategory?: FAQCategory
  className?: string
}

export function FAQSearch({
  onSearch,
  onCategoryChange,
  searchQuery,
  selectedCategory,
  className
}: FAQSearchProps) {
  const [inputValue, setInputValue] = useState(searchQuery)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const categoryStats = getCategoryStats()

  // 同步外部搜尋查詢到內部狀態
  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  // 處理搜尋輸入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    onSearch(value)
  }

  // 清除搜尋
  const handleClearSearch = () => {
    setInputValue('')
    onSearch('')
    inputRef.current?.focus()
  }

  // 處理分類選擇
  const handleCategorySelect = (category: FAQCategory | undefined) => {
    onCategoryChange(category)
  }

  return (
    <div className={clsx('space-y-6', className)}>
      {/* 搜尋框 */}
      <div className="relative">
        <div
          className={clsx(
            'relative flex items-center rounded-2xl border-2 bg-white transition-all duration-200',
            isFocused
              ? 'border-blue-500 shadow-lg shadow-blue-500/10'
              : 'border-neutral-200 hover:border-neutral-300'
          )}
        >
          {/* 搜尋圖標 */}
          <div className="absolute left-4 text-neutral-400">
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>

          {/* 輸入框 */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="搜尋問題、答案或關鍵字..."
            className="w-full py-4 pl-12 pr-12 text-neutral-900 placeholder-neutral-500 bg-transparent border-none outline-none text-lg"
            aria-label="搜尋 FAQ"
          />

          {/* 清除按鈕 */}
          <AnimatePresence>
            {inputValue && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                onClick={handleClearSearch}
                className="absolute right-4 p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label="清除搜尋"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* 搜尋建議 */}
        {isFocused && !inputValue && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-xl border border-neutral-200 shadow-lg z-10"
          >
            <p className="text-sm text-neutral-600 mb-3">熱門搜尋：</p>
            <div className="flex flex-wrap gap-2">
              {['投資金額', '回報期', '技術支援', '維修保養', '分潤機制'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInputValue(suggestion)
                    onSearch(suggestion)
                  }}
                  className="px-3 py-1 text-sm bg-neutral-100 text-neutral-700 rounded-full hover:bg-neutral-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* 分類篩選 */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">按分類篩選</h3>
        <div className="flex flex-wrap gap-3">
          {/* 全部分類 */}
          <button
            onClick={() => handleCategorySelect(undefined)}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              !selectedCategory
                ? 'bg-neutral-900 text-white shadow-lg'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            )}
          >
            <span>📋</span>
            <span>全部</span>
            <span className="ml-1 px-2 py-0.5 text-xs bg-white/20 rounded-full">
              {Object.values(categoryStats).reduce((sum, count) => sum + count, 0)}
            </span>
          </button>

          {/* 各分類按鈕 */}
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                selectedCategory === category.id
                  ? 'bg-neutral-900 text-white shadow-lg'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              )}
              title={category.description}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
              <span className="ml-1 px-2 py-0.5 text-xs bg-white/20 rounded-full">
                {categoryStats[category.id]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 當前篩選狀態 */}
      {(searchQuery || selectedCategory) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-neutral-600"
        >
          <span>當前篩選：</span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              搜尋「{searchQuery}」
              <button
                onClick={() => onSearch('')}
                className="ml-1 hover:text-blue-600"
                aria-label="清除搜尋條件"
              >
                ×
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full">
              {faqCategories.find(cat => cat.id === selectedCategory)?.name}
              <button
                onClick={() => onCategoryChange(undefined)}
                className="ml-1 hover:text-green-600"
                aria-label="清除分類篩選"
              >
                ×
              </button>
            </span>
          )}
          {(searchQuery || selectedCategory) && (
            <button
              onClick={() => {
                onSearch('')
                onCategoryChange(undefined)
              }}
              className="text-neutral-500 hover:text-neutral-700 underline"
            >
              清除所有篩選
            </button>
          )}
        </motion.div>
      )}
    </div>
  )
}
