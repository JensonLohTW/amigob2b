'use client'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface CostCalculation {
  petWeight: number
  dailyPortion: number
  freshFoodCost: number
  dryFoodCost: number
  monthlyFreshFood: number
  monthlyDryFood: number
  yearlyFreshFood: number
  yearlyDryFood: number
  potentialVetSavings: number
}

const calculateCost = (weight: number): CostCalculation => {
  // 每公斤體重的日需求量 (g)
  const dailyPortion = weight * 25 // 25g per kg body weight

  // 每日成本計算
  const freshFoodCost = (dailyPortion / 100) * 18 // NT$18 per 100g
  const dryFoodCost = (dailyPortion / 100) * 12 // NT$12 per 100g

  // 月度和年度成本
  const monthlyFreshFood = freshFoodCost * 30
  const monthlyDryFood = dryFoodCost * 30
  const yearlyFreshFood = freshFoodCost * 365
  const yearlyDryFood = dryFoodCost * 365

  // 潛在獸醫費用節省 (基於健康改善統計)
  const potentialVetSavings = yearlyFreshFood * 0.3 // 30% 的健康改善節省

  return {
    petWeight: weight,
    dailyPortion,
    freshFoodCost,
    dryFoodCost,
    monthlyFreshFood,
    monthlyDryFood,
    yearlyFreshFood,
    yearlyDryFood,
    potentialVetSavings,
  }
}

const CostCalculator = () => {
  const [petWeight, setPetWeight] = useState(10)
  const calculation = calculateCost(petWeight)

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h3 className="mb-6 text-lg font-semibold text-neutral-950">
        成本計算器
      </h3>

      {/* 體重輸入 */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-neutral-950">
          寵物體重 (公斤)
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="1"
            max="50"
            value={petWeight}
            onChange={(e) => setPetWeight(Number(e.target.value))}
            className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-neutral-200"
          />
          <div className="w-16 text-center">
            <input
              type="number"
              value={petWeight}
              onChange={(e) => setPetWeight(Number(e.target.value))}
              className="w-full rounded border border-neutral-300 px-2 py-1 text-center text-sm"
              min="1"
              max="50"
            />
          </div>
        </div>
      </div>

      {/* 每日需求量 */}
      <div className="mb-6 rounded-lg bg-neutral-50 p-4">
        <div className="mb-1 text-sm text-neutral-600">每日建議餵食量</div>
        <div className="text-2xl font-bold text-neutral-950">
          {calculation.dailyPortion}g
        </div>
      </div>

      {/* 成本對比 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-green-50 p-4">
          <div>
            <div className="font-medium text-green-800">AMIGO 鮮食便當</div>
            <div className="text-sm text-green-600">每日成本</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-green-800">
              NT$ {calculation.freshFoodCost.toFixed(0)}
            </div>
            <div className="text-sm text-green-600">
              月費: NT$ {calculation.monthlyFreshFood.toFixed(0)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-orange-50 p-4">
          <div>
            <div className="font-medium text-orange-800">傳統乾糧</div>
            <div className="text-sm text-orange-600">每日成本</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-orange-800">
              NT$ {calculation.dryFoodCost.toFixed(0)}
            </div>
            <div className="text-sm text-orange-600">
              月費: NT$ {calculation.monthlyDryFood.toFixed(0)}
            </div>
          </div>
        </div>
      </div>

      {/* 年度對比 */}
      <div className="mt-6 rounded-lg bg-blue-50 p-4">
        <h4 className="mb-3 font-medium text-blue-800">年度成本分析</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-blue-700">鮮食便當年費</span>
            <span className="font-medium">
              NT$ {calculation.yearlyFreshFood.toFixed(0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">傳統乾糧年費</span>
            <span className="font-medium">
              NT$ {calculation.yearlyDryFood.toFixed(0)}
            </span>
          </div>
          <div className="flex justify-between border-t border-blue-200 pt-2">
            <span className="text-blue-700">年度差額</span>
            <span className="font-medium text-blue-800">
              NT${' '}
              {(
                calculation.yearlyFreshFood - calculation.yearlyDryFood
              ).toFixed(0)}
            </span>
          </div>
          <div className="flex justify-between text-green-700">
            <span>潛在醫療費用節省</span>
            <span className="font-medium">
              NT$ {calculation.potentialVetSavings.toFixed(0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const DeliveryOptions = () => {
  const deliveryPlans = [
    {
      name: '每週配送',
      frequency: '每週 1 次',
      discount: '5%',
      description: '新鮮度最佳，適合小型犬貓',
      minOrder: 'NT$ 500',
      freeShipping: 'NT$ 800',
    },
    {
      name: '雙週配送',
      frequency: '每 2 週 1 次',
      discount: '8%',
      description: '平衡新鮮度與便利性',
      minOrder: 'NT$ 800',
      freeShipping: 'NT$ 1200',
    },
    {
      name: '月度配送',
      frequency: '每月 1 次',
      discount: '12%',
      description: '最經濟實惠，適合大型犬',
      minOrder: 'NT$ 1500',
      freeShipping: 'NT$ 2000',
    },
  ]

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h3 className="mb-6 text-lg font-semibold text-neutral-950">配送方案</h3>

      <div className="space-y-4">
        {deliveryPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className="cursor-pointer rounded-lg border border-neutral-200 p-4 transition-colors hover:border-blue-300"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h4 className="font-medium text-neutral-950">{plan.name}</h4>
                <p className="text-sm text-neutral-600">{plan.frequency}</p>
              </div>
              <div className="text-right">
                <div className="rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-800">
                  {plan.discount} 折扣
                </div>
              </div>
            </div>

            <p className="mb-3 text-sm text-neutral-600">{plan.description}</p>

            <div className="flex justify-between text-xs text-neutral-500">
              <span>最低訂購: {plan.minOrder}</span>
              <span>免運門檻: {plan.freeShipping}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-blue-50 p-4">
        <h4 className="mb-2 font-medium text-blue-800">配送優勢</h4>
        <ul className="space-y-1 text-sm text-blue-700">
          <li className="flex items-center">
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
            冷鏈配送，確保新鮮度
          </li>
          <li className="flex items-center">
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
            彈性調整配送頻率
          </li>
          <li className="flex items-center">
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
            專業包裝，防止變質
          </li>
          <li className="flex items-center">
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
            24小時客服支援
          </li>
        </ul>
      </div>
    </div>
  )
}

const ConvenienceComparison = () => {
  const comparisonItems = [
    {
      aspect: '購買便利性',
      freshFood: {
        score: 9,
        description: '線上訂購，定期配送到府',
        details: ['24小時線上下單', '自動續訂服務', '彈性調整配送'],
      },
      dryFood: {
        score: 8,
        description: '實體店面或線上購買',
        details: ['需定期採購', '需自行搬運', '庫存管理'],
      },
    },
    {
      aspect: '保存便利性',
      freshFood: {
        score: 6,
        description: '需冷藏保存，保鮮期較短',
        details: ['冷藏保存7天', '分裝包裝', '需冷凍庫空間'],
      },
      dryFood: {
        score: 9,
        description: '常溫保存，保存期長',
        details: ['常溫保存18個月', '不需特殊設備', '節省空間'],
      },
    },
    {
      aspect: '餵食便利性',
      freshFood: {
        score: 8,
        description: '開封即食，無需額外準備',
        details: ['預先分裝', '營養均衡', '無需添加水分'],
      },
      dryFood: {
        score: 7,
        description: '需量測份量，建議補充水分',
        details: ['需測量份量', '建議泡水軟化', '可能需要營養補充'],
      },
    },
    {
      aspect: '清潔便利性',
      freshFood: {
        score: 7,
        description: '食器需徹底清洗',
        details: ['需熱水清洗', '避免細菌滋生', '定期消毒'],
      },
      dryFood: {
        score: 8,
        description: '清潔相對簡單',
        details: ['簡單沖洗', '不易殘留', '清潔快速'],
      },
    },
  ]

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h3 className="mb-6 text-lg font-semibold text-neutral-950">
        便利性對比
      </h3>

      <div className="space-y-6">
        {comparisonItems.map((item, index) => (
          <motion.div
            key={item.aspect}
            className="border-b border-neutral-200 pb-6 last:border-b-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h4 className="mb-4 font-medium text-neutral-950">{item.aspect}</h4>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* 鮮食便當 */}
              <div className="rounded-lg bg-green-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800">
                    鮮食便當
                  </span>
                  <div className="flex items-center">
                    {[...Array(10)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-3 w-3 ${
                          i < item.freshFood.score
                            ? 'text-green-500'
                            : 'text-neutral-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm text-green-700">
                      {item.freshFood.score}/10
                    </span>
                  </div>
                </div>
                <p className="mb-2 text-sm text-green-700">
                  {item.freshFood.description}
                </p>
                <ul className="space-y-1 text-xs text-green-600">
                  {item.freshFood.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="mr-2 h-1 w-1 rounded-full bg-green-500"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 傳統乾糧 */}
              <div className="rounded-lg bg-orange-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-orange-800">
                    傳統乾糧
                  </span>
                  <div className="flex items-center">
                    {[...Array(10)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-3 w-3 ${
                          i < item.dryFood.score
                            ? 'text-orange-500'
                            : 'text-neutral-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm text-orange-700">
                      {item.dryFood.score}/10
                    </span>
                  </div>
                </div>
                <p className="mb-2 text-sm text-orange-700">
                  {item.dryFood.description}
                </p>
                <ul className="space-y-1 text-xs text-orange-600">
                  {item.dryFood.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="mr-2 h-1 w-1 rounded-full bg-orange-500"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function CostConvenience() {
  const [activeTab, setActiveTab] = useState<
    'cost' | 'delivery' | 'convenience'
  >('cost')

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="成本與便利性"
        title="投資健康，值得每一分"
        className="mb-16"
      >
        <p>
          透過詳細的成本分析和便利性比較，了解鮮食便當的真實價值。
          考量長期健康效益，鮮食便當是更明智的選擇。
        </p>
      </SectionIntro>

      {/* 標籤切換 */}
      <FadeIn className="mb-8">
        <div className="flex justify-center">
          <div className="rounded-lg bg-neutral-100 p-1">
            <button
              onClick={() => setActiveTab('cost')}
              className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                activeTab === 'cost'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              成本計算
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                activeTab === 'delivery'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              配送方案
            </button>
            <button
              onClick={() => setActiveTab('convenience')}
              className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
                activeTab === 'convenience'
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              便利性對比
            </button>
          </div>
        </div>
      </FadeIn>

      {/* 內容區域 */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {activeTab === 'cost' && (
          <>
            <FadeIn>
              <CostCalculator />
            </FadeIn>
            <FadeIn>
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="mb-6 text-lg font-semibold text-neutral-950">
                  長期價值分析
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-green-50 p-4">
                    <h4 className="mb-2 font-medium text-green-800">
                      健康投資回報
                    </h4>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• 減少皮膚病治療費用 (年省 NT$ 8,000-15,000)</li>
                      <li>• 降低消化系統疾病風險 (年省 NT$ 5,000-12,000)</li>
                      <li>• 延長健康壽命，減少老年醫療支出</li>
                      <li>• 提升生活品質，減少行為問題</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-4">
                    <h4 className="mb-2 font-medium text-blue-800">
                      隱藏成本比較
                    </h4>
                    <div className="space-y-2 text-sm text-blue-700">
                      <div className="flex justify-between">
                        <span>營養補充品</span>
                        <span>鮮食: NT$ 0 | 乾糧: NT$ 3,000/年</span>
                      </div>
                      <div className="flex justify-between">
                        <span>潛在醫療費用</span>
                        <span>鮮食: 較低 | 乾糧: 較高</span>
                      </div>
                      <div className="flex justify-between">
                        <span>時間成本</span>
                        <span>鮮食: 較低 | 乾糧: 中等</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </>
        )}

        {activeTab === 'delivery' && (
          <>
            <FadeIn>
              <DeliveryOptions />
            </FadeIn>
            <FadeIn>
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="mb-6 text-lg font-semibold text-neutral-950">
                  配送服務特色
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-3 font-medium text-neutral-950">
                      冷鏈配送系統
                    </h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="rounded-lg bg-blue-50 p-3">
                        <div className="text-2xl font-bold text-blue-600">
                          -18°C
                        </div>
                        <div className="text-xs text-blue-700">冷凍保存</div>
                      </div>
                      <div className="rounded-lg bg-green-50 p-3">
                        <div className="text-2xl font-bold text-green-600">
                          2-8°C
                        </div>
                        <div className="text-xs text-green-700">冷藏配送</div>
                      </div>
                      <div className="rounded-lg bg-purple-50 p-3">
                        <div className="text-2xl font-bold text-purple-600">
                          24hr
                        </div>
                        <div className="text-xs text-purple-700">保鮮期限</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-medium text-neutral-950">
                      智能包裝技術
                    </h4>
                    <ul className="space-y-2 text-sm text-neutral-600">
                      <li className="flex items-center">
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
                        真空密封包裝，延長保鮮期
                      </li>
                      <li className="flex items-center">
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
                        食品級包裝材料，安全無毒
                      </li>
                      <li className="flex items-center">
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
                        環保可回收包裝，愛護地球
                      </li>
                      <li className="flex items-center">
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
                        智能溫度監控，品質保證
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          </>
        )}

        {activeTab === 'convenience' && (
          <div className="lg:col-span-2">
            <FadeIn>
              <ConvenienceComparison />
            </FadeIn>
          </div>
        )}
      </div>

      {/* 總結 */}
      <FadeIn className="mt-16">
        <div className="rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 p-8">
          <h3 className="mb-6 text-center text-xl font-semibold text-neutral-950">
            選擇鮮食便當的理由
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h4 className="mb-2 font-semibold text-neutral-950">
                長期經濟效益
              </h4>
              <p className="text-sm text-neutral-600">
                雖然初期成本較高，但長期健康效益 可節省大量醫療費用
              </p>
            </div>
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="mb-2 font-semibold text-neutral-950">
                便利服務體驗
              </h4>
              <p className="text-sm text-neutral-600">
                定期配送到府，無需擔心斷糧， 專業客服隨時協助
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h4 className="mb-2 font-semibold text-neutral-950">愛的投資</h4>
              <p className="text-sm text-neutral-600">
                為毛孩提供最好的營養， 是對家人健康的最佳投資
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
