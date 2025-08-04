'use client'

import { motion } from 'framer-motion'
import { ContactSectionProps } from '../types'

/**
 * 联系信息组件
 * 展示隐私政策相关的联系方式
 */
export function ContactSection({
  contactInfo,
  className = '',
}: ContactSectionProps) {
  const contactItems = [
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      label: '负责单位',
      value: contactInfo.department,
      type: 'text',
    },
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      label: '联系地址',
      value: contactInfo.address,
      type: 'text',
    },
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      label: '联系电话',
      value: contactInfo.phone,
      type: 'phone',
    },
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      label: '电子邮件',
      value: contactInfo.email,
      type: 'email',
    },
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      label: '服务时间',
      value: contactInfo.hours,
      type: 'text',
    },
  ]

  const handleContactClick = (type: string, value: string) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${value}`)
        break
      case 'email':
        window.open(`mailto:${value}`)
        break
      default:
        break
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 ${className}`}
    >
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 text-center text-2xl font-bold text-gray-900"
      >
        联系我们
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 text-center text-gray-600"
      >
        如果您对我们的隐私政策有任何疑问，或希望行使您的个人资料权利，请通过以下方式联系我们：
      </motion.p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {contactItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`flex items-start space-x-4 rounded-lg bg-white p-4 shadow-sm ${
              item.type === 'phone' || item.type === 'email'
                ? 'cursor-pointer transition-shadow hover:shadow-md'
                : ''
            }`}
            onClick={() => handleContactClick(item.type, item.value)}
          >
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                {item.icon}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="mb-1 text-sm font-medium text-gray-900">
                {item.label}
              </h4>
              <p
                className={`text-sm text-gray-600 ${
                  item.type === 'phone' || item.type === 'email'
                    ? 'transition-colors hover:text-blue-600'
                    : ''
                }`}
              >
                {item.value}
              </p>
            </div>
            {(item.type === 'phone' || item.type === 'email') && (
              <div className="flex-shrink-0">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 额外信息 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 rounded-lg border border-blue-200 bg-white/50 p-4"
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="mt-0.5 h-5 w-5 text-blue-600"
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
          </div>
          <div>
            <h4 className="mb-1 text-sm font-medium text-blue-900">
              回复时间承诺
            </h4>
            <p className="text-sm text-blue-800">
              我们承诺在收到您的咨询后 30
              天内给予回复。如果是紧急事项，请优先使用电话联系。
            </p>
          </div>
        </div>
      </motion.div>

      {/* 快速操作按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-6 flex flex-col justify-center gap-4 sm:flex-row"
      >
        <button
          onClick={() => handleContactClick('email', contactInfo.email)}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          发送邮件
        </button>

        <button
          onClick={() => handleContactClick('phone', contactInfo.phone)}
          className="inline-flex items-center justify-center rounded-md border border-blue-600 bg-white px-6 py-3 text-base font-medium text-blue-600 transition-colors hover:bg-blue-50"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          电话咨询
        </button>
      </motion.div>
    </motion.div>
  )
}
