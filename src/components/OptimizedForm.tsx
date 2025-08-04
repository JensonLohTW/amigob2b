'use client'

import { useState, useEffect } from 'react'
import { CTAButton } from './CTAButton'

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  validation?: (value: string) => string | null
}

interface OptimizedFormProps {
  title: string
  description?: string
  fields: FormField[]
  submitText?: string
  onSubmit: (data: Record<string, string>) => Promise<void>
  trackingId?: string
  showProgress?: boolean
  urgency?: boolean
  testimonial?: {
    text: string
    author: string
    role: string
  }
}

export function OptimizedForm({
  title,
  description,
  fields,
  submitText = '提交',
  onSubmit,
  trackingId,
  showProgress = false,
  urgency = false,
  testimonial,
}: OptimizedFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isSuccess, setIsSuccess] = useState(false)
  const [startTime] = useState(Date.now())

  // 計算表單完成進度
  const completedFields = fields.filter((field) =>
    formData[field.name]?.trim(),
  ).length
  const progress = (completedFields / fields.length) * 100

  // 自動保存表單數據到 localStorage
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(`form_${trackingId}`, JSON.stringify(formData))
    }
  }, [formData, trackingId])

  // 載入已保存的表單數據
  useEffect(() => {
    if (trackingId) {
      const saved = localStorage.getItem(`form_${trackingId}`)
      if (saved) {
        try {
          setFormData(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to load saved form data:', e)
        }
      }
    }
  }, [trackingId])

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // 清除該欄位的錯誤
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateField = (field: FormField, value: string): string | null => {
    if (field.required && !value.trim()) {
      return `${field.label}為必填欄位`
    }

    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return '請輸入有效的電子郵件地址'
      }
    }

    if (field.type === 'tel' && value) {
      const phoneRegex = /^[0-9-+\s()]+$/
      if (!phoneRegex.test(value)) {
        return '請輸入有效的電話號碼'
      }
    }

    if (field.validation) {
      return field.validation(value)
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 驗證所有欄位
    const newErrors: Record<string, string> = {}
    fields.forEach((field) => {
      const error = validateField(field, formData[field.name] || '')
      if (error) {
        newErrors[field.name] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      setIsSuccess(true)

      // 清除保存的表單數據
      if (trackingId) {
        localStorage.removeItem(`form_${trackingId}`)
      }

      // 追蹤轉換事件
      if (trackingId && typeof window !== 'undefined') {
        const timeSpent = Date.now() - startTime

        if (window.gtag) {
          window.gtag('event', 'form_submit', {
            event_category: 'Form',
            event_label: trackingId,
            value: 1,
            custom_parameters: {
              time_spent: timeSpent,
              fields_completed: completedFields,
            },
          })
        }

        if (window.fbq) {
          window.fbq('track', 'CompleteRegistration', {
            content_name: trackingId,
            value: 1,
            currency: 'TWD',
          })
        }
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({ submit: '提交失敗，請稍後再試' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-3xl bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-green-900">
          提交成功！
        </h3>
        <p className="text-green-700">
          我們已收到您的資訊，將在24小時內與您聯繫。
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-neutral-950/5">
      {/* 表單標題 */}
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-neutral-950">
          {title}
          {urgency && (
            <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
              限時優惠
            </span>
          )}
        </h2>
        {description && <p className="text-neutral-600">{description}</p>}
      </div>

      {/* 進度條 */}
      {showProgress && (
        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm text-neutral-600">
            <span>完成進度</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-neutral-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* 表單 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.name}>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              {field.label}
              {field.required && <span className="ml-1 text-red-500">*</span>}
            </label>

            {field.type === 'select' ? (
              <select
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">請選擇...</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                rows={4}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            ) : (
              <input
                type={field.type}
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            )}

            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
            )}
          </div>
        ))}

        {errors.submit && (
          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        <CTAButton
          variant="primary"
          size="lg"
          fullWidth
          loading={isSubmitting}
          trackingId={trackingId}
        >
          {isSubmitting ? '提交中...' : submitText}
        </CTAButton>
      </form>

      {/* 客戶見證 */}
      {testimonial && (
        <div className="mt-8 border-t border-neutral-200 pt-6">
          <blockquote className="text-sm text-neutral-600 italic">
            &ldquo;{testimonial.text}&rdquo;
          </blockquote>
          <div className="mt-2 text-xs text-neutral-500">
            — {testimonial.author}, {testimonial.role}
          </div>
        </div>
      )}

      {/* 信任指標 */}
      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-neutral-500">
        <div className="flex items-center gap-1">
          <svg
            className="h-4 w-4 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span>資料安全保護</span>
        </div>
        <div className="flex items-center gap-1">
          <svg
            className="h-4 w-4 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>24小時內回覆</span>
        </div>
      </div>
    </div>
  )
}
