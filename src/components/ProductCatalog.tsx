'use client'

import { useState } from 'react'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Container } from '@/components/Container'
import { motion, AnimatePresence } from 'framer-motion'

interface Product {
  id: string
  name: string
  category: string
  description: string
  mainIngredients: string[]
  suitableFor: string[]
  packaging: string
  nutritionHighlights: string[]
  price: string
  features: string[]
  image?: string
  certifications: string[]
  shelfLife: string
  storageInstructions: string
}

const products: Product[] = [
  {
    id: 'puppy-kitten',
    name: '幼齡犬貓鮮食便當',
    category: '幼齡系列',
    description:
      '專為0-12個月幼齡寵物設計，富含高品質蛋白質和DHA，支持大腦發育和免疫系統建立。',
    mainIngredients: ['新鮮雞肉', '鮭魚', '地瓜', '胡蘿蔔', '菠菜', 'DHA藻油'],
    suitableFor: ['0-12個月幼犬', '0-12個月幼貓', '懷孕哺乳期母犬貓'],
    packaging: '150g/盒，冷藏保存7天',
    nutritionHighlights: [
      '高蛋白質 32%',
      'DHA 0.3%',
      '鈣磷比 1.2:1',
      '易消化配方',
    ],
    price: 'NT$ 180',
    features: ['促進大腦發育', '增強免疫力', '易消化吸收', '天然無添加'],
    certifications: ['HACCP認證', '人食等級', '無防腐劑', 'ISO22000'],
    shelfLife: '冷藏保存7天',
    storageInstructions: '請保存於0-4°C冷藏環境，開封後請盡快食用完畢',
  },
  {
    id: 'adult',
    name: '成年犬貓鮮食便當',
    category: '成年系列',
    description:
      '為1-7歲成年寵物提供均衡營養，維持理想體重和活力，適合日常營養需求。',
    mainIngredients: ['牛肉', '雞肉', '糙米', '南瓜', '花椰菜', '亞麻籽油'],
    suitableFor: ['1-7歲成犬', '1-7歲成貓', '活動量正常的寵物'],
    packaging: '200g/盒，冷藏保存7天',
    nutritionHighlights: ['蛋白質 28%', '脂肪 12%', '纖維 4%', '均衡營養配方'],
    price: 'NT$ 160',
    features: ['維持理想體重', '提供持續能量', '促進毛髮光澤', '支持關節健康'],
    certifications: ['HACCP認證', '人食等級', '營養均衡', 'ISO22000'],
    shelfLife: '冷藏保存7天',
    storageInstructions: '請保存於0-4°C冷藏環境，避免陽光直射',
  },
  {
    id: 'senior',
    name: '樂齡犬貓鮮食便當',
    category: '樂齡系列',
    description:
      '專為7歲以上高齡寵物調配，易消化且營養豐富，添加關節保健成分。',
    mainIngredients: ['鮭魚', '雞胸肉', '地瓜', '藍莓', '葡萄糖胺', '軟骨素'],
    suitableFor: ['7歲以上老犬', '7歲以上老貓', '關節問題寵物'],
    packaging: '180g/盒，冷藏保存7天',
    nutritionHighlights: [
      '易消化蛋白質 25%',
      '葡萄糖胺 500mg',
      '抗氧化成分',
      '低磷配方',
    ],
    price: 'NT$ 200',
    features: ['關節保健', '易消化配方', '抗氧化保護', '心臟健康支持'],
    certifications: ['HACCP認證', '人食等級', '樂齡專用', '獸醫推薦'],
    shelfLife: '冷藏保存7天',
    storageInstructions: '請保存於0-4°C冷藏環境，適合分次餵食',
  },
  {
    id: 'functional',
    name: '功能性強化便當',
    category: '功能系列',
    description:
      '針對特殊健康需求設計，強化免疫系統，適合體質較弱或康復期的寵物。',
    mainIngredients: ['火雞肉', '鱈魚', '紫薯', '蔓越莓', '薑黃', '益生菌'],
    suitableFor: ['免疫力較弱寵物', '康復期寵物', '容易生病的寵物'],
    packaging: '160g/盒，冷藏保存5天',
    nutritionHighlights: [
      '免疫蛋白 30%',
      '益生菌 10億CFU',
      '薑黃素',
      '天然抗氧化',
    ],
    price: 'NT$ 220',
    features: ['增強免疫力', '抗發炎效果', '腸道健康', '快速恢復'],
    certifications: ['HACCP認證', '人食等級', '功能性食品', '獸醫推薦'],
    shelfLife: '冷藏保存5天',
    storageInstructions: '請保存於0-4°C冷藏環境，建議搭配正餐使用',
  },
]

const categories = ['全部', '幼齡系列', '成年系列', '樂齡系列', '功能系列']

export function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const filteredProducts =
    selectedCategory === '全部'
      ? products
      : products.filter((product) => product.category === selectedCategory)

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      {/* 分類篩選 */}
      <FadeIn>
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-neutral-950 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* 產品網格 */}
      <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {filteredProducts.map((product) => (
          <FadeIn key={product.id}>
            <motion.div
              className="group relative cursor-pointer rounded-3xl bg-neutral-50 p-8 transition-all hover:bg-neutral-100"
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                      {product.category}
                    </span>
                    <motion.span
                      className="text-lg font-bold text-neutral-950"
                      animate={{
                        scale: hoveredProduct === product.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {product.price}
                    </motion.span>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-neutral-950">
                    {product.name}
                  </h3>

                  <p className="mb-4 leading-relaxed text-neutral-600">
                    {product.description}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="mb-1 text-sm font-medium text-neutral-950">
                        主要成分
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {product.mainIngredients.map((ingredient, index) => (
                          <span
                            key={index}
                            className="inline-block rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-600"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-1 text-sm font-medium text-neutral-950">
                        適用對象
                      </h4>
                      <p className="text-sm text-neutral-600">
                        {product.suitableFor.join('、')}
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-1 text-sm font-medium text-neutral-950">
                        包裝規格
                      </h4>
                      <p className="text-sm text-neutral-600">
                        {product.packaging}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedProduct(product)
                    }}
                    className="mt-6 inline-flex items-center text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-950"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    查看詳細資訊
                    <motion.svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      animate={{ x: hoveredProduct === product.id ? 3 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </motion.svg>
                  </motion.button>

                  {/* 認證標章 */}
                  <div className="mt-4 flex flex-wrap gap-1">
                    {product.certifications.slice(0, 2).map((cert, index) => (
                      <span
                        key={index}
                        className="inline-block rounded bg-green-100 px-2 py-1 text-xs text-green-700"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </FadeInStagger>

      {/* 產品詳細資訊彈窗 */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-950">
                    {selectedProduct.name}
                  </h2>
                  <p className="mt-1 text-lg font-semibold text-neutral-700">
                    {selectedProduct.price}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-neutral-400 transition-colors hover:text-neutral-600"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold text-neutral-950">
                    產品特色
                  </h3>
                  <ul className="space-y-1">
                    {selectedProduct.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-neutral-600"
                      >
                        <svg
                          className="mr-2 h-4 w-4 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-neutral-950">
                    營養成分亮點
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProduct.nutritionHighlights.map(
                      (highlight, index) => (
                        <div
                          key={index}
                          className="rounded-lg bg-neutral-50 p-3 text-center"
                        >
                          <span className="text-sm font-medium text-neutral-700">
                            {highlight}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-neutral-950">
                    主要成分
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.mainIngredients.map(
                      (ingredient, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600"
                        >
                          {ingredient}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-neutral-950">
                    認證標章
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center rounded-lg bg-green-50 p-2"
                      >
                        <svg
                          className="mr-2 h-4 w-4 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-green-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold text-neutral-950">
                    保存說明
                  </h3>
                  <div className="rounded-lg bg-blue-50 p-4">
                    <div className="flex items-start">
                      <svg
                        className="mt-0.5 mr-2 h-5 w-5 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p className="mb-1 text-sm font-medium text-blue-700">
                          保存期限：{selectedProduct.shelfLife}
                        </p>
                        <p className="text-sm text-blue-600">
                          {selectedProduct.storageInstructions}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  )
}
