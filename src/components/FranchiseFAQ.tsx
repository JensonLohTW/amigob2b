'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/FadeIn'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    id: 'investment',
    question: '加盟需要多少初始投資？',
    answer: '初始投資包含機台費用約40-60萬元（依機型而定）、保證金10萬元、首批商品費用約5萬元。總投資金額約55-75萬元。我們提供分期付款方案，降低初期資金壓力。',
    category: '投資成本'
  },
  {
    id: 'location',
    question: '對設置地點有什麼要求？',
    answer: '建議選擇人流量大的地點，如社區入口、寵物醫院附近、寵物用品店周邊等。需要2-3坪空間，有電源和網路連接。我們建議機台間距至少500公尺，確保市場不重疊。',
    category: '地點選擇'
  },
  {
    id: 'profit',
    question: '實際獲利情況如何？',
    answer: '根據我們現有加盟主數據，平均日銷量40-60件，月毛利約6-9萬元。扣除租金、水電等成本後，月淨利約4-7萬元。投資回本時間通常在8-12個月內。',
    category: '獲利分析'
  },
  {
    id: 'support',
    question: '公司提供哪些支援服務？',
    answer: '我們提供完整支援：1) 選址評估和建議 2) 機台安裝和調試 3) 營運培訓 4) 商品配送和補貨 5) 機台維護和維修 6) 24小時客服支援 7) 營運數據分析和建議。',
    category: '支援服務'
  },
  {
    id: 'maintenance',
    question: '機台維護和故障處理如何進行？',
    answer: '機台享有2年保固，我們提供定期維護服務。故障時可透過手機APP或客服專線報修，一般故障4小時內到場處理，重大故障24小時內解決。維護期間的損失我們會提供補償。',
    category: '維護服務'
  },
  {
    id: 'products',
    question: '商品供應和定價如何安排？',
    answer: '所有商品由公司統一供應，確保品質穩定。商品定價由公司制定，加盟主享有30%分潤。我們會根據當地市場情況和季節性需求調整商品組合，最大化銷售效益。',
    category: '商品供應'
  },
  {
    id: 'contract',
    question: '合約期間和續約條件？',
    answer: '初始合約期間為3年，到期可優先續約。續約時機台設備免費升級，只需支付少額續約費用。合約期間內如需轉讓，需經公司同意並支付轉讓手續費。',
    category: '合約條件'
  },
  {
    id: 'training',
    question: '需要什麼樣的經營經驗？',
    answer: '不需要特殊經營經驗，我們提供完整的教育訓練。包含：機台操作、商品知識、客戶服務、問題處理等。訓練期間約3-5天，通過考核後即可正式營運。',
    category: '經營要求'
  }
]

const categories = ['全部', '投資成本', '地點選擇', '獲利分析', '支援服務', '維護服務', '商品供應', '合約條件', '經營要求']

export function FranchiseFAQ() {
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [openItems, setOpenItems] = useState<string[]>([])

  const filteredFAQ = selectedCategory === '全部' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory)

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-neutral-950">常見問題解答</h2>
          <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
            以下是加盟主最常詢問的問題，如有其他疑問歡迎聯繫我們
          </p>
        </div>

        {/* 分類篩選 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-neutral-950 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ列表 */}
        <div className="space-y-4">
          {filteredFAQ.map((item) => (
            <div key={item.id} className="border border-neutral-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-neutral-100 text-neutral-600 rounded">
                    {item.category}
                  </span>
                  <span className="font-medium text-neutral-950">{item.question}</span>
                </div>
                <svg 
                  className={`h-5 w-5 text-neutral-400 transition-transform ${
                    openItems.includes(item.id) ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openItems.includes(item.id) && (
                <div className="px-6 pb-4">
                  <div className="pt-2 border-t border-neutral-100">
                    <p className="text-neutral-600 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 聯繫資訊 */}
        <div className="mt-12 text-center p-6 bg-neutral-50 rounded-2xl">
          <h3 className="font-semibold text-neutral-950 mb-2">還有其他問題？</h3>
          <p className="text-neutral-600 mb-4">我們的專業團隊隨時為您解答</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0800-123-456"
              className="inline-flex items-center justify-center px-6 py-2 bg-neutral-950 text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              電話諮詢
            </a>
            <a
              href="/apply"
              className="inline-flex items-center justify-center px-6 py-2 bg-white text-neutral-950 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.126-.26c-1.046-.29-1.657-.608-2.387-1.085L7 21l1.395-3.72C7.512 15.042 7 13.574 7 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
              </svg>
              線上諮詢
            </a>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
