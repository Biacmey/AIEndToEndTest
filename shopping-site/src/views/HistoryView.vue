<template>
  <div class="history">
    <header class="page-header">
      <h1>購買歷史</h1>
      <p>您的所有購買記錄</p>
    </header>

    <div v-if="store.orders.length === 0" class="empty-history">
      <div class="empty-history-icon">📝</div>
      <h2>還沒有購買記錄</h2>
      <p>快去選購商品吧！</p>
      <router-link to="/" class="continue-shopping-btn">
        去購物
      </router-link>
    </div>

    <div v-else class="orders-list">
      <div 
        v-for="order in store.orders" 
        :key="order.id" 
        class="order-card"
      >
        <div class="order-header">
          <h3>訂單 #{{ order.id }}</h3>
          <div class="order-info">
            <span class="order-date">{{ order.date }}</span>
            <span class="order-total">NT$ {{ order.total.toLocaleString() }}</span>
          </div>
        </div>

        <div class="order-items">
          <div 
            v-for="item in order.items" 
            :key="item.product.id" 
            class="order-item"
          >
            <img :src="item.product.image" :alt="item.product.name" class="item-image" />
            <div class="item-info">
              <h4 class="item-name">{{ item.product.name }}</h4>
              <p class="item-description">{{ item.product.description }}</p>
              <div class="item-details">
                <span class="item-price">單價: NT$ {{ item.product.price.toLocaleString() }}</span>
                <span class="item-quantity">數量: {{ item.quantity }}</span>
                <span class="item-subtotal">小計: NT$ {{ (item.product.price * item.quantity).toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="order-summary">
          <div class="summary-total">
            總計：NT$ {{ order.total.toLocaleString() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useShoppingStore } from '@/stores/shopping'

const store = useShoppingStore()
</script>

<style scoped>
.history {
  max-width: 1000px;
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

.empty-history {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-history-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-history h2 {
  color: #7f8c8d;
  margin: 1rem 0 0.5rem 0;
}

.empty-history p {
  color: #95a5a6;
  margin-bottom: 2rem;
}

.continue-shopping-btn {
  background: #3498db;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.continue-shopping-btn:hover {
  background: #2980b9;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.order-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.order-header {
  background: #f8f9fa;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.order-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.order-date {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.order-total {
  font-size: 1.2rem;
  font-weight: 700;
  color: #e74c3c;
}

.order-items {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-item {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.item-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: #2c3e50;
}

.item-description {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
}

.item-details {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
}

.item-price {
  color: #e74c3c;
  font-weight: 600;
}

.item-quantity {
  color: #7f8c8d;
}

.item-subtotal {
  color: #2c3e50;
  font-weight: 600;
}

.order-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-top: 1px solid #e0e0e0;
  text-align: right;
}

.summary-total {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .history {
    padding: 1rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .order-info {
    align-items: flex-start;
    width: 100%;
  }
  
  .order-item {
    grid-template-columns: 60px 1fr;
  }
  
  .item-image {
    width: 60px;
    height: 60px;
  }
  
  .item-details {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style> 