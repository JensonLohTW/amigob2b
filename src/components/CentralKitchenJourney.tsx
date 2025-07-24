'use client'

import { useState } from 'react'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { motion, AnimatePresence } from 'framer-motion'

interface JourneyStep {
  id: string
  title: string
  subtitle: string
  description: string
  details: string[]
  icon: React.ReactNode
  color: string
  image?: string
}

const journeySteps: JourneyStep[] = [
  {
    id: 'sourcing',
    title: '嚴選原料採購',
    subtitle: '從源頭把關品質',
    description: '我們與台灣在地優質農場合作，嚴選新鮮食材，確保每一份原料都符合人食等級標準。',
    details: [
      '與認證有機農場直接合作',
      '每批原料都有完整溯源記錄',
      '定期實地訪查供應商',
      '嚴格的農藥殘留檢測',
      '新鮮度即時監控系統'
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'kitchen',
    title: '中央廚房製作',
    subtitle: '專業設備精工細作',
    description: '採用國際級中央廚房設備，在無塵環境中進行食材處理和烹調，確保每一份餐點的品質一致性。',
    details: [
      'ISO 22000 認證廚房',
      '無塵室等級製作環境',
      '低溫烹調保留營養',
      '專業營養師現場監督',
      '自動化包裝減少污染'
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'quality',
    title: '品質檢驗把關',
    subtitle: '多重檢測確保安全',
    description: '每批產品都經過嚴格的品質檢驗，包括營養成分分析、微生物檢測和重金屬檢測，確保食品安全。',
    details: [
      '營養成分精確分析',
      '微生物安全檢測',
      '重金屬含量檢驗',
      '過敏原標示確認',
      '第三方實驗室認證'
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'delivery',
    title: '新鮮冷鏈配送',
    subtitle: '保鮮到府的最後一哩',
    description: '採用專業冷鏈物流系統，從出廠到販賣機全程溫控，確保產品新鮮度和營養價值不流失。',
    details: [
      '全程冷鏈溫控運輸',
      '24小時內送達販賣機',
      'GPS 即時追蹤配送',
      '溫度記錄完整保存',
      '自動補貨智能系統'
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-orange-500 to-red-600'
  }
]

export function CentralKitchenJourney() {
  const [activeStep, setActiveStep] = useState<string | null>(null)

  return (
    <section className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="中央廚房探索"
        title="從田野到毛孩餐桌的品質之旅"
      >
        <p>
          跟隨我們的腳步，探索 AMIGO 從原料採購到成品配送的完整製作流程。
          每一個環節都體現我們對品質的堅持和對毛孩健康的承諾。
        </p>
      </SectionIntro>

      <Container className="mt-16">
        {/* 流程時間軸 */}
        <FadeIn>
          <div className="relative">
            {/* 連接線 */}
            <div className="absolute top-20 left-8 right-8 h-0.5 bg-gradient-to-r from-green-500 via-blue-500 via-purple-500 to-orange-500 hidden lg:block" />
            
            {/* 步驟卡片 */}
            <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {journeySteps.map((step, index) => (
                <FadeIn key={step.id}>
                  <motion.div
                    className="relative cursor-pointer"
                    onHoverStart={() => setActiveStep(step.id)}
                    onHoverEnd={() => setActiveStep(null)}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* 步驟編號 */}
                    <div className="relative z-10 mb-6">
                      <motion.div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg mx-auto`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {step.icon}
                      </motion.div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-neutral-950 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>

                    {/* 卡片內容 */}
                    <motion.div
                      className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 h-full"
                      whileHover={{ 
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        scale: 1.02
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg font-semibold text-neutral-950 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-3 font-medium">
                        {step.subtitle}
                      </p>
                      <p className="text-sm text-neutral-600 mb-4">
                        {step.description}
                      </p>
                      
                      {/* 詳細特點 */}
                      <AnimatePresence>
                        {activeStep === step.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-neutral-200 pt-4"
                          >
                            <h4 className="text-sm font-medium text-neutral-950 mb-2">關鍵特點：</h4>
                            <ul className="space-y-1">
                              {step.details.map((detail, detailIndex) => (
                                <motion.li
                                  key={detailIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: detailIndex * 0.1 }}
                                  className="text-xs text-neutral-600 flex items-start"
                                >
                                  <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                                  {detail}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                </FadeIn>
              ))}
            </FadeInStagger>
          </div>
        </FadeIn>

        {/* 品質保證說明 */}
        <FadeIn>
          <div className="mt-20 rounded-3xl bg-gradient-to-br from-neutral-50 to-neutral-100 p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-neutral-950 mb-4">
                我們的品質承諾
              </h3>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                從農場到餐桌，每一個環節都體現我們對品質的堅持。
                我們不只是製作寵物食品，更是在守護每一個毛孩的健康。
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <motion.div
                className="text-center p-6 bg-white rounded-xl shadow-sm"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-neutral-950 mb-2">100% 可追溯</h4>
                <p className="text-sm text-neutral-600">
                  每一份產品都有完整的生產履歷，從原料來源到製作過程都可追溯查詢。
                </p>
              </motion.div>

              <motion.div
                className="text-center p-6 bg-white rounded-xl shadow-sm"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-neutral-950 mb-2">安全認證</h4>
                <p className="text-sm text-neutral-600">
                  通過 HACCP、ISO 22000 等國際食品安全認證，確保製程安全無虞。
                </p>
              </motion.div>

              <motion.div
                className="text-center p-6 bg-white rounded-xl shadow-sm"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-neutral-950 mb-2">新鮮保證</h4>
                <p className="text-sm text-neutral-600">
                  每日新鮮製作，24小時內配送到販賣機，確保毛孩享用最新鮮的美味。
                </p>
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
