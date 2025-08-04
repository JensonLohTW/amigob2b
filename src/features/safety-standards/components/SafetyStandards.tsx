'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { TabSelector } from './TabSelector'
import { CertificationGrid } from './CertificationCard'
import { TestReportGrid } from './TestReportCard'
import { SafetyTimeline } from './SafetyTimeline'
import { SafetyStats } from './SafetyStats'
import {
  getAllCertifications,
  getAllTestReports,
  getTimelineEvents,
  getSafetyStats,
} from '../data/certifications'
import { SafetyStandardsProps } from '../types'
import {
  BuildingOffice2Icon,
  BeakerIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline'

/**
 * 安全标准主组件
 * 展示完整的安全认证、检验报告和时间线
 */
export function SafetyStandards({
  initialTab = 'certifications',
  showTabs = true,
  className = '',
}: SafetyStandardsProps) {
  const [activeTab, setActiveTab] = useState<
    'certifications' | 'reports' | 'timeline'
  >(initialTab)

  const certifications = getAllCertifications()
  const testReports = getAllTestReports()
  const timelineEvents = getTimelineEvents()
  const safetyStats = getSafetyStats()

  const handleTabChange = (tab: 'certifications' | 'reports' | 'timeline') => {
    setActiveTab(tab)
  }

  return (
    <div className={`bg-white py-24 sm:py-32 ${className}`}>
      <Container>
        <SectionIntro
          eyebrow="安全保障"
          title="安全标准与认证"
          className="mb-16"
        >
          <p>
            我们严格遵循国际食品安全标准，获得多项权威认证，
            并定期进行检验测试，确保为您的毛孩提供最安全的鲜食产品。
          </p>
        </SectionIntro>

        {/* 安全统计概览 */}
        <FadeIn>
          <SafetyStats stats={safetyStats} className="mb-16" />
        </FadeIn>

        {/* 标签选择器 */}
        {showTabs && (
          <FadeIn>
            <div className="mb-12">
              <TabSelector
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
          </FadeIn>
        )}

        {/* 内容区域 */}
        <FadeInStagger>
          <AnimatePresence mode="wait">
            {activeTab === 'certifications' && (
              <motion.div
                key="certifications"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    安全认证
                  </h2>
                  <p className="text-gray-600">
                    我们获得的所有安全认证和质量管理系统认证，确保产品符合最高标准。
                  </p>
                </div>
                <CertificationGrid certifications={certifications} />
              </motion.div>
            )}

            {activeTab === 'reports' && (
              <motion.div
                key="reports"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    检验报告
                  </h2>
                  <p className="text-gray-600">
                    定期进行的各项检验测试报告，包括微生物、化学成分、营养成分等检验结果。
                  </p>
                </div>
                <TestReportGrid reports={testReports} />
              </motion.div>
            )}

            {activeTab === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    安全时间线
                  </h2>
                  <p className="text-gray-600">
                    我们在安全管理方面的重要里程碑和持续改进的历程。
                  </p>
                </div>
                <SafetyTimeline events={timelineEvents} />
              </motion.div>
            )}
          </AnimatePresence>
        </FadeInStagger>

        {/* 安全承诺声明 */}
        <FadeIn>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20"
          >
            <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8 lg:p-12">
              <div className="mb-8 text-center">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  我们的安全承诺
                </h3>
                <p className="text-lg text-gray-600">
                  食品安全是我们的首要责任，我们承诺持续维持最高标准
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {[
                  {
                    icon: BuildingOffice2Icon,
                    title: '源头管控',
                    description: '从原料采购到生产加工，每个环节都严格把关',
                    features: ['供应商审核', '原料检验', '生产监控'],
                  },
                  {
                    icon: BeakerIcon,
                    title: '科学检验',
                    description: '采用先进检验技术，确保产品安全无虞',
                    features: ['微生物检验', '化学分析', '营养检测'],
                  },
                  {
                    icon: ClipboardDocumentListIcon,
                    title: '持续改进',
                    description: '建立完善的质量管理体系，持续优化流程',
                    features: ['定期审查', '流程优化', '员工培训'],
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="mb-4 flex justify-center">
                      <item.icon className="h-10 w-10 text-gray-700" />
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-gray-900">
                      {item.title}
                    </h4>
                    <p className="mb-4 text-gray-600">{item.description}</p>
                    <div className="space-y-1">
                      {item.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="text-sm font-medium text-blue-600"
                        >
                          • {feature}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </FadeIn>

        {/* 联系我们 */}
        <FadeIn>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white">
              <h3 className="mb-4 text-2xl font-bold">
                对我们的安全标准有疑问？
              </h3>
              <p className="mb-6 text-lg opacity-90">
                我们很乐意为您详细说明我们的安全管理措施
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button className="inline-flex items-center rounded-md border border-white bg-white px-6 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50">
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  下载认证文件
                </button>
                <button className="inline-flex items-center rounded-md border border-white px-6 py-3 text-base font-medium text-white transition-colors hover:bg-white hover:text-gray-900">
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  联系质量部门
                </button>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </Container>
    </div>
  )
}
