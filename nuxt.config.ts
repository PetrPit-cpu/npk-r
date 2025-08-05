export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  routeRules: {
    '/': { prerender: true },
    '/cat1': { ssr: true },
    '/cat2': { ssr: true },
    '/cat3': { ssr: true },
    '/cart': { ssr: false }
  }
})