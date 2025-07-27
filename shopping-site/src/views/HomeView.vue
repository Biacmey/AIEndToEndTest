<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import { useShoppingStore } from '@/stores/shopping'

const store = useShoppingStore()
</script>

<template>
  <div class="home">
    <header class="page-header">
      <h1>商品列表</h1>
      <p>精選優質商品，限時優惠中</p>
    </header>
    
    <div class="products-grid">
      <ProductCard 
        v-for="product in store.products" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.page-header p {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin: 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .home {
    padding: 1rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
}
</style>
