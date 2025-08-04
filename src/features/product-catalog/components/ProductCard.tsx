'use client'

import { motion } from 'framer-motion'
import { ProductCardProps } from '../types'

/**
 * 产品卡片组件
 * 展示单个产品的基本信息和特性
 */
export function ProductCard({
  product,
  isHovered = false,
  onHover,
  onClick,
  className = '',
}: ProductCardProps) {
  const handleMouseEnter = () => {
    onHover?.(product.id)
  }

  const handleMouseLeave = () => {
    onHover?.(null)
  }

  const handleClick = () => {
    onClick?.(product)
  }

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 ${
        isHovered ? 'shadow-lg ring-2 ring-blue-500' : 'hover:shadow-md'
      } ${className}`}
    >
      {/* 产品图片区域 */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
        {/* 标签 */}
        <div className="absolute top-3 left-3 flex gap-2">
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

        {/* 宠物类型图标 */}
        <div className="absolute top-3 right-3">
          <span className="text-2xl">{getPetTypeIcon(product.petType)}</span>
        </div>

        {/* 产品图片占位符 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-30">🍽️</div>
        </div>

        {/* 人气指示器 */}
        <div className="absolute right-3 bottom-3">
          <div className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs">
            <svg
              className="h-3 w-3 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium">{product.popularity}</span>
          </div>
        </div>
      </div>

      {/* 产品信息 */}
      <div className="p-4">
        {/* 产品名称和年龄组 */}
        <div className="mb-2 flex items-start justify-between">
          <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${getAgeGroupColor(product.ageGroup)}`}
          >
            {product.ageGroup === 'puppy'
              ? '幼龄'
              : product.ageGroup === 'adult'
                ? '成年'
                : product.ageGroup === 'senior'
                  ? '乐龄'
                  : '全龄'}
          </span>
        </div>

        {/* 产品描述 */}
        <p className="mb-3 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        {/* 主要成分 */}
        <div className="mb-3">
          <h4 className="mb-1 text-xs font-medium text-gray-700">主要成分</h4>
          <div className="flex flex-wrap gap-1">
            {product.mainIngredients.slice(0, 3).map((ingredient, index) => (
              <span
                key={index}
                className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800"
              >
                {ingredient}
              </span>
            ))}
            {product.mainIngredients.length > 3 && (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                +{product.mainIngredients.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* 功能特性 */}
        <div className="mb-4">
          <h4 className="mb-1 text-xs font-medium text-gray-700">功能特性</h4>
          <div className="flex flex-wrap gap-1">
            {product.functionality.slice(0, 2).map((func, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
              >
                {func}
              </span>
            ))}
            {product.functionality.length > 2 && (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                +{product.functionality.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* 价格和包装 */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {product.price}
            </div>
            <div className="text-xs text-gray-500">{product.packaging}</div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            查看详情
          </motion.button>
        </div>
      </div>

      {/* 悬停时的额外信息 */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-200 bg-gray-50 p-4"
        >
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-medium text-gray-700">适用对象：</span>
              <div className="text-gray-600">
                {product.suitableFor.join(', ')}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">保存期限：</span>
              <div className="text-gray-600">{product.shelfLife}</div>
            </div>
          </div>

          <div className="mt-3">
            <span className="text-xs font-medium text-gray-700">
              营养亮点：
            </span>
            <div className="mt-1 flex flex-wrap gap-1">
              {product.nutritionHighlights
                .slice(0, 2)
                .map((highlight, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-800"
                  >
                    {highlight}
                  </span>
                ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
