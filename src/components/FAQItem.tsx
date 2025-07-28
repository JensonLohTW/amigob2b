'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { type FAQItem as FAQItemType } from '@/lib/faq'

interface FAQItemProps {
  faq: FAQItemType
  isOpen?: boolean
  onToggle?: () => void
  searchQuery?: string
}

// 高亮搜尋關鍵字的工具函數
function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, index) => 
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 text-neutral-900 rounded px-1">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

export function FAQItem({ 
  faq, 
  isOpen: controlledIsOpen, 
  onToggle, 
  searchQuery = '' 
}: FAQItemProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  
  // 如果有外部控制，使用外部狀態，否則使用內部狀態
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const handleToggle = onToggle || (() => setInternalIsOpen(!internalIsOpen))

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        onClick={handleToggle}
        className={clsx(
          'w-full text-left py-6 px-4 sm:px-6 transition-colors duration-200',
          'hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none',
          'group flex items-start justify-between gap-4'
        )}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-neutral-950 group-hover:text-neutral-700 transition-colors">
            {highlightText(faq.question, searchQuery)}
          </h3>
          
          {/* 標籤顯示 */}
          <div className="mt-2 flex flex-wrap gap-2">
            {faq.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 展開/收合圖標 */}
        <div className="flex-shrink-0 ml-4">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-6 h-6 text-neutral-400 group-hover:text-neutral-600"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-full h-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </motion.div>
        </div>
      </button>

      {/* 答案內容 */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-6">
              <div className="prose prose-neutral max-w-none">
                <p className="text-neutral-600 leading-relaxed">
                  {highlightText(faq.answer, searchQuery)}
                </p>
              </div>
              
              {/* 所有標籤顯示 */}
              {faq.tags.length > 3 && (
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <p className="text-sm text-neutral-500 mb-2">相關標籤：</p>
                  <div className="flex flex-wrap gap-2">
                    {faq.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// FAQ 列表組件
interface FAQListProps {
  faqs: FAQItemType[]
  searchQuery?: string
  className?: string
}

export function FAQList({ faqs, searchQuery = '', className }: FAQListProps) {
  if (faqs.length === 0) {
    return (
      <div className={clsx('text-center py-12', className)}>
        <div className="w-16 h-16 mx-auto mb-4 text-neutral-300">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-neutral-950 mb-2">
          沒有找到相關問題
        </h3>
        <p className="text-neutral-600 max-w-md mx-auto">
          {searchQuery 
            ? `沒有找到包含「${searchQuery}」的問題，請嘗試其他關鍵字或瀏覽所有分類。`
            : '目前沒有可顯示的問題。'
          }
        </p>
      </div>
    )
  }

  return (
    <div className={clsx('bg-white rounded-2xl shadow-sm border border-neutral-200', className)}>
      {faqs.map((faq) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  )
}

// FAQ 統計組件
interface FAQStatsProps {
  totalCount: number
  categoryCount?: number
  categoryName?: string
}

export function FAQStats({ totalCount, categoryCount, categoryName }: FAQStatsProps) {
  return (
    <div className="text-sm text-neutral-600 mb-6">
      {categoryName && categoryCount !== undefined ? (
        <p>
          在「{categoryName}」分類中找到 <span className="font-semibold text-neutral-900">{categoryCount}</span> 個問題
          {totalCount !== categoryCount && (
            <span className="ml-2">（共 {totalCount} 個問題）</span>
          )}
        </p>
      ) : (
        <p>
          共找到 <span className="font-semibold text-neutral-900">{totalCount}</span> 個問題
        </p>
      )}
    </div>
  )
}
