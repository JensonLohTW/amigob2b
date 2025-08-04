/**
 * 门店定位相关的类型定义
 */

export interface Store {
  id: number
  name: string
  address: string
  district: string
  city: string
  phone: string
  hours: string
  coordinates: { lat: number; lng: number }
  features: string[]
  status: 'active' | 'maintenance' | 'coming_soon'
  productCount: number
  rating: number
  distance?: number
  image?: string
  description?: string
  services?: string[]
  manager?: string
  email?: string
}

export interface Location {
  lat: number
  lng: number
}

export interface SearchFilters {
  city: string
  district: string
  status: string
  radius: number
  sortBy: string
  searchText?: string
  features?: string[]
}

export interface StoreCardProps {
  store: Store
  onSelect?: (store: Store) => void
  showDistance?: boolean
  className?: string
}

export interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void
  initialFilters?: Partial<SearchFilters>
  className?: string
}

export interface StoreListProps {
  stores: Store[]
  onStoreSelect?: (store: Store) => void
  loading?: boolean
  className?: string
}

export interface MapComponentProps {
  stores: Store[]
  userLocation?: Location | null
  selectedStore?: Store | null
  onStoreSelect?: (store: Store) => void
  className?: string
}

export interface StoreLocatorContentProps {
  initialLocation?: Location
  showMap?: boolean
  showFilters?: boolean
  className?: string
}

export interface LocationData {
  [city: string]: string[]
}

export interface StoreStats {
  totalStores: number
  activeStores: number
  cities: number
  averageRating: number
}

// 搜索和过滤相关类型
export type SortOption = 'distance' | 'rating' | 'name' | 'newest'
export type StatusFilter = 'all' | 'active' | 'maintenance' | 'coming_soon'
export type DistanceUnit = 'km' | 'mile'

export interface SearchOptions {
  query?: string
  location?: Location
  radius?: number
  unit?: DistanceUnit
  filters?: {
    city?: string
    district?: string
    status?: StatusFilter
    features?: string[]
    minRating?: number
  }
  sort?: {
    by: SortOption
    direction: 'asc' | 'desc'
  }
  pagination?: {
    page: number
    limit: number
  }
}

export interface SearchResult {
  stores: Store[]
  total: number
  page: number
  totalPages: number
  stats: StoreStats
}

// 地图相关类型
export interface MapMarker {
  id: number
  position: Location
  title: string
  status: Store['status']
  onClick?: () => void
}

export interface MapBounds {
  north: number
  south: number
  east: number
  west: number
}

// 工具函数类型
export interface DistanceCalculator {
  (lat1: number, lng1: number, lat2: number, lng2: number): number
}

export interface GeolocationService {
  getCurrentPosition(): Promise<Location>
  watchPosition(callback: (location: Location) => void): number
  clearWatch(watchId: number): void
}

// 动画和UI相关类型
export interface AnimationConfig {
  duration: number
  delay: number
  ease: string
}

export interface ViewState {
  view: 'list' | 'map' | 'grid'
  selectedStore: Store | null
  isLoading: boolean
  error: string | null
}

// 事件处理类型
export interface StoreLocatorEvents {
  onStoreSelect: (store: Store) => void
  onLocationChange: (location: Location) => void
  onFiltersChange: (filters: SearchFilters) => void
  onViewChange: (view: ViewState['view']) => void
  onError: (error: string) => void
}

// 配置类型
export interface StoreLocatorConfig {
  defaultLocation: Location
  defaultRadius: number
  maxRadius: number
  enableGeolocation: boolean
  enableMap: boolean
  enableFilters: boolean
  itemsPerPage: number
  mapApiKey?: string
}

// 响应式设计类型
export interface BreakpointConfig {
  mobile: number
  tablet: number
  desktop: number
  wide: number
}

// 主题和样式类型
export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    success: string
    warning: string
    error: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
  }
}
