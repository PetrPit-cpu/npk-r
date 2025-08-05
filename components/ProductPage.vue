<template>
  <div class="product-page">
    <h1>{{ displayCategoryName }}</h1>

    <div v-if="isLoading" class="loading">Загрузка товаров...</div>

    <div v-else class="product-list">
      <div v-for="product in products" :key="product.id || product.name" class="product-card">
        <img :src="product.image" :alt="product.name" class="product-image" />
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">{{ (product.price || 0).toFixed(2) }} ₽</p>
        <div class="product-actions">
          <input
            v-model.number="quantities[product.name]"
            type="number"
            min="1"
            class="quantity-input"
          />
          <button @click="addToCart(product)" class="add-to-cart">
            В корзину
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const displayCategoryName = computed(() => {
  // Если данные загружены - показываем нормальное название
  if (productsData.value?.data?.info?.name) {
    return productsData.value.data.info.name
  }
  // Иначе показываем понятное название по ID категории
  return getCategoryNameById(props.categoryId)
})

const getCategoryNameById = (id) => {
  const names = {
    cat1: 'Категория 1',
    cat2: 'Категория 2',
    cat3: 'Категория 3'
  }
  return names[id] || `Категория ${id}`
}

const props = defineProps({
  categoryId: {
    type: String,
    required: true,
    validator: value => ['cat1', 'cat2', 'cat3'].includes(value)
  }
})

const quantities = ref({})
const cart = useCartStore()
const isLoading = ref(false)
const productsData = ref(null)

const loadProducts = async () => {
  isLoading.value = true

  try {
    // Сначала пробуем загрузить данные с API
    productsData.value = await $fetch(`https://api.progress-nw.ru/api/sobes/category/${props.categoryId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      timeout: 5000
    })
  } catch (e) {
    console.error('Ошибка загрузки данных:', e)
    // Если API не ответил, загружаем мок-данные
    const mockData = await import('../mock/products.json')
    productsData.value = mockData.default[props.categoryId] || {
      data: {
        info: { name: `Категория ${props.categoryId}` },
        products: []
      }
    }
  } finally {
    // Инициализируем количества
    if (productsData.value?.data?.products) {
      quantities.value = productsData.value.data.products.reduce((acc, product) => {
        acc[product.name] = 1
        return acc
      }, {})
    }
    isLoading.value = false
  }
}

watch(() => props.categoryId, loadProducts, { immediate: true })

const categoryInfo = computed(() => productsData.value?.data?.info || { name: `Категория ${props.categoryId}` })
const products = computed(() => productsData.value?.data?.products || [])

const addToCart = (product) => {
  const quantity = quantities.value[product.name] || 1
  if (quantity > 0) {
    cart.addItem({
      id: product.id || product.name,
      name: product.name,
      price: product.price || 0,
      image: product.image
    }, quantity)
    quantities.value[product.name] = 1
  }
}

</script>

<style>
.product-page {
  max-width: 1200px;
  margin: 0 auto;
}

.loading {
  text-align: center;
  padding: 2rem;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  width: 300px;
  display: flex;
  flex-direction: column;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.product-name {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.product-price {
  font-weight: bold;
  margin: 0.5rem 0;
}

.product-actions {
  margin-top: auto;
  display: flex;
  gap: 0.5rem;
}

.quantity-input {
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-to-cart {
  flex: 1;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart:hover {
  background-color: #0056b3;
}
</style>