# AMIGO 寵物鮮食自動販賣機加盟平台

<div align="center">

![AMIGO Logo](https://via.placeholder.com/200x80/4F46E5/FFFFFF?text=AMIGO)

**專業的寵物鮮食自動販賣機加盟招商平台**

[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.7-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

[🚀 線上預覽](https://amigob2b.vercel.app) | [📖 文檔](https://github.com/amigo-pet-food/amigob2b/wiki) | [🐛 回報問題](https://github.com/amigo-pet-food/amigob2b/issues) | [💬 討論](https://github.com/amigo-pet-food/amigob2b/discussions)

</div>

## 📋 項目簡介

AMIGO 是一個專為寵物鮮食自動販賣機設計的 B2B 加盟招商平台。我們提供：

- 🤖 **AI 智能管理** - 24小時無人值守營業，智能庫存管理
- 🥘 **專業產品供應** - 獸醫博士團隊研發，人食等級製程
- 💰 **穩定獲利模式** - 30%分潤比例，8個月快速回本
- 🛠️ **全方位支援** - 從選址到維護的完整服務體系

## ✨ 主要功能

### 🏠 首頁展示
- 響應式設計，完美適配各種設備
- 動態數據展示（市場潛力、投資回報等）
- 客戶成功案例展示
- 專業的視覺設計和用戶體驗

### 📊 投資試算器
- 智能投資回報計算
- 多種投資方案比較
- 實時數據更新
- 詳細的財務分析報告

### 📝 加盟申請系統
- 線上申請表單
- 文件上傳功能
- 申請狀態追蹤
- 自動化審核流程

### 📚 內容管理
- 專業的寵物營養知識部落格
- 成功案例研究
- 產品介紹和規格
- SEO 優化的內容結構

## 🛠️ 技術棧

### 前端框架
- **Next.js 14** - React 全棧框架
- **TypeScript** - 類型安全的 JavaScript
- **Tailwind CSS v4** - 實用優先的 CSS 框架
- **Framer Motion** - 流暢的動畫效果

### 內容管理
- **MDX** - Markdown + JSX 的內容格式
- **Remark/Rehype** - Markdown 處理管道
- **Shiki** - 語法高亮

### 開發工具
- **ESLint** - 代碼品質檢查
- **Prettier** - 代碼格式化
- **TypeScript** - 靜態類型檢查

## 🚀 快速開始

### 環境要求
- Node.js 18.x 或更高版本
- npm 或 yarn
- Git

### 安裝步驟

1. **克隆倉庫**
```bash
git clone https://github.com/amigo-pet-food/amigob2b.git
cd amigob2b
```

2. **安裝依賴**
```bash
npm install
```

3. **啟動開發服務器**
```bash
npm run dev
```

4. **在瀏覽器中打開**
```
http://localhost:3000
```

### 可用腳本

```bash
# 開發模式
npm run dev

# 構建生產版本
npm run build

# 啟動生產服務器
npm start

# 代碼檢查
npm run lint

# 類型檢查
npm run type-check
```

## 📁 項目結構

```
amigob2b/
├── src/
│   ├── app/                 # Next.js App Router 頁面
│   │   ├── (pages)/        # 頁面組件
│   │   ├── blog/           # 部落格文章
│   │   ├── work/           # 案例研究
│   │   └── globals.css     # 全局樣式
│   ├── components/         # React 組件
│   ├── images/            # 圖片資源
│   ├── lib/               # 工具函數
│   └── styles/            # 樣式文件
├── public/                # 靜態資源
├── .github/               # GitHub 配置
│   ├── workflows/         # CI/CD 工作流
│   └── ISSUE_TEMPLATE/    # Issue 模板
├── docs/                  # 項目文檔
└── package.json           # 項目配置
```

## 🎨 自定義配置

### 主題配置
在 `tailwind.config.js` 中自定義：
- 顏色主題
- 字體設置
- 間距規則
- 響應式斷點

### 內容配置
- 在 `src/app/` 中添加新頁面
- 在 `src/components/` 中創建組件
- 在 `src/app/blog/` 中添加部落格文章
- 在 `src/app/work/` 中添加案例研究

## 🚀 部署

### Vercel（推薦）
```bash
npm install -g vercel
vercel
```

### 其他平台
- **Netlify**: 連接 GitHub 倉庫自動部署
- **AWS Amplify**: 使用 AWS 服務部署
- **Docker**: 使用容器化部署

## 🤝 貢獻指南

我們歡迎所有形式的貢獻！請查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解詳細信息。

### 貢獻流程
1. Fork 此倉庫
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 創建 Pull Request

## 📄 授權

本項目採用 MIT 授權 - 查看 [LICENSE](./LICENSE) 文件了解詳情。

## 🆘 支援

### 獲得幫助
- 📖 [項目文檔](https://github.com/amigo-pet-food/amigob2b/wiki)
- 💬 [GitHub Discussions](https://github.com/amigo-pet-food/amigob2b/discussions)
- 🐛 [報告 Bug](https://github.com/amigo-pet-food/amigob2b/issues)
- 📧 [聯繫我們](mailto:support@amigo.com.tw)

### 商業支援
如需商業支援或客製化開發，請聯繫：
- 📧 business@amigo.com.tw
- 📞 0800-123-456

## 🔗 相關連結

- [AMIGO 官網](https://amigo.com.tw)
- [產品介紹](https://amigo.com.tw/products)
- [加盟資訊](https://amigo.com.tw/franchise)
- [技術部落格](https://blog.amigo.com.tw)

## 📊 項目統計

![GitHub stars](https://img.shields.io/github/stars/amigo-pet-food/amigob2b?style=social)
![GitHub forks](https://img.shields.io/github/forks/amigo-pet-food/amigob2b?style=social)
![GitHub issues](https://img.shields.io/github/issues/amigo-pet-food/amigob2b)
![GitHub pull requests](https://img.shields.io/github/issues-pr/amigo-pet-food/amigob2b)

---

<div align="center">

**由 ❤️ 和 ☕ 在台灣製作**

© 2025 AMIGO 寵物鮮食科技有限公司. 保留所有權利。

</div>
