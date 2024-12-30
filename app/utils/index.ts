import type { TODO } from '~~/shared/types'

export const notionAvatarParts: Record<string, { default: TODO }> = import.meta.glob('/assets/svg/avatar/part/**/*.svg', { eager: true })

type AvatarParts = Record<string, { [number: number]: string }>

export const getParts = (): AvatarParts => {
  const parts: AvatarParts = {}

  for (const path in notionAvatarParts) {
    const [part, numberWithExt] = path.split('/').at(-1)?.split('-') || []
    const number = numberWithExt?.split('.')[0]

    if (!part || !number) {
      continue
    }

    if (!parts[part]) {
      parts[part] = {}
    }

    const svgContent = notionAvatarParts[path]?.default
    if (svgContent) {
      parts[part][parseInt(number)] = svgContent
    }
  }

  return parts
}
