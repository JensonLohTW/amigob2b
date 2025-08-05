# Next.js 緩存清除指南

## 🎯 問題描述

當您更新了靜態資源（如favicon.ico、圖片、CSS等）但頁面沒有反映變化時，通常是緩存問題導致的。

## 🧹 解決方案

### 方法1：使用自動化腳本（推薦）

```bash
# 運行緩存清除腳本
./scripts/clear-cache.sh
```

這個腳本會自動：
- 停止開發服務器
- 清除 `.next` 目錄
- 清除 `node_modules/.cache` 目錄
- 清除包管理器緩存
- 重新啟動開發服務器

### 方法2：手動清除

```bash
# 1. 停止開發服務器
# 按 Ctrl+C 或 Cmd+C

# 2. 清除Next.js緩存
rm -rf .next

# 3. 清除Node.js模塊緩存
rm -rf node_modules/.cache

# 4. 重新啟動
./scripts/dev.sh
```

### 方法3：深度清除（問題嚴重時）

```bash
# 完全重新安裝依賴
rm -rf node_modules
rm -rf .next
rm -rf package-lock.json  # 或 yarn.lock

npm install  # 或 yarn install
./scripts/dev.sh
```

## 🖼️ Favicon 特殊處理

### 問題：favicon.ico 格式錯誤

如果您的favicon.ico實際上是PNG格式，Next.js會報錯：

```
Error: Image import "favicon.ico" is not a valid image file.
```

### 解決方案：

#### 選項1：重命名為icon.png（推薦）
```bash
mv src/app/favicon.ico src/app/icon.png
```

#### 選項2：轉換為真正的ICO格式
使用在線工具或命令行工具將PNG轉換為ICO：

```bash
# 使用ImageMagick（需要安裝）
convert icon.png favicon.ico
```

#### 選項3：使用多種格式
Next.js 13+ 支持多種圖標格式：

```
src/app/
├── icon.png          # 32x32 PNG
├── icon.svg          # SVG圖標
├── apple-icon.png    # Apple設備圖標
└── favicon.ico       # 傳統ICO格式
```

## 🌐 瀏覽器緩存清除

### Chrome/Edge
- **Windows**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`
- **或者**: 開發者工具 → Network → 勾選 "Disable cache"

### Firefox
- **Windows**: `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`

### Safari
- **Mac**: `Cmd + Option + R`
- **或者**: 開發 → 清空緩存

## 🔍 緩存問題診斷

### 檢查文件是否正確更新

```bash
# 檢查文件修改時間
ls -la src/app/icon.png

# 檢查文件內容
file src/app/icon.png
```

### 檢查Next.js是否識別到文件

查看開發服務器日誌，應該看到類似：

```
○ Compiling /icon.png ...
✓ Compiled /icon.png in 6.6s
GET /icon.png?4daa319674d9fa14 200
```

### 檢查瀏覽器網絡請求

1. 打開開發者工具
2. 切換到 Network 標籤
3. 刷新頁面
4. 查看是否有新的圖標請求

## 📝 最佳實踐

### 1. 文件格式規範
- **favicon.ico**: 真正的ICO格式，16x16, 32x32, 48x48像素
- **icon.png**: PNG格式，32x32像素
- **apple-icon.png**: PNG格式，180x180像素

### 2. 開發時的緩存策略
```bash
# 開發時禁用緩存
export NODE_ENV=development
export NEXT_CACHE_DISABLED=true
```

### 3. 生產環境緩存
```bash
# 生產構建前清除緩存
rm -rf .next
npm run build
```

## 🚨 常見問題

### Q: 為什麼favicon還是舊的？
A: 瀏覽器對favicon有特殊的緩存策略，可能需要：
1. 清除瀏覽器緩存
2. 使用無痕模式測試
3. 檢查文件格式是否正確

### Q: 圖片更新了但頁面沒變化？
A: 檢查：
1. 文件路徑是否正確
2. Next.js是否重新編譯了該文件
3. 瀏覽器是否使用了緩存版本

### Q: 清除緩存後還是有問題？
A: 嘗試：
1. 重新安裝依賴
2. 檢查文件權限
3. 使用不同瀏覽器測試

## 🛠️ 調試工具

### 檢查Next.js緩存
```bash
# 查看.next目錄大小
du -sh .next

# 查看緩存文件
find .next -name "*cache*" -type d
```

### 監控文件變化
```bash
# 使用fswatch監控文件變化（Mac）
fswatch -o src/app/ | xargs -n1 -I{} echo "Files changed"

# 使用inotify監控文件變化（Linux）
inotifywait -m -r -e modify src/app/
```

## 📞 技術支持

如果問題仍然存在，請檢查：
1. Next.js版本是否支持您使用的圖標格式
2. 文件權限是否正確
3. 是否有其他進程鎖定了文件

---

**更新時間**: 2025-08-05  
**適用版本**: Next.js 13+  
**狀態**: ✅ 已測試通過
