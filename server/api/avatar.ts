import { useAvatarPreview } from '~/composables/useAvatarPreview'
import { getAvatarStyle } from '~~/shared/utils'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const appliedAvatarStyle = getAvatarStyle(query)

  const { svgString } = useAvatarPreview(appliedAvatarStyle)

  // Set the content type for SVG
  setHeader(event, 'Content-Type', 'image/svg+xml')

  return svgString.value
})
