'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PolicySection } from './PolicySection'
import { TableOfContents } from './TableOfContents'
import { ContactSection } from './ContactSection'
import {
  policySections,
  contactInfo,
  LAST_UPDATED,
} from '../data/policy-content'
import { PrivacyPolicyProps } from '../types'

/**
 * 隐私政策主组件
 * 完整的隐私政策页面，包含目录、章节内容和联系信息
 */
export function PrivacyPolicy({
  lastUpdated = LAST_UPDATED,
  showTableOfContents = true,
  className = '',
}: PrivacyPolicyProps) {
  const [activeSection, setActiveSection] = useState(policySections[0]?.id)

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
  }

  return (
    <div className={`min-h-screen bg-gray-50 py-12 ${className}`}>
      <Container>
        {/* 页面标题 */}
        <FadeIn>
          <div className="mb-12 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 sm:text-5xl"
            >
              隐私政策
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-lg text-gray-600"
            >
              AMIGO 宠物鲜食科技有限公司个人资料保护政策
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              最后更新：{lastUpdated}
            </motion.div>
          </div>
        </FadeIn>

        {/* 重要提醒 */}
        <FadeIn>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="mb-2 text-xl font-bold">我们对您隐私的承诺</h2>
                <p className="leading-relaxed text-blue-100">
                  保护您的个人资料是我们的首要责任。本隐私政策详细说明了我们如何收集、使用、保护和分享您的个人信息。
                  我们承诺遵循最高的隐私保护标准，确保您的资料安全。
                </p>
              </div>
            </div>
          </motion.div>
        </FadeIn>

        {/* 主要内容区域 */}
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          {/* 目录 */}
          {showTableOfContents && (
            <TableOfContents
              sections={policySections}
              activeSection={activeSection}
              onSectionClick={handleSectionClick}
            />
          )}

          {/* 政策内容 */}
          <div className="min-w-0 flex-1">
            <div className="rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-200 lg:p-12">
              {policySections.map((section) => (
                <PolicySection key={section.id} section={section} />
              ))}

              {/* 联系信息章节 */}
              <div id="contact" className="scroll-mt-24">
                <ContactSection contactInfo={contactInfo} className="mt-12" />
              </div>
            </div>
          </div>
        </div>

        {/* 页脚信息 */}
        <FadeIn>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <div className="mb-4 flex items-center justify-center">
                <svg
                  className="mr-3 h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900">
                  感谢您的信任
                </h3>
              </div>

              <p className="mx-auto mb-6 max-w-2xl text-gray-600">
                您的隐私对我们至关重要。如果您对本隐私政策有任何疑问或建议，
                我们随时欢迎您的反馈，让我们一起建立更安全的数字环境。
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  联系我们
                </button>

                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  回到顶部
                </button>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </Container>
    </div>
  )
}
