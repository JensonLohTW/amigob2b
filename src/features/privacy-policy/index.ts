/**
 * 隐私政策功能模块入口文件
 * 统一导出所有公共接口
 */

// 主组件
export { PrivacyPolicy } from './components/PrivacyPolicy'

// 子组件
export { PolicySection } from './components/PolicySection'
export { TableOfContents } from './components/TableOfContents'
export { ContactSection } from './components/ContactSection'

// 数据和常量
export {
  policySections,
  contactInfo,
  LAST_UPDATED,
  TOTAL_SECTIONS,
} from './data/policy-content'

// 类型定义
export type {
  PolicySection as PolicySectionType,
  PolicyContent,
  PolicySubsection,
  PolicyTable,
  PolicyHighlight,
  ContactInfo,
  PrivacyPolicyProps,
  PolicySectionProps,
  TableOfContentsProps,
  ContactSectionProps,
} from './types'
