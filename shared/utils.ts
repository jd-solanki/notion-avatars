import type { QueryObject } from 'ufo'
import type { LocationQuery } from 'vue-router'
import type { AvatarConfig } from './types'

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

export const getAvatarStyle = (defaults: Partial<AvatarConfig> = {}): AvatarConfig => {
  // Generate random values for all parts
  const config = {} as AvatarConfig

  Object.entries(AVATAR_STYLES).forEach(([part, maxValue]) => {
    config[part as keyof AvatarConfig] = defaults[part as keyof AvatarConfig] ?? Math.floor(Math.random() * (maxValue + 1))
  })

  // Reset specific parts to 0
  config.beard = 0
  config.details = 0
  config.accessories = 0

  return config
}

export const getAvatarStyleFromQueryParams = (params: LocationQuery | QueryObject): AvatarConfig => {
  const config = {} as AvatarConfig

  // Check each query param
  for (const [key, value] of Object.entries(params)) {
    // Verify key exists in AVATAR_STYLES
    if (!(key in AVATAR_STYLES) || !(typeof value === 'string')) {
      continue
    }

    // Parse and validate number
    const numValue = parseInt(value, 10)
    if (isNaN(numValue)) {
      continue
    }

    // Ensure value is within valid range (0 to max)
    const maxValue = AVATAR_STYLES[key as keyof AvatarConfig]
    if (numValue < 0 || numValue > maxValue) {
      continue
    }

    // Add valid value to config
    config[key as keyof AvatarConfig] = numValue
  }

  return config
}
