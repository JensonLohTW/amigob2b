'use client'

import Image, { type ImageProps } from 'next/image'

interface SafeImageProps extends Omit<ImageProps, 'onError' | 'placeholder'> {
  fallbackBehavior?: 'hide' | 'placeholder'
  placeholder?: React.ReactNode
}

/**
 * 安全的圖片組件，處理圖片載入失敗的情況
 * 這是一個客戶端組件，可以安全地使用事件處理器
 */
export function SafeImage({
  fallbackBehavior = 'hide',
  placeholder,
  className,
  ...props
}: SafeImageProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    if (fallbackBehavior === 'hide') {
      target.style.display = 'none'
    }
  }

  if (fallbackBehavior === 'placeholder' && placeholder) {
    return (
      <div className={className}>
        <Image
          {...props}
          className={className}
          onError={handleError}
          alt={props.alt || ''}
        />
        {placeholder}
      </div>
    )
  }

  return (
    <Image
      {...props}
      className={className}
      onError={handleError}
      alt={props.alt || ''}
    />
  )
}
