/**
 * 成分配方数据
 */

import { Recipe, Ingredient, IngredientAnalysis } from '../types'

export const freshFoodRecipe: Recipe = {
  name: '成犬鲜食便当',
  totalWeight: 200,
  description: '专为成年犬设计的营养均衡鲜食配方',
  targetAge: 'adult',
  targetSize: 'all',
  ingredients: [
    {
      name: '新鲜鸡胸肉',
      weight: 74,
      percentage: 37,
      protein: 23,
      benefits: ['优质完全蛋白质', '必需氨基酸完整', '易消化吸收'],
      color: '#3b82f6',
      category: 'protein',
      source: '台湾本土农场',
      freshness: 'fresh',
    },
    {
      name: '鲑鱼肉',
      weight: 30,
      percentage: 15,
      protein: 6,
      benefits: ['Omega-3 脂肪酸', '促进毛发光泽', '抗发炎'],
      color: '#60a5fa',
      category: 'protein',
      source: '挪威进口',
      freshness: 'fresh',
    },
    {
      name: '地瓜',
      weight: 26,
      percentage: 13,
      protein: 0.5,
      benefits: ['复合碳水化合物', '膳食纤维', '维生素A'],
      color: '#f59e0b',
      category: 'vegetable',
      source: '台湾云林',
      freshness: 'fresh',
    },
    {
      name: '胡萝卜',
      weight: 20,
      percentage: 10,
      protein: 0.2,
      benefits: ['β-胡萝卜素', '维生素K', '抗氧化'],
      color: '#f97316',
      category: 'vegetable',
      source: '台湾彰化',
      freshness: 'fresh',
    },
    {
      name: '菠菜',
      weight: 16,
      percentage: 8,
      protein: 0.8,
      benefits: ['叶酸', '铁质', '维生素K'],
      color: '#22c55e',
      category: 'vegetable',
      source: '台湾南投',
      freshness: 'fresh',
    },
    {
      name: '花椰菜',
      weight: 14,
      percentage: 7,
      protein: 0.6,
      benefits: ['维生素C', '膳食纤维', '抗氧化'],
      color: '#16a34a',
      category: 'vegetable',
      source: '台湾嘉义',
      freshness: 'fresh',
    },
    {
      name: '蓝莓',
      weight: 12,
      percentage: 6,
      protein: 0.1,
      benefits: ['花青素', '抗氧化', '护眼'],
      color: '#6366f1',
      category: 'supplement',
      source: '智利进口',
      freshness: 'frozen',
    },
    {
      name: '亚麻籽',
      weight: 8,
      percentage: 4,
      protein: 1.8,
      benefits: ['Omega-3', '膳食纤维', '木酚素'],
      color: '#8b5cf6',
      category: 'supplement',
      source: '加拿大进口',
      freshness: 'dried',
    },
  ],
  nutritionSummary: {
    protein: 32.9,
    fat: 12.5,
    carbs: 8.2,
    fiber: 3.8,
    moisture: 75.0,
    calories: 185,
    vitamins: {
      A: 850,
      C: 45,
      E: 12,
      K: 28,
    },
    minerals: {
      钙: 120,
      磷: 180,
      铁: 8.5,
      锌: 6.2,
    },
  },
}

export const dryFoodRecipe: Recipe = {
  name: '传统干粮',
  totalWeight: 100,
  description: '市售传统干粮成分分析',
  targetAge: 'adult',
  targetSize: 'all',
  ingredients: [
    {
      name: '鸡肉粉',
      weight: 25,
      percentage: 25,
      protein: 18,
      benefits: ['蛋白质来源'],
      color: '#94a3b8',
      category: 'protein',
      source: '工业加工',
      freshness: 'dried',
    },
    {
      name: '玉米',
      weight: 20,
      percentage: 20,
      protein: 1.6,
      benefits: ['碳水化合物'],
      color: '#fbbf24',
      category: 'grain',
      source: '工业原料',
      freshness: 'dried',
    },
    {
      name: '小麦',
      weight: 18,
      percentage: 18,
      protein: 2.2,
      benefits: ['碳水化合物', '蛋白质'],
      color: '#d97706',
      category: 'grain',
      source: '工业原料',
      freshness: 'dried',
    },
    {
      name: '动物脂肪',
      weight: 12,
      percentage: 12,
      protein: 0,
      benefits: ['脂肪来源'],
      color: '#78716c',
      category: 'supplement',
      source: '工业副产品',
      freshness: 'dried',
    },
    {
      name: '大豆粉',
      weight: 10,
      percentage: 10,
      protein: 4.5,
      benefits: ['植物蛋白'],
      color: '#a3a3a3',
      category: 'protein',
      source: '工业原料',
      freshness: 'dried',
    },
    {
      name: '维生素预混料',
      weight: 8,
      percentage: 8,
      protein: 0,
      benefits: ['维生素补充'],
      color: '#6b7280',
      category: 'supplement',
      source: '化学合成',
      freshness: 'dried',
    },
    {
      name: '矿物质预混料',
      weight: 7,
      percentage: 7,
      protein: 0,
      benefits: ['矿物质补充'],
      color: '#9ca3af',
      category: 'supplement',
      source: '化学合成',
      freshness: 'dried',
    },
  ],
  nutritionSummary: {
    protein: 26.3,
    fat: 15.0,
    carbs: 45.0,
    fiber: 4.0,
    moisture: 10.0,
    calories: 350,
    vitamins: {
      A: 500,
      C: 15,
      E: 8,
      K: 12,
    },
    minerals: {
      钙: 100,
      磷: 150,
      铁: 6.0,
      锌: 4.5,
    },
  },
}

export const puppyRecipe: Recipe = {
  name: '幼犬鲜食便当',
  totalWeight: 150,
  description: '专为幼犬成长设计的高蛋白配方',
  targetAge: 'puppy',
  targetSize: 'all',
  ingredients: [
    {
      name: '新鲜鸡胸肉',
      weight: 60,
      percentage: 40,
      protein: 26,
      benefits: ['高蛋白质', '易消化', '促进成长'],
      color: '#3b82f6',
      category: 'protein',
      source: '台湾本土农场',
      freshness: 'fresh',
    },
    {
      name: '鲑鱼肉',
      weight: 30,
      percentage: 20,
      protein: 8,
      benefits: ['DHA', '促进大脑发育', 'Omega-3'],
      color: '#60a5fa',
      category: 'protein',
      source: '挪威进口',
      freshness: 'fresh',
    },
    {
      name: '南瓜',
      weight: 24,
      percentage: 16,
      protein: 0.3,
      benefits: ['维生素A', '膳食纤维', '易消化'],
      color: '#f59e0b',
      category: 'vegetable',
      source: '台湾屏东',
      freshness: 'fresh',
    },
    {
      name: '蛋黄',
      weight: 18,
      percentage: 12,
      protein: 2.7,
      benefits: ['卵磷脂', '胆碱', '促进大脑发育'],
      color: '#fbbf24',
      category: 'protein',
      source: '台湾本土农场',
      freshness: 'fresh',
    },
    {
      name: '花椰菜',
      weight: 12,
      percentage: 8,
      protein: 0.5,
      benefits: ['维生素C', '叶酸', '抗氧化'],
      color: '#16a34a',
      category: 'vegetable',
      source: '台湾嘉义',
      freshness: 'fresh',
    },
    {
      name: '蓝莓',
      weight: 6,
      percentage: 4,
      protein: 0.1,
      benefits: ['花青素', '抗氧化', '护眼'],
      color: '#6366f1',
      category: 'supplement',
      source: '智利进口',
      freshness: 'frozen',
    },
  ],
  nutritionSummary: {
    protein: 37.6,
    fat: 14.8,
    carbs: 6.5,
    fiber: 2.8,
    moisture: 78.0,
    calories: 195,
    vitamins: {
      A: 1200,
      C: 55,
      E: 15,
      K: 32,
    },
    minerals: {
      钙: 140,
      磷: 200,
      铁: 9.2,
      锌: 7.8,
    },
  },
}

// 获取所有配方
export const getAllRecipes = (): Recipe[] => [
  freshFoodRecipe,
  dryFoodRecipe,
  puppyRecipe,
]

// 根据年龄获取配方
export const getRecipesByAge = (
  age: 'puppy' | 'adult' | 'senior' | 'all',
): Recipe[] => {
  if (age === 'all') return getAllRecipes()
  return getAllRecipes().filter(
    (recipe) => recipe.targetAge === age || recipe.targetAge === 'all',
  )
}

// 分析成分
export const analyzeIngredients = (recipe: Recipe): IngredientAnalysis => {
  const ingredients = recipe.ingredients

  return {
    totalIngredients: ingredients.length,
    proteinSources: ingredients.filter((ing) => ing.category === 'protein')
      .length,
    vegetableSources: ingredients.filter((ing) => ing.category === 'vegetable')
      .length,
    averageProtein:
      Math.round(
        (ingredients.reduce((sum, ing) => sum + ing.protein, 0) /
          ingredients.length) *
          10,
      ) / 10,
    topIngredient: ingredients.reduce((top, current) =>
      current.percentage > top.percentage ? current : top,
    ),
    nutritionScore: Math.round(
      recipe.nutritionSummary.protein * 0.4 +
        recipe.nutritionSummary.moisture * 0.3 +
        (100 - recipe.nutritionSummary.carbs) * 0.3,
    ),
  }
}

// 获取默认配方
export const getDefaultRecipe = (): Recipe => freshFoodRecipe
