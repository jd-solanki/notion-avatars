import type { AvatarConfig, AvatarPart } from './types'
import type { TODO } from '~~/shared/types'

const notionAvatarParts: Record<string, { default: TODO }> = import.meta.glob('/assets/svg/avatar/part/**/*.svg', { eager: true })

// TODO: Extract this via some kind of automation from the assets
export const AVATAR_STYLES: AvatarConfig = {
  face: 15,
  nose: 13,
  mouth: 19,
  eyes: 13,
  eyebrows: 15,
  glasses: 14,
  hair: 58,
  accessories: 14,
  details: 13,
  beard: 16,
  halloween: 0,
  christmas: 0,
}

export const getRandomAvatarStyle = (): AvatarConfig => {
  // // TODO: Generate random avatar style
  // return {
  //   accessories: 0,
  //   beard: 0,
  //   details: 0,
  //   eyebrows: 0,
  //   eyes: 0,
  //   face: 0,
  //   glasses: 0,
  //   hair: 0,
  //   mouth: 0,
  //   nose: 0,
  // }

  const config = Object.keys(AVATAR_STYLES).reduce(
    (prev, next) =>
      Object.assign(prev, {
        [next]: Math.floor(
          Math.random() * (AVATAR_STYLES[next as AvatarPart] + 1),
        ),
      }),
    {} as Record<keyof AvatarConfig, number>,
  )
  // for harmony
  config.beard = 0
  config.details = 0
  config.accessories = 0

  // for festival
  // const festival = getCurrentFestival();
  // if (festival) {
  //   config[festival] = Math.floor(
  //     Math.random() * (Number(AvatarStyleCountExtra[festival]) + 1),
  //   );
  // }

  return config
}

type AvatarParts = Record<string, { [number: number]: string }>

export const getParts = (): AvatarParts => {
  const parts: AvatarParts = {}

  console.log('notionAvatarParts :>> ', notionAvatarParts)

  for (const path in notionAvatarParts) {
    const [part, numberWithExt] = path.split('/').at(-1)?.split('-') || []
    const number = numberWithExt?.split('.')[0]

    if (!part || !number) {
      continue
    }

    // parts[part][number] = notionAvatarParts[path].default

    if (!parts[part]) {
      parts[part] = {}
    }

    parts[part][parseInt(number)] = notionAvatarParts[path]?.default
  }

  return parts
}
