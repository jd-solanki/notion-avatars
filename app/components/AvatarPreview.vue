<script lang="ts" setup>
import type { AvatarConfig } from '~~/shared/types'

const config = defineModel<AvatarConfig>('config', { required: true })

// TODO: Instead of returning the DOM string, let <template> handle the rendering
const avatarPreview = computed(() => {
  const groups = Object.entries(config.value).map(([type, value]) => {
    const rawContent = new URL(`/assets/svg/avatar/preview/${type}/${value}.svg?raw`, import.meta.url).href
    const svgContent = decodeURIComponent(rawContent)

    return `<g id="notion-avatar-${type}" ${type === 'face' ? 'fill="#ffffff"' : ''}>${svgContent}</g>`
  })

  return groups
})
</script>

<template>
  <svg
    viewBox="0 0 1080 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-html="avatarPreview.join('\n')"
  />
</template>
