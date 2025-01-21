<script lang="ts" setup>
// TODO: All `~~/shared` imports should be auto imported
import type { AvatarConfig } from '~~/shared/types'
import { getAvatarStyle, parseAvatarStyleQueryParams } from '~~/shared/utils'

defineOgImageComponent('NuxtSeo', {
  title: 'Notion Avatars',
  description: 'Create, Use and Download Notion Style Avatars',
  theme: '#000',
})
const route = useRoute()
const router = useRouter()

const avatarPreviewRef = useTemplateRef<HTMLDivElement>('avatar-preview')

const appliedAvatarStyle = parseAvatarStyleQueryParams(route.query)
const config = useState<AvatarConfig>('avatar-config', () => getAvatarStyle(appliedAvatarStyle))

// Remove query params to avoid ugly URL
router.replace({ query: {} })
</script>

<template>
  <div class="flex flex-col font-bold">
    <NuxtRouteAnnouncer />
    <header class="container flex items-center py-4">
      <img
        src="/logo.gif"
        alt="notion-avatars"
        class="size-12"
      >
      <h1 class="font-semibold text-2xl">
        Notion Avatars
      </h1>
      <HeaderDecoration class="absolute top-0 right-0 w-24 sm:w-28 md:w-36" />
    </header>
    <!-- NOTE: 80px is header height -->
    <div class="container my-auto min-h-[calc(100dvh-80px)]">
      <!-- TODO: Remove this `ClientOnly` and use `svgString` from `useAvatarPreview` -->
      <!-- TODO: It looks like adding ref="avatarPreview" directly to AvatarPreview doesn't resolve somehow so after above resolve this as well -->
      <div
        ref="avatar-preview"
        class="w-48 h-48 md:w-72 md:h-72 mx-auto mb-4"
      >
        <ClientOnly>
          <AvatarPreview :config />
        </ClientOnly>
      </div>
      <AvatarEditor v-model:config="config" />
      <div class="my-8 lg:flex xl:gap-12 gap-6 grid sm:grid-cols-2 [&>*]:flex-grow">
        <AvatarActionRandom v-model:config="config" />
        <AvatarActionCopyCurrentStyleURL :config />
        <AvatarActionCopyEmbedCode :config />
        <AvatarActionDownload :avatar-preview-ref="avatarPreviewRef" />
      </div>
      <Footer />
    </div>
    <Toaster />
  </div>
</template>

<style>
html {
  font-family: 'Quicksand', sans-serif;
  background-color: #fffefc;
}
</style>
