'use client'

import { OptimizedForm } from './OptimizedForm'

export function FranchiseInquiryForm() {
  const fields = [
    {
      name: 'name',
      label: '姓名',
      type: 'text' as const,
      required: true,
      placeholder: '請輸入您的姓名',
    },
    {
      name: 'phone',
      label: '聯絡電話',
      type: 'tel' as const,
      required: true,
      placeholder: '09XX-XXX-XXX',
    },
    {
      name: 'email',
      label: '電子郵件',
      type: 'email' as const,
      required: true,
      placeholder: 'your@email.com',
    },
    {
      name: 'location',
      label: '希望開店地區',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'taipei', label: '台北市' },
        { value: 'new-taipei', label: '新北市' },
        { value: 'taoyuan', label: '桃園市' },
        { value: 'taichung', label: '台中市' },
        { value: 'tainan', label: '台南市' },
        { value: 'kaohsiung', label: '高雄市' },
        { value: 'other', label: '其他縣市' },
      ],
    },
    {
      name: 'budget',
      label: '預計投資預算',
      type: 'select' as const,
      required: true,
      options: [
        { value: '50-100', label: '50-100萬' },
        { value: '100-200', label: '100-200萬' },
        { value: '200-300', label: '200-300萬' },
        { value: '300+', label: '300萬以上' },
      ],
    },
    {
      name: 'experience',
      label: '創業經驗',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'none', label: '無創業經驗' },
        { value: 'some', label: '有部分創業經驗' },
        { value: 'experienced', label: '有豐富創業經驗' },
      ],
    },
    {
      name: 'timeline',
      label: '預計開店時間',
      type: 'select' as const,
      required: true,
      options: [
        { value: '1month', label: '1個月內' },
        { value: '3months', label: '3個月內' },
        { value: '6months', label: '6個月內' },
        { value: '1year', label: '1年內' },
      ],
    },
    {
      name: 'message',
      label: '其他需求或問題',
      type: 'textarea' as const,
      required: false,
      placeholder: '請告訴我們您的其他需求或想了解的問題...',
    },
  ]

  const handleSubmit = async (data: Record<string, string>) => {
    // 模擬API調用
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 這裡應該調用實際的API
    console.log('Franchise inquiry submitted:', data)

    // 發送到後端API
    // const response = await fetch('/api/franchise-inquiry', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })

    // if (!response.ok) {
    //   throw new Error('Failed to submit inquiry')
    // }
  }

  return (
    <OptimizedForm
      title="加盟諮詢申請"
      description="填寫以下資訊，我們將安排專業顧問為您提供詳細的加盟說明"
      fields={fields}
      submitText="立即申請加盟諮詢"
      onSubmit={handleSubmit}
      trackingId="franchise_inquiry"
      showProgress={true}
      urgency={true}
      testimonial={{
        text: 'AMIGO的加盟支援非常完整，從選址到開店都有專人協助，讓我順利實現創業夢想！',
        author: '王先生',
        role: '台北信義店加盟主',
      }}
    />
  )
}

export function ProductInquiryForm() {
  const fields = [
    {
      name: 'name',
      label: '姓名',
      type: 'text' as const,
      required: true,
      placeholder: '請輸入您的姓名',
    },
    {
      name: 'phone',
      label: '聯絡電話',
      type: 'tel' as const,
      required: true,
      placeholder: '09XX-XXX-XXX',
    },
    {
      name: 'petType',
      label: '寵物類型',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'dog', label: '狗狗' },
        { value: 'cat', label: '貓咪' },
        { value: 'both', label: '狗狗和貓咪' },
      ],
    },
    {
      name: 'petAge',
      label: '寵物年齡',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'puppy', label: '幼年期 (0-1歲)' },
        { value: 'adult', label: '成年期 (1-7歲)' },
        { value: 'senior', label: '高齡期 (7歲以上)' },
      ],
    },
    {
      name: 'interests',
      label: '感興趣的產品',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'daily', label: '日常營養系列' },
        { value: 'functional', label: '功能性系列' },
        { value: 'treats', label: '零食系列' },
        { value: 'all', label: '全系列產品' },
      ],
    },
    {
      name: 'message',
      label: '特殊需求或問題',
      type: 'textarea' as const,
      required: false,
      placeholder: '請告訴我們您毛孩的特殊需求或想了解的問題...',
    },
  ]

  const handleSubmit = async (data: Record<string, string>) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Product inquiry submitted:', data)
  }

  return (
    <OptimizedForm
      title="產品諮詢"
      description="告訴我們您毛孩的需求，我們將推薦最適合的產品"
      fields={fields}
      submitText="獲取產品建議"
      onSubmit={handleSubmit}
      trackingId="product_inquiry"
      showProgress={false}
      testimonial={{
        text: '根據AMIGO的建議選擇了適合的產品，我家毛孩現在吃得很開心，毛色也變得更亮麗！',
        author: '陳小姐',
        role: '忠實客戶',
      }}
    />
  )
}

export function ContactForm() {
  const fields = [
    {
      name: 'name',
      label: '姓名',
      type: 'text' as const,
      required: true,
      placeholder: '請輸入您的姓名',
    },
    {
      name: 'email',
      label: '電子郵件',
      type: 'email' as const,
      required: true,
      placeholder: 'your@email.com',
    },
    {
      name: 'phone',
      label: '聯絡電話',
      type: 'tel' as const,
      required: false,
      placeholder: '09XX-XXX-XXX (選填)',
    },
    {
      name: 'subject',
      label: '主題',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'franchise', label: '加盟相關' },
        { value: 'product', label: '產品相關' },
        { value: 'service', label: '服務相關' },
        { value: 'complaint', label: '客訴反映' },
        { value: 'other', label: '其他' },
      ],
    },
    {
      name: 'message',
      label: '訊息內容',
      type: 'textarea' as const,
      required: true,
      placeholder: '請詳細描述您的問題或需求...',
    },
  ]

  const handleSubmit = async (data: Record<string, string>) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Contact form submitted:', data)
  }

  return (
    <OptimizedForm
      title="聯繫我們"
      description="有任何問題或建議，歡迎與我們聯繫"
      fields={fields}
      submitText="發送訊息"
      onSubmit={handleSubmit}
      trackingId="contact_form"
    />
  )
}
