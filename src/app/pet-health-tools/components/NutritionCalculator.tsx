'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/FadeIn'

// 營養需求計算器介面定義
interface NutritionData {
  petType: 'dog' | 'cat' | ''
  weight: number
  age: 'puppy' | 'adult' | 'senior' | ''
  activityLevel: 'low' | 'moderate' | 'high' | ''
  healthCondition: 'healthy' | 'overweight' | 'underweight' | 'special' | ''
}

interface NutritionResult {
  dailyCalories: number
  protein: number
  fat: number
  carbs: number
  fiber: number
  feedingTimes: number
  portionSize: number
  recommendations: string[]
}

export function NutritionCalculator() {
  const [formData, setFormData] = useState<NutritionData>({
    petType: '',
    weight: 0,
    age: '',
    activityLevel: '',
    healthCondition: '',
  })
  const [result, setResult] = useState<NutritionResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // 營養需求計算邏輯
  const calculateNutrition = (): NutritionResult => {
    let baseCalories = 0

    // 基礎代謝率計算
    if (formData.petType === 'dog') {
      baseCalories = 70 * Math.pow(formData.weight, 0.75)
    } else if (formData.petType === 'cat') {
      baseCalories = 60 * Math.pow(formData.weight, 0.75)
    }

    // 年齡調整係數
    let ageMultiplier = 1
    switch (formData.age) {
      case 'puppy':
        ageMultiplier = 2.0
        break
      case 'adult':
        ageMultiplier = 1.6
        break
      case 'senior':
        ageMultiplier = 1.4
        break
    }

    // 活動量調整係數
    let activityMultiplier = 1
    switch (formData.activityLevel) {
      case 'low':
        activityMultiplier = 1.2
        break
      case 'moderate':
        activityMultiplier = 1.6
        break
      case 'high':
        activityMultiplier = 2.0
        break
    }

    // 健康狀況調整係數
    let healthMultiplier = 1
    switch (formData.healthCondition) {
      case 'overweight':
        healthMultiplier = 0.8
        break
      case 'underweight':
        healthMultiplier = 1.2
        break
      case 'special':
        healthMultiplier = 1.1
        break
    }

    const dailyCalories = Math.round(
      baseCalories * ageMultiplier * activityMultiplier * healthMultiplier,
    )

    // 營養素計算（基於卡路里）
    const protein = Math.round((dailyCalories * 0.25) / 4) // 蛋白質 25% 卡路里，4卡/克
    const fat = Math.round((dailyCalories * 0.15) / 9) // 脂肪 15% 卡路里，9卡/克
    const carbs = Math.round((dailyCalories * 0.45) / 4) // 碳水化合物 45% 卡路里，4卡/克
    const fiber = Math.round(formData.weight * 2) // 纖維約體重的2倍（克）

    // 餵食建議
    let feedingTimes = 2
    if (formData.age === 'puppy') feedingTimes = 3
    if (formData.age === 'senior') feedingTimes = 3

    const portionSize = Math.round(dailyCalories / feedingTimes)

    // 個人化建議
    const recommendations = []
    if (formData.age === 'puppy') {
      recommendations.push('幼齡寵物需要更多蛋白質支持成長發育')
      recommendations.push('建議少量多餐，每日3-4次')
    }
    if (formData.age === 'senior') {
      recommendations.push('高齡寵物需要易消化的食物')
      recommendations.push('可考慮添加關節保健成分')
    }
    if (formData.healthCondition === 'overweight') {
      recommendations.push('建議減少碳水化合物攝取')
      recommendations.push('增加運動量，配合低卡飲食')
    }
    if (formData.activityLevel === 'high') {
      recommendations.push('高活動量寵物需要更多蛋白質和脂肪')
      recommendations.push('運動前後注意補充水分')
    }

    return {
      dailyCalories,
      protein,
      fat,
      carbs,
      fiber,
      feedingTimes,
      portionSize,
      recommendations,
    }
  }

  const handleCalculate = () => {
    if (
      !formData.petType ||
      !formData.weight ||
      !formData.age ||
      !formData.activityLevel ||
      !formData.healthCondition
    ) {
      alert('請填寫所有必要資訊')
      return
    }

    setIsCalculating(true)
    setTimeout(() => {
      const nutritionResult = calculateNutrition()
      setResult(nutritionResult)
      setIsCalculating(false)
    }, 1000)
  }

  const resetCalculator = () => {
    setFormData({
      petType: '',
      weight: 0,
      age: '',
      activityLevel: '',
      healthCondition: '',
    })
    setResult(null)
  }

  return (
    <FadeIn>
      <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-blue-100 p-3">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-neutral-950">
              營養需求計算器
            </h3>
            <p className="text-neutral-600">
              根據寵物的基本資料，計算每日營養需求和餵食建議
            </p>
          </div>
        </div>

        {!result ? (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-4">
                <label className="block text-sm font-medium text-neutral-700">
                  寵物類型 *
                </label>
                <select
                  value={formData.petType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      petType: e.target.value as 'dog' | 'cat',
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">選擇寵物類型</option>
                  <option value="dog">狗狗</option>
                  <option value="cat">貓咪</option>
                </select>
              </div>

              <div className="rounded-lg bg-white p-4">
                <label className="block text-sm font-medium text-neutral-700">
                  體重 (公斤) *
                </label>
                <input
                  type="number"
                  min="0.5"
                  max="100"
                  step="0.1"
                  value={formData.weight || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      weight: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="例如：5.2"
                  className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-4">
                <label className="block text-sm font-medium text-neutral-700">
                  年齡階段 *
                </label>
                <select
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      age: e.target.value as 'puppy' | 'adult' | 'senior',
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">選擇年齡階段</option>
                  <option value="puppy">幼年期 (0-1歲)</option>
                  <option value="adult">成年期 (1-7歲)</option>
                  <option value="senior">高齡期 (7歲以上)</option>
                </select>
              </div>

              <div className="rounded-lg bg-white p-4">
                <label className="block text-sm font-medium text-neutral-700">
                  活動量 *
                </label>
                <select
                  value={formData.activityLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      activityLevel: e.target.value as
                        | 'low'
                        | 'moderate'
                        | 'high',
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">選擇活動量</option>
                  <option value="low">低活動量（室內為主）</option>
                  <option value="moderate">中等活動量（每日散步）</option>
                  <option value="high">高活動量（大量運動）</option>
                </select>
              </div>
            </div>

            <div className="rounded-lg bg-white p-4">
              <label className="block text-sm font-medium text-neutral-700">
                健康狀況 *
              </label>
              <select
                value={formData.healthCondition}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    healthCondition: e.target.value as
                      | 'healthy'
                      | 'overweight'
                      | 'underweight'
                      | 'special',
                  })
                }
                className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">選擇健康狀況</option>
                <option value="healthy">健康正常</option>
                <option value="overweight">體重過重</option>
                <option value="underweight">體重不足</option>
                <option value="special">特殊健康需求</option>
              </select>
            </div>

            <button
              onClick={handleCalculate}
              disabled={isCalculating}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isCalculating ? '計算中...' : '計算營養需求'}
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {/* 計算結果 */}
            <div className="rounded-lg bg-white p-6">
              <h4 className="mb-4 text-lg font-semibold text-neutral-950">
                營養需求計算結果
              </h4>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {result.dailyCalories}
                  </div>
                  <div className="text-sm text-neutral-600">每日卡路里</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {result.protein}g
                  </div>
                  <div className="text-sm text-neutral-600">蛋白質</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {result.fat}g
                  </div>
                  <div className="text-sm text-neutral-600">脂肪</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {result.fiber}g
                  </div>
                  <div className="text-sm text-neutral-600">纖維</div>
                </div>
              </div>
            </div>

            {/* 餵食建議 */}
            <div className="rounded-lg bg-white p-6">
              <h4 className="mb-4 text-lg font-semibold text-neutral-950">
                餵食建議
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-sm text-neutral-600">建議餵食次數</div>
                  <div className="text-xl font-semibold text-neutral-950">
                    每日 {result.feedingTimes} 次
                  </div>
                </div>
                <div>
                  <div className="text-sm text-neutral-600">每餐份量</div>
                  <div className="text-xl font-semibold text-neutral-950">
                    約 {result.portionSize} 卡路里
                  </div>
                </div>
              </div>
            </div>

            {/* 個人化建議 */}
            {result.recommendations.length > 0 && (
              <div className="rounded-lg bg-amber-50 p-6">
                <h4 className="mb-4 text-lg font-semibold text-neutral-950">
                  個人化建議
                </h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-neutral-700"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={resetCalculator}
                className="flex-1 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                重新計算
              </button>
              <button className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700">
                查看推薦產品
              </button>
            </div>
          </div>
        )}
      </div>
    </FadeIn>
  )
}
