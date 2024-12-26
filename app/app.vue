<script lang="ts" setup>
// TODO: All `~~/shared` imports should be auto imported
import type { AvatarConfig } from '~~/shared/types'
import { getRandomAvatarStyle } from '~~/shared/utils'

const config = ref<AvatarConfig>(getRandomAvatarStyle())
</script>

<template>
  <div class="min-h-[100dvh] flex flex-col font-bold">
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
    <!-- TODO: Remove this client only wrapper -->
    <div class="container my-auto">
      <ClientOnly>
        <div class="w-48 h-48 md:w-72 md:h-72 mx-auto">
          <AvatarPreview :config="config" />
        </div>
        <AvatarEditor :config="config" />
      </ClientOnly>
      <div class="my-8">
        <Button
          variant="outline"
          class="border-[3px] border-primary rounded-full px-16 py-6 text-base font-bold"
          @click="config = getRandomAvatarStyle()"
        >
          <img
            src="/icons/dice.svg"
            alt="icon-dice"
            class="size-6"
          >
          Random
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
