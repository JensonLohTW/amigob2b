import { type Metadata } from 'next'

import { ReviewsContent } from './components/ReviewsContent'

export const metadata: Metadata = {
  title: '客戶評價',
  description:
    'AMIGO寵物鮮食客戶真實評價與使用心得分享，了解其他寵物主人的使用體驗和推薦。',
}

export default function ReviewsPage() {
  return <ReviewsContent />
}
