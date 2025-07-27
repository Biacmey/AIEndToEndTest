<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import { useShoppingStore } from '@/stores/shopping'

const store = useShoppingStore()

const categories = [
  '平板',
  '手機', 
  '充電器'
]

const priceRanges = [
  { label: '價格 10000 - 19999', value: '10000-19999' },
  { label: '價格 20000 - 29999', value: '20000-29999' },
  { label: '價格超過 30000', value: '30000+' }
]

const handleCategoryClick = (category: string) => {
  if (store.selectedCategory === category) {
    store.clearFilters()
  } else {
    store.setCategory(category)
  }
}

const handlePriceRangeClick = (range: string) => {
  if (store.selectedPriceRange === range) {
    store.clearFilters()
  } else {
    store.setPriceRange(range)
  }
}
</script>

<template>
  <div class="home">
    <header class="page-header">
      <h1>商品列表</h1>
      <p>精選優質商品，限時優惠中</p>
    </header>
    
    <div class="main-container">
      <!-- 左側分類欄 -->
      <div class="sidebar">
        <div class="filter-section">
          <div class="filter-title">商品分類</div>
          
          <div class="category-group">
            <div class="category-item-wrapper">
              <div 
                class="category-item"
                :class="{ active: !store.selectedCategory && !store.selectedPriceRange }"
                @click="store.clearFilters()"
              >
                全部商品
              </div>
            </div>
            
            <div 
              v-for="category in categories" 
              :key="category"
              class="category-item-wrapper"
            >
              <div 
                class="category-item"
                :class="{ active: store.selectedCategory === category }"
                @click="handleCategoryClick(category)"
              >
                {{ category }}
              </div>
            </div>
          </div>
          
          <div class="price-range-group">
            <div class="price-range-title">價格區間</div>
            <div 
              v-for="range in priceRanges" 
              :key="range.value"
              class="category-item-wrapper"
            >
              <div 
                class="category-item price-item"
                :class="{ active: store.selectedPriceRange === range.value }"
                @click="handlePriceRangeClick(range.value)"
              >
                {{ range.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 右側產品區域 -->
      <div class="content-area">
        <div class="products-header">
          <div class="products-count">
            共 {{ store.filteredProducts.length }} 項商品
          </div>
          <div v-if="store.selectedCategory || store.selectedPriceRange" class="active-filters">
            <div class="filter-tag" v-if="store.selectedCategory">
              {{ store.selectedCategory }}
              <span class="clear-filter" @click="store.clearFilters()">×</span>
            </div>
            <div class="filter-tag" v-if="store.selectedPriceRange">
              {{ priceRanges.find(r => r.value === store.selectedPriceRange)?.label }}
              <span class="clear-filter" @click="store.clearFilters()">×</span>
            </div>
          </div>
        </div>
        
        <div class="products-grid">
          <ProductCard 
            v-for="product in store.filteredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
        
        <div v-if="store.filteredProducts.length === 0" class="no-products">
          <div class="no-products-message">
            <div class="no-products-icon">🔍</div>
            <div class="no-products-text">沒有找到符合條件的商品</div>
            <div class="no-products-subtext">請嘗試其他分類或清除篩選條件</div>
            <button class="clear-filters-btn" @click="store.clearFilters()">
              清除篩選
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 1400px;
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

.main-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.sidebar {
  width: 250px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  position: sticky;
  top: 2rem;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filter-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.category-group,
.price-range-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.price-range-title {
  font-size: 1rem;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}

.category-item-wrapper {
  display: flex;
}

.category-item {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8f9fa;
  color: #495057;
  font-weight: 500;
  border: 2px solid transparent;
}

.category-item:hover {
  background: #e9ecef;
  color: #2c3e50;
}

.category-item.active {
  background: #3498db;
  color: white;
  border-color: #2980b9;
}

.price-item {
  font-size: 0.9rem;
}

.content-area {
  flex: 1;
  min-width: 0;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.products-count {
  color: #6c757d;
  font-weight: 500;
}

.active-filters {
  display: flex;
  gap: 0.5rem;
}

.filter-tag {
  background: #3498db;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.clear-filter {
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1;
}

.clear-filter:hover {
  color: #ffebee;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.no-products {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.no-products-message {
  text-align: center;
  color: #6c757d;
}

.no-products-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-products-text {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.no-products-subtext {
  margin-bottom: 1.5rem;
}

.clear-filters-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.clear-filters-btn:hover {
  background: #2980b9;
}

@media (max-width: 1024px) {
  .main-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    position: static;
  }
  
  .filter-section {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .category-group,
  .price-range-group {
    flex-direction: row;
    flex-wrap: wrap;
  }
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
  
  .products-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .filter-section {
    gap: 1rem;
  }
  
  .category-item {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
  }
}
</style>
