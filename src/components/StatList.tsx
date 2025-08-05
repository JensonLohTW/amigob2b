'use client'

import { Border } from '@/components/Border'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export function StatList({
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof FadeInStagger>, 'children'> & {
  children: React.ReactNode
}) {
  return (
    <FadeInStagger {...props}>
      <dl className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
        {children}
      </dl>
    </FadeInStagger>
  )
}

// 動畫數字組件
function AnimatedValue({ value, className }: { value: string; className: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [displayValue, setDisplayValue] = useState('0')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isInView && !isAnimating) {
      setIsAnimating(true)
      
      // 解析數字和單位
      const numericMatch = value.match(/^(\d+(?:\.\d+)?)(.*)$/)
      if (!numericMatch) {
        setDisplayValue(value)
        return
      }

      const [, numericPart, unit] = numericMatch
      const targetNumber = parseFloat(numericPart)
      const startNumber = 0
      const duration = 2500 // 2.5秒動畫，更流暢
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // 使用更優雅的緩動函數 - easeOutQuart
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentNumber = startNumber + (targetNumber - startNumber) * easeOutQuart
        
        // 格式化數字，保持小數點精度
        let formattedNumber
        if (unit === '%') {
          formattedNumber = Math.round(currentNumber) + unit
        } else if (unit === '+') {
          formattedNumber = Math.round(currentNumber) + unit
        } else if (unit === '小時') {
          formattedNumber = Math.round(currentNumber) + unit
        } else {
          // 對於大數字，添加千位分隔符
          const numStr = Math.round(currentNumber).toString()
          if (currentNumber >= 1000) {
            formattedNumber = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (unit || '')
          } else {
            formattedNumber = numStr + (unit || '')
          }
        }
        
        setDisplayValue(formattedNumber)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [isInView, value, isAnimating])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      } : { 
        opacity: 0, 
        y: 30, 
        scale: 0.9 
      }}
      transition={{ 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // 自定義緩動
        delay: 0.1 // 稍微延遲，讓動畫更自然
      }}
    >
      {displayValue}
    </motion.span>
  )
}

export function StatListItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <Border as={FadeIn} position="left" className="flex flex-col-reverse pl-8">
      <dt className="mt-2 text-base text-neutral-600">{label}</dt>
      <dd className="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl">
        <AnimatedValue value={value} className="inline-block" />
      </dd>
    </Border>
  )
}
