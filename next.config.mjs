import rehypeShiki from '@leafac/rehype-shiki'
import nextMDX from '@next/mdx'
import { Parser } from 'acorn'
import jsx from 'acorn-jsx'
import escapeStringRegexp from 'escape-string-regexp'
import * as path from 'path'
import { recmaImportImages } from 'recma-import-images'
import remarkGfm from 'remark-gfm'
import { remarkRehypeWrap } from 'remark-rehype-wrap'
import remarkUnwrapImages from 'remark-unwrap-images'
import { unifiedConditional } from 'unified-conditional'

// Check if we're in GitHub Pages deployment mode
const isGithubPages = process.env.GITHUB_PAGES === 'true'

function remarkMDXLayout(source, metaName) {
  let parser = Parser.extend(jsx())
  let parseOptions = { ecmaVersion: 'latest', sourceType: 'module' }

  return (tree) => {
    let imp = `import _Layout from '${source}'`
    let exp = `export default function Layout(props) {
      return <_Layout {...props} ${metaName}={${metaName}} />
    }`

    tree.children.push(
      {
        type: 'mdxjsEsm',
        value: imp,
        data: { estree: parser.parse(imp, parseOptions) },
      },
      {
        type: 'mdxjsEsm',
        value: exp,
        data: { estree: parser.parse(exp, parseOptions) },
      },
    )
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],

  // Enable static export for GitHub Pages
  output: 'export',

  // GitHub Pages configuration
  basePath: isGithubPages ? '/amigob2b' : '',
  assetPrefix: isGithubPages ? '/amigob2b/' : '',

  // Use trailing slashes for better compatibility with static hosting
  trailingSlash: true,

  // Skip automatic `/me` -> `/me/`, preserve href for GitHub Pages
  skipTrailingSlashRedirect: true,

  // Pass basePath to the client side
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? '/amigob2b' : '',
  },

  // Images configuration for static export
  images: {
    unoptimized: true, // Required for static export
    loader: 'custom',
    loaderFile: './image-loader.js',
  },

  // Optimize for production builds
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features for better performance
  experimental: {
    // Disable MDX RS for compatibility with static export
    mdxRs: false,
  },

  // Transpile framer-motion to fix export issues
  transpilePackages: ['framer-motion'],

  // Webpack configuration to handle framer-motion
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
}

const withMDX = nextMDX({
  extension: /\.mdx$/,
  options: {
    development: process.env.NODE_ENV === 'development',

    recmaPlugins: [recmaImportImages],

    rehypePlugins: [
      // Optimized rehype plugins for static export
      [
        remarkRehypeWrap,
        {
          node: { type: 'mdxJsxFlowElement', name: 'Typography' },
          start: ':root > :not(mdxJsxFlowElement)',
          end: ':root > mdxJsxFlowElement',
        },
      ],
    ],

    remarkPlugins: [
      remarkGfm,
      remarkUnwrapImages,
      [
        unifiedConditional,
        [
          new RegExp(`^${escapeStringRegexp(path.resolve('src/app/blog'))}`),
          [[remarkMDXLayout, '@/app/blog/wrapper', 'article']],
        ],
        [
          new RegExp(`^${escapeStringRegexp(path.resolve('src/app/work'))}`),
          [[remarkMDXLayout, '@/app/work/wrapper', 'caseStudy']],
        ],
      ],
    ],
  },
})

export default withMDX(nextConfig)
