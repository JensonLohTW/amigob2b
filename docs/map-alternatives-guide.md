# 門店地圖替代方案指南

## 🗺️ 概述

由於您沒有Google Maps API，我們為您提供了多個免費的地圖替代方案，讓您的門店定位功能依然能夠正常運作。

## 🎯 可用的地圖方案

### 1. **Leaflet.js + OpenStreetMap** (推薦)

#### ✅ 優點
- **完全免費** - 無需API密鑰
- **功能強大** - 支持縮放、平移、標記等完整功能
- **真實地圖數據** - 基於OpenStreetMap的真實地理數據
- **開源穩定** - 廣泛使用的開源地圖庫
- **響應式設計** - 適配各種設備

#### 🔧 技術實現
```typescript
// 自動載入Leaflet.js
import { LeafletMapComponent } from './LeafletMapComponent'

// 使用方式
<LeafletMapComponent
  stores={stores}
  userLocation={userLocation}
  selectedStore={selectedStore}
  onStoreSelect={handleStoreSelect}
/>
```

#### 📦 已安裝的依賴
```bash
npm install leaflet react-leaflet @types/leaflet
```

### 2. **模擬地圖組件** (備用)

#### ✅ 優點
- **無外部依賴** - 純CSS和JavaScript實現
- **載入速度快** - 無需載入外部地圖資源
- **完全可控** - 可自定義所有視覺效果
- **演示友好** - 適合展示和測試

#### ⚠️ 限制
- 非真實地圖數據
- 功能相對簡單
- 僅適合演示用途

## 🎮 地圖切換功能

我們實現了一個智能地圖選擇器，讓您可以在不同地圖類型之間切換：

### MapSelector組件特性
- **動態切換** - 實時切換地圖類型
- **用戶友好** - 清晰的選項說明
- **設置保存** - 記住用戶偏好
- **響應式設計** - 適配移動端

### 使用方式
```typescript
import { MapComponent } from './MapComponent'

// 包含地圖選擇器的完整組件
<MapComponent
  stores={stores}
  userLocation={userLocation}
  selectedStore={selectedStore}
  onStoreSelect={handleStoreSelect}
/>

// 或者直接使用簡化版本（僅Leaflet地圖）
import { SimpleMapComponent } from './MapComponent'

<SimpleMapComponent {...mapProps} />
```

## 🎨 視覺設計

### 黑白灰配色方案
所有地圖組件都採用了統一的黑白灰配色：

- **主要文字**: `text-neutral-900`
- **次要文字**: `text-neutral-600`
- **背景**: `bg-white`, `bg-neutral-50`
- **邊框**: `border-neutral-200`
- **按鈕**: 統一的shadcn/ui按鈕樣式

### 門店標記顏色
- 🟢 **綠色** - 營業中 (`#10b981`)
- 🟡 **黃色** - 維護中 (`#f59e0b`)
- 🔵 **藍色** - 即將開業 (`#3b82f6`)
- 🔴 **紅色** - 已選中 (`#ef4444`)
- 🔵 **藍色脈衝** - 用戶位置

## 🚀 功能特性

### Leaflet地圖功能
1. **互動控制**
   - 縮放按鈕 (+/-)
   - 重新定位按鈕
   - 拖拽平移

2. **門店標記**
   - 點擊查看詳情
   - 狀態顏色區分
   - 選中狀態高亮

3. **用戶位置**
   - 藍色脈衝標記
   - 自動定位功能

4. **圖例說明**
   - 顏色含義說明
   - 動態顯示

### 響應式設計
- **移動端**: 觸控優化，大按鈕
- **平板端**: 平衡的布局
- **桌面端**: 完整功能展示

## 🔧 配置選項

### 默認地圖類型
```typescript
// 在MapSelector中設置默認地圖
<MapSelector defaultMapType="leaflet" />

// 或者根據環境變量決定
const defaultMapType = process.env.NODE_ENV === 'development' ? 'mock' : 'leaflet'
```

### 自定義樣式
```typescript
// 自定義地圖容器樣式
<MapComponent className="h-96 rounded-lg border" />

// 自定義標記樣式（在LeafletMapComponent中）
const customIcon = L.divIcon({
  html: `<div style="background: ${customColor}">...</div>`,
  className: 'custom-marker'
})
```

## 📱 使用建議

### 生產環境
- **推薦使用**: Leaflet.js + OpenStreetMap
- **原因**: 真實地圖數據，用戶體驗最佳

### 開發/測試環境
- **可選使用**: 模擬地圖組件
- **原因**: 載入速度快，無外部依賴

### 演示環境
- **建議**: 提供地圖切換選項
- **原因**: 讓用戶體驗不同方案

## 🔄 未來升級路徑

### 如果獲得Google Maps API
1. 創建GoogleMapComponent
2. 在MapSelector中添加Google Maps選項
3. 保持現有組件作為備用方案

### 其他地圖服務
- **MapTiler**: 免費額度25,000次/月
- **Mapbox**: 免費額度50,000次/月
- **HERE Maps**: 免費額度25,000次/月

## 🛠️ 故障排除

### Leaflet載入問題
```typescript
// 確保動態導入
if (typeof window !== 'undefined') {
  import('leaflet').then((L) => {
    // 初始化地圖
  })
}
```

### CSS樣式問題
```html
<!-- 確保載入Leaflet CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
```

### 圖標顯示問題
```typescript
// 修復Leaflet圖標路徑
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})
```

## 📞 技術支持

如有任何問題或需要進一步自定義，請參考：
- [Leaflet.js 官方文檔](https://leafletjs.com/)
- [OpenStreetMap 使用指南](https://www.openstreetmap.org/)
- [React Leaflet 文檔](https://react-leaflet.js.org/)

---

**更新時間**: 2025-08-05  
**狀態**: ✅ 已實現並測試通過
