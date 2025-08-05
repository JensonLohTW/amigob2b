'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`group cursor-pointer transition-all duration-200 ${className}`}
    >
      {/* 極簡產品圖片區域 */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-50">
        {/* 只保留新品標籤 */}
        {product.isNew && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="default" className="text-xs">
              新品
            </Badge>
          </div>
        )}

        {/* 簡潔的產品圖片占位符 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl font-light text-neutral-300">
            {product.name.charAt(0)}
          </div>
        </div>

        {/* 懸停時的遮罩效果 */}
        <div className="absolute inset-0 bg-neutral-950/0 transition-colors duration-200 group-hover:bg-neutral-950/5" />
      </div>

      {/* 極簡產品信息 */}
      <div className="pt-4">
        {/* 產品名稱 */}
        <h3 className="mb-2 text-base font-medium text-neutral-950 line-clamp-1">
          {product.name}
        </h3>

        {/* 簡短描述 */}
        <p className="mb-3 text-sm text-neutral-600 line-clamp-2">
          {product.description}
        </p>

        {/* 價格和年齡組 */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-neutral-950">
            {product.price}
          </div>
          <div className="text-xs text-neutral-500">
            {getAgeGroupLabel(product.ageGroup)}
          </div>
        </div>
      </div>

      {/* 移除懸停時的額外信息，保持極簡 */}
    </motion.div>
  )
}
