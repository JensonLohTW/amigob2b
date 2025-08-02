'use client'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function ComparisonHero() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="max-w-3xl">
        <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
          看得見的真食材，
          <span className="text-neutral-600">吃得出的健康差距</span>
        </h1>
        <p className="mt-6 text-xl text-neutral-600">
          透過科學數據與專業分析，深入了解寵物鮮食便當與傳統乾糧的本質差異。
          為您的毛孩做出最明智的營養選擇。
        </p>
      </FadeIn>

      {/* 視覺對比區塊 */}
      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 鮮食便當 */}
        <motion.div
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 to-emerald-100 p-8"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              AMIGO 鮮食便當
            </div>
            <h3 className="text-2xl font-bold text-neutral-950 mb-4">
              天然鮮食，營養看得見
            </h3>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                人食等級新鮮食材
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                低溫烹調保留營養
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                無防腐劑添加物
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                蛋白質消化率 90%+
              </li>
            </ul>
          </div>
          <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-green-200 opacity-20"></div>
        </motion.div>

        {/* 傳統乾糧 */}
        <motion.div
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 to-amber-100 p-8"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-800">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              傳統乾糧
            </div>
            <h3 className="text-2xl font-bold text-neutral-950 mb-4">
              高溫加工，營養流失
            </h3>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                高溫擠壓製程
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                營養素變性流失
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                防腐劑與添加物
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                蛋白質消化率 75-80%
              </li>
            </ul>
          </div>
          <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-orange-200 opacity-20"></div>
        </motion.div>
      </div>

      {/* 核心數據展示 */}
      <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-3xl font-bold text-green-600">90%+</div>
          <div className="text-sm text-neutral-600">蛋白質消化率</div>
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-3xl font-bold text-blue-600">0</div>
          <div className="text-sm text-neutral-600">人工防腐劑</div>
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-3xl font-bold text-purple-600">30%</div>
          <div className="text-sm text-neutral-600">皮膚炎症減少</div>
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-3xl font-bold text-orange-600">40%</div>
          <div className="text-sm text-neutral-600">糞便臭味降低</div>
        </motion.div>
      </div>
    </Container>
  )
}
