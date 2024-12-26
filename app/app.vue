<script lang="ts" setup>
// TODO: All `~~/shared` imports should be auto imported
import type { AvatarConfig } from '~~/shared/types'
import { getRandomAvatarStyle } from '~~/shared/utils'

const config = ref<AvatarConfig>(getRandomAvatarStyle())
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <!-- <img
      src="~/assets/svg/avatar/part/face/face-0.svg"
      alt=""
    > -->
    <!-- TODO: Remove this client only wrapper -->
    <div class="container">
      <ClientOnly>
        <div class="w-48 h-48 md:w-72 md:h-72 mx-auto">
          <AvatarPreview :config="config" />
        </div>
        <AvatarEditor :config="config" />
      </ClientOnly>
      <div>
        <Button @click="config = getRandomAvatarStyle()">
          Random
        </Button>
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: 'Quicksand', sans-serif;
}
</style>
