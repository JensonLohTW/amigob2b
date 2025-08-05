# 地圖組件尺寸規範指南

## 📐 統一尺寸標準

為了確保所有地圖組件與Card容器協調一致，我們制定了以下統一的尺寸規範：

### 🎯 核心尺寸規範

```css
/* 統一的地圖容器尺寸 */
.map-container {
  width: 100%;
  aspect-ratio: 16/9; /* video比例 */
  min-height: 360px;  /* 最小高度 */
  max-height: 480px;  /* 最大高度 */
  border-radius: 0.5rem; /* rounded-lg */
}
```

### 📱 響應式設計

#### 移動端 (< 640px)
- **高度**: `min-h-[360px]` 
- **比例**: 保持16:9比例
- **控制按鈕**: 較小尺寸 `h-9 w-9`

#### 平板端 (640px - 1024px)
- **高度**: 自適應，介於360px-480px之間
- **比例**: 16:9比例
- **控制按鈕**: 標準尺寸 `h-9 w-9`

#### 桌面端 (> 1024px)
- **高度**: `max-h-[480px]`
- **比例**: 16:9比例
- **控制按鈕**: 標準尺寸 `h-9 w-9`

## 🎨 視覺設計規範

### Card容器設置
```typescript
// 地圖Card容器
<Card className="border-neutral-200">
  <CardHeader>
    <CardTitle>門店地圖</CardTitle>
  </CardHeader>
  <CardContent className="p-0"> {/* 重要：移除內邊距 */}
    <MapComponent />
  </CardContent>
</Card>
```

### 地圖組件樣式
```typescript
// 地圖容器基礎樣式
<div className="relative overflow-hidden rounded-lg">
  <div className="w-full aspect-video min-h-[360px] max-h-[480px]">
    {/* 地圖內容 */}
  </div>
</div>
```

## 🔧 組件實現

### LeafletMapComponent
```typescript
// 統一的容器樣式
<div className="relative overflow-hidden rounded-lg">
  <div ref={mapRef} className="w-full aspect-video min-h-[360px] max-h-[480px]" />
  
  {/* 控制按鈕 - 調整位置避免邊界衝突 */}
  <div className="absolute top-3 right-3 flex flex-col gap-2 z-[1000]">
    <Button className="h-9 w-9 bg-white/90 backdrop-blur-sm" />
  </div>
  
  {/* 圖例 - 調整位置和樣式 */}
  <Card className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm">
    <CardContent className="p-2.5" />
  </Card>
</div>
```

### MockMapComponent
```typescript
// 保持一致的尺寸
<div className="relative overflow-hidden rounded-lg bg-neutral-100">
  <div className="relative w-full aspect-video min-h-[360px] max-h-[480px]">
    {/* 模擬地圖內容 */}
  </div>
</div>
```

## 🎯 關鍵改進點

### 1. 統一高度規範
- ✅ **之前**: LeafletMap使用`min-h-[400px]`，MockMap使用`aspect-video`
- ✅ **現在**: 兩者都使用`aspect-video min-h-[360px] max-h-[480px]`

### 2. Card容器優化
- ✅ **之前**: CardContent有默認padding，導致地圖與容器邊界不協調
- ✅ **現在**: 使用`p-0`移除內邊距，地圖完美貼合容器

### 3. 控制元素位置
- ✅ **之前**: 控制按鈕和圖例距離邊界4個單位
- ✅ **現在**: 調整為3個單位，避免與Card邊界產生視覺衝突

### 4. 視覺一致性
- ✅ **背景透明度**: 使用`bg-white/90 backdrop-blur-sm`
- ✅ **邊框統一**: 所有組件使用`border-neutral-200`
- ✅ **圓角統一**: 地圖容器使用`rounded-lg`

## 📏 具體尺寸對照

| 組件 | 寬度 | 高度 | 比例 | 圓角 |
|------|------|------|------|------|
| 地圖容器 | `w-full` | `aspect-video min-h-[360px] max-h-[480px]` | 16:9 | `rounded-lg` |
| 控制按鈕 | `w-9` | `h-9` | 1:1 | `rounded-lg` |
| 圖例卡片 | 自適應 | 自適應 | - | `rounded-lg` |
| Card容器 | `w-full` | 自適應 | - | `rounded-xl` |

## 🎨 黑白灰配色應用

### 主要顏色
- **背景**: `bg-white`, `bg-neutral-50`
- **邊框**: `border-neutral-200`
- **文字**: `text-neutral-900` (主要), `text-neutral-600` (次要)
- **按鈕**: `bg-white/90 backdrop-blur-sm`

### 門店標記顏色
- 🟢 **營業中**: `#10b981` (green-500)
- 🟡 **維護中**: `#f59e0b` (yellow-500)
- 🔵 **即將開業**: `#3b82f6` (blue-500)
- 🔴 **已選中**: `#ef4444` (red-500)
- 🔵 **用戶位置**: `#3b82f6` (blue-600, 帶脈衝動畫)

## 🔍 使用示例

### 基本使用
```typescript
import { MapComponent } from './MapComponent'

<MapComponent
  stores={stores}
  userLocation={userLocation}
  selectedStore={selectedStore}
  onStoreSelect={handleStoreSelect}
/>
```

### 在Card中使用
```typescript
<Card className="border-neutral-200">
  <CardHeader>
    <CardTitle>門店地圖</CardTitle>
  </CardHeader>
  <CardContent className="p-0">
    <MapComponent {...mapProps} />
  </CardContent>
</Card>
```

## ✅ 檢查清單

在實現地圖組件時，請確保：

- [ ] 使用統一的尺寸規範 (`aspect-video min-h-[360px] max-h-[480px]`)
- [ ] Card容器使用 `p-0` 移除內邊距
- [ ] 控制按鈕位置為 `top-3 right-3`
- [ ] 圖例位置為 `bottom-3 left-3`
- [ ] 使用半透明背景 `bg-white/90 backdrop-blur-sm`
- [ ] 遵循黑白灰配色方案
- [ ] 確保響應式設計在所有設備上正常工作
- [ ] 測試地圖與Card容器的視覺協調性

---

**更新時間**: 2025-08-05  
**狀態**: ✅ 已實現並測試通過
