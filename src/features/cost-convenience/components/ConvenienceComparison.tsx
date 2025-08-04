'use client'

import { motion } from 'framer-motion'
import { ConvenienceComparisonProps, ConvenienceItem } from '../types'

/**
 * 便利性对比组件
 * 对比鲜食和传统食品在各个方面的便利性
 */
export function ConvenienceComparison({
  showDetails = true,
}: ConvenienceComparisonProps) {
  const comparisonItems: ConvenienceItem[] = [
    {
      id: 'preparation',
      title: '准备便利性',
      freshFood: {
        rating: 5,
        description: '开袋即食，无需准备',
        details: [
          '预制分装，开袋即可',
          '无需额外调配',
          '适量控制精准',
          '减少食物浪费',
        ],
      },
      traditionalFood: {
        rating: 4,
        description: '需要测量和调配',
        details: [
          '需要称重测量',
          '可能需要添加水分',
          '容易过量或不足',
          '储存需要密封',
        ],
      },
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
    },
    {
      id: 'storage',
      title: '储存便利性',
      freshFood: {
        rating: 4,
        description: '冷藏储存，保鲜期适中',
        details: [
          '冷藏保存3-5天',
          '真空包装保鲜',
          '占用冷藏空间',
          '需要注意保质期',
        ],
      },
      traditionalFood: {
        rating: 5,
        description: '常温储存，保质期长',
        details: [
          '常温储存即可',
          '保质期12-18个月',
          '储存空间灵活',
          '不易变质',
        ],
      },
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
            d="M5 8a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V8z"
          />
        </svg>
      ),
    },
    {
      id: 'portability',
      title: '携带便利性',
      freshFood: {
        rating: 3,
        description: '需要保冷，携带稍复杂',
        details: ['需要保冷袋', '重量相对较重', '适合短途携带', '包装相对较大'],
      },
      traditionalFood: {
        rating: 5,
        description: '轻便易携，随时可用',
        details: ['轻便易携带', '无需特殊保存', '适合长途旅行', '包装紧凑'],
      },
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
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
    {
      id: 'feeding',
      title: '喂食便利性',
      freshFood: {
        rating: 5,
        description: '适口性好，宠物喜爱',
        details: [
          '宠物接受度高',
          '无需适应期',
          '食欲促进效果好',
          '减少挑食问题',
        ],
      },
      traditionalFood: {
        rating: 3,
        description: '可能需要适应和调味',
        details: [
          '可能需要适应期',
          '部分宠物挑食',
          '需要观察接受度',
          '可能需要混合喂食',
        ],
      },
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      id: 'cleanup',
      title: '清理便利性',
      freshFood: {
        rating: 4,
        description: '包装环保，清理简单',
        details: ['可回收包装', '无残留粉尘', '食碗易清洗', '减少异味'],
      },
      traditionalFood: {
        rating: 3,
        description: '可能有粉尘和残留',
        details: [
          '可能有粉尘飞散',
          '食碗清洗较难',
          '可能有异味残留',
          '包装处理复杂',
        ],
      },
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      ),
    },
  ]

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600'
    if (rating >= 3.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRatingBg = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-100'
    if (rating >= 3.5) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="space-y-8">
      {/* 对比说明 */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900">便利性全面对比</h3>
        <p className="mt-4 text-lg text-gray-600">
          从多个维度对比鲜食和传统食品的便利性，帮助您做出最佳选择
        </p>
      </div>

      {/* 对比项目 */}
      <div className="space-y-6">
        {comparisonItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200"
          >
            <div className="p-6">
              <div className="mb-4 flex items-center">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                  <div className="text-indigo-600">{item.icon}</div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* 鲜食 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-gray-900">AMIGO 鲜食</h5>
                    <div
                      className={`flex items-center rounded-full px-2 py-1 text-sm font-medium ${getRatingBg(item.freshFood.rating)} ${getRatingColor(item.freshFood.rating)}`}
                    >
                      <span className="mr-1">★</span>
                      {item.freshFood.rating}/5
                    </div>
                  </div>
                  <p className="text-gray-600">{item.freshFood.description}</p>

                  {showDetails && (
                    <ul className="space-y-1">
                      {item.freshFood.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <svg
                            className="mr-2 h-3 w-3 flex-shrink-0 text-green-500"
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
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* 传统食品 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-gray-900">传统干粮</h5>
                    <div
                      className={`flex items-center rounded-full px-2 py-1 text-sm font-medium ${getRatingBg(item.traditionalFood.rating)} ${getRatingColor(item.traditionalFood.rating)}`}
                    >
                      <span className="mr-1">★</span>
                      {item.traditionalFood.rating}/5
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {item.traditionalFood.description}
                  </p>

                  {showDetails && (
                    <ul className="space-y-1">
                      {item.traditionalFood.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <svg
                            className="mr-2 h-3 w-3 flex-shrink-0 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 总结 */}
      <div className="rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 p-6">
        <h4 className="mb-4 text-lg font-semibold text-gray-900">便利性总结</h4>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h5 className="mb-2 font-medium text-indigo-600">AMIGO 鲜食优势</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• 开袋即食，准备简单</li>
              <li>• 宠物接受度高</li>
              <li>• 营养均衡，无需调配</li>
              <li>• 清理方便，环保包装</li>
            </ul>
          </div>

          <div>
            <h5 className="mb-2 font-medium text-gray-600">传统干粮优势</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• 储存期长，常温保存</li>
              <li>• 携带方便，适合旅行</li>
              <li>• 成本相对较低</li>
              <li>• 购买渠道广泛</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
