/**
 * 产品目录相关的类型定义
 */

export interface Product {
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
  ageGroup: 'puppy' | 'adult' | 'senior' | 'all'
  petType: 'dog' | 'cat' | 'both'
  functionality: string[]
  flavor: string
  popularity: number
  isNew: boolean
  isRecommended: boolean
}

export interface ProductFilters {
  category: string
  ageGroup: string
  petType: string
  functionality: string
  flavor: string
}

export interface FilterOption {
  value: string
  label: string
}

export interface FilterOptions {
  ageGroup: FilterOption[]
  petType: FilterOption[]
  functionality: FilterOption[]
  flavor: FilterOption[]
}

export interface ProductCardProps {
  product: Product
  isHovered?: boolean
  onHover?: (productId: string | null) => void
  onClick?: (product: Product) => void
  className?: string
}

export interface ProductFiltersProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  className?: string
}

export interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export interface ProductCatalogProps {
  initialFilters?: Partial<ProductFilters>
  showFilters?: boolean
  showQuickFilters?: boolean
  className?: string
}

export interface ProductGridProps {
  products: Product[]
  hoveredProduct: string | null
  onProductHover: (productId: string | null) => void
  onProductClick: (product: Product) => void
  className?: string
}

export interface QuickFiltersProps {
  onFilterClick: (filterType: keyof ProductFilters, value: string) => void
  className?: string
}

export interface ProductStatsProps {
  totalProducts: number
  filteredProducts: number
  categories: string[]
  className?: string
}

// 排序选项
export type SortOption = 'popularity' | 'name' | 'price' | 'newest'

export interface SortConfig {
  field: SortOption
  direction: 'asc' | 'desc'
}

// 搜索相关
export interface SearchConfig {
  query: string
  fields: (keyof Product)[]
}

// 分页相关
export interface PaginationConfig {
  page: number
  pageSize: number
  total: number
}
