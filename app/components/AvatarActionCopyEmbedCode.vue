<script lang="ts" setup>
import { useToast } from '@/components/ui/toast'
import type { AvatarConfig } from '~~/shared/types'
import { getCurrentConfigParams } from '~~/shared/utils'

const { toast } = useToast()

const props = defineProps<{ config: AvatarConfig }>()

const embedCode = useCookie<'img' | 'url' | 'md'>('embedCode', { default: () => 'img' })
const embedUrl = computed(() => {
  const url = new URL(window.location.href + 'api/avatar/')

  const searchParams = getCurrentConfigParams(props.config)

  // Assign query params to URL
  searchParams.forEach((value, key) => {
    url.searchParams.set(key, value)
  })

  return url.href
})
const copyEmbedCode = () => {
  let text = ''
  switch (embedCode.value) {
    case 'img':
      text = `<img src="${embedUrl.value}" alt="Notion Avatar" />`
      break
    case 'md':
      text = `![notion avatar](${embedUrl.value})`
      break
    case 'url':
      text = embedUrl.value
      break
  }

  // Copy to clipboard
  navigator.clipboard.writeText(text)
  toast({
    title: '✅ Copied to clipboard',
  })
}
</script>

<template>
  <div class="inline-flex items-center">
    <Button
      variant="outline"
      class="border-[3px] flex-grow border-primary rounded-full py-6 text-base font-bold rounded-r-none"
      @click="copyEmbedCode"
    >
      <img
        src="/icons/code.svg"
        alt="icon-code"
        class="size-6"
      >
      Copy Embed Code
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger class="border-[3px] border-l-0 border-primary ps-4 md:pe-6 pe-4 py-3 text-base font-bold rounded-full rounded-l-none flex items-center uppercase">
        <span>{{ embedCode }}</span>
        <img
          src="https://api.iconify.design/lucide:chevron-down.svg"
          alt="iconify-chevron-down"
          class="size-5 ms-1 mt-1"
        >
      </DropdownMenuTrigger>
      <DropdownMenuContent class="border-[3px] border-primary rounded-lg font-bold">
        <DropdownMenuItem @click="embedCode = 'img'">
          &lt;img&gt;
        </DropdownMenuItem>
        <DropdownMenuItem @click="embedCode = 'md'">
          Markdown
        </DropdownMenuItem>
        <DropdownMenuItem @click="embedCode = 'url'">
          URL
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
