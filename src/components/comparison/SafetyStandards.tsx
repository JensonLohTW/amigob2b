'use client'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Shield,
  Trophy,
  ChefHat,
  Stethoscope,
  CheckCircle,
  FileText,
  Calendar,
  Award,
} from 'lucide-react'

interface Certification {
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  details: string[]
  validUntil: string
  certNumber: string
}

interface TestReport {
  testType: string
  testDate: string
  result: 'pass' | 'excellent'
  details: {
    parameter: string
    standard: string
    result: string
    status: 'pass' | 'excellent'
  }[]
}

const certifications: Certification[] = [
  {
    name: 'HACCP 食品安全管制系統',
    description: '危害分析重要管制點系統認證',
    icon: Shield,
    details: [
      '生物性危害管制',
      '化學性危害管制',
      '物理性危害管制',
      '關鍵管制點監控',
      '矯正措施程序',
      '驗證系統建立',
      '記錄保存制度',
    ],
    validUntil: '2025-12-31',
    certNumber: 'HACCP-2024-001',
  },
  {
    name: 'ISO 22000 食品安全管理',
    description: '國際食品安全管理系統標準',
    icon: Trophy,
    details: [
      '食品安全政策制定',
      '危害分析與風險評估',
      '前提方案建立',
      'HACCP 計畫實施',
      '管理系統整合',
      '持續改善機制',
      '第三方稽核驗證',
    ],
    validUntil: '2025-08-15',
    certNumber: 'ISO22000-2024-TW-002',
  },
  {
    name: '人食等級製程認證',
    description: '符合人類食品製造標準',
    icon: ChefHat,
    details: [
      '食材來源可追溯',
      '製程環境管制',
      '人員衛生管理',
      '設備清潔消毒',
      '包裝材料安全',
      '儲存運輸管制',
      '品質檢驗程序',
    ],
    validUntil: '2025-06-30',
    certNumber: 'HGF-2024-003',
  },
  {
    name: '獸醫師專業認證',
    description: '獸醫師監督配方設計',
    icon: Stethoscope,
    details: [
      '營養需求分析',
      '配方科學設計',
      '食材安全評估',
      '製程品質監控',
      '產品效果追蹤',
      '健康風險評估',
      '專業建議提供',
    ],
    validUntil: '長期有效',
    certNumber: 'VET-CERT-2024-001',
  },
]

const testReports: TestReport[] = [
  {
    testType: '微生物檢驗',
    testDate: '2024-01-15',
    result: 'excellent',
    details: [
      {
        parameter: '大腸桿菌群',
        standard: '< 10 CFU/g',
        result: '< 3 CFU/g',
        status: 'excellent',
      },
      {
        parameter: '沙門氏菌',
        standard: '陰性',
        result: '陰性',
        status: 'pass',
      },
      {
        parameter: '李斯特菌',
        standard: '陰性',
        result: '陰性',
        status: 'pass',
      },
      {
        parameter: '總生菌數',
        standard: '< 10^5 CFU/g',
        result: '< 10^3 CFU/g',
        status: 'excellent',
      },
    ],
  },
  {
    testType: '重金屬檢測',
    testDate: '2024-01-10',
    result: 'excellent',
    details: [
      {
        parameter: '鉛 (Pb)',
        standard: '< 0.5 ppm',
        result: '< 0.1 ppm',
        status: 'excellent',
      },
      {
        parameter: '汞 (Hg)',
        standard: '< 0.1 ppm',
        result: '< 0.02 ppm',
        status: 'excellent',
      },
      {
        parameter: '鎘 (Cd)',
        standard: '< 0.1 ppm',
        result: '< 0.02 ppm',
        status: 'excellent',
      },
      {
        parameter: '砷 (As)',
        standard: '< 0.5 ppm',
        result: '< 0.1 ppm',
        status: 'excellent',
      },
    ],
  },
  {
    testType: '農藥殘留檢測',
    testDate: '2024-01-08',
    result: 'pass',
    details: [
      {
        parameter: '有機磷類',
        standard: '未檢出',
        result: '未檢出',
        status: 'pass',
      },
      {
        parameter: '有機氯類',
        standard: '未檢出',
        result: '未檢出',
        status: 'pass',
      },
      {
        parameter: '氨基甲酸酯類',
        standard: '未檢出',
        result: '未檢出',
        status: 'pass',
      },
      {
        parameter: '除草劑類',
        standard: '未檢出',
        result: '未檢出',
        status: 'pass',
      },
    ],
  },
]

const CertificationCard = ({
  cert,
  index,
}: {
  cert: Certification
  index: number
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="rounded-2xl bg-white p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            <cert.icon className="h-8 w-8 text-neutral-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-950">
              {cert.name}
            </h3>
            <p className="text-sm text-neutral-600">{cert.description}</p>
          </div>
        </div>
        <div className="text-right text-xs text-neutral-500">
          <div>有效期限</div>
          <div className="font-medium">{cert.validUntil}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-1 text-xs text-neutral-500">認證編號</div>
        <div className="rounded bg-neutral-100 px-2 py-1 font-mono text-sm text-neutral-700">
          {cert.certNumber}
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left text-sm text-blue-600 transition-colors hover:text-blue-800"
      >
        {isExpanded ? '收起詳細內容' : '查看詳細內容'}
        <motion.span
          className="ml-1 inline-block"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="mt-4 border-t border-neutral-200 pt-4">
          <h4 className="mb-3 font-medium text-neutral-950">認證範圍</h4>
          <ul className="space-y-2">
            {cert.details.map((detail, idx) => (
              <li
                key={idx}
                className="flex items-center text-sm text-neutral-600"
              >
                <svg
                  className="mr-2 h-4 w-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}

const TestReportCard = ({
  report,
  index,
}: {
  report: TestReport
  index: number
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="rounded-2xl bg-white p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-950">
            {report.testType}
          </h3>
          <p className="text-sm text-neutral-600">
            檢測日期: {report.testDate}
          </p>
        </div>
        <div
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            report.result === 'excellent'
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {report.result === 'excellent' ? '優異' : '合格'}
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left text-sm text-blue-600 transition-colors hover:text-blue-800"
      >
        {isExpanded ? '收起檢測詳情' : '查看檢測詳情'}
        <motion.span
          className="ml-1 inline-block"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="mt-4 border-t border-neutral-200 pt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="py-2 text-left text-neutral-950">檢測項目</th>
                  <th className="py-2 text-left text-neutral-950">標準值</th>
                  <th className="py-2 text-left text-neutral-950">檢測結果</th>
                  <th className="py-2 text-left text-neutral-950">狀態</th>
                </tr>
              </thead>
              <tbody>
                {report.details.map((detail, idx) => (
                  <tr key={idx} className="border-b border-neutral-100">
                    <td className="py-2 text-neutral-700">
                      {detail.parameter}
                    </td>
                    <td className="py-2 text-neutral-600">{detail.standard}</td>
                    <td className="py-2 font-medium text-neutral-950">
                      {detail.result}
                    </td>
                    <td className="py-2">
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          detail.status === 'excellent'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {detail.status === 'excellent' ? '優異' : '合格'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function SafetyStandards() {
  const [activeTab, setActiveTab] = useState<'certifications' | 'reports'>(
    'certifications',
  )

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="安全與標準"
        title="嚴格把關，品質保證"
        className="mb-16"
      >
        <p>
          我們的產品通過多項國際認證和嚴格檢驗，每批產品都有完整的檢驗報告，
          確保您的毛孩享用到最安全、最優質的鮮食便當。
        </p>
      </SectionIntro>

      {/* 標籤切換 */}
      <FadeIn className="mb-8">
        <div className="flex justify-center">
          <div className="rounded-lg bg-neutral-100 p-1">
            <button
              onClick={() => setActiveTab('certifications')}
              className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                activeTab === 'certifications'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              認證標章
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                activeTab === 'reports'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              檢驗報告
            </button>
          </div>
        </div>
      </FadeIn>

      {/* 認證標章 */}
      {activeTab === 'certifications' && (
        <FadeInStagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <FadeIn key={cert.name}>
              <CertificationCard cert={cert} index={index} />
            </FadeIn>
          ))}
        </FadeInStagger>
      )}

      {/* 檢驗報告 */}
      {activeTab === 'reports' && (
        <FadeInStagger className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {testReports.map((report, index) => (
            <FadeIn key={report.testType}>
              <TestReportCard report={report} index={index} />
            </FadeIn>
          ))}
        </FadeInStagger>
      )}

      {/* 品質保證承諾 */}
      <FadeIn className="mt-16">
        <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
          <h3 className="mb-6 text-center text-xl font-semibold text-neutral-950">
            我們的品質承諾
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="mb-2 font-semibold text-neutral-950">100% 檢驗</h4>
              <p className="text-sm text-neutral-600">
                每批產品都經過完整的安全檢驗， 絕不妥協品質標準
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h4 className="mb-2 font-semibold text-neutral-950">全程追溯</h4>
              <p className="text-sm text-neutral-600">
                從食材採購到成品配送， 每個環節都可完整追溯
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <svg
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h4 className="mb-2 font-semibold text-neutral-950">專業監督</h4>
              <p className="text-sm text-neutral-600">
                獸醫師和營養師全程監督， 確保產品安全有效
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <svg
                  className="h-8 w-8 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="mb-2 font-semibold text-neutral-950">快速回應</h4>
              <p className="text-sm text-neutral-600">
                24小時客服支援， 任何問題立即處理
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="mb-4 text-sm text-neutral-600">
              如需查看完整檢驗報告或認證文件，請聯繫我們的客服團隊
            </p>
            <button className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700">
              下載檢驗報告
            </button>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
