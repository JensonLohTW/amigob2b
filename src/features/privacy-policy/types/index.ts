/**
 * 隐私政策相关的类型定义
 */

export interface PolicySection {
  id: string
  title: string
  content: PolicyContent[]
}

export interface PolicyContent {
  type: 'paragraph' | 'list' | 'subsection' | 'table' | 'highlight'
  content: string | string[] | PolicySubsection | PolicyTable | PolicyHighlight
}

export interface PolicySubsection {
  title: string
  content: PolicyContent[]
}

export interface PolicyTable {
  headers: string[]
  rows: string[][]
}

export interface PolicyHighlight {
  type: 'info' | 'warning' | 'success' | 'error'
  title?: string
  content: string
}

export interface ContactInfo {
  department: string
  address: string
  phone: string
  email: string
  hours: string
}

export interface PrivacyPolicyProps {
  lastUpdated?: string
  showTableOfContents?: boolean
  className?: string
}

export interface PolicySectionProps {
  section: PolicySection
  className?: string
}

export interface TableOfContentsProps {
  sections: PolicySection[]
  activeSection?: string
  onSectionClick?: (sectionId: string) => void
}

export interface ContactSectionProps {
  contactInfo: ContactInfo
  className?: string
}
