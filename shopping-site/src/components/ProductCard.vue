<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name" class="product-image" />
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-details">
        <span class="product-category">{{ product.category }}</span>
        <span class="product-price">NT$ {{ product.price.toLocaleString() }}</span>
      </div>
      <button @click="addToCart" class="add-to-cart-btn">
        加入購物車
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types'
import { useShoppingStore } from '@/stores/shopping'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const store = useShoppingStore()

const addToCart = () => {
  store.addToCart(props.product)
}
</script>

<style scoped>
.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.product-description {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  flex: 1;
}

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.product-category {
  background: #ecf0f1;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #34495e;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #e74c3c;
}

.add-to-cart-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-to-cart-btn:hover {
  background: #2980b9;
}

.add-to-cart-btn:active {
  transform: translateY(1px);
}
</style> 