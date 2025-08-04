# 貢獻指南

感謝您對 AMIGO 寵物鮮食自動販賣機加盟平台的關注！我們歡迎所有形式的貢獻。

## 🚀 快速開始

### 環境要求

- Node.js 18.x 或更高版本
- npm 或 yarn
- Git

### 本地開發設置

1. Fork 此倉庫
2. Clone 您的 fork

```bash
git clone https://github.com/YOUR_USERNAME/amigob2b.git
cd amigob2b
```

3. 安裝依賴

```bash
npm install
```

4. 啟動開發服務器

```bash
npm run dev
```

5. 在瀏覽器中打開 http://localhost:3000

## 📋 貢獻類型

我們歡迎以下類型的貢獻：

### 🐛 Bug 修復

- 修復現有功能的問題
- 改進錯誤處理
- 修復性能問題

### ✨ 新功能

- 添加新的頁面或組件
- 改進用戶體驗
- 添加新的業務功能

### 📝 文檔改進

- 改進 README
- 添加代碼註釋
- 更新 API 文檔

### 🎨 UI/UX 改進

- 改進視覺設計
- 提升用戶體驗
- 響應式設計優化

## 🔄 開發流程

### 1. 創建分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

### 2. 開發和測試

- 遵循代碼規範
- 添加必要的測試
- 確保所有測試通過

### 3. 提交代碼

```bash
git add .
git commit -m "feat: 添加新功能描述"
```

### 4. 推送分支

```bash
git push origin feature/your-feature-name
```

### 5. 創建 Pull Request

- 使用 PR 模板
- 提供清楚的描述
- 關聯相關 Issue

## 📏 代碼規範

### TypeScript/JavaScript

- 使用 TypeScript
- 遵循 ESLint 規則
- 使用 Prettier 格式化代碼

### 組件開發

- 使用函數式組件和 Hooks
- 遵循 React 最佳實踐
- 添加 TypeScript 類型定義

### 樣式

- 使用 Tailwind CSS
- 遵循響應式設計原則
- 保持一致的設計語言

### 提交訊息規範

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

類型包括：

- `feat`: 新功能
- `fix`: Bug 修復
- `docs`: 文檔更新
- `style`: 代碼格式化
- `refactor`: 代碼重構
- `test`: 測試相關
- `chore`: 構建過程或輔助工具的變動

示例：

```
feat(auth): 添加用戶登入功能
fix(ui): 修復響應式佈局問題
docs: 更新 README 安裝說明
```

## 🧪 測試

### 運行測試

```bash
npm run test
```

### 代碼檢查

```bash
npm run lint
npm run type-check
```

### 構建檢查

```bash
npm run build
```

## 📝 文檔

### 代碼註釋

- 為複雜邏輯添加註釋
- 使用 JSDoc 格式
- 保持註釋與代碼同步

### README 更新

- 新功能需要更新使用說明
- 保持安裝和配置說明最新
- 添加必要的示例

## 🔍 Code Review

### 提交 PR 前檢查

- [ ] 代碼遵循項目規範
- [ ] 所有測試通過
- [ ] 沒有 TypeScript 錯誤
- [ ] 已添加必要的文檔
- [ ] PR 描述清楚完整

### Review 標準

- 代碼品質和可讀性
- 性能影響
- 安全性考慮
- 用戶體驗影響

## 🚨 注意事項

### 安全

- 不要提交敏感信息
- 遵循安全最佳實踐
- 報告安全問題請發送郵件至 security@amigo.com.tw

### 性能

- 注意包大小影響
- 優化圖片和資源
- 考慮 SEO 影響

### 兼容性

- 支持主流瀏覽器
- 確保響應式設計
- 考慮無障礙訪問

## 📞 獲得幫助

如果您需要幫助，可以：

1. 查看 [Wiki](https://github.com/amigo-pet-food/amigob2b/wiki)
2. 在 [Discussions](https://github.com/amigo-pet-food/amigob2b/discussions) 中提問
3. 創建 Issue 描述問題
4. 發送郵件至 support@amigo.com.tw

## 🎉 致謝

感謝所有為此項目做出貢獻的開發者！您的貢獻讓 AMIGO 平台變得更好。

## 📄 授權

通過貢獻代碼，您同意您的貢獻將在與此項目相同的授權下發布。
