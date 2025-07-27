import { defineStore } from 'pinia'
import type { Product, CartItem, Order } from '@/types'

export const useShoppingStore = defineStore('shopping', {
  state: () => ({
    products: [
      // 手機類
      {
        id: 1,
        name: 'iPhone 15 Pro',
        price: 35900,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300',
        description: 'Apple最新旗艦手機，搭載A17 Pro晶片',
        category: '手機'
      },
      {
        id: 2,
        name: 'iPhone 14',
        price: 24900,
        image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=300',
        description: 'Apple iPhone 14，優秀的攝影功能',
        category: '手機'
      },
      {
        id: 3,
        name: 'Samsung Galaxy S24',
        price: 28900,
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300',
        description: 'Samsung旗艦手機，AI攝影專家',
        category: '手機'
      },
      {
        id: 4,
        name: '小米14',
        price: 15900,
        image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300',
        description: '小米旗艦手機，徠卡影像',
        category: '手機'
      },

      // 平板類
      {
        id: 5,
        name: 'iPad Pro 12.9"',
        price: 34900,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
        description: '專業級平板電腦，M2晶片',
        category: '平板'
      },
      {
        id: 6,
        name: 'iPad Air',
        price: 18900,
        image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300',
        description: '輕薄平板，適合日常使用',
        category: '平板'
      },
      {
        id: 7,
        name: 'Samsung Galaxy Tab S9',
        price: 22900,
        image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=300',
        description: 'Android高端平板，S Pen支援',
        category: '平板'
      },
      {
        id: 8,
        name: 'iPad',
        price: 10900,
        image: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=300',
        description: '入門款iPad，適合學習娛樂',
        category: '平板'
      },

      // 充電器類
      {
        id: 9,
        name: 'Apple 20W USB-C 充電器',
        price: 990,
        image: 'https://images.unsplash.com/photo-1609299006394-8d9e8d3e6e37?w=300',
        description: '原廠快速充電器',
        category: '充電器'
      },
      {
        id: 10,
        name: 'Anker 65W GaN 充電器',
        price: 1890,
        image: 'https://images.unsplash.com/photo-1582273028830-d77cc59e6e68?w=300',
        description: '輕巧高效充電器，支援多設備',
        category: '充電器'
      },
      {
        id: 11,
        name: 'Belkin 3合1無線充電器',
        price: 3990,
        image: 'https://images.unsplash.com/photo-1609298368044-7a3ac4e8cd45?w=300',
        description: '同時充電iPhone、AirPods、Apple Watch',
        category: '充電器'
      },
      {
        id: 12,
        name: 'Samsung 25W 快充器',
        price: 799,
        image: 'https://images.unsplash.com/photo-1606145847774-8c0c0c6cd9f6?w=300',
        description: 'Samsung原廠快速充電器',
        category: '充電器'
      },
      {
        id: 13,
        name: 'RAVPower 行動電源 20000mAh',
        price: 1499,
        image: 'https://images.unsplash.com/photo-1612835362596-1c5fd0b7ad84?w=300',
        description: '大容量行動充電器',
        category: '充電器'
      },

      // 其他商品（價格區間補充）
      {
        id: 14,
        name: 'AirPods Pro 2',
        price: 7490,
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300',
        description: '主動式降噪無線耳機',
        category: '音響'
      },
      {
        id: 15,
        name: 'MacBook Air M3',
        price: 39900,
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300',
        description: '輕薄強悍的筆記型電腦',
        category: '筆電'
      },
      {
        id: 16,
        name: 'Magic Mouse',
        price: 2490,
        image: 'https://images.unsplash.com/photo-1615695956076-967b1d6d2b3b?w=300',
        description: 'Apple無線滑鼠',
        category: '配件'
      }
    ] as Product[],
    cartItems: [] as CartItem[],
    orders: [] as Order[],
    selectedCategory: '',
    selectedPriceRange: ''
  }),

  getters: {
    cartTotal: (state) => {
      return state.cartItems.reduce((total, item) => {
        return total + (item.product.price * item.quantity)
      }, 0)
    },
    cartItemCount: (state) => {
      return state.cartItems.reduce((count, item) => count + item.quantity, 0)
    },
    filteredProducts: (state) => {
      let filtered = state.products

      // 按分類篩選
      if (state.selectedCategory && !state.selectedCategory.includes('價格')) {
        filtered = filtered.filter(product => product.category === state.selectedCategory)
      }

      // 按價格範圍篩選
      if (state.selectedPriceRange) {
        if (state.selectedPriceRange === '10000-19999') {
          filtered = filtered.filter(product => product.price >= 10000 && product.price <= 19999)
        } else if (state.selectedPriceRange === '20000-29999') {
          filtered = filtered.filter(product => product.price >= 20000 && product.price <= 29999)
        } else if (state.selectedPriceRange === '30000+') {
          filtered = filtered.filter(product => product.price >= 30000)
        }
      }

      return filtered
    }
  },

  actions: {
    setCategory(category: string) {
      this.selectedCategory = category
      if (!category.includes('價格')) {
        this.selectedPriceRange = ''
      }
    },

    setPriceRange(range: string) {
      this.selectedPriceRange = range
      this.selectedCategory = ''
    },

    clearFilters() {
      this.selectedCategory = ''
      this.selectedPriceRange = ''
    },

    addToCart(product: Product) {
      const existingItem = this.cartItems.find(item => item.product.id === product.id)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cartItems.push({
          product,
          quantity: 1
        })
      }
    },

    removeFromCart(productId: number) {
      const index = this.cartItems.findIndex(item => item.product.id === productId)
      if (index > -1) {
        this.cartItems.splice(index, 1)
      }
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.cartItems.find(item => item.product.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
        }
      }
    },

    checkout() {
      if (this.cartItems.length === 0) return

      const order: Order = {
        id: Date.now().toString(),
        items: [...this.cartItems],
        total: this.cartTotal,
        date: new Date().toLocaleDateString('zh-TW')
      }

      this.orders.push(order)
      this.cartItems = []
      
      return order
    }
  }
}) 