<script lang="ts" setup>
import type { AvatarConfig } from '~~/shared/types'
import { getParts } from '~~/shared/utils'

const config = defineModel<AvatarConfig>('config', { required: true })

const notionAvatarParts = getParts()

console.log('notionAvatarParts :>> ', notionAvatarParts)
</script>

<template>
  <section>
    <p class="font-medium text-lg">
      Choose your style
    </p>
    <div class="flex justify-between my-4">
      <div
        v-for="(partPreviews, part) in notionAvatarParts"
        :key="part"
        class="border-[3px] rounded-lg border-primary"
      >
        <DropdownMenu>
          <DropdownMenuTrigger class="flex p-4">
            <img
              :src="partPreviews[config[part]]"
              :alt="part"
              class="size-8"
            >
          </DropdownMenuTrigger>
          <DropdownMenuContent class="grid grid-cols-4 p-4 gap-4 max-h-86">
            <DropdownMenuItem
              v-for="(partPreview, index) in partPreviews"
              :key="index"
              @click="config[part] = index"
            >
              <img
                :src="partPreview"
                :alt="`${part}-${index}`"
                class="size-12"
              >
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </section>
</template>
