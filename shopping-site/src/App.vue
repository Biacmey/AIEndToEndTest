<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useShoppingStore } from '@/stores/shopping'

const store = useShoppingStore()
</script>

<template>
  <div id="app">
    <header class="main-header">
      <div class="header-container">
        <div class="logo">
          <RouterLink to="/" class="logo-link">
            🛒 購物商城
          </RouterLink>
        </div>

        <nav class="main-nav">
          <RouterLink to="/" class="nav-link">
            商品列表
          </RouterLink>
          <RouterLink to="/history" class="nav-link">
            購買歷史
          </RouterLink>
        </nav>

        <div class="cart-icon">
          <RouterLink to="/cart" class="cart-link">
            <div class="cart-wrapper">
              <span class="cart-emoji">🛒</span>
              <span v-if="store.cartItemCount > 0" class="cart-badge">
                {{ store.cartItemCount }}
              </span>
            </div>
          </RouterLink>
        </div>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>

    <footer class="main-footer">
      <p>&copy; 2025 購物商城. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-header {
  background: #2c3e50;
  color: white;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  transition: color 0.2s ease;
}

.logo-link:hover {
  color: #3498db;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: #3498db;
  color: white;
}

.cart-link {
  color: white;
  text-decoration: none;
}

.cart-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.cart-wrapper:hover {
  background: rgba(52, 152, 219, 0.2);
}

.cart-emoji {
  font-size: 1.5rem;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.main-content {
  flex: 1;
  background: #f8f9fa;
  min-height: calc(100vh - 140px);
}

.main-footer {
  background: #34495e;
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: auto;
}

.main-footer p {
  margin: 0;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 1rem;
  }
  
  .main-nav {
    gap: 1rem;
  }
  
  .nav-link {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
  
  .logo-link {
    font-size: 1.2rem;
  }
}

@media (max-width: 600px) {
  .header-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .main-nav {
    order: 2;
  }
  
  .cart-icon {
    order: 1;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
</style>
