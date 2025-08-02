'use client'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  FileText,
  RotateCcw,
  Snowflake,
  Salad,
  DollarSign,
  Shield,
  Search,
  MessageCircle,
  Phone,
  User,
} from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'transition' | 'storage' | 'nutrition' | 'cost' | 'safety'
  tags: string[]
}

const faqData: FAQItem[] = [
  {
    id: 'transition-1',
    question: '如何從乾糧轉換到鮮食便當？',
    answer:
      '建議採用漸進式轉食法，第1-3天：75%舊食物+25%鮮食；第4-6天：50%舊食物+50%鮮食；第7-9天：25%舊食物+75%鮮食；第10天開始：100%鮮食。整個過程約需10-14天，讓寵物的消化系統逐步適應。如果出現軟便或腹瀉，可延長轉食時間。',
    category: 'transition',
    tags: ['轉食', '適應期', '消化'],
  },
  {
    id: 'transition-2',
    question: '轉食期間寵物不願意吃怎麼辦？',
    answer:
      '這是正常現象，可以嘗試：1) 將鮮食稍微加溫至體溫溫度；2) 混合少量寵物喜歡的食物；3) 減少零食給予，增加飢餓感；4) 固定餵食時間，15分鐘後收走食物；5) 可以用手餵食增加互動。通常3-7天內寵物就會接受新食物。',
    category: 'transition',
    tags: ['挑食', '適口性', '餵食技巧'],
  },
  {
    id: 'storage-1',
    question: '鮮食便當如何正確保存？',
    answer:
      '未開封的鮮食便當應保存在0-4°C的冷藏環境中，可保存7天。開封後請在24小時內食用完畢。如需長期保存，可放入冷凍庫保存30天，食用前請提前12小時移至冷藏室解凍，切勿使用微波爐或熱水解凍。',
    category: 'storage',
    tags: ['保存', '冷藏', '解凍'],
  },
  {
    id: 'storage-2',
    question: '出門旅行時如何攜帶鮮食？',
    answer:
      '短途旅行（1-2天）可使用保冷袋配合冰袋攜帶。長途旅行建議：1) 攜帶足夠的冷凍鮮食；2) 預訂有冰箱的住宿；3) 或暫時使用高品質乾糧作為替代。我們也提供旅行裝鮮食，包裝更適合攜帶。',
    category: 'storage',
    tags: ['旅行', '攜帶', '保冷'],
  },
  {
    id: 'nutrition-1',
    question: '鮮食便當的營養是否均衡？',
    answer:
      '我們的鮮食便當由專業獸醫師和動物營養師共同設計，完全符合AAFCO（美國飼料管制協會）和FEDIAF（歐洲寵物食品工業聯合會）的營養標準。每份便當都經過精密的營養計算，確保蛋白質、脂肪、碳水化合物、維生素和礦物質的完美平衡。',
    category: 'nutrition',
    tags: ['營養均衡', 'AAFCO', '獸醫師'],
  },
  {
    id: 'nutrition-2',
    question: '幼犬幼貓可以吃鮮食便當嗎？',
    answer:
      '當然可以！我們有專門為幼齡寵物設計的鮮食便當，含有更高的蛋白質和DHA，支持大腦發育和免疫系統建立。建議8週齡以上的幼犬幼貓開始食用，餵食量需根據體重和成長階段調整。我們的營養師可提供個人化的餵食建議。',
    category: 'nutrition',
    tags: ['幼犬', '幼貓', 'DHA', '成長'],
  },
  {
    id: 'cost-1',
    question: '鮮食便當比乾糧貴很多，值得嗎？',
    answer:
      '雖然鮮食便當的單價較高，但考量長期健康效益是非常值得的。根據我們的客戶追蹤，使用鮮食的寵物平均減少30%的獸醫就診次數，節省的醫療費用往往超過食物成本差異。更重要的是，健康的寵物能陪伴您更長時間，這是無價的。',
    category: 'cost',
    tags: ['成本效益', '健康投資', '醫療費用'],
  },
  {
    id: 'cost-2',
    question: '有沒有優惠方案或折扣？',
    answer:
      '我們提供多種優惠方案：1) 首次購買享8折優惠；2) 訂閱制配送享5-12%折扣；3) 大包裝購買更優惠；4) 推薦朋友雙方都享優惠；5) 會員積分可兌換免費餐點。長期訂購客戶還可享受專屬客服和營養諮詢服務。',
    category: 'cost',
    tags: ['優惠', '訂閱', '會員', '推薦'],
  },
  {
    id: 'safety-1',
    question: '鮮食便當的安全性如何保證？',
    answer:
      '我們的產品通過HACCP、ISO22000等多項國際認證，每批產品都進行微生物、重金屬、農藥殘留等檢測。生產過程採用人食等級標準，從原料採購到成品配送全程可追溯。我們的工廠定期接受第三方稽核，確保食品安全無虞。',
    category: 'safety',
    tags: ['HACCP', 'ISO22000', '檢測', '追溯'],
  },
  {
    id: 'safety-2',
    question: '如果寵物吃了有不良反應怎麼辦？',
    answer:
      '雖然極少發生，但如果出現不良反應，請立即停止餵食並聯繫獸醫師。同時請保留剩餘產品並聯繫我們的客服團隊，我們會立即啟動調查程序，並承擔相關醫療費用。我們有完整的產品責任保險，保障客戶權益。',
    category: 'safety',
    tags: ['不良反應', '客服', '保險', '醫療'],
  },
]

const categories = [
  { id: 'all', name: '全部問題', icon: FileText },
  { id: 'transition', name: '轉食相關', icon: RotateCcw },
  { id: 'storage', name: '保存運輸', icon: Snowflake },
  { id: 'nutrition', name: '營養成分', icon: Salad },
  { id: 'cost', name: '費用優惠', icon: DollarSign },
  { id: 'safety', name: '安全品質', icon: Shield },
]

const FAQCard = ({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQItem
  isOpen: boolean
  onToggle: () => void
}) => {
  return (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white shadow-lg"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={onToggle}
        className="w-full p-6 text-left transition-colors hover:bg-neutral-50"
      >
        <div className="flex items-center justify-between">
          <h3 className="pr-4 text-lg font-semibold text-neutral-950">
            {faq.question}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <svg
              className="h-5 w-5 text-neutral-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {faq.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-neutral-200 px-6 pb-6">
              <div className="pt-4 leading-relaxed text-neutral-700">
                {faq.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const SearchBar = ({
  searchTerm,
  onSearchChange,
}: {
  searchTerm: string
  onSearchChange: (term: string) => void
}) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-5 w-5 text-neutral-400" />
      </div>
      <input
        type="text"
        placeholder="搜尋常見問題..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-lg border border-neutral-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export function ComparisonFAQ() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // 過濾FAQ
  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch =
      searchTerm === '' ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      )

    return matchesCategory && matchesSearch
  })

  const handleFAQToggle = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId)
  }

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro eyebrow="常見問題" title="解答您的疑慮" className="mb-16">
        <p>
          整理了客戶最常詢問的問題，從轉食方法到保存技巧，
          幫助您更了解鮮食便當的使用方式和注意事項。
        </p>
      </SectionIntro>

      {/* 搜尋欄 */}
      <FadeIn className="mb-8">
        <div className="mx-auto max-w-md">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
      </FadeIn>

      {/* 分類篩選 */}
      <FadeIn className="mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-neutral-950 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              <category.icon className="mr-2 h-4 w-4" />
              {category.name}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* FAQ列表 */}
      <FadeInStagger className="space-y-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq) => (
            <FadeIn key={faq.id}>
              <FAQCard
                faq={faq}
                isOpen={openFAQ === faq.id}
                onToggle={() => handleFAQToggle(faq.id)}
              />
            </FadeIn>
          ))
        ) : (
          <FadeIn>
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-xl font-semibold text-neutral-950">
                找不到相關問題
              </h3>
              <p className="mb-6 text-neutral-600">
                請嘗試其他關鍵字或選擇不同的分類
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
              >
                重置搜尋
              </button>
            </div>
          </FadeIn>
        )}
      </FadeInStagger>

      {/* 聯繫我們 */}
      <FadeIn className="mt-16">
        <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8 text-center">
          <h3 className="mb-4 text-xl font-semibold text-neutral-950">
            還有其他問題？
          </h3>
          <p className="mb-6 text-neutral-600">
            我們的專業客服團隊隨時為您解答，也可以預約營養師一對一諮詢
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700">
              線上客服諮詢
            </button>
            <button className="rounded-lg border border-blue-600 bg-white px-6 py-3 text-blue-600 transition-colors hover:bg-blue-50">
              預約營養師諮詢
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="mb-1 font-medium text-neutral-950">即時客服</h4>
              <p className="text-sm text-neutral-600">週一至週日 9:00-21:00</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="mb-1 font-medium text-neutral-950">電話諮詢</h4>
              <p className="text-sm text-neutral-600">0800-123-456</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="mb-1 font-medium text-neutral-950">營養師諮詢</h4>
              <p className="text-sm text-neutral-600">專業一對一服務</p>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
