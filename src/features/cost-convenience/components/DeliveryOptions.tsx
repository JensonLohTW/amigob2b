'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DeliveryOptionsProps, DeliveryPlan } from '../types'

/**
 * 配送选项组件
 * 展示不同的配送计划和选项
 */
export function DeliveryOptions({
  selectedPlan,
  onPlanSelect,
}: DeliveryOptionsProps) {
  const [activePlan, setActivePlan] = useState(selectedPlan || 'weekly')

  const deliveryPlans: DeliveryPlan[] = [
    {
      id: 'daily',
      name: '每日配送',
      description: '新鲜制作，当日配送',
      frequency: '每天',
      discount: 0,
      minOrder: 200,
      freeShipping: true,
      features: [
        '当日新鲜制作',
        '冷链配送保鲜',
        '指定时间送达',
        '包装环保可回收',
      ],
      price: '无额外费用',
    },
    {
      id: 'weekly',
      name: '每周配送',
      description: '一周份量，定期配送',
      frequency: '每周',
      discount: 5,
      minOrder: 800,
      freeShipping: true,
      features: [
        '一周新鲜份量',
        '真空包装保鲜',
        '固定配送日期',
        '营养搭配建议',
        '5% 订购优惠',
      ],
      price: '95折优惠',
      popular: true,
    },
    {
      id: 'biweekly',
      name: '双周配送',
      description: '两周份量，经济实惠',
      frequency: '每两周',
      discount: 8,
      minOrder: 1500,
      freeShipping: true,
      features: [
        '两周新鲜份量',
        '分装便于储存',
        '灵活配送时间',
        '专属客服支持',
        '8% 订购优惠',
      ],
      price: '92折优惠',
    },
    {
      id: 'monthly',
      name: '每月配送',
      description: '月度套餐，最大优惠',
      frequency: '每月',
      discount: 12,
      minOrder: 3000,
      freeShipping: true,
      features: [
        '一个月新鲜份量',
        '冷冻保存技术',
        '营养师定制方案',
        '健康追踪报告',
        '12% 订购优惠',
      ],
      price: '88折优惠',
    },
  ]

  const handlePlanSelect = (planId: string) => {
    setActivePlan(planId)
    onPlanSelect?.(planId)
  }

  return (
    <div className="space-y-8">
      {/* 配送说明 */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900">灵活配送选项</h3>
        <p className="mt-4 text-lg text-gray-600">
          选择最适合您和宠物的配送频率，享受新鲜营养的宠物鲜食
        </p>
      </div>

      {/* 配送计划卡片 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {deliveryPlans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
              activePlan === plan.id
                ? 'bg-indigo-50 shadow-lg ring-2 ring-indigo-500'
                : 'bg-white ring-1 ring-gray-200 hover:shadow-md hover:ring-gray-300'
            }`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {/* 热门标签 */}
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                <span className="inline-flex items-center rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white">
                  最受欢迎
                </span>
              </div>
            )}

            {/* 计划标题 */}
            <div className="mb-4 text-center">
              <h4 className="text-xl font-semibold text-gray-900">
                {plan.name}
              </h4>
              <p className="mt-1 text-sm text-gray-600">{plan.description}</p>
            </div>

            {/* 配送频率 */}
            <div className="mb-4 text-center">
              <div className="text-3xl font-bold text-indigo-600">
                {plan.frequency}
              </div>
              <div className="text-sm text-gray-500">配送频率</div>
            </div>

            {/* 价格信息 */}
            <div className="mb-6 text-center">
              <div className="text-lg font-semibold text-gray-900">
                {plan.price}
              </div>
              {plan.discount > 0 && (
                <div className="text-sm text-green-600">
                  节省 {plan.discount}%
                </div>
              )}
            </div>

            {/* 功能特性 */}
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-gray-700"
                >
                  <svg
                    className="mr-2 h-4 w-4 flex-shrink-0 text-green-500"
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
                  {feature}
                </li>
              ))}
            </ul>

            {/* 最低订购金额 */}
            <div className="border-t pt-4 text-center text-xs text-gray-500">
              最低订购: NT$ {plan.minOrder.toLocaleString()}
              {plan.freeShipping && ' • 免费配送'}
            </div>

            {/* 选中指示器 */}
            {activePlan === plan.id && (
              <div className="absolute top-4 right-4">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600">
                  <svg
                    className="h-4 w-4 text-white"
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
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 配送信息 */}
      <div className="rounded-lg bg-gray-50 p-6">
        <h4 className="mb-4 text-lg font-semibold text-gray-900">
          配送服务详情
        </h4>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h5 className="font-medium text-gray-900">准时配送</h5>
            <p className="text-sm text-gray-600">承诺时间内送达</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h5 className="font-medium text-gray-900">品质保证</h5>
            <p className="text-sm text-gray-600">新鲜度100%保证</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h5 className="font-medium text-gray-900">灵活付款</h5>
            <p className="text-sm text-gray-600">多种支付方式</p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
              <svg
                className="h-6 w-6 text-orange-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M12 12h.01M12 12h.01"
                />
              </svg>
            </div>
            <h5 className="font-medium text-gray-900">客服支持</h5>
            <p className="text-sm text-gray-600">24/7在线服务</p>
          </div>
        </div>
      </div>
    </div>
  )
}
