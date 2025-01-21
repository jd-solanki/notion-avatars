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
    face: 0,
    nose: 0,
    mouth: 0,
    eyes: 0,
    eyebrows: 0,
    glasses: 0,
    hair: 0,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'male-2': {
    face: 1,
    nose: 1,
    mouth: 1,
    eyes: 1,
    eyebrows: 1,
    glasses: 0,
    hair: 1,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'male-3': {
    face: 2,
    nose: 2,
    mouth: 2,
    eyes: 2,
    eyebrows: 2,
    glasses: 1,
    hair: 2,
    accessories: 0,
    details: 0,
    beard: 1,
    halloween: 0,
    christmas: 0,
  },
  'male-4': {
    face: 3,
    nose: 3,
    mouth: 3,
    eyes: 3,
    eyebrows: 3,
    glasses: 2,
    hair: 3,
    accessories: 0,
    details: 0,
    beard: 2,
    halloween: 0,
    christmas: 0,
  },
  'male-5': {
    face: 4,
    nose: 4,
    mouth: 4,
    eyes: 4,
    eyebrows: 4,
    glasses: 3,
    hair: 4,
    accessories: 0,
    details: 0,
    beard: 3,
    halloween: 0,
    christmas: 0,
  },
  'male-6': {
    face: 5,
    nose: 5,
    mouth: 5,
    eyes: 5,
    eyebrows: 5,
    glasses: 4,
    hair: 5,
    accessories: 0,
    details: 0,
    beard: 4,
    halloween: 0,
    christmas: 0,
  },
  'female-1': {
    face: 6,
    nose: 6,
    mouth: 6,
    eyes: 6,
    eyebrows: 6,
    glasses: 0,
    hair: 20,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'female-2': {
    face: 7,
    nose: 7,
    mouth: 7,
    eyes: 7,
    eyebrows: 7,
    glasses: 5,
    hair: 21,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'female-3': {
    face: 8,
    nose: 8,
    mouth: 8,
    eyes: 8,
    eyebrows: 8,
    glasses: 6,
    hair: 22,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'female-4': {
    face: 9,
    nose: 9,
    mouth: 9,
    eyes: 9,
    eyebrows: 9,
    glasses: 7,
    hair: 23,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'female-5': {
    face: 10,
    nose: 10,
    mouth: 10,
    eyes: 10,
    eyebrows: 10,
    glasses: 8,
    hair: 24,
    accessories: 0,
    details: 0,
    beard: 0,
    halloween: 0,
    christmas: 0,
  },
  'female-6': {
    face: 11,
    nose: 11,
    mouth: 11,
    eyes: 11,
    eyebrows: 11,
    glasses: 9,
    hair: 25,
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
