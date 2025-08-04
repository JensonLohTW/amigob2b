/**
 * 产品目录组件
 * 重构后的简化版本，使用模块化架构
 */

'use client'

import { ProductCatalog as ProductCatalogFeature } from '@/features/product-catalog'

export function ProductCatalog() {
  return <ProductCatalogFeature />
}
