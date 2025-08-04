/**
 * 门店定位功能模块入口文件
 * 统一导出所有公共接口
 */

// 主组件
export { StoreLocatorContent } from './components/StoreLocatorContent'

// 子組件
export { StoreCard, StoreCardSkeleton } from './components/StoreCard'
export { SearchFilters as SearchFiltersComponent } from './components/SearchFilters'
export { StoreList, StoreStats } from './components/StoreList'
export { MapComponent, MapSkeleton } from './components/MapComponent'
export { GoogleMapComponent, GoogleMapSkeleton } from './components/GoogleMapComponent'

// 数据和服务
export {
  getAllStores,
  getStoresByCity,
  getStoresByDistrict,
  getStoresByStatus,
  getStoreById,
  getStoreStats,
  getAllCities,
  getDistrictsByCity,
  getAllFeatures,
  searchStores,
  getNearbyStores,
  calculateDistance,
  storeData,
  locationData,
} from './data/stores'

// 类型定义
export type {
  Store,
  Location,
  SearchFilters,
  StoreCardProps,
  SearchFiltersProps,
  StoreListProps,
  MapComponentProps,
  StoreLocatorContentProps,
  LocationData,
  StoreStats as StoreStatsType,
  SortOption,
  StatusFilter,
  DistanceUnit,
  SearchOptions,
  SearchResult,
  MapMarker,
  MapBounds,
  DistanceCalculator,
  GeolocationService,
  AnimationConfig,
  ViewState,
  StoreLocatorEvents,
  StoreLocatorConfig,
  BreakpointConfig,
  ThemeConfig,
} from './types'
