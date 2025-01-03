// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',
  ],
  components: [
    '~/components',
    {
      path: '~/components/ui',
      pathPrefix: false,
      ignore: ['**/index.ts'],
    },
  ],
  imports: {
    dirs: [
      '../shared/utils',
      '../shared/types',
    ],
  },
  devtools: { enabled: true },
  css: [
    '~/assets/css/tailwind.css',
  ],
  site: {
    url: 'https://notion-avatars.netlify.app/',
    name: 'Notion Avatars',
    description: 'Create, Use and Download Notion Style Avatars',
    defaultLocale: 'en',
  }, colorMode: {
    // TODO: Force light mode till we make it compatible with dark mode
    preference: 'light',
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
