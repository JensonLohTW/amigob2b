'use client'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Home,
  BarChart3,
  FlaskConical,
  TrendingUp,
  Salad,
  Shield,
  DollarSign,
  HelpCircle,
  ShoppingCart,
} from 'lucide-react'

const navigationItems = [
  { id: 'hero', label: '首頁概覽', icon: Home },
  { id: 'comparison-table', label: '快速對比', icon: BarChart3 },
  { id: 'nutrition-science', label: '營養科學', icon: FlaskConical },
  { id: 'health-cases', label: '健康案例', icon: TrendingUp },
  { id: 'ingredients', label: '成分分析', icon: Salad },
  { id: 'safety', label: '安全認證', icon: Shield },
  { id: 'cost', label: '成本分析', icon: DollarSign },
  { id: 'faq', label: '常見問題', icon: HelpCircle },
  { id: 'cta', label: '立即選購', icon: ShoppingCart },
]

const QuickNavigation = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [isExpanded, setIsExpanded] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // 計算滾動偏移量，考慮固定導航欄的高度
      const headerHeight = 80 // 假設導航欄高度為 80px
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      // 延遲設置活躍狀態，等待滾動完成
      setTimeout(() => {
        setActiveSection(sectionId)
      }, 100)
    }
  }

  // 使用 Intersection Observer 來監聽當前可見的區塊
  useEffect(() => {
    const observerOptions = {
      root: null,
      // 調整 rootMargin 以更精確地檢測區塊
      // 上方 -80px 考慮固定導航欄，下方 -50% 確保區塊主要部分可見時才觸發
      rootMargin: '-80px 0px -50% 0px',
      threshold: [0.1, 0.5], // 多個閾值，提高檢測精度
    }

    let debounceTimer: NodeJS.Timeout

    const observer = new IntersectionObserver((entries) => {
      // 清除之前的防抖計時器
      clearTimeout(debounceTimer)

      // 使用防抖機制，避免快速滾動時的誤觸發
      debounceTimer = setTimeout(() => {
        // 找到最大交集比例的元素
        let maxIntersectionRatio = 0
        let mostVisibleEntry: IntersectionObserverEntry | null = null

        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > maxIntersectionRatio
          ) {
            maxIntersectionRatio = entry.intersectionRatio
            mostVisibleEntry = entry
          }
        })

        // 如果有可見的元素，設置為活躍狀態
        if (mostVisibleEntry) {
          setActiveSection(mostVisibleEntry.target.id)
        }
      }, 100) // 100ms 防抖延遲
    }, observerOptions)

    // 觀察所有導航項目對應的元素
    navigationItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      clearTimeout(debounceTimer)
      observer.disconnect()
    }
  }, [])

  // 動畫變體定義
  const containerVariants = {
    collapsed: {
      width: 56,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    expanded: {
      width: 200,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div
      className="fixed top-1/2 right-6 z-50 hidden -translate-y-1/2 transform lg:block"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
    >
      <motion.div
        className="overflow-hidden rounded-2xl border border-neutral-200/60 bg-white/95 shadow-xl backdrop-blur-sm"
        variants={containerVariants}
        animate={isExpanded ? 'expanded' : 'collapsed'}
        initial="collapsed"
      >
        <div className="p-2">
          <div className="space-y-1">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 1.2 + index * 0.05,
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  scale: 1.02,
                  x: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <motion.span
                  className="ml-3 overflow-hidden whitespace-nowrap"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {item.label}
                </motion.span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ComparisonHero() {
  return (
    <>
      <QuickNavigation />
      <Container className="mt-32 sm:mt-40 lg:mt-48" id="hero">
        <FadeIn className="mx-auto max-w-4xl text-center">
          <motion.h1
            className="font-display text-5xl font-medium tracking-tight [text-wrap:balance] text-neutral-950 sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            看得見的真食材，
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              吃得出的健康差距
            </span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-neutral-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            透過科學數據與專業分析，深入了解寵物鮮食便當與傳統乾糧的本質差異。
            為您的毛孩做出最明智的營養選擇。
          </motion.p>
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
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                AMIGO 鮮食便當
              </div>
              <h3 className="mb-4 text-2xl font-bold text-neutral-950">
                天然鮮食，營養看得見
              </h3>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  人食等級新鮮食材
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  低溫烹調保留營養
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  無防腐劑添加物
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  蛋白質消化率 90%+
                </li>
              </ul>
            </div>
            <div className="absolute -right-4 -bottom-4 h-32 w-32 rounded-full bg-green-200 opacity-20"></div>
          </motion.div>

          {/* 傳統乾糧 */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 to-amber-100 p-8"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-800">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                傳統乾糧
              </div>
              <h3 className="mb-4 text-2xl font-bold text-neutral-950">
                高溫加工，營養流失
              </h3>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  高溫擠壓製程
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  營養素變性流失
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  防腐劑與添加物
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  蛋白質消化率 75-80%
                </li>
              </ul>
            </div>
            <div className="absolute -right-4 -bottom-4 h-32 w-32 rounded-full bg-orange-200 opacity-20"></div>
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
    </>
  )
}
