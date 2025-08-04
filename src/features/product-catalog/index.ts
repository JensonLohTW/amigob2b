/**
 * 产品目录功能模块入口文件
 * 统一导出所有公共接口
 */

// 主组件
export { ProductCatalog } from './components/ProductCatalog'

// 子组件
export { ProductCard } from './components/ProductCard'
export { ProductFilters as ProductFiltersComponent, QuickFilters } from './components/ProductFilters'
export { ProductGrid, ProductStats, ProductGridSkeleton } from './components/ProductGrid'
export { ProductModal } from './components/ProductModal'

// 自定义 Hook
export { useProductFilters } from './hooks/useProductFilters'

// 数据和服务
export {
  getAllProducts,
  getProductById,
  getRecommendedProducts,
  getNewProducts,
  getProductsByCategory,
  getPopularProducts,
  filterOptions,
  categories,
  products,
} from './data/products'

// 类型定义
export type {
  Product,
  ProductFilters,
  FilterOption,
  FilterOptions,
  ProductCardProps,
  ProductFiltersProps,
  ProductModalProps,
  ProductCatalogProps,
  ProductGridProps,
  QuickFiltersProps,
  ProductStatsProps,
  SortOption,
  SortConfig,
  SearchConfig,
  PaginationConfig,
} from './types'
