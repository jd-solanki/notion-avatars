<script lang="ts" setup>
import { PopoverClose } from 'radix-vue'
import type { AvatarConfig } from '~~/shared/types'
import { AVATAR_PRESETS } from '~~/shared/utils'

const config = defineModel<AvatarConfig>('config', { required: true })

const avatarParts = getParts()
</script>

<template>
  <section>
    <div class="flex items-center">
      <p class="text-lg">
        Choose your style
      </p>
      <div class="flex-grow" />
      <Popover default-open>
        <PopoverTrigger>
          <TooltipProvider :delay-duration="0">
            <Tooltip>
              <TooltipTrigger as-child>
                <img
                  src="/icons/LucideComponent.svg"
                  alt="select-preset-icon"
                  class="size-8"
                >
              </TooltipTrigger>
              <TooltipContent class="bg-black text-white">
                Presets
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </PopoverTrigger>
        <PopoverContent class="grid grid-cols-4 p-4 gap-4 max-h-72 overflow-auto border-primary border-[3px]">
          <!--
            NOTE: Ensure when we assign the config we're using `JSON.parse(JSON.stringify(AVATAR_PRESETS[presetName]))`
            This is because if we directly assign the object then it will be a reference and any changes to the config will also reflect in the preset
            This will result in `findMatchingPreset` returning true even if there's mismatch in preset & config
          -->
          <PopoverClose
            v-for="(presetVal, presetName) of AVATAR_PRESETS"
            :key="presetName"
            class="hover:bg-accent rounded"
            :class="{ 'ring-[3px] ring-primary': JSON.stringify(config) === JSON.stringify(presetVal) }"
            @click="config = JSON.parse(JSON.stringify(AVATAR_PRESETS[presetName]))"
          >
            <AvatarPreview :config="AVATAR_PRESETS[presetName]">
              {{ presetName }}
            </AvatarPreview>
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </div>
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
            <!--
              NOTE: We've to use Number(index) to ensure the key is always stored as number instead of string
              This is because if it's get stored as string then our `findMatchingPreset` will fails due to triple equals check `===`
            -->
            <Button
              v-for="(partPreview, index) in partPreviews"
              :key="index"
              variant="ghost"
              class="size-12 py-1 px-2"
              :class="{ 'ring-[3px] ring-primary': config[part as keyof AvatarConfig] == index }"
              @click="config[part as keyof AvatarConfig] = Number(index)"
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
