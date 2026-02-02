import { useAvatarPreview } from '~/composables/useAvatarPreview'
import { getAvatarStyle, parseAvatarStyleQueryParams } from '~~/shared/utils'

export default defineCachedEventHandler((event) => {
  const query = getQuery(event)

  const appliedAvatarStyle = parseAvatarStyleQueryParams(query)
  const config = getAvatarStyle(appliedAvatarStyle)

  const { svgString } = useAvatarPreview(config)

  // Set the content type for SVG
  setHeader(event, 'Content-Type', 'image/svg+xml')
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
  setHeader(event, 'Netlify-CDN-Cache-Control', 'public, max-age=31536000, immutable, durable')

  return svgString.value
}, {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  swr: true,
  getKey: (event) => JSON.stringify(getQuery(event))
})
