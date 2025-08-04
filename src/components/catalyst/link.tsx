/**
 * Updated to use Next.js Link component for proper client-side routing
 * and basePath handling in GitHub Pages deployment.
 */

import * as Headless from '@headlessui/react'
import NextLink from 'next/link'
import React, { forwardRef } from 'react'

export const Link = forwardRef(function Link(
  props: { href: string } & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  const { href, ...restProps } = props

  // 檢查是否為外部連結
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')

  if (isExternal) {
    return (
      <Headless.DataInteractive>
        <a href={href} {...restProps} ref={ref} />
      </Headless.DataInteractive>
    )
  }

  return (
    <Headless.DataInteractive>
      <NextLink href={href} {...restProps} ref={ref} />
    </Headless.DataInteractive>
  )
})
