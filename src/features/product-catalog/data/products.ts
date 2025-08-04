/**
 * 产品数据和筛选选项
 */

import { Product, FilterOptions } from '../types'

export const filterOptions: FilterOptions = {
  ageGroup: [
    { value: 'all', label: '所有年龄' },
    { value: 'puppy', label: '幼龄期' },
    { value: 'adult', label: '成年期' },
    { value: 'senior', label: '乐龄期' },
  ],
  petType: [
    { value: 'both', label: '犬猫通用' },
    { value: 'dog', label: '狗狗专用' },
    { value: 'cat', label: '猫咪专用' },
  ],
  functionality: [
    { value: 'all', label: '所有功能' },
    { value: '大脑发育', label: '大脑发育' },
    { value: '免疫增强', label: '免疫增强' },
    { value: '消化健康', label: '消化健康' },
    { value: '体重管理', label: '体重管理' },
    { value: '毛发护理', label: '毛发护理' },
    { value: '关节保健', label: '关节保健' },
    { value: '心血管', label: '心血管健康' },
  ],
  flavor: [
    { value: 'all', label: '所有口味' },
    { value: '鸡肉鲑鱼', label: '鸡肉鲑鱼' },
    { value: '牛肉鸡肉', label: '牛肉鸡肉' },
    { value: '鲑鱼鸡肉', label: '鲑鱼鸡肉' },
    { value: '火鸡鳕鱼', label: '火鸡鳕鱼' },
    { value: '鸡肉白鱼', label: '鸡肉白鱼' },
    { value: '鲑鱼沙丁鱼', label: '鲑鱼沙丁鱼' },
  ],
}

export const products: Product[] = [
  {
    id: 'puppy-growth',
    name: '幼龄成长便当',
    category: '幼龄系列',
    description:
      '专为幼犬幼猫设计的营养均衡鲜食，富含优质蛋白质和DHA，支持大脑发育和免疫系统建立。',
    mainIngredients: ['新鲜鸡肉', '鲑鱼', '胡萝卜', '南瓜', '蓝莓'],
    suitableFor: ['3-12个月幼犬', '3-12个月幼猫'],
    packaging: '150g 真空包装',
    nutritionHighlights: [
      '高蛋白质 32%',
      'DHA 0.8%',
      '钙磷比 1.2:1',
      '益生菌 10^8 CFU/g',
    ],
    price: 'NT$ 180',
    features: ['无谷物配方', '低敏配方', '易消化', '营养密度高'],
    certifications: ['HACCP认证', 'ISO22000', '台湾优良食品'],
    shelfLife: '冷冻保存18个月',
    storageInstructions: '冷冻保存，解冻后24小时内食用完毕',
    ageGroup: 'puppy',
    petType: 'both',
    functionality: ['大脑发育', '免疫增强', '消化健康'],
    flavor: '鸡肉鲑鱼',
    popularity: 95,
    isNew: false,
    isRecommended: true,
  },
  {
    id: 'adult-maintenance',
    name: '成年维持便当',
    category: '成年系列',
    description: '为成年犬猫提供完整均衡的日常营养，维持理想体重和活力状态。',
    mainIngredients: ['牛肉', '鸡肉', '地瓜', '菠菜', '蔓越莓'],
    suitableFor: ['1-7岁成犬', '1-7岁成猫'],
    packaging: '200g 真空包装',
    nutritionHighlights: ['蛋白质 28%', '脂肪 12%', '纤维 4%', 'Omega-3 1.2%'],
    price: 'NT$ 160',
    features: ['均衡营养', '维持体重', '增强免疫', '毛发亮丽'],
    certifications: ['HACCP认证', 'ISO22000'],
    shelfLife: '冷冻保存18个月',
    storageInstructions: '冷冻保存，解冻后24小时内食用完毕',
    ageGroup: 'adult',
    petType: 'both',
    functionality: ['体重管理', '毛发护理', '关节保健'],
    flavor: '牛肉鸡肉',
    popularity: 88,
    isNew: false,
    isRecommended: true,
  },
  {
    id: 'senior-care',
    name: '乐龄照护便当',
    category: '乐龄系列',
    description:
      '专为7岁以上熟龄宠物设计，添加关节保健成分，易消化配方呵护肠胃健康。',
    mainIngredients: ['鲑鱼', '鸡肉', '地瓜', '花椰菜', '蓝莓'],
    suitableFor: ['7岁以上犬猫'],
    packaging: '180g 真空包装',
    nutritionHighlights: [
      '蛋白质 26%',
      '葡萄糖胺 500mg/kg',
      'Omega-3 1.5%',
      '抗氧化剂',
    ],
    price: 'NT$ 200',
    features: ['关节保健', '心血管保护', '抗氧化', '易消化'],
    certifications: ['HACCP认证', 'ISO22000', '兽医推荐'],
    shelfLife: '冷冻保存18个月',
    storageInstructions: '冷冻保存，解冻后24小时内食用完毕',
    ageGroup: 'senior',
    petType: 'both',
    functionality: ['关节保健', '消化健康', '心血管'],
    flavor: '鲑鱼鸡肉',
    popularity: 92,
    isNew: false,
    isRecommended: true,
  },
  {
    id: 'functional-enhanced',
    name: '功能性强化便当',
    category: '功能系列',
    description: '添加特殊功能性成分，针对特定健康需求设计的专业营养配方。',
    mainIngredients: ['火鸡肉', '鳕鱼', '南瓜', '菠菜', '蔓越莓'],
    suitableFor: ['需要特殊营养的犬猫'],
    packaging: '160g 真空包装',
    nutritionHighlights: [
      '益生菌 10^9 CFU/g',
      '益生元 2%',
      '免疫球蛋白',
      '消化酶',
    ],
    price: 'NT$ 220',
    features: ['肠道健康', '免疫调节', '营养吸收', '特殊配方'],
    certifications: ['HACCP认证', 'ISO22000', '功能性食品认证'],
    shelfLife: '冷冻保存18个月',
    storageInstructions: '冷冻保存，解冻后24小时内食用完毕',
    ageGroup: 'all',
    petType: 'both',
    functionality: ['免疫增强', '消化健康'],
    flavor: '火鸡鳕鱼',
    popularity: 85,
    isNew: true,
    isRecommended: false,
  },
  {
    id: 'weight-management',
    name: '体重管理便当',
    category: '功能系列',
    description: '低脂高纤配方，帮助过重宠物健康减重，维持理想体态。',
    mainIngredients: ['鸡肉', '白鱼', '花椰菜', '胡萝卜', '苹果'],
    suitableFor: ['需要减重的犬猫'],
    packaging: '180g 真空包装',
    nutritionHighlights: ['低脂肪 8%', '高纤维 6%', '左旋肉碱', '饱腹感配方'],
    price: 'NT$ 190',
    features: ['体重控制', '饱腹感', '营养均衡', '低热量'],
    certifications: ['HACCP认证', 'ISO22000'],
    shelfLife: '冷冻保存18个月',
    storageInstructions: '冷冻保存，解冻后24小时内食用完毕',
    ageGroup: 'adult',
    petType: 'both',
    functionality: ['体重管理'],
    flavor: '鸡肉白鱼',
    popularity: 78,
    isNew: false,
    isRecommended: false,
  },
  {
    id: 'coat-care',
    name: '毛发护理便当',
    category: '功能系列',
    description: '富含Omega-3和生物素，专为改善毛发质量和皮肤健康设计。',
    mainIngredients: ['鲑鱼', '沙丁鱼', '地瓜', '菠菜', '亚麻籽'],
    suitableFor: ['毛发问题的犬猫'],
    packaging: '170g 真空包装',
    nutritionHighlights: [
      'Omega-3 2.0%',
      '生物素 100μg/kg',
      '锌 150mg/kg',
      '维生素E',
    ],
    price: 'NT$ 210',
    features: ['毛发亮丽', '皮肤健康', '抗炎配方', '营养毛囊'],
    certifications: ['HACCP认证', 'ISO22000'],
    shelfLife: '冷冻保存18个月',
    storageInstructions: '冷冻保存，解冻后24小时内食用完毕',
    ageGroup: 'all',
    petType: 'both',
    functionality: ['毛发护理'],
    flavor: '鲑鱼沙丁鱼',
    popularity: 82,
    isNew: true,
    isRecommended: false,
  },
]

export const categories = [
  '全部',
  '幼龄系列',
  '成年系列',
  '乐龄系列',
  '功能系列',
]

// 获取所有产品
export const getAllProducts = (): Product[] => products

// 根据ID获取产品
export const getProductById = (id: string): Product | undefined =>
  products.find((product) => product.id === id)

// 获取推荐产品
export const getRecommendedProducts = (): Product[] =>
  products.filter((product) => product.isRecommended)

// 获取新品
export const getNewProducts = (): Product[] =>
  products.filter((product) => product.isNew)

// 根据分类获取产品
export const getProductsByCategory = (category: string): Product[] =>
  category === '全部'
    ? products
    : products.filter((product) => product.category === category)

// 获取热门产品
export const getPopularProducts = (limit?: number): Product[] => {
  const sorted = [...products].sort((a, b) => b.popularity - a.popularity)
  return limit ? sorted.slice(0, limit) : sorted
}
