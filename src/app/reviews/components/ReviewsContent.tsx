'use client'

import Image from 'next/image'
import { useState, useMemo } from 'react'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'

// 評價數據結構定義
interface Review {
  id: number
  customerName: string
  petName: string
  petType: 'dog' | 'cat'
  petAge: string
  rating: number
  title: string
  content: string
  date: string
  location: string
  productUsed: string[]
  verified: boolean
  helpful: number
  images?: string[]
  beforeAfter?: {
    before: string
    after: string
    description: string
  }
}

// 模擬評價數據
const reviewsData: Review[] = [
  {
    id: 1,
    customerName: '陳小姐',
    petName: '小白',
    petType: 'dog',
    petAge: '3歲',
    rating: 5,
    title: '小白終於不挑食了！',
    content:
      '之前小白總是挑食，試了很多品牌都不愛吃。自從換了AMIGO的鮮食便當後，每次都吃得很乾淨！而且毛色也變得更亮麗了。',
    date: '2024-01-15',
    location: '台北市',
    productUsed: ['成年犬貓鮮食便當', '亮毛護膚鮮食便當'],
    verified: true,
    helpful: 23,
    images: ['/images/review-1-1.jpg', '/images/review-1-2.jpg'],
  },
  {
    id: 2,
    customerName: '王先生',
    petName: '咪咪',
    petType: 'cat',
    petAge: '8歲',
    rating: 5,
    title: '樂齡貓咪的最佳選擇',
    content:
      '咪咪進入高齡後食慾不振，體重也下降了。獸醫推薦AMIGO的樂齡系列，現在咪咪不但愛吃，精神也變好了！',
    date: '2024-01-10',
    location: '高雄市',
    productUsed: ['樂齡犬貓鮮食便當'],
    verified: true,
    helpful: 18,
    beforeAfter: {
      before: '/images/before-cat.jpg',
      after: '/images/after-cat.jpg',
      description: '使用3個月後，咪咪的精神狀態明顯改善',
    },
  },
  {
    id: 3,
    customerName: '李太太',
    petName: '豆豆',
    petType: 'dog',
    petAge: '6個月',
    rating: 4,
    title: '幼犬成長的好夥伴',
    content:
      '豆豆從小就吃AMIGO的幼齡系列，成長得很健康。唯一的小缺點是價格稍高，但品質真的很好，值得投資。',
    date: '2024-01-08',
    location: '台中市',
    productUsed: ['幼齡犬貓鮮食便當'],
    verified: true,
    helpful: 15,
  },
  {
    id: 4,
    customerName: '張小姐',
    petName: '橘子',
    petType: 'cat',
    petAge: '2歲',
    rating: 5,
    title: '過敏問題獲得改善',
    content:
      '橘子之前有食物過敏問題，皮膚常常發癢。換了AMIGO的功能系列後，過敏症狀明顯減輕，毛髮也變得柔順。',
    date: '2024-01-05',
    location: '新北市',
    productUsed: ['亮毛護膚鮮食便當', '免疫增強鮮食便當'],
    verified: true,
    helpful: 31,
  },
  {
    id: 5,
    customerName: '林先生',
    petName: '黑妞',
    petType: 'dog',
    petAge: '5歲',
    rating: 4,
    title: '減重效果顯著',
    content:
      '黑妞之前體重過重，獸醫建議控制飲食。AMIGO的體重管理系列幫助黑妞在3個月內減重2公斤，現在活力滿滿！',
    date: '2024-01-03',
    location: '桃園市',
    productUsed: ['體重管理鮮食便當'],
    verified: true,
    helpful: 27,
    beforeAfter: {
      before: '/images/before-dog.jpg',
      after: '/images/after-dog.jpg',
      description: '3個月減重2公斤，恢復健康體態',
    },
  },
]

// 評價統計
const reviewStats = {
  totalReviews: reviewsData.length,
  averageRating:
    reviewsData.reduce((sum, review) => sum + review.rating, 0) /
    reviewsData.length,
  ratingDistribution: {
    5: reviewsData.filter((r) => r.rating === 5).length,
    4: reviewsData.filter((r) => r.rating === 4).length,
    3: reviewsData.filter((r) => r.rating === 3).length,
    2: reviewsData.filter((r) => r.rating === 2).length,
    1: reviewsData.filter((r) => r.rating === 1).length,
  },
}

// 星級評分組件
function StarRating({
  rating,
  size = 'sm',
}: {
  rating: number
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating ? 'text-yellow-400' : 'text-neutral-300'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

// 評價統計組件
function ReviewStats() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8">
      <div className="text-center">
        <div className="text-4xl font-bold text-neutral-950">
          {reviewStats.averageRating.toFixed(1)}
        </div>
        <StarRating rating={Math.round(reviewStats.averageRating)} size="lg" />
        <p className="mt-2 text-sm text-neutral-600">
          基於 {reviewStats.totalReviews} 則客戶評價
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center gap-3">
            <span className="w-8 text-sm font-medium text-neutral-700">
              {rating}星
            </span>
            <div className="h-2 flex-1 rounded-full bg-neutral-200">
              <div
                className="h-2 rounded-full bg-yellow-400"
                style={{
                  width: `${(reviewStats.ratingDistribution[rating as keyof typeof reviewStats.ratingDistribution] / reviewStats.totalReviews) * 100}%`,
                }}
              />
            </div>
            <span className="w-8 text-sm text-neutral-600">
              {
                reviewStats.ratingDistribution[
                  rating as keyof typeof reviewStats.ratingDistribution
                ]
              }
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 評價卡片組件
function ReviewCard({ review }: { review: Review }) {
  const [showFullContent, setShowFullContent] = useState(false)
  const [helpfulCount, setHelpfulCount] = useState(review.helpful)
  const [hasVoted, setHasVoted] = useState(false)

  const handleHelpful = () => {
    if (!hasVoted) {
      setHelpfulCount((prev) => prev + 1)
      setHasVoted(true)
    }
  }

  return (
    <FadeIn>
      <div className="rounded-3xl bg-white p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
        {/* 評價標題和評分 */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <StarRating rating={review.rating} />
              {review.verified && (
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  已驗證購買
                </span>
              )}
            </div>
            <h3 className="mt-2 text-lg font-semibold text-neutral-950">
              {review.title}
            </h3>
          </div>
          <div className="text-right text-sm text-neutral-500">
            <div>{review.date}</div>
            <div>{review.location}</div>
          </div>
        </div>

        {/* 客戶和寵物信息 */}
        <div className="mt-4 flex items-center gap-4 text-sm text-neutral-600">
          <span>{review.customerName}</span>
          <span>•</span>
          <span>
            {review.petName} ({review.petType === 'dog' ? '狗狗' : '貓咪'},{' '}
            {review.petAge})
          </span>
        </div>

        {/* 評價內容 */}
        <div className="mt-4">
          <p
            className={`text-neutral-700 ${!showFullContent && review.content.length > 150 ? 'line-clamp-3' : ''}`}
          >
            {review.content}
          </p>
          {review.content.length > 150 && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {showFullContent ? '收起' : '展開全文'}
            </button>
          )}
        </div>

        {/* 使用產品 */}
        <div className="mt-4">
          <div className="mb-2 text-sm font-medium text-neutral-950">
            使用產品：
          </div>
          <div className="flex flex-wrap gap-2">
            {review.productUsed.map((product, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
              >
                {product}
              </span>
            ))}
          </div>
        </div>

        {/* 對比照片 */}
        {review.beforeAfter && (
          <div className="mt-6 rounded-2xl bg-neutral-50 p-4">
            <h4 className="mb-3 text-sm font-medium text-neutral-950">
              使用前後對比
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-2 aspect-square rounded-lg bg-neutral-200">
                  {/* 這裡會是實際的圖片 */}
                  <div className="flex h-full items-center justify-center text-neutral-500">
                    使用前
                  </div>
                </div>
                <p className="text-center text-xs text-neutral-600">使用前</p>
              </div>
              <div>
                <div className="mb-2 aspect-square rounded-lg bg-neutral-200">
                  {/* 這裡會是實際的圖片 */}
                  <div className="flex h-full items-center justify-center text-neutral-500">
                    使用後
                  </div>
                </div>
                <p className="text-center text-xs text-neutral-600">使用後</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-neutral-600">
              {review.beforeAfter.description}
            </p>
          </div>
        )}

        {/* 互動按鈕 */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handleHelpful}
            disabled={hasVoted}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              hasVoted
                ? 'cursor-not-allowed bg-green-100 text-green-800'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 7v13m-3-4h-2m0-4h2m0-4h2"
              />
            </svg>
            有幫助 ({helpfulCount})
          </button>

          <div className="text-sm text-neutral-500">
            {review.petType === 'dog' ? '🐕' : '🐱'} {review.petName}
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

export function ReviewsContent() {
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [filterPetType, setFilterPetType] = useState<'all' | 'dog' | 'cat'>(
    'all',
  )
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'helpful'>('date')

  // 篩選和排序評價
  const filteredReviews = useMemo(() => {
    let filtered = [...reviewsData]

    // 評分篩選
    if (filterRating) {
      filtered = filtered.filter((review) => review.rating === filterRating)
    }

    // 寵物類型篩選
    if (filterPetType !== 'all') {
      filtered = filtered.filter((review) => review.petType === filterPetType)
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'helpful':
          return b.helpful - a.helpful
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

    return filtered
  }, [filterRating, filterPetType, sortBy])

  return (
    <RootLayout>
      <PageIntro eyebrow="客戶評價" title="真實客戶的使用心得與推薦">
        <p>
          聽聽其他寵物主人的真實使用體驗，了解AMIGO寵物鮮食如何改善毛孩的健康與生活品質。
          每一則評價都來自真實的客戶分享。
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* 評價統計 */}
          <div className="lg:col-span-1">
            <FadeIn>
              <ReviewStats />
            </FadeIn>

            {/* 篩選選項 */}
            <FadeIn>
              <div className="mt-8 rounded-3xl bg-neutral-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-neutral-950">
                  篩選評價
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      評分
                    </label>
                    <select
                      value={filterRating || ''}
                      onChange={(e) =>
                        setFilterRating(
                          e.target.value ? Number(e.target.value) : null,
                        )
                      }
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 focus:outline-none"
                    >
                      <option value="">所有評分</option>
                      <option value="5">5星</option>
                      <option value="4">4星</option>
                      <option value="3">3星</option>
                      <option value="2">2星</option>
                      <option value="1">1星</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      寵物類型
                    </label>
                    <select
                      value={filterPetType}
                      onChange={(e) =>
                        setFilterPetType(
                          e.target.value as 'all' | 'dog' | 'cat',
                        )
                      }
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 focus:outline-none"
                    >
                      <option value="all">所有寵物</option>
                      <option value="dog">狗狗</option>
                      <option value="cat">貓咪</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      排序方式
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(
                          e.target.value as 'date' | 'rating' | 'helpful',
                        )
                      }
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 focus:outline-none"
                    >
                      <option value="date">最新評價</option>
                      <option value="rating">評分高低</option>
                      <option value="helpful">最有幫助</option>
                    </select>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* 評價列表 */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-neutral-950">
                客戶評價
              </h2>
              <p className="text-sm text-neutral-600">
                顯示 {filteredReviews.length} 則評價
              </p>
            </div>

            <FadeInStagger className="space-y-8">
              {filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </FadeInStagger>
          </div>
        </div>
      </Container>
    </RootLayout>
  )
}
