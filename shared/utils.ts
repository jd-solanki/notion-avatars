import type { AvatarConfig, AvatarPart } from './types'

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
