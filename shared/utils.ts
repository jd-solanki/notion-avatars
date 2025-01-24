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

// male-1-6 & female 1-6
export const AVATAR_PRESETS = {
  'male-1': {
    face: 1,
    nose: 12,
    mouth: 1,
    eyes: 2,
    eyebrows: 13,
    glasses: 1,
    hair: 6,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'male-2': {
    face: 8,
    nose: 6,
    mouth: 4,
    eyes: 10,
    eyebrows: 14,
    glasses: 13,
    hair: 43,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'male-3': {
    face: 7,
    nose: 11,
    mouth: 9,
    eyes: 1,
    eyebrows: 8,
    glasses: 5,
    hair: 11,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'male-4': {
    face: 8,
    nose: 5,
    mouth: 15,
    eyes: 9,
    eyebrows: 15,
    glasses: 14,
    hair: 6,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'male-5': {
    face: 7,
    nose: 8,
    mouth: 0,
    eyes: 4,
    eyebrows: 11,
    glasses: 12,
    hair: 5,
    accessories: 0,
    details: 0,
    beard: 3,
    halloween: 0,
    christmas: 0,
  },
  'male-6': {
    face: 14,
    nose: 12,
    mouth: 0,
    eyes: 4,
    eyebrows: 11,
    glasses: 8,
    hair: 40,
    accessories: 0,
    details: 0,
    beard: 13,
    halloween: 0,
    christmas: 0,
  },
  'male-7': {
    face: 9,
    nose: 5,
    mouth: 1,
    eyes: 2,
    eyebrows: 10,
    glasses: 8,
    hair: 35,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'male-8': {
    face: 9,
    nose: 9,
    mouth: 2,
    eyes: 0,
    eyebrows: 1,
    glasses: 10,
    hair: 43,
    accessories: 0,
    details: 0,
    beard: 11,
    halloween: 0,
    christmas: 0,
  },
  'female-1': {
    face: 7,
    nose: 9,
    mouth: 11,
    eyes: 11,
    eyebrows: 2,
    glasses: 12,
    hair: 52,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'female-2': {
    face: 1,
    nose: 13,
    mouth: 18,
    eyes: 3,
    eyebrows: 10,
    glasses: 13,
    hair: 21,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'female-3': {
    face: 3,
    nose: 7,
    mouth: 19,
    eyes: 10,
    eyebrows: 14,
    glasses: 0,
    hair: 28,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'female-4': {
    face: 8,
    nose: 5,
    mouth: 11,
    eyes: 10,
    eyebrows: 12,
    glasses: 4,
    hair: 25,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'female-5': {
    face: 14,
    nose: 12,
    mouth: 18,
    eyes: 1,
    eyebrows: 14,
    glasses: 5,
    hair: 54,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'female-6': {
    face: 4,
    nose: 12,
    mouth: 4,
    eyes: 0,
    eyebrows: 2,
    glasses: 6,
    hair: 20,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'female-7': {
    face: 9,
    nose: 9,
    mouth: 2,
    eyes: 0,
    eyebrows: 1,
    glasses: 0,
    hair: 30,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'female-8': {
    face: 2,
    nose: 11,
    mouth: 8,
    eyes: 8,
    eyebrows: 4,
    glasses: 5,
    hair: 26,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
}

export const getAvatarStyle = (defaults: Partial<AvatarConfig> = {}): AvatarConfig => {
  // Generate random values for all parts
  const config = {} as AvatarConfig

  Object.entries(AVATAR_STYLES).forEach(([part, maxValue]) => {
    config[part as keyof AvatarConfig] = Math.floor(Math.random() * (maxValue + 1))
  })

  // Reset specific parts to 0
  config.beard = 0
  config.details = 0
  config.accessories = 0

  // Apply defaults
  Object.assign(config, defaults)

  return config
}

export const parseAvatarStyleQueryParams = (params: LocationQuery | QueryObject): AvatarConfig => {
  const config = {} as AvatarConfig

  // If preset is provided, return preset
  const queryKeys = Object.keys(params)
  if (queryKeys.includes('preset')) {
    const preset = AVATAR_PRESETS[params.preset as keyof typeof AVATAR_PRESETS]
    if (preset) {
      return preset
    }
  }

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

export const findMatchingPreset = (config: AvatarConfig): string | null => {
  for (const [presetName, presetConfig] of Object.entries(AVATAR_PRESETS)) {
    if (Object.entries(presetConfig).every(([key, value]) =>
      config[key as keyof AvatarConfig] === value,
    )) {
      return presetName
    }
  }
  return null
}

export const getSearchParamsByConfig = (config: AvatarConfig) => {
  const url = new URL(window.location.href)

  // Check if current config matches a preset
  const matchingPreset = findMatchingPreset(config)

  if (matchingPreset) {
    url.searchParams.set('preset', matchingPreset)
  }
  else {
    // If no matching preset, add individual parameters
    Object.entries(config).forEach(([key, value]) => {
      url.searchParams.set(key, value.toString())
    })
  }

  return url.searchParams
}
