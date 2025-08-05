<template>
  <div class="home-page">
    <h1>Добро пожаловать в магазин</h1>
    <p>Выберите категорию в верхнем меню или перейдите в корзину</p>

    <div class="features">
      <div class="feature-card">
        <h3>Широкий ассортимент</h3>
        <p>Более 1000 товаров в каталоге</p>
      </div>
      <div class="feature-card">
        <h3>Быстрая доставка</h3>
        <p>По всей России за 1-3 дня</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 800px;
  margin: 2rem auto;
  text-align: center;
  padding: 0 1rem;
}

.features {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.feature-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  width: 250px;
  background: #f9f9f9;
}

.feature-card h3 {
  color: #007bff;
  margin-top: 0;
}
</style>