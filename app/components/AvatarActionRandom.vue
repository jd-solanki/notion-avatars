<script lang="ts" setup>
import type { AvatarConfig } from '~~/shared/types'
import { getAvatarStyle } from '~~/shared/utils'

const config = defineModel<AvatarConfig>('config', { required: true })
</script>

<template>
  <Button
    variant="outline"
    class="border-[3px] border-primary rounded-full py-6 text-base font-bold"
    @click="config = getAvatarStyle()"
  >
    <img
      src="/icons/dice.svg"
      alt="icon-dice"
      class="size-6"
    >
    Random
  </Button>
</template>
