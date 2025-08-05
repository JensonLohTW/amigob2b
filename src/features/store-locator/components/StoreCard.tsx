'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { StoreCardProps } from '../types'

/**
 * 门店卡片组件
 * 展示单个门店的详细信息
 */
export function StoreCard({
  store,
  onSelect,
  showDistance = true,
  className = '',
}: StoreCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800'
      case 'coming_soon':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '营业中'
      case 'maintenance':
        return '维护中'
      case 'coming_soon':
        return '即将开业'
      default:
        return '未知状态'
    }
  }

  const getRatingStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ☆
        </span>,
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ☆
        </span>,
      )
    }

    return stars
  }

  const handleCardClick = () => {
    onSelect?.(store)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-md hover:ring-blue-300 ${className}`}
      onClick={handleCardClick}
      whileHover={{ y: -2 }}
    >
      {/* 門店圖片 */}
      {store.image && store.image !== '' && (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // 當圖片載入失敗時，隱藏圖片容器
              const target = e.target as HTMLImageElement
              if (target.parentElement) {
                target.parentElement.style.display = 'none'
              }
            }}
          />
        </div>
      )}

      <div className="p-6">
        {/* 门店头部信息 */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-1 text-lg font-semibold text-gray-900">
              {store.name}
            </h3>
            <p className="mb-2 text-sm text-gray-600">{store.address}</p>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {store.city} · {store.district}
              </span>
              {showDistance && store.distance && (
                <>
                  <span className="text-gray-300">·</span>
                  <span className="text-sm font-medium text-blue-600">
                    {store.distance.toFixed(1)} km
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(store.status)}`}
            >
              {getStatusText(store.status)}
            </span>
            {store.rating > 0 && (
              <div className="flex items-center gap-1">
                <div className="flex">{getRatingStars(store.rating)}</div>
                <span className="ml-1 text-sm text-gray-600">
                  {store.rating}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 营业时间和联系方式 */}
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">🕒</span>
            <div>
              <div className="text-xs text-gray-500">营业时间</div>
              <div className="text-sm font-medium text-gray-900">
                {store.hours}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg">📞</span>
            <div>
              <div className="text-xs text-gray-500">联系电话</div>
              <div className="text-sm font-medium text-gray-900">
                {store.phone}
              </div>
            </div>
          </div>
        </div>

        {/* 门店特色 */}
        <div className="mb-4">
          <div className="mb-2 text-xs text-gray-500">门店特色</div>
          <div className="flex flex-wrap gap-1">
            {store.features.slice(0, 4).map((feature, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
              >
                {feature}
              </span>
            ))}
            {store.features.length > 4 && (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                +{store.features.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* 产品和服务信息 */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gray-50 p-3 text-center">
            <div className="text-lg font-bold text-blue-600">
              {store.productCount}
            </div>
            <div className="text-xs text-gray-600">种产品</div>
          </div>

          <div className="rounded-lg bg-gray-50 p-3 text-center">
            <div className="text-lg font-bold text-green-600">
              {store.services?.length || 0}
            </div>
            <div className="text-xs text-gray-600">项服务</div>
          </div>
        </div>

        {/* 门店描述 */}
        {store.description && (
          <div className="mb-4">
            <p className="line-clamp-2 text-sm text-gray-600">
              {store.description}
            </p>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              window.open(`tel:${store.phone}`, '_self')
            }}
            className="flex-1 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
          >
            📞 致电门店
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              const mapUrl = `https://maps.google.com/?q=${store.coordinates.lat},${store.coordinates.lng}`
              window.open(mapUrl, '_blank')
            }}
            className="flex-1 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-100"
          >
            🗺️ 查看地图
          </button>
        </div>

        {/* 管理员信息（如果有） */}
        {store.manager && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>门店经理：{store.manager}</span>
              {store.email && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(`mailto:${store.email}`, '_self')
                  }}
                  className="text-blue-600 hover:text-blue-700"
                >
                  📧 发送邮件
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/**
 * 门店卡片骨架屏组件
 */
export function StoreCardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 ${className}`}
    >
      <div className="aspect-video w-full animate-pulse bg-gray-200" />
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 h-5 animate-pulse rounded bg-gray-200" />
            <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="h-12 animate-pulse rounded bg-gray-200" />
          <div className="h-12 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="mb-4 flex gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 w-16 animate-pulse rounded-full bg-gray-200"
            />
          ))}
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="h-12 animate-pulse rounded bg-gray-200" />
          <div className="h-12 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="flex gap-2">
          <div className="h-8 flex-1 animate-pulse rounded bg-gray-200" />
          <div className="h-8 flex-1 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  )
}
