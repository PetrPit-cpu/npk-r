<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  htmlAttrs: {
    lang: 'ru'
  },
  bodyAttrs: {
    class: 'nuxt-app'
  }
})
</script>

<style>
.nuxt-app {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}
</style>