# Next.js 靜態匯出修復

## 問題描述

在執行 `npm run export` 時遇到以下錯誤：

```
Error: export const dynamic = "force-static"/export const revalidate not configured on route "/robots.txt" with "output: export"
```

## 問題原因

在 Next.js 15 中，當使用 `output: 'export'` 進行靜態匯出時，所有的 API 路由（包括 `robots.ts` 和 `sitemap.ts`）都需要明確配置 `dynamic = "force-static"` 或 `revalidate` 設定。

## 解決方案

### 1. 移除動態 API 路由

刪除了 `src/app/robots.ts` 和 `src/app/sitemap.ts` 檔案，因為這些檔案在靜態匯出時會導致問題。

### 2. 創建靜態檔案

在 `public/` 目錄下創建了靜態的 `robots.txt` 檔案：

```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /_next/
Disallow: /static/
Disallow: *.json
Disallow: *.xml
Disallow: /search
Disallow: /404
Disallow: /500

User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /search

User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /search

Sitemap: https://amigo-pet.com/sitemap.xml
Host: https://amigo-pet.com
```

### 3. 創建 sitemap 生成腳本

創建了 `scripts/generate-sitemap.js` 腳本來動態生成 `sitemap.xml`：

```javascript
const fs = require('fs')
const glob = require('fast-glob')

async function generateSitemap() {
  const baseUrl = 'https://amigo-pet.com'
  
  // 載入所有文章
  const articles = await loadArticles()

  // 靜態頁面
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // ... 其他頁面
  ]

  // 生成 XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  fs.writeFileSync('public/sitemap.xml', xml)
}

generateSitemap().catch(console.error)
```

### 4. 更新 package.json

更新了 `package.json` 中的腳本：

```json
{
  "scripts": {
    "generate-sitemap": "node scripts/generate-sitemap.js",
    "export": "npm run generate-sitemap && GITHUB_PAGES=true next build",
    "deploy": "npm run export"
  }
}
```

## 驗證

執行 `npm run export` 後，在 `out/` 目錄下成功生成了：

- `robots.txt` - 靜態 robots 檔案
- `sitemap.xml` - 動態生成的 sitemap 檔案

## 注意事項

1. 每次執行 `npm run export` 時會自動重新生成 `sitemap.xml`
2. `robots.txt` 是靜態檔案，需要手動更新
3. 確保 `public/` 目錄下的靜態檔案會被正確複製到 `out/` 目錄

## 相關檔案

- `public/robots.txt` - 靜態 robots 檔案
- `scripts/generate-sitemap.js` - sitemap 生成腳本
- `package.json` - 更新的腳本配置 