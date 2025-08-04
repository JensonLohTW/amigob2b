/**
 * 隐私政策页面
 * 重构后的简化版本，使用模块化架构
 */

import { Metadata } from 'next'
import { PrivacyPolicy } from '@/features/privacy-policy'

export const metadata: Metadata = {
  title: '隐私政策 - AMIGO 宠物鲜食',
  description:
    'AMIGO 宠物鲜食科技有限公司个人资料保护政策，详细说明我们如何收集、使用、保护和分享您的个人信息。',
  keywords: ['隐私政策', '个人资料保护', 'AMIGO', '宠物鲜食', '数据安全'],
  openGraph: {
    title: '隐私政策 - AMIGO 宠物鲜食',
    description: '了解我们如何保护您的个人资料和隐私权益',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />
}
