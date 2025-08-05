'use client'

import { LeafletMapComponent } from './LeafletMapComponent'
import { MapComponentProps } from '../types'

/**
 * 簡化的地圖組件
 * 直接使用Leaflet地圖，統一尺寸規範
 */
export function MapComponent(props: MapComponentProps) {
  return <LeafletMapComponent {...props} />
}

/**
 * 簡化版地圖組件（別名）
 */
export function SimpleMapComponent(props: MapComponentProps) {
  return <LeafletMapComponent {...props} />
}
