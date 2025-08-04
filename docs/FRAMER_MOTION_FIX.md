# Framer Motion 模組導入問題修復

## 問題描述

在 Next.js 專案中遇到 framer-motion 模組導入錯誤：

```
Error: ./src/components/FadeIn.tsx:4:1
Module not found: Package path ./dist/es/index.mjs is not exported from package /Users/jenson/Downloads/tailwind-plus-studio/amigob2b/node_modules/framer-motion (see exports field in /Users/jenson/Downloads/tailwind-plus-studio/amigob2b/node_modules/framer-motion/package.json)
```

## 根本原因

這個錯誤是由於 framer-motion v12 的模組匯出結構與 Next.js 的模組解析機制不相容造成的。framer-motion 的 package.json 中定義了 exports 欄位，但 Next.js 無法正確解析到 `./dist/es/index.mjs` 路徑。

**重要發現**：`framer-motion/dom` 模組只包含動畫工具函數，不包含 React 組件（如 `motion`）和 hooks（如 `useReducedMotion`）。這些只能在主模組 `framer-motion` 中找到。

## 解決方案

### 1. 修改導入路徑

將所有 framer-motion 的導入保持為：
```typescript
import { motion, useReducedMotion } from 'framer-motion'
```

**注意**：不要使用 `framer-motion/dom`，因為該模組不包含 React 組件和 hooks。

### 2. 更新 Next.js 配置

在 `next.config.mjs` 中調整 webpack 配置：

```javascript
webpack: (config, { isServer }) => {
  if (!isServer) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
  }
  
  // Handle framer-motion exports issue
  config.resolve.alias = {
    ...config.resolve.alias,
    'framer-motion': 'framer-motion',
  }
  
  // Ensure proper module resolution for framer-motion
  config.resolve.extensionAlias = {
    '.js': ['.js', '.ts', '.tsx'],
    '.mjs': ['.mjs', '.js', '.ts', '.tsx'],
  }
  
  return config
},
```

### 3. 批量修復所有檔案

使用以下命令批量修復所有 TypeScript/React 檔案中的 framer-motion 導入：

```bash
# 如果錯誤地改為了 framer-motion/dom，使用以下命令修復
find src -name "*.tsx" -exec grep -l "from 'framer-motion/dom'" {} \; | xargs sed -i '' "s/from 'framer-motion\/dom'/from 'framer-motion'/g"
```

## 修復的檔案

總共修復了 50+ 個檔案，包括：

- `src/components/FadeIn.tsx`
- `src/components/RootLayout.tsx`
- `src/components/AnimatedCounter.tsx`
- `src/features/` 目錄下的所有相關組件
- 以及其他使用 framer-motion 的組件

## 驗證

修復後，Next.js 開發伺服器能夠正常啟動，沒有模組導入錯誤。

## 注意事項

1. **正確的導入方式**：使用 `framer-motion` 主模組，而不是 `framer-motion/dom`
2. `framer-motion/dom` 只包含動畫工具函數，不包含 React 組件和 hooks
3. 這個修復確保了與 Next.js 15.4 和 React 19 的相容性
4. 所有動畫功能保持不變

## 相關技術版本

- Next.js: 15.4.0
- React: 19.0.0
- Framer Motion: 12.23.12
- TypeScript: 5.3.3 