<script setup lang="ts">
import { useToast } from '@/components/ui/toast'
import type { AvatarConfig } from '~~/shared/types'

const { toast } = useToast()

const props = defineProps<{ config: AvatarConfig }>()

const copyCurrentStyleURL = () => {
  const url = new URL(window.location.href)
  Object.entries(props.config).forEach(([key, value]) => {
    url.searchParams.set(key, value.toString())
  })

  navigator.clipboard.writeText(url.href)
  toast({
    title: '✅ Copied to clipboard',
  })
}
</script>

<template>
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
</template>
