<template>
  <div class="cart">
    <header class="page-header">
      <h1>購物車</h1>
    </header>

    <div v-if="store.cartItems.length === 0" class="empty-cart">
      <div class="empty-cart-icon">🛒</div>
      <h2>購物車是空的</h2>
      <p>快去選購商品吧！</p>
      <router-link to="/" class="continue-shopping-btn">
        繼續購物
      </router-link>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div 
          v-for="item in store.cartItems" 
          :key="item.product.id" 
          class="cart-item"
        >
          <img :src="item.product.image" :alt="item.product.name" class="item-image" />
          <div class="item-info">
            <h3 class="item-name">{{ item.product.name }}</h3>
            <p class="item-description">{{ item.product.description }}</p>
            <div class="item-price">NT$ {{ item.product.price.toLocaleString() }}</div>
          </div>
          <div class="item-quantity">
            <button 
              @click="store.updateQuantity(item.product.id, item.quantity - 1)"
              class="quantity-btn"
              :disabled="item.quantity <= 1"
            >
              -
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button 
              @click="store.updateQuantity(item.product.id, item.quantity + 1)"
              class="quantity-btn"
            >
              +
            </button>
          </div>
          <div class="item-total">
            NT$ {{ (item.product.price * item.quantity).toLocaleString() }}
          </div>
          <button 
            @click="store.removeFromCart(item.product.id)"
            class="remove-btn"
          >
            ×
          </button>
        </div>
      </div>

      <div class="cart-summary">
        <div class="summary-row">
          <span>商品總計：</span>
          <span>NT$ {{ store.cartTotal.toLocaleString() }}</span>
        </div>
        <div class="summary-row total">
          <span>總計：</span>
          <span>NT$ {{ store.cartTotal.toLocaleString() }}</span>
        </div>
        <button @click="showCheckoutModal = true" class="checkout-btn">
          結帳
        </button>
      </div>
    </div>

    <!-- 結帳確認彈窗 -->
    <div v-if="showCheckoutModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3>確認結帳</h3>
        <p>總金額：NT$ {{ store.cartTotal.toLocaleString() }}</p>
        <p>確定要完成購買嗎？</p>
        <div class="modal-actions">
          <button @click="closeModal" class="cancel-btn">取消</button>
          <button @click="confirmCheckout" class="confirm-btn">確認購買</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useShoppingStore } from '@/stores/shopping'

const store = useShoppingStore()
const router = useRouter()
const showCheckoutModal = ref(false)

const closeModal = () => {
  showCheckoutModal.value = false
}

const confirmCheckout = () => {
  store.checkout()
  showCheckoutModal.value = false
  alert('購買成功！感謝您的購買。')
  router.push('/history')
}
</script>

<style scoped>
.cart {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-cart-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-cart h2 {
  color: #7f8c8d;
  margin: 1rem 0 0.5rem 0;
}

.empty-cart p {
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

.cart-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr 120px 100px 40px;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.item-description {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
}

.item-price {
  font-weight: 600;
  color: #e74c3c;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.quantity-btn:hover:not(:disabled) {
  background: #f8f9fa;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  min-width: 40px;
  text-align: center;
  font-weight: 600;
}

.item-total {
  font-weight: 700;
  color: #2c3e50;
  text-align: right;
}

.remove-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: #c0392b;
}

.cart-summary {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.summary-row.total {
  font-size: 1.2rem;
  font-weight: 700;
  padding-top: 1rem;
  border-top: 2px solid #e0e0e0;
  color: #2c3e50;
}

.checkout-btn {
  width: 100%;
  background: #27ae60;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s ease;
}

.checkout-btn:hover {
  background: #229954;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.modal h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.modal p {
  margin: 0.5rem 0;
  color: #7f8c8d;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-btn, .confirm-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.cancel-btn {
  background: #95a5a6;
  color: white;
}

.cancel-btn:hover {
  background: #7f8c8d;
}

.confirm-btn {
  background: #27ae60;
  color: white;
}

.confirm-btn:hover {
  background: #229954;
}

@media (max-width: 768px) {
  .cart {
    padding: 1rem;
  }
  
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-item {
    grid-template-columns: 80px 1fr 100px;
    gap: 0.5rem;
  }
  
  .item-total, .remove-btn {
    grid-column: 2 / 4;
    margin-top: 0.5rem;
    justify-self: end;
  }
}
</style> 