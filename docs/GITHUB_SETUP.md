# GitHub 上傳設置指南

本文檔說明如何將 AMIGO 寵物鮮食自動販賣機加盟平台項目上傳到 GitHub。

## 📋 已創建的文件

### 🔧 Git 配置文件
- `.gitignore` - Git 忽略規則（已更新為完整版本）
- `.gitattributes` - Git 文件屬性配置

### 🤖 GitHub Actions 工作流
- `.github/workflows/ci.yml` - CI/CD 管道
- `.github/workflows/pre-commit.yml` - 提交前檢查

### 📝 GitHub 模板
- `.github/ISSUE_TEMPLATE/bug_report.md` - Bug 報告模板
- `.github/ISSUE_TEMPLATE/feature_request.md` - 功能請求模板
- `.github/ISSUE_TEMPLATE/config.yml` - Issue 配置
- `.github/PULL_REQUEST_TEMPLATE/pull_request_template.md` - PR 模板

### 📚 項目文檔
- `README.md` - 項目說明文檔（已完全重寫）
- `CONTRIBUTING.md` - 貢獻指南
- `CODE_OF_CONDUCT.md` - 行為準則
- `SECURITY.md` - 安全政策
- `LICENSE` - MIT 授權條款

### ⚙️ 配置文件
- `.env.example` - 環境變數範例

## 🚀 上傳步驟

### 1. 初始化 Git 倉庫（如果尚未初始化）
```bash
git init
```

### 2. 添加所有文件
```bash
git add .
```

### 3. 創建初始提交
```bash
git commit -m "feat: 初始化 AMIGO 寵物鮮食自動販賣機加盟平台

- 完整的 Next.js + TypeScript + Tailwind CSS 項目
- 中文化的用戶界面和內容
- 專業的寵物鮮食相關案例研究
- 完整的 GitHub 配置和工作流
- 詳細的項目文檔和貢獻指南"
```

### 4. 在 GitHub 上創建新倉庫
1. 登入 GitHub
2. 點擊右上角的 "+" 按鈕
3. 選擇 "New repository"
4. 填寫倉庫信息：
   - **Repository name**: `amigob2b`
   - **Description**: `AMIGO 寵物鮮食自動販賣機加盟平台 - 專業的 B2B 招商網站`
   - **Visibility**: Public 或 Private（根據需要選擇）
   - **不要**勾選 "Add a README file"（我們已經有了）
   - **不要**勾選 "Add .gitignore"（我們已經有了）
   - **不要**選擇 License（我們已經有了）

### 5. 連接本地倉庫到 GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/amigob2b.git
```

### 6. 推送代碼到 GitHub
```bash
git branch -M main
git push -u origin main
```

## 🔧 GitHub 設置

### 1. 啟用 GitHub Pages（可選）
1. 進入倉庫設置
2. 滾動到 "Pages" 部分
3. 選擇 "Deploy from a branch"
4. 選擇 "main" 分支和 "/ (root)" 文件夾

### 2. 設置分支保護規則
1. 進入 Settings > Branches
2. 點擊 "Add rule"
3. 設置以下規則：
   - Branch name pattern: `main`
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require linear history

### 3. 配置 Secrets（用於 CI/CD）
進入 Settings > Secrets and variables > Actions，添加以下 secrets：

#### Vercel 部署（如果使用）
- `VERCEL_TOKEN` - Vercel 訪問令牌
- `VERCEL_ORG_ID` - Vercel 組織 ID
- `VERCEL_PROJECT_ID` - Vercel 項目 ID

#### 安全掃描（可選）
- `SNYK_TOKEN` - Snyk 安全掃描令牌

### 4. 設置 Labels
建議添加以下標籤來組織 Issues 和 PRs：

#### 類型標籤
- `bug` (🐛) - 錯誤報告
- `enhancement` (✨) - 新功能或改進
- `documentation` (📝) - 文檔相關
- `question` (❓) - 問題或討論
- `help wanted` (🙋) - 需要幫助
- `good first issue` (👶) - 適合新手的問題

#### 優先級標籤
- `priority: high` (🔴) - 高優先級
- `priority: medium` (🟡) - 中優先級
- `priority: low` (🟢) - 低優先級

#### 狀態標籤
- `status: in progress` (🚧) - 進行中
- `status: blocked` (🚫) - 被阻塞
- `status: needs review` (👀) - 需要審查

## 📊 監控和分析

### 1. 啟用 Insights
GitHub 會自動提供以下洞察：
- 代碼頻率
- 提交活動
- 貢獻者統計
- 流量分析

### 2. 設置 Dependabot
1. 進入 Settings > Security & analysis
2. 啟用 "Dependabot alerts"
3. 啟用 "Dependabot security updates"
4. 創建 `.github/dependabot.yml` 配置文件

### 3. 代碼掃描
啟用 GitHub 的代碼掃描功能：
1. 進入 Security > Code scanning
2. 設置 CodeQL 分析

## 🔄 工作流程建議

### 分支策略
- `main` - 生產分支，受保護
- `develop` - 開發分支
- `feature/*` - 功能分支
- `hotfix/*` - 緊急修復分支

### 提交訊息規範
使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 發布流程
1. 功能開發在 `feature/*` 分支
2. 完成後創建 PR 到 `develop`
3. 測試通過後合併到 `develop`
4. 準備發布時創建 PR 從 `develop` 到 `main`
5. 合併後自動觸發部署

## 🛡️ 安全最佳實踐

### 1. 敏感信息保護
- ✅ 使用 `.env.example` 而不是 `.env`
- ✅ 所有 API 密鑰都通過 GitHub Secrets 管理
- ✅ 定期輪換訪問令牌

### 2. 依賴管理
- ✅ 啟用 Dependabot 自動更新
- ✅ 定期運行 `npm audit`
- ✅ 使用 Snyk 進行安全掃描

### 3. 代碼審查
- ✅ 所有 PR 都需要審查
- ✅ 自動化測試必須通過
- ✅ 安全掃描必須通過

## 📞 支援

如果在設置過程中遇到問題：

1. 檢查 [GitHub 文檔](https://docs.github.com/)
2. 查看項目的 [Issues](https://github.com/amigo-pet-food/amigob2b/issues)
3. 在 [Discussions](https://github.com/amigo-pet-food/amigob2b/discussions) 中提問
4. 聯繫項目維護者

---

**祝您使用愉快！** 🎉
