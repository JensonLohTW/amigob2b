'use client'

import { useState, useEffect, ReactNode } from 'react'

interface ClientOnlyWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
}

/**
 * ClientOnlyWrapper 組件
 * 用於避免 hydration mismatch 錯誤
 * 特別適用於受瀏覽器擴展影響的組件
 */
export function ClientOnlyWrapper({
  children,
  fallback = null,
  className = '',
}: ClientOnlyWrapperProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className={className} suppressHydrationWarning={true}>
        {fallback}
      </div>
    )
  }

  return <div className={className}>{children}</div>
}

/**
 * NoSSR 組件（別名）
 * 與 ClientOnlyWrapper 相同功能
 */
export const NoSSR = ClientOnlyWrapper
