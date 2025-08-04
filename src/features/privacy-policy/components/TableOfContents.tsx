'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TableOfContentsProps } from '../types'

/**
 * 目录组件
 * 提供隐私政策章节导航
 */
export function TableOfContents({
  sections,
  activeSection,
  onSectionClick,
}: TableOfContentsProps) {
  const [currentSection, setCurrentSection] = useState(
    activeSection || sections[0]?.id,
  )
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      // 检查是否应该显示粘性导航
      setIsSticky(window.scrollY > 200)

      // 找到当前可见的章节
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id)
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初始检查

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const handleSectionClick = (sectionId: string) => {
    setCurrentSection(sectionId)
    onSectionClick?.(sectionId)

    // 平滑滚动到目标章节
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      {/* 桌面版侧边栏目录 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block lg:w-64 lg:flex-shrink-0"
      >
        <div className={`${isSticky ? 'fixed top-20' : 'relative'} w-64`}>
          <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">目录</h3>
            <nav className="space-y-2">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSectionClick(section.id)}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    currentSection === section.id
                      ? 'bg-blue-50 font-medium text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {section.title}
                </motion.button>
              ))}
            </nav>
          </div>
        </div>
      </motion.div>

      {/* 移动版顶部目录 */}
      <div className="mb-8 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200"
        >
          <h3 className="mb-3 text-lg font-semibold text-gray-900">目录</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSectionClick(section.id)}
                className={`rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  currentSection === section.id
                    ? 'bg-blue-50 font-medium text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {section.title}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 移动版粘性导航 */}
      {isSticky && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 right-0 left-0 z-40 border-b border-gray-200 bg-white px-4 py-2 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              {sections.find((s) => s.id === currentSection)?.title}
            </span>
            <select
              value={currentSection}
              onChange={(e) => handleSectionClick(e.target.value)}
              className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      )}

      {/* 进度指示器 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed right-8 bottom-8 z-30 hidden lg:block"
      >
        <div className="rounded-full bg-white p-3 shadow-lg ring-1 ring-gray-200">
          <div className="relative h-12 w-12">
            <svg className="h-12 w-12 -rotate-90 transform" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <motion.path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="100, 100"
                initial={{ strokeDashoffset: 100 }}
                animate={{
                  strokeDashoffset:
                    100 -
                    ((sections.findIndex((s) => s.id === currentSection) + 1) /
                      sections.length) *
                      100,
                }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                {sections.findIndex((s) => s.id === currentSection) + 1}/
                {sections.length}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
