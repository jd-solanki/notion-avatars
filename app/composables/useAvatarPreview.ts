/*
    TODO: Make it compatible with both client and server-side rendering

    Once it's ready we'll remove `AvatarPreview` component and use this composable instead.
*/
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { computed, unref, type MaybeRef } from 'vue'
import type { AvatarConfig } from '~~/shared/types'

export interface SVGAttributes {
  viewBox?: string
  width?: number | string
  height?: number | string
  xmlns?: string
  fill?: string
}

export interface UseAvatarPreviewOptions {
  svgAttrs?: SVGAttributes
}

export function useAvatarPreview(
  config: MaybeRef<AvatarConfig>,
  options: UseAvatarPreviewOptions = {},
) {
  const {
    svgAttrs = {
      viewBox: '0 0 1080 1080',
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
    },
  } = options

  const isServer = import.meta.server
  const svgBasePath = isServer
    ? join(process.cwd(), 'app/assets/svg/avatar/preview')
    : '/svg/avatar/preview'

  const getSvgContent = (type: string, value: number): string => {
    if (isServer) {
      const filePath = join(svgBasePath, type, `${value}.svg`)
      if (!existsSync(filePath)) {
        console.error(`SVG file not found: ${filePath}`)
        return ''
      }
      try {
        return readFileSync(filePath, 'utf-8')
      }
      catch (e) {
        console.error(`Failed to read SVG: ${filePath}`, e)
        return ''
      }
    }
    else {
      // For client-side, we'll still need to use fetch
      return '' // Fetch will be handled by component
    }
  }

  const svgGroups = computed(() => {
    const currentConfig = unref(config)

    return Object.entries(currentConfig).map(([type, value]) => {
    // // TODO: Why this isn't working on server?
    //   const rawContent = new URL(
    //     `/assets/svg/avatar/preview/${type}/${value}.svg?raw`,
    //     import.meta.url,
    //   ).href
    //   const svgContent = decodeURIComponent(rawContent)

      const svgContent = getSvgContent(type, value)

      return {
        id: `notion-avatar-${type}`,
        content: svgContent,
        fill: type === 'face' ? '#ffffff' : undefined,
      }
    })
  })

  const svgString = computed(() => {
    const attrs = Object.entries(svgAttrs)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')

    const groupsContent = svgGroups.value
      .map(group =>
        `<g id="${group.id}" ${group.fill ? `fill="${group.fill}"` : ''}>${group.content}</g>`,
      )
      .join('\n')

    return `<svg ${attrs}>${groupsContent}</svg>`
  })

  return {
    svgGroups,
    svgString,
  }
}
