import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
export const revalidate = 0

export async function GET(): Promise<Response> {
  const baseUrl = 'https://amigo-pet.com'

  const robotsContent = `User-agent: *
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

Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}`

  return new Response(robotsContent, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
} 