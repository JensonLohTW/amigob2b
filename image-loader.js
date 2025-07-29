/**
 * Custom image loader for Next.js static export
 * Optimized for GitHub Pages deployment
 */

export default function customImageLoader({ src, width, quality }) {
  // For GitHub Pages deployment, we need to handle the base path
  const isGithubPages = process.env.GITHUB_PAGES === 'true'
  const basePath = isGithubPages ? '/amigob2b' : ''
  
  // Handle external URLs (keep as-is)
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }
  
  // Handle absolute paths starting with /
  if (src.startsWith('/')) {
    return `${basePath}${src}`
  }
  
  // Handle relative paths
  return `${basePath}/${src}`
} 