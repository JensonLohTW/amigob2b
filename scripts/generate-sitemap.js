const fs = require('fs')
const path = require('path')
const glob = require('fast-glob')

async function loadArticles() {
  const articles = await glob('**/page.mdx', { cwd: 'src/app/blog' })
  return articles.map(filename => ({
    href: `/blog/${filename.replace(/\/page\.mdx$/, '')}`,
    date: new Date().toISOString()
  }))
}

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
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/franchise`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/store-locator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pet-health-tools`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // 部落格文章頁面
  const articlePages = articles.map((article) => ({
    url: `${baseUrl}${article.href}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // 產品分類頁面
  const productCategories = [
    'puppy', // 幼齡
    'adult', // 成年
    'senior', // 樂齡
    'functional', // 功能性
    'treats', // 零食
  ]

  const productCategoryPages = productCategories.map((category) => ({
    url: `${baseUrl}/products/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // 地區門店頁面
  const regions = [
    'taipei', // 台北
    'taichung', // 台中
    'kaohsiung', // 高雄
    'taoyuan', // 桃園
    'tainan', // 台南
    'hsinchu', // 新竹
    'keelung', // 基隆
    'chiayi', // 嘉義
    'pingtung', // 屏東
    'yilan', // 宜蘭
    'hualien', // 花蓮
    'taitung', // 台東
    'penghu', // 澎湖
    'kinmen', // 金門
    'matsu', // 馬祖
  ]

  const regionPages = regions.map((region) => ({
    url: `${baseUrl}/store-locator/${region}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  // 合併所有頁面
  const allPages = [
    ...staticPages,
    ...articlePages,
    ...productCategoryPages,
    ...regionPages,
  ]

  // 生成 XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  // 寫入檔案
  fs.writeFileSync('public/sitemap.xml', xml)
  console.log('Sitemap generated successfully!')
}

generateSitemap().catch(console.error) 