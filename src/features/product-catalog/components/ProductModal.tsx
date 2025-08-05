'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProductModalProps } from '../types'

/**
 * 产品详情模态框组件
 * 展示产品的完整详细信息
 */
export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) return null

  const getAgeGroupLabel = (ageGroup: string) => {
    switch (ageGroup) {
      case 'puppy':
        return '幼齡'
      case 'adult':
        return '成年'
      case 'senior':
        return '樂齡'
      default:
        return '全齡'
    }
  }

  const getPetTypeLabel = (petType: string) => {
    switch (petType) {
      case 'dog':
        return '犬用'
      case 'cat':
        return '貓用'
      case 'both':
        return '犬貓通用'
      default:
        return '寵物用'
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
                  <div className="flex items-center justify-between border-b border-neutral-200 p-6">
                    <div className="flex items-center gap-4">
                      <h3 className="text-2xl font-bold text-neutral-950">
                        {product.name}
                      </h3>
                      <Badge variant="secondary">
                        {getAgeGroupLabel(product.ageGroup)}
                      </Badge>
                      <Badge variant="outline">
                        {getPetTypeLabel(product.petType)}
                      </Badge>
                    </div>

                    <button
                      onClick={onClose}
                      className="rounded-md p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
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
                              <Badge variant="default" className="text-xs">
                                新品
                              </Badge>
                            )}
                            {product.isRecommended && (
                              <Badge variant="secondary" className="text-xs">
                                推薦
                              </Badge>
                            )}
                          </div>

                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl font-light text-neutral-400">
                              產品圖片
                            </div>
                          </div>

                          <div className="absolute right-4 bottom-4">
                            <div className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-sm">
                              <svg
                                className="h-4 w-4 text-neutral-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="font-medium text-neutral-700">
                                {product.popularity}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 价格和包装 */}
                        <div className="mb-6 rounded-lg bg-neutral-50 p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-2xl font-bold text-neutral-950">
                                {product.price}
                              </div>
                              <div className="text-sm text-neutral-600">
                                {product.packaging}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-neutral-600">
                                保存期限
                              </div>
                              <div className="font-medium text-neutral-950">
                                {product.shelfLife}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 认证标志 */}
                        <div>
                          <h4 className="mb-2 text-sm font-medium text-neutral-700">
                            認證標誌
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {product.certifications.map((cert, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                              >
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 右侧：详细信息 */}
                      <div className="space-y-6">
                        {/* 产品描述 */}
                        <div>
                          <h4 className="mb-2 text-lg font-semibold text-neutral-950">
                            產品描述
                          </h4>
                          <p className="leading-relaxed text-neutral-700">
                            {product.description}
                          </p>
                        </div>

                        {/* 主要成分 */}
                        <div>
                          <h4 className="mb-3 text-lg font-semibold text-neutral-950">
                            主要成分
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {product.mainIngredients.map(
                              (ingredient, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 rounded-lg bg-neutral-50 p-2"
                                >
                                  <div className="h-2 w-2 rounded-full bg-neutral-400"></div>
                                  <span className="text-sm text-neutral-700">
                                    {ingredient}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        {/* 营养亮点 */}
                        <div>
                          <h4 className="mb-3 text-lg font-semibold text-neutral-950">
                            營養亮點
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {product.nutritionHighlights.map(
                              (highlight, index) => (
                                <div
                                  key={index}
                                  className="rounded-lg border border-neutral-200 bg-neutral-50 p-3"
                                >
                                  <span className="text-sm font-medium text-neutral-700">
                                    {highlight}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        {/* 功能特性 */}
                        <div>
                          <h4 className="mb-3 text-lg font-semibold text-neutral-950">
                            功能特性
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {product.functionality.map((func, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                              >
                                {func}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* 适用对象 */}
                        <div>
                          <h4 className="mb-3 text-lg font-semibold text-neutral-950">
                            適用對象
                          </h4>
                          <div className="space-y-2">
                            {product.suitableFor.map((suitable, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-sm text-neutral-700"
                              >
                                <svg
                                  className="h-4 w-4 text-neutral-600"
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
                          <h4 className="mb-2 text-lg font-semibold text-neutral-950">
                            保存說明
                          </h4>
                          <p className="rounded-lg bg-neutral-50 p-3 text-sm text-neutral-700">
                            {product.storageInstructions}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 模态框底部 */}
                  <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 p-6">
                    <div className="text-sm text-neutral-600">
                      口味：
                      <span className="font-medium text-neutral-950">{product.flavor}</span>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={onClose}
                      >
                        關閉
                      </Button>
                      <Button>
                        加入購物車
                      </Button>
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
