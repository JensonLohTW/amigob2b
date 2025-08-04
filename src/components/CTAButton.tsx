import Link from 'next/link'
import clsx from 'clsx'
import { useState } from 'react'

interface CTAButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  urgency?: boolean
  trackingId?: string
  className?: string
}

export function CTAButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'right',
  urgency = false,
  trackingId,
  className,
}: CTAButtonProps) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    if (onClick) {
      setIsClicked(true)
      onClick()

      // 追蹤轉換事件
      if (trackingId && typeof window !== 'undefined') {
        // Google Analytics 事件追蹤
        if (window.gtag) {
          window.gtag('event', 'click', {
            event_category: 'CTA',
            event_label: trackingId,
            value: 1,
          })
        }

        // Facebook Pixel 事件追蹤
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: trackingId,
          })
        }
      }

      setTimeout(() => setIsClicked(false), 200)
    }
  }

  const baseClasses = clsx(
    'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    {
      // 尺寸變化
      'px-3 py-1.5 text-xs rounded-md': size === 'sm',
      'px-4 py-2 text-sm rounded-lg': size === 'md',
      'px-6 py-3 text-base rounded-lg': size === 'lg',
      'px-8 py-4 text-lg rounded-xl': size === 'xl',

      // 寬度
      'w-full': fullWidth,

      // 變體樣式
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5':
        variant === 'primary',
      'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5':
        variant === 'secondary',
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500':
        variant === 'outline',
      'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-500':
        variant === 'ghost',

      // 緊急感樣式
      'animate-pulse bg-red-600 hover:bg-red-700 text-white':
        urgency && variant === 'primary',

      // 點擊效果
      'scale-95': isClicked,
    },
    className,
  )

  const content = (
    <>
      {loading && (
        <svg
          className="mr-2 -ml-1 h-4 w-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}

      <span>{children}</span>

      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}

      {urgency && (
        <span className="ml-2 rounded-full bg-yellow-400 px-2 py-0.5 text-xs text-yellow-900">
          限時
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={baseClasses} onClick={handleClick}>
        {content}
      </Link>
    )
  }

  return (
    <button
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  )
}

// 預設的CTA按鈕變體
export function PrimaryCTA({
  children,
  ...props
}: Omit<CTAButtonProps, 'variant'>) {
  return (
    <CTAButton variant="primary" {...props}>
      {children}
    </CTAButton>
  )
}

export function SecondaryCTA({
  children,
  ...props
}: Omit<CTAButtonProps, 'variant'>) {
  return (
    <CTAButton variant="secondary" {...props}>
      {children}
    </CTAButton>
  )
}

// 特殊用途的CTA按鈕
export function FranchiseCTA({
  ...props
}: Omit<CTAButtonProps, 'children' | 'trackingId'>) {
  return (
    <CTAButton
      variant="primary"
      size="lg"
      trackingId="franchise_inquiry"
      icon={
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      }
      {...props}
    >
      立即加盟諮詢
    </CTAButton>
  )
}

export function ProductCTA({
  ...props
}: Omit<CTAButtonProps, 'children' | 'trackingId'>) {
  return (
    <CTAButton
      variant="secondary"
      size="md"
      trackingId="product_inquiry"
      icon={
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
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      }
      {...props}
    >
      查看產品
    </CTAButton>
  )
}

export function StoreCTA({
  ...props
}: Omit<CTAButtonProps, 'children' | 'trackingId'>) {
  return (
    <CTAButton
      variant="outline"
      size="md"
      trackingId="store_locator"
      icon={
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
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      }
      {...props}
    >
      尋找門店
    </CTAButton>
  )
}

export function ContactCTA({
  urgency = false,
  ...props
}: Omit<CTAButtonProps, 'children' | 'trackingId'>) {
  return (
    <CTAButton
      variant="primary"
      size="lg"
      urgency={urgency}
      trackingId="contact_us"
      icon={
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      }
      {...props}
    >
      {urgency ? '立即聯繫' : '聯繫我們'}
    </CTAButton>
  )
}

// 全域類型聲明
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    fbq?: (...args: any[]) => void
  }
}
