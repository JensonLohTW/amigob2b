/**
 * 安全认证数据
 */

import { Certification, TestReport, TimelineEvent, SafetyStats } from '../types'

export const certifications: Certification[] = [
  {
    id: 'haccp-001',
    name: 'HACCP 食品安全管制系统',
    description: '危害分析重要管制点系统认证',
    icon: '🛡️',
    details: [
      '生物性危害管制',
      '化学性危害管制',
      '物理性危害管制',
      '关键管制点监控',
      '矫正措施程序',
      '验证程序建立',
      '记录保存制度',
    ],
    validUntil: '2025-12-31',
    certNumber: 'HACCP-TW-2023-001',
    issuer: '台湾食品药物管理署',
    category: 'food-safety',
    priority: 'high',
    status: 'active',
  },
  {
    id: 'iso22000-001',
    name: 'ISO 22000 食品安全管理系统',
    description: '国际食品安全管理系统标准',
    icon: '🏆',
    details: [
      '食品安全政策制定',
      '危害分析与风险评估',
      '前提方案建立',
      '操作性前提方案',
      'HACCP 计划实施',
      '管理系统要求',
      '持续改进机制',
    ],
    validUntil: '2025-08-15',
    certNumber: 'ISO22000-2023-TW-456',
    issuer: 'SGS Taiwan Ltd.',
    category: 'quality',
    priority: 'high',
    status: 'active',
  },
  {
    id: 'gmp-001',
    name: 'GMP 良好作业规范',
    description: '食品良好卫生规范准则',
    icon: '👨‍🍳',
    details: [
      '厂房设施卫生管理',
      '设备器具卫生管理',
      '清洁消毒作业',
      '虫鼠防治管理',
      '卫生管理标准',
      '人员卫生管理',
      '制程及品质管制',
    ],
    validUntil: '2025-06-30',
    certNumber: 'GMP-TW-2023-789',
    issuer: '台湾食品工业发展研究所',
    category: 'food-safety',
    priority: 'high',
    status: 'active',
  },
  {
    id: 'halal-001',
    name: 'Halal 清真认证',
    description: '符合伊斯兰教法的食品认证',
    icon: '🕌',
    details: [
      '原料清真验证',
      '生产过程监控',
      '设备清洁标准',
      '包装材料检验',
      '供应链管理',
      '员工培训要求',
    ],
    validUntil: '2024-12-31',
    certNumber: 'HALAL-TW-2023-321',
    issuer: '中国回教协会',
    category: 'quality',
    priority: 'medium',
    status: 'active',
  },
  {
    id: 'organic-001',
    name: '有机农产品认证',
    description: '有机食品生产加工认证',
    icon: '🌱',
    details: [
      '有机原料采购',
      '有机加工标准',
      '有机标示管理',
      '追溯系统建立',
      '分离生产管理',
      '记录保存制度',
    ],
    validUntil: '2024-10-15',
    certNumber: 'ORG-TW-2023-654',
    issuer: '慈心有机农业发展基金会',
    category: 'environmental',
    priority: 'medium',
    status: 'active',
  },
  {
    id: 'brc-001',
    name: 'BRC 全球食品安全标准',
    description: '英国零售商协会食品安全标准',
    icon: '🌍',
    details: [
      '高级管理承诺',
      '食品安全计划',
      '食品安全与品质管理系统',
      '场地标准',
      '产品管制',
      '制程管制',
      '人员管理',
    ],
    validUntil: '2025-03-20',
    certNumber: 'BRC-TW-2023-987',
    issuer: 'Bureau Veritas',
    category: 'quality',
    priority: 'high',
    status: 'active',
  },
]

export const testReports: TestReport[] = [
  {
    id: 'micro-001',
    testType: '微生物检验报告',
    testDate: '2024-01-15',
    result: 'excellent',
    laboratory: 'SGS Taiwan Ltd.',
    reportNumber: 'SGS-2024-001',
    category: 'microbiological',
    details: [
      {
        parameter: '大肠杆菌群',
        standard: '< 10 CFU/g',
        result: '< 3 CFU/g',
        unit: 'CFU/g',
        status: 'excellent',
        limit: '10',
        method: 'CNS 10890',
      },
      {
        parameter: '沙门氏菌',
        standard: '阴性/25g',
        result: '阴性/25g',
        unit: '/25g',
        status: 'pass',
        method: 'CNS 10891',
      },
      {
        parameter: '李斯特菌',
        standard: '阴性/25g',
        result: '阴性/25g',
        unit: '/25g',
        status: 'pass',
        method: 'CNS 11204',
      },
      {
        parameter: '金黄色葡萄球菌',
        standard: '< 100 CFU/g',
        result: '< 10 CFU/g',
        unit: 'CFU/g',
        status: 'excellent',
        limit: '100',
        method: 'CNS 10892',
      },
    ],
  },
  {
    id: 'chem-001',
    testType: '化学成分检验报告',
    testDate: '2024-01-10',
    result: 'pass',
    laboratory: '台美检验科技有限公司',
    reportNumber: 'TA-2024-002',
    category: 'chemical',
    details: [
      {
        parameter: '重金属-铅',
        standard: '< 0.1 ppm',
        result: '< 0.05 ppm',
        unit: 'ppm',
        status: 'excellent',
        limit: '0.1',
        method: 'ICP-MS',
      },
      {
        parameter: '重金属-汞',
        standard: '< 0.05 ppm',
        result: '< 0.01 ppm',
        unit: 'ppm',
        status: 'excellent',
        limit: '0.05',
        method: 'ICP-MS',
      },
      {
        parameter: '农药残留',
        standard: '符合标准',
        result: '未检出',
        unit: '',
        status: 'excellent',
        method: 'LC-MS/MS',
      },
      {
        parameter: '防腐剂',
        standard: '符合标准',
        result: '符合规定',
        unit: '',
        status: 'pass',
        method: 'HPLC',
      },
    ],
  },
  {
    id: 'nutri-001',
    testType: '营养成分检验报告',
    testDate: '2024-01-08',
    result: 'excellent',
    laboratory: '食品工业发展研究所',
    reportNumber: 'FIRDI-2024-003',
    category: 'nutritional',
    details: [
      {
        parameter: '粗蛋白质',
        standard: '≥ 25%',
        result: '32.5%',
        unit: '%',
        status: 'excellent',
        limit: '25',
        method: 'CNS 5035',
      },
      {
        parameter: '粗脂肪',
        standard: '8-15%',
        result: '12.3%',
        unit: '%',
        status: 'pass',
        method: 'CNS 5036',
      },
      {
        parameter: '粗纤维',
        standard: '≤ 5%',
        result: '3.8%',
        unit: '%',
        status: 'pass',
        limit: '5',
        method: 'CNS 5037',
      },
      {
        parameter: '水分',
        standard: '≤ 12%',
        result: '8.5%',
        unit: '%',
        status: 'excellent',
        limit: '12',
        method: 'CNS 5034',
      },
    ],
  },
]

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'event-001',
    date: '2024-01-15',
    title: '微生物检验完成',
    description: '完成最新一期的微生物安全检验，所有指标均优于标准',
    type: 'test',
    status: 'completed',
    icon: '🔬',
    details: ['大肠杆菌群检测', '沙门氏菌检测', '李斯特菌检测'],
  },
  {
    id: 'event-002',
    date: '2024-01-10',
    title: '化学成分检验',
    description: '重金属、农药残留等化学成分检验通过',
    type: 'test',
    status: 'completed',
    icon: '⚗️',
    details: ['重金属检测', '农药残留检测', '防腐剂检测'],
  },
  {
    id: 'event-003',
    date: '2023-12-20',
    title: 'HACCP 年度审查',
    description: 'HACCP 食品安全管制系统年度内部审查',
    type: 'audit',
    status: 'completed',
    icon: '📋',
    details: ['危害分析更新', '管制点检查', '记录审查'],
  },
  {
    id: 'event-004',
    date: '2024-03-15',
    title: 'ISO 22000 外部审查',
    description: '预定进行 ISO 22000 认证的外部审查',
    type: 'certification',
    status: 'scheduled',
    icon: '🏆',
    details: ['文件审查', '现场审查', '不符合项追踪'],
  },
]

export const safetyStats: SafetyStats = {
  totalCertifications: certifications.length,
  activeCertifications: certifications.filter(
    (cert) => cert.status === 'active',
  ).length,
  testReports: testReports.length,
  passRate: 100,
  lastInspection: '2024-01-15',
  nextInspection: '2024-03-15',
}

// 获取所有认证
export const getAllCertifications = (): Certification[] => certifications

// 根据分类获取认证
export const getCertificationsByCategory = (
  category: string,
): Certification[] => {
  if (category === 'all') return certifications
  return certifications.filter((cert) => cert.category === category)
}

// 获取所有测试报告
export const getAllTestReports = (): TestReport[] => testReports

// 根据分类获取测试报告
export const getTestReportsByCategory = (category: string): TestReport[] => {
  if (category === 'all') return testReports
  return testReports.filter((report) => report.category === category)
}

// 获取时间线事件
export const getTimelineEvents = (): TimelineEvent[] => timelineEvents

// 获取安全统计
export const getSafetyStats = (): SafetyStats => safetyStats

// 获取认证分类
export const getCertificationCategories = (): string[] => [
  'all',
  'food-safety',
  'quality',
  'environmental',
  'management',
]

// 获取报告分类
export const getReportCategories = (): string[] => [
  'all',
  'microbiological',
  'chemical',
  'nutritional',
  'physical',
]
