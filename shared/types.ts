// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any

export type AvatarConfig = {
  accessories: number
  beard: number
  details: number
  eyebrows: number
  eyes: number
  face: number
  glasses: number
  hair: number
  mouth: number
  nose: number
  halloween: number
  christmas: number
}

export type AvatarPart = keyof AvatarConfig
