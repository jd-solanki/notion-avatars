<script lang="ts" setup>
// TODO: All `~~/shared` imports should be auto imported
import type { AvatarConfig } from '~~/shared/types'
import { getAvatarStyle, getAvatarStyleFromQueryParams as parseAvatarStyleQueryParams } from '~~/shared/utils'

const route = useRoute()
const router = useRouter()

const appliedAvatarStyle = parseAvatarStyleQueryParams(route.query)
const config = useState<AvatarConfig>('avatar-config', () => getAvatarStyle(appliedAvatarStyle))

// Remove query params to avoid ugly URL
router.replace({ query: {} })

const copyCurrentStyleURL = () => {
  const url = new URL(window.location.href)
  Object.entries(config.value).forEach(([key, value]) => {
    url.searchParams.set(key, value.toString())
  })

  navigator.clipboard.writeText(url.href)
}

const embedUrl = computed(() => {
  const url = new URL(window.location.href + 'api/avatar/')

  Object.entries(config.value).forEach(([key, value]) => {
    url.searchParams.set(key, value.toString())
  })

  return url.href
})
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
      <div class="w-48 h-48 md:w-72 md:h-72 mx-auto">
        <ClientOnly>
          <AvatarPreview :config="config" />
        </ClientOnly>
      </div>
      <AvatarEditor :config="config" />
      <div class="my-8 flex items-center gap-8 justify-between">
        <Button
          variant="outline"
          class="border-[3px] border-primary rounded-full px-16 py-6 text-base font-bold"
          @click="config = getAvatarStyle()"
        >
          <img
            src="/icons/dice.svg"
            alt="icon-dice"
            class="size-6"
          >
          Random
        </Button>
        <Popover>
          <PopoverTrigger class="flex gap-2 h-9 items-center border-[3px] border-primary rounded-full px-16 py-6 text-base font-bold">
            <img
              src="/icons/embed.svg"
              alt="icon-embed"
              class="size-6"
            >
            Embed
          </PopoverTrigger>
          <PopoverContent class="border-[3px] min-w-96 border-primary rounded-lg p-4 font-bold">
            <p class="text-xl">
              URL
            </p>
            <p class="whitespace-nowrap mb-4 select-all overflow-x-scroll p-2 bg-gray-100 rounded-xl">
              {{ embedUrl }}
            </p>
            <p class="text-xl mt-4">
              &lt;img&gt;
            </p>
            <p class="whitespace-nowrap mb-4 select-all overflow-x-scroll p-2 bg-gray-100 rounded-xl">
              &lt;img src=&quot;{{ embedUrl }}&quot; alt=&quot;Notion Avatar&quot; /&gt;
            </p>
            <p class="text-xl mt-4">
              Markdown
            </p>
            <p class="whitespace-nowrap mb-4 select-all overflow-x-scroll p-2 bg-gray-100 rounded-xl">
              ![notion avatar]({{ embedUrl }})
            </p>
          </PopoverContent>
        </Popover>
        <Button
          variant="outline"
          class="border-[3px] border-primary rounded-full px-16 py-6 text-base font-bold"
          @click="copyCurrentStyleURL"
        >
          <img
            src="/icons/LucideGlobe.svg"
            alt="icon-dice"
            class="size-6"
          >
          Copy Current Style URL
        </Button>
      </div>
      <Footer />
    </div>
  </div>
</template>

<style>
html {
  font-family: 'Quicksand', sans-serif;
  background-color: #fffefc;
}
</style>
