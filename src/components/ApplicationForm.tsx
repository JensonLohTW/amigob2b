'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/FadeIn'
import { Button } from '@/components/Button'

interface FormData {
  name: string
  phone: string
  email: string
  location: string
  experience: string
  investmentBudget: string
  expectedLocation: string
  businessBackground: string
  motivation: string
  timeline: string
}

interface FormErrors {
  [key: string]: string
}

export function ApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    location: '',
    experience: '',
    investmentBudget: '',
    expectedLocation: '',
    businessBackground: '',
    motivation: '',
    timeline: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = '請輸入姓名'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '請輸入聯絡電話'
    } else if (!/^[0-9-+\s()]+$/.test(formData.phone)) {
      newErrors.phone = '請輸入有效的電話號碼'
    }

    if (!formData.email.trim()) {
      newErrors.email = '請輸入Email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '請輸入有效的Email格式'
    }

    if (!formData.location.trim()) {
      newErrors.location = '請輸入所在地區'
    }

    if (!formData.investmentBudget) {
      newErrors.investmentBudget = '請選擇投資預算'
    }

    if (!formData.expectedLocation.trim()) {
      newErrors.expectedLocation = '請輸入預計設置地點'
    }

    if (!formData.timeline) {
      newErrors.timeline = '請選擇預計開始時間'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // 清除該欄位的錯誤訊息
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // 模擬API調用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 這裡應該調用實際的API
      console.log('表單數據:', formData)
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('提交失敗:', error)
      alert('提交失敗，請稍後再試')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <FadeIn>
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-neutral-950 mb-4">申請已成功提交！</h2>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto">
            感謝您的申請，我們的專業團隊將在24小時內與您聯繫，
            為您提供詳細的加盟說明和個人化的投資建議。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/calculator">
              試算投資回報
            </Button>
            <Button href="/franchise" className="border border-neutral-300 bg-white text-neutral-950 hover:bg-neutral-50">
              了解更多詳情
            </Button>
          </div>
        </div>
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 基本資料 */}
        <div className="rounded-3xl bg-neutral-50 p-8">
          <h3 className="text-xl font-semibold text-neutral-950 mb-6">基本資料</h3>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                姓名 *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full rounded-md border shadow-sm focus:ring-2 focus:ring-blue-500 p-3 ${
                  errors.name ? 'border-red-300' : 'border-neutral-300'
                }`}
                placeholder="請輸入您的姓名"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                聯絡電話 *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full rounded-md border shadow-sm focus:ring-2 focus:ring-blue-500 p-3 ${
                  errors.phone ? 'border-red-300' : 'border-neutral-300'
                }`}
                placeholder="請輸入您的聯絡電話"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full rounded-md border shadow-sm focus:ring-2 focus:ring-blue-500 p-3 ${
                  errors.email ? 'border-red-300' : 'border-neutral-300'
                }`}
                placeholder="請輸入您的Email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                所在地區 *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={`w-full rounded-md border shadow-sm focus:ring-2 focus:ring-blue-500 p-3 ${
                  errors.location ? 'border-red-300' : 'border-neutral-300'
                }`}
                placeholder="例：高雄市左營區"
              />
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>
          </div>
        </div>

        {/* 投資意向 */}
        <div className="rounded-3xl bg-neutral-50 p-8">
          <h3 className="text-xl font-semibold text-neutral-950 mb-6">投資意向</h3>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                投資預算 *
              </label>
              <select
                value={formData.investmentBudget}
                onChange={(e) => handleInputChange('investmentBudget', e.target.value)}
                className={`w-full rounded-md border shadow-sm focus:ring-2 focus:ring-blue-500 p-3 ${
                  errors.investmentBudget ? 'border-red-300' : 'border-neutral-300'
                }`}
              >
                <option value="">請選擇投資預算</option>
                <option value="50-70萬">50-70萬</option>
                <option value="70-100萬">70-100萬</option>
                <option value="100萬以上">100萬以上</option>
              </select>
              {errors.investmentBudget && <p className="mt-1 text-sm text-red-600">{errors.investmentBudget}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                預計開始時間 *
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className={`w-full rounded-md border shadow-sm focus:ring-2 focus:ring-blue-500 p-3 ${
                  errors.timeline ? 'border-red-300' : 'border-neutral-300'
                }`}
              >
                <option value="">請選擇預計開始時間</option>
                <option value="1個月內">1個月內</option>
                <option value="2-3個月">2-3個月</option>
                <option value="3-6個月">3-6個月</option>
                <option value="6個月以上">6個月以上</option>
              </select>
              {errors.timeline && <p className="mt-1 text-sm text-red-600">{errors.timeline}</p>}
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                預計設置地點 *
              </label>
              <input
                type="text"
                value={formData.expectedLocation}
                onChange={(e) => handleInputChange('expectedLocation', e.target.value)}
                className={`w-full rounded-md border shadow-sm focus:ring-2 focus:ring-blue-500 p-3 ${
                  errors.expectedLocation ? 'border-red-300' : 'border-neutral-300'
                }`}
                placeholder="例：高雄市左營區博愛路附近，靠近寵物醫院"
              />
              {errors.expectedLocation && <p className="mt-1 text-sm text-red-600">{errors.expectedLocation}</p>}
            </div>
          </div>
        </div>

        {/* 背景資訊 */}
        <div className="rounded-3xl bg-neutral-50 p-8">
          <h3 className="text-xl font-semibold text-neutral-950 mb-6">背景資訊</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                相關經驗
              </label>
              <textarea
                rows={3}
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full rounded-md border-neutral-300 shadow-sm focus:ring-2 focus:ring-blue-500 p-3"
                placeholder="請簡述您的創業或相關行業經驗（選填）"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                商業背景
              </label>
              <textarea
                rows={3}
                value={formData.businessBackground}
                onChange={(e) => handleInputChange('businessBackground', e.target.value)}
                className="w-full rounded-md border-neutral-300 shadow-sm focus:ring-2 focus:ring-blue-500 p-3"
                placeholder="請簡述您的商業背景或投資經驗（選填）"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                加盟動機
              </label>
              <textarea
                rows={3}
                value={formData.motivation}
                onChange={(e) => handleInputChange('motivation', e.target.value)}
                className="w-full rounded-md border-neutral-300 shadow-sm focus:ring-2 focus:ring-blue-500 p-3"
                placeholder="請分享您選擇加盟的動機和期望（選填）"
              />
            </div>
          </div>
        </div>

        {/* 提交按鈕 */}
        <div className="text-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`px-12 py-4 text-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? '提交中...' : '提交申請'}
          </Button>
          <p className="mt-4 text-sm text-neutral-600">
            提交後我們將在24小時內與您聯繫
          </p>
        </div>
      </form>
    </FadeIn>
  )
}
