'use client'

import { SVGProps } from 'react'

interface HydrationSafeSVGProps extends SVGProps<SVGSVGElement> {
  children: React.ReactNode
}

/**
 * HydrationSafeSVG 組件
 * 自動添加 suppressHydrationWarning 屬性的 SVG 組件
 * 避免因瀏覽器擴展導致的 hydration mismatch 錯誤
 */
export function HydrationSafeSVG({
  children,
  ...props
}: HydrationSafeSVGProps) {
  return (
    <svg {...props} suppressHydrationWarning={true}>
      {children}
    </svg>
  )
}

/**
 * SafeSVG 組件（別名）
 */
export const SafeSVG = HydrationSafeSVG
