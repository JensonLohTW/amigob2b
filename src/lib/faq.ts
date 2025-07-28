// FAQ 數據結構和類型定義

export interface FAQItem {
  id: string
  question: string
  answer: string
  category: FAQCategory
  tags: string[]
  priority: number // 用於排序，數字越小優先級越高
}

export type FAQCategory = 'investment' | 'technical' | 'operation' | 'support'

export interface FAQCategoryInfo {
  id: FAQCategory
  name: string
  description: string
  icon: string
}

// FAQ 分類資訊
export const faqCategories: FAQCategoryInfo[] = [
  {
    id: 'investment',
    name: '投資相關',
    description: '投資金額、回報率、風險評估等問題',
    icon: '💰'
  },
  {
    id: 'technical',
    name: '技術規格',
    description: '機器規格、技術支援、維護保養等問題',
    icon: '🔧'
  },
  {
    id: 'operation',
    name: '營運管理',
    description: '日常營運、庫存管理、銷售策略等問題',
    icon: '📊'
  },
  {
    id: 'support',
    name: '客戶支援',
    description: '售後服務、培訓課程、問題解決等問題',
    icon: '🎯'
  }
]

// FAQ 數據
export const faqData: FAQItem[] = [
  // 投資相關
  {
    id: 'investment-001',
    question: '加盟 AMIGO 自動販賣機需要多少初始投資？',
    answer: '初始投資包含機器設備費用約 45-50 萬元、保證金 5 萬元、首批商品費用約 3-5 萬元，總計約 53-60 萬元。我們提供多種付款方案，包括分期付款選項，讓您更輕鬆開始事業。',
    category: 'investment',
    tags: ['初始投資', '費用', '分期付款'],
    priority: 1
  },
  {
    id: 'investment-002',
    question: '投資回報期多長？每月預期收益如何？',
    answer: '根據我們的統計數據，平均回本期為 8-10 個月。單台機器月營收約 12-15 萬元，扣除成本後月毛利約 7-9 萬元。實際收益會因地點、管理方式等因素而有所差異。',
    category: 'investment',
    tags: ['回報期', '收益', '毛利'],
    priority: 2
  },
  {
    id: 'investment-003',
    question: '分潤機制是如何計算的？',
    answer: '我們採用透明的分潤機制：加盟主獲得 70% 的毛利，AMIGO 總部獲得 30%。毛利計算方式為銷售額扣除商品成本，不包含租金、水電等營運成本。每月結算一次，款項於次月 10 日前匯入您的指定帳戶。',
    category: 'investment',
    tags: ['分潤', '計算方式', '結算'],
    priority: 3
  },
  {
    id: 'investment-004',
    question: '有哪些風險需要考慮？',
    answer: '主要風險包括：1) 地點選擇風險 - 人流量不足可能影響銷售；2) 競爭風險 - 周邊同類型商店的競爭；3) 季節性風險 - 某些時期銷量可能下降。我們提供專業的選址評估和風險管控建議，並有完整的保險機制。',
    category: 'investment',
    tags: ['風險評估', '選址', '保險'],
    priority: 4
  },

  // 技術規格
  {
    id: 'technical-001',
    question: '自動販賣機的技術規格如何？',
    answer: '我們的智能販賣機配備：1) 雙溫控系統（冷藏 2-8°C，冷凍 -18°C）；2) 24 小時監控系統；3) 行動支付功能（LINE Pay、街口支付等）；4) 遠端管理系統；5) 自動庫存警示功能。機器尺寸為 180cm(H) x 120cm(W) x 80cm(D)。',
    category: 'technical',
    tags: ['規格', '溫控', '支付', '監控'],
    priority: 1
  },
  {
    id: 'technical-002',
    question: '機器故障時如何處理？維修服務如何？',
    answer: '我們提供 24 小時技術支援熱線。一般故障可透過遠端診斷解決，需要現場維修時，我們承諾在 4 小時內到達現場（大台北地區）。保固期內免費維修，保固期後僅收取材料費。',
    category: 'technical',
    tags: ['故障處理', '維修', '保固', '技術支援'],
    priority: 2
  },
  {
    id: 'technical-003',
    question: '機器需要什麼樣的安裝環境？',
    answer: '安裝需求：1) 平整地面，承重能力 > 500kg；2) 標準 110V 電源插座；3) 網路連線（WiFi 或有線）；4) 周圍至少 50cm 散熱空間；5) 室內環境，避免陽光直射。我們提供免費現場評估服務。',
    category: 'technical',
    tags: ['安裝環境', '電源', '網路', '空間需求'],
    priority: 3
  },

  // 營運管理
  {
    id: 'operation-001',
    question: '如何管理庫存？多久需要補貨一次？',
    answer: '透過我們的智能管理系統，您可以即時查看庫存狀況。系統會在庫存低於設定值時自動發送通知。一般來說，熱銷商品建議每週補貨 2-3 次，其他商品每週補貨 1 次。我們也提供自動補貨服務。',
    category: 'operation',
    tags: ['庫存管理', '補貨', '智能系統'],
    priority: 1
  },
  {
    id: 'operation-002',
    question: '商品由誰提供？可以自己選擇商品嗎？',
    answer: '商品由 AMIGO 總部統一供應，確保品質穩定。我們提供 50+ 種寵物鮮食商品，您可以根據當地市場需求選擇適合的商品組合。新商品會定期推出，加盟主可優先試賣。',
    category: 'operation',
    tags: ['商品供應', '選擇', '品質控制'],
    priority: 2
  },
  {
    id: 'operation-003',
    question: '需要親自管理嗎？可以委託他人嗎？',
    answer: '我們的系統設計為無人值守營運，但建議每天檢查一次機器狀況。您可以委託可信任的人員協助管理，我們提供完整的操作手冊和培訓課程。遠端監控功能讓您隨時掌握營運狀況。',
    category: 'operation',
    tags: ['無人值守', '委託管理', '培訓'],
    priority: 3
  },

  // 客戶支援
  {
    id: 'support-001',
    question: '提供哪些培訓課程？',
    answer: '我們提供完整的培訓體系：1) 線上基礎課程（2 小時）；2) 實機操作培訓（4 小時）；3) 營運管理進階課程（6 小時）；4) 定期的營運優化工作坊。所有課程免費提供，並頒發結業證書。',
    category: 'support',
    tags: ['培訓課程', '線上課程', '實機操作'],
    priority: 1
  },
  {
    id: 'support-002',
    question: '客服支援時間和聯絡方式？',
    answer: '客服支援時間：週一至週日 8:00-22:00。聯絡方式：1) 24 小時客服熱線：0800-123-456；2) LINE 官方帳號即時客服；3) Email：support@amigo.com.tw；4) 緊急故障專線：0911-123-456（24 小時）。',
    category: 'support',
    tags: ['客服時間', '聯絡方式', '緊急支援'],
    priority: 2
  },
  {
    id: 'support-003',
    question: '有定期的營運輔導嗎？',
    answer: '是的，我們提供：1) 每月營運報告分析；2) 季度營運檢討會議；3) 年度加盟主大會；4) 不定期的營運優化建議；5) 新商品推廣支援。專業的營運顧問團隊會持續協助您提升營運績效。',
    category: 'support',
    tags: ['營運輔導', '報告分析', '優化建議'],
    priority: 3
  }
]

// 搜尋 FAQ 的工具函數
export function searchFAQs(query: string, category?: FAQCategory): FAQItem[] {
  const normalizedQuery = query.toLowerCase().trim()
  
  if (!normalizedQuery && !category) {
    return faqData.sort((a, b) => a.priority - b.priority)
  }

  let filteredFAQs = faqData

  // 按分類篩選
  if (category) {
    filteredFAQs = filteredFAQs.filter(faq => faq.category === category)
  }

  // 按關鍵字搜尋
  if (normalizedQuery) {
    filteredFAQs = filteredFAQs.filter(faq => 
      faq.question.toLowerCase().includes(normalizedQuery) ||
      faq.answer.toLowerCase().includes(normalizedQuery) ||
      faq.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
    )
  }

  return filteredFAQs.sort((a, b) => a.priority - b.priority)
}

// 獲取分類統計
export function getCategoryStats(): Record<FAQCategory, number> {
  const stats: Record<FAQCategory, number> = {
    investment: 0,
    technical: 0,
    operation: 0,
    support: 0
  }

  faqData.forEach(faq => {
    stats[faq.category]++
  })

  return stats
}

// 獲取相關問題推薦
export function getRelatedFAQs(currentFAQId: string, limit: number = 3): FAQItem[] {
  const currentFAQ = faqData.find(faq => faq.id === currentFAQId)
  if (!currentFAQ) return []

  // 優先推薦同分類的其他問題
  const sameCategoryFAQs = faqData
    .filter(faq => faq.id !== currentFAQId && faq.category === currentFAQ.category)
    .sort((a, b) => a.priority - b.priority)

  // 如果同分類問題不足，補充其他分類的問題
  if (sameCategoryFAQs.length < limit) {
    const otherFAQs = faqData
      .filter(faq => faq.id !== currentFAQId && faq.category !== currentFAQ.category)
      .sort((a, b) => a.priority - b.priority)
    
    return [...sameCategoryFAQs, ...otherFAQs].slice(0, limit)
  }

  return sameCategoryFAQs.slice(0, limit)
}
