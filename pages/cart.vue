<template>
  <div class="cart-page">
    <h1>Ваша корзина</h1>
    <div v-if="cart.items.length === 0" class="empty-cart">
      Ваша корзина пуста
    </div>
    <div v-else>
      <div v-for="item in cart.items" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" class="cart-item-image" />
        <div class="cart-item-details">
          <h3 class="cart-item-name">{{ item.name }}</h3>
          <p class="cart-item-price">{{ item.price.toFixed(2) }} ₽</p>
        </div>
        <div class="cart-item-actions">
          <input
            v-model.number="item.quantity"
            type="number"
            min="1"
            @change="cart.updateQuantity(item.id, item.quantity)"
            class="quantity-input"
          />
          <button @click="cart.removeItem(item.id)" class="remove-button">
            Удалить
          </button>
        </div>
        <p class="cart-item-total">
          {{ (item.price * item.quantity).toFixed(2) }} ₽
        </p>
      </div>
      <div class="cart-summary">
        <p class="cart-total">Итого: {{ cart.totalPrice.toFixed(2) }} ₽</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const cart = useCartStore()

// Загружаем корзину из localStorage
onMounted(() => {
  cart.loadFromLocalStorage()
  cart.setupListeners()
})
</script>

<style>
.cart-page {
  max-width: 800px;
  margin: 0 auto;
}

.empty-cart {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.cart-item-details {
  flex: 1;
}

.cart-item-name {
  margin: 0;
  font-size: 1rem;
}

.cart-item-price {
  margin: 0.5rem 0;
  color: #666;
}

.cart-item-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.quantity-input {
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.remove-button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #bb2d3b;
}

.cart-item-total {
  font-weight: bold;
  min-width: 100px;
  text-align: right;
}

.cart-summary {
  padding: 1rem;
  text-align: right;
  border-top: 2px solid #333;
}

.cart-total {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>