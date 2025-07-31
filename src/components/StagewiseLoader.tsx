'use client'

import { useEffect } from 'react'

export default function StagewiseLoader() {
  useEffect(() => {
    // 只在開發模式和瀏覽器環境中執行
    if (
      process.env.NODE_ENV !== 'development' ||
      typeof window === 'undefined'
    ) {
      return
    }

    // 動態導入 stagewise 工具欄以避免 SSR 問題
    const initializeStagewise = async () => {
      try {
        const { initToolbar } = await import('@stagewise/toolbar')

        initToolbar({
          plugins: [],
        })
      } catch (error) {
        console.warn('Stagewise toolbar initialization failed:', error)
      }
    }

    initializeStagewise()
  }, [])

  return null // 這個組件不渲染任何內容
}
