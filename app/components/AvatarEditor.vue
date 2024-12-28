<script lang="ts" setup>
import type { AvatarConfig } from '~~/shared/types'

const config = defineModel<AvatarConfig>('config', { required: true })

const avatarParts = getParts()
</script>

<template>
  <section>
    <p class="text-lg">
      Choose your style
    </p>
    <div class="grid lg:grid-cols-12 sm:grid-cols-6 grid-cols-4 xl:gap-10 gap-4 my-4">
      <div
        v-for="(partPreviews, part) in avatarParts"
        :key="part"
        class="border-[3px] flex justify-center rounded-lg border-primary"
      >
        <Popover>
          <PopoverTrigger class="flex p-4">
            <img
              :src="partPreviews[config[part as keyof AvatarConfig]]"
              :alt="part"
              class="size-8"
            >
          </PopoverTrigger>
          <PopoverContent
            :side-offset="20"
            class="grid grid-cols-4 p-4 gap-4 max-h-72 overflow-auto border-primary border-[3px]"
          >
            <Button
              v-for="(partPreview, index) in partPreviews"
              :key="index"
              variant="ghost"
              class="size-12 py-1 px-2"
              :class="{ 'ring-[3px] ring-primary': config[part as keyof AvatarConfig] == index }"
              @click="config[part as keyof AvatarConfig] = index"
            >
              <img
                :src="partPreview"
                :alt="`${part}-${index}`"
                class="size-8"
              >
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </section>
</template>
