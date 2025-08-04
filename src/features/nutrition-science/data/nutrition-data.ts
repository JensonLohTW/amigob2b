/**
 * 营养科学数据
 */

import { NutritionData, RadarCategory, NutritionSummary, ComparisonResult } from '../types'

export const nutritionData: NutritionData[] = [
  {
    nutrient: '蛋白质消化率',
    freshFood: 92,
    dryFood: 78,
    unit: '%',
    description: '真消化率测定，反映实际可利用蛋白质比例',
    source: 'Journal of Animal Physiology and Animal Nutrition, 2023',
    category: 'protein',
  },
  {
    nutrient: 'Omega-3 脂肪酸',
    freshFood: 0.8,
    dryFood: 0.3,
    unit: 'g/100g',
    description: 'EPA+DHA 含量，对皮肤毛发和认知功能重要',
    source: 'Veterinary Record, 2022',
    category: 'vitamin',
  },
  {
    nutrient: '维生素 E',
    freshFood: 45,
    dryFood: 28,
    unit: 'mg/kg',
    description: '天然抗氧化剂，高温加工会大量流失',
    source: 'Animal Feed Science and Technology, 2023',
    category: 'vitamin',
  },
  {
    nutrient: '叶酸',
    freshFood: 2.1,
    dryFood: 1.2,
    unit: 'mg/kg',
    description: '细胞分裂和DNA合成必需，热敏感维生素',
    source: 'Journal of Nutritional Science, 2023',
    category: 'vitamin',
  },
  {
    nutrient: '锌生物利用率',
    freshFood: 85,
    dryFood: 65,
    unit: '%',
    description: '免疫功能和伤口愈合重要矿物质',
    source: 'British Journal of Nutrition, 2022',
    category: 'mineral',
  },
  {
    nutrient: '铁吸收率',
    freshFood: 78,
    dryFood: 58,
    unit: '%',
    description: '血红蛋白合成必需，植酸会影响吸收',
    source: 'Animal Nutrition, 2023',
    category: 'mineral',
  },
  {
    nutrient: '钙磷比例',
    freshFood: 1.2,
    dryFood: 1.8,
    unit: ':1',
    description: '理想比例1.2:1，过高会影响其他矿物质吸收',
    source: 'Veterinary Clinics of North America, 2022',
    category: 'mineral',
  },
  {
    nutrient: '水分含量',
    freshFood: 75,
    dryFood: 10,
    unit: '%',
    description: '天然水分有助消化和肾脏健康',
    source: 'Journal of Animal Science, 2023',
    category: 'overall',
  },
  {
    nutrient: '抗氧化活性',
    freshFood: 95,
    dryFood: 45,
    unit: 'ORAC值',
    description: '总抗氧化能力，新鲜食材保留更多活性成分',
    source: 'Food Chemistry, 2023',
    category: 'overall',
  },
  {
    nutrient: '益生菌活性',
    freshFood: 88,
    dryFood: 15,
    unit: '%',
    description: '肠道健康重要指标，高温处理会破坏益生菌',
    source: 'Applied and Environmental Microbiology, 2022',
    category: 'overall',
  },
]

export const radarCategories: RadarCategory[] = [
  { name: '蛋白质品质', fresh: 95, dry: 75 },
  { name: '维生素保留', fresh: 88, dry: 62 },
  { name: '矿物质利用', fresh: 82, dry: 68 },
  { name: '消化吸收', fresh: 90, dry: 70 },
  { name: '抗氧化能力', fresh: 92, dry: 48 },
  { name: '整体营养', fresh: 89, dry: 65 },
]

// 获取所有营养数据
export const getAllNutritionData = (): NutritionData[] => nutritionData

// 根据分类获取营养数据
export const getNutritionDataByCategory = (category: string): NutritionData[] => {
  if (category === 'all') return nutritionData
  return nutritionData.filter(item => item.category === category)
}

// 获取营养分类列表
export const getNutritionCategories = (): string[] => {
  const categories = ['all', ...new Set(nutritionData.map(item => item.category))]
  return categories
}

// 计算营养摘要
export const calculateNutritionSummary = (): NutritionSummary => {
  const totalNutrients = nutritionData.length
  
  const improvements = nutritionData.map(item => {
    const maxValue = Math.max(item.freshFood, item.dryFood)
    const minValue = Math.min(item.freshFood, item.dryFood)
    return ((maxValue - minValue) / minValue) * 100
  })
  
  const averageImprovement = improvements.reduce((sum, imp) => sum + imp, 0) / improvements.length
  
  // 按分类统计改善幅度
  const categoryImprovements: Record<string, number[]> = {}
  nutritionData.forEach(item => {
    if (!categoryImprovements[item.category]) {
      categoryImprovements[item.category] = []
    }
    const improvement = ((item.freshFood - item.dryFood) / item.dryFood) * 100
    categoryImprovements[item.category].push(improvement)
  })
  
  // 找出改善最显著的分类
  let bestCategory = 'overall'
  let bestImprovement = 0
  
  Object.entries(categoryImprovements).forEach(([category, improvements]) => {
    const avgImprovement = improvements.reduce((sum, imp) => sum + imp, 0) / improvements.length
    if (avgImprovement > bestImprovement) {
      bestImprovement = avgImprovement
      bestCategory = category
    }
  })
  
  // 计算显著差异的营养素数量（改善超过20%）
  const significantDifferences = nutritionData.filter(item => {
    const improvement = ((item.freshFood - item.dryFood) / item.dryFood) * 100
    return improvement > 20
  }).length
  
  return {
    totalNutrients,
    averageImprovement: Math.round(averageImprovement),
    bestCategory,
    significantDifferences,
  }
}

// 获取对比结果
export const getComparisonResults = (): ComparisonResult[] => {
  return nutritionData.map(item => {
    const difference = item.freshFood - item.dryFood
    const percentageImprovement = ((item.freshFood - item.dryFood) / item.dryFood) * 100
    
    let significance: 'high' | 'medium' | 'low' = 'low'
    if (percentageImprovement > 50) significance = 'high'
    else if (percentageImprovement > 20) significance = 'medium'
    
    return {
      nutrient: item.nutrient,
      difference,
      percentageImprovement: Math.round(percentageImprovement),
      significance,
    }
  })
}

// 获取雷达图数据
export const getRadarData = (): RadarCategory[] => radarCategories

// 获取分类标签映射
export const getCategoryLabels = (): Record<string, string> => ({
  all: '全部',
  protein: '蛋白质',
  vitamin: '维生素',
  mineral: '矿物质',
  overall: '整体营养',
})
