'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { ProductModalProps } from '../types'

/**
 * 产品详情模态框组件
 * 展示产品的完整详细信息
 */
export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) return null

  const getAgeGroupColor = (ageGroup: string) => {
    switch (ageGroup) {
      case 'puppy':
        return 'bg-pink-100 text-pink-800'
      case 'adult':
        return 'bg-blue-100 text-blue-800'
      case 'senior':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPetTypeIcon = (petType: string) => {
    switch (petType) {
      case 'dog':
        return '🐕'
      case 'cat':
        return '🐱'
      case 'both':
        return '🐕🐱'
      default:
        return '🐾'
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-opacity-25 fixed inset-0 bg-black" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* 模态框头部 */}
                  <div className="flex items-center justify-between border-b border-gray-200 p-6">
                    <div className="flex items-center gap-4">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {product.name}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${getAgeGroupColor(product.ageGroup)}`}
                      >
                        {product.ageGroup === 'puppy'
                          ? '幼龄'
                          : product.ageGroup === 'adult'
                            ? '成年'
                            : product.ageGroup === 'senior'
                              ? '乐龄'
                              : '全龄'}
                      </span>
                      <span className="text-2xl">
                        {getPetTypeIcon(product.petType)}
                      </span>
                    </div>

                    <button
                      onClick={onClose}
                      className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* 模态框内容 */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                      {/* 左侧：产品图片和基本信息 */}
                      <div>
                        {/* 产品图片 */}
                        <div className="relative mb-6 h-64 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
                          <div className="absolute top-4 left-4 flex gap-2">
                            {product.isNew && (
                              <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
                                新品
                              </span>
                            )}
                            {product.isRecommended && (
                              <span className="rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-white">
                                推荐
                              </span>
                            )}
                          </div>

                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-8xl opacity-30">🍽️</div>
                          </div>

                          <div className="absolute right-4 bottom-4">
                            <div className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-sm">
                              <svg
                                className="h-4 w-4 text-yellow-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="font-medium">
                                {product.popularity}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 价格和包装 */}
                        <div className="mb-6 rounded-lg bg-gray-50 p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-2xl font-bold text-gray-900">
                                {product.price}
                              </div>
                              <div className="text-sm text-gray-600">
                                {product.packaging}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">
                                保存期限
                              </div>
                              <div className="font-medium">
                                {product.shelfLife}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 认证标志 */}
                        <div>
                          <h4 className="mb-2 text-sm font-medium text-gray-700">
                            认证标志
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {product.certifications.map((cert, index) => (
                              <span
                                key={index}
                                className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 右侧：详细信息 */}
                      <div className="space-y-6">
                        {/* 产品描述 */}
                        <div>
                          <h4 className="mb-2 text-lg font-semibold text-gray-900">
                            产品描述
                          </h4>
                          <p className="leading-relaxed text-gray-700">
                            {product.description}
                          </p>
                        </div>

                        {/* 主要成分 */}
                        <div>
                          <h4 className="mb-3 text-lg font-semibold text-gray-900">
                            主要成分
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {product.mainIngredients.map(
                              (ingredient, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 rounded-lg bg-green-50 p-2"
                                >
                                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                  <span className="text-sm text-green-800">
                                    {ingredient}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        {/* 营养亮点 */}
                        <div>
                          <h4 className="mb-3 text-lg font-semibold text-gray-900">
                            营养亮点
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {product.nutritionHighlights.map(
                              (highlight, index) => (
                                <div
                                  key={index}
                                  className="rounded-lg border border-orange-200 bg-orange-50 p-3"
                                >
                                  <span className="text-sm font-medium text-orange-800">
                                    {highlight}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        {/* 功能特性 */}
                        <div>
                          <h4 className="mb-3 text-lg font-semibold text-gray-900">
                            功能特性
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {product.functionality.map((func, index) => (
                              <span
                                key={index}
                                className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                              >
                                {func}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* 适用对象 */}
                        <div>
                          <h4 className="mb-3 text-lg font-semibold text-gray-900">
                            适用对象
                          </h4>
                          <div className="space-y-2">
                            {product.suitableFor.map((suitable, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-sm text-gray-700"
                              >
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
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                {suitable}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 保存说明 */}
                        <div>
                          <h4 className="mb-2 text-lg font-semibold text-gray-900">
                            保存说明
                          </h4>
                          <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                            {product.storageInstructions}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 模态框底部 */}
                  <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-6">
                    <div className="text-sm text-gray-600">
                      口味：
                      <span className="font-medium">{product.flavor}</span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        关闭
                      </button>
                      <button className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700">
                        加入购物车
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
