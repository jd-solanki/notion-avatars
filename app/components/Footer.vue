<script lang="ts" setup>
const partners = [
  {
    name: 'NuxtStart',
    url: 'https://nuxtstart.com',
  },
]
</script>


<template>
  <footer class="flex flex-col items-center text-center pb-4">
    <img
      src="/line.svg"
      width="125"
      height="54"
    >
    <div class="flex justify-center mt-10">
      <NuxtLink
        class="hover:underline"
        href="https://github.com/jd-solanki/notion-avatars"
        target="_blank"
      >
        GitHub
      </NuxtLink>
      <span class="mx-2">·</span>
      <NuxtLink
        class="hover:underline"
        href="https://x.com/me_jd_solanki"
        target="_blank"
      >
        𝕏
      </NuxtLink>
    </div>
    <div class="text-gray-300 text-balance mt-3 px-6 text-center">
      <NuxtLink
        href="https://abstractlab.gumroad.com/l/noto-avatar"
        class="hover:underline"
        target="_blank"
      >
        &copy; Illustrations
      </NuxtLink>
      designed by
      <NuxtLink
        href="https://twitter.com/felix12777"
        class="hover:underline"
        target="_blank"
      >Felix Wong</NuxtLink>
      and under
      <NuxtLink
        class="hover:underline"
        href="https://creativecommons.org/publicdomain/zero/1.0/"
        target="_blank"
      >CC0</NuxtLink>
      license
    </div>
    <p class="text-gray-300 text-balance">
      Adapted from <NuxtLink
        href="https://github.com/Mayandev/notion-avatar/"
        target="_blank"
        class="hover:underline"
      >Notion Avatar</NuxtLink> by <NuxtLink
        href="https://github.com/Mayandev/"
        target="_blank"
        class="hover:underline"
      >Mayandev</NuxtLink>
      reimagined and fixed using <NuxtLink
        href="https://nuxt.com/"
        class="hover:underline"
        target="_blank"
      >Nuxt.js</NuxtLink>.
    </p>
    <p>
      <span class="me-1 text-gray-300">Partners:</span>
      <NuxtLink
        v-for="partner in partners"
        :key="partner.name"
        :href="partner.url"
        class="hover:underline"
        target="_blank"
      >{{ partner.name }}</NuxtLink>
    </p>
  </footer>
</template>
