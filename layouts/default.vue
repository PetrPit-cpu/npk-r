<template>
  <div class="layout">
    <header class="header">
      <nav class="nav">
        <NuxtLink to="/cat1" class="nav-link">Категория 1</NuxtLink>
        <NuxtLink to="/cat2" class="nav-link">Категория 2</NuxtLink>
        <NuxtLink to="/cat3" class="nav-link">Категория 3</NuxtLink>
        <NuxtLink to="/cart" class="nav-link cart-link">
          Корзина ({{ cart.totalItems }})
        </NuxtLink>
      </nav>
    </header>
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<script setup>
const cart = useCartStore()

// Предзагрузка данных для всех категорий
onMounted(() => {
  const preloadCategories = ['cat1', 'cat2', 'cat3']
  preloadCategories.forEach(cat => {
    $fetch(`https://api.progress-nw.ru/api/sobes/category/${cat}`)
  })
})
</script>

<style>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.nav-link:hover {
  background-color: #e9ecef;
}

.nav-link.router-link-active {
  background-color: #007bff;
  color: white;
}

.cart-link {
  margin-left: auto;
}

.main {
  flex: 1;
  padding: 1rem;
}
</style>