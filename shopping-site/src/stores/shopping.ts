import { defineStore } from 'pinia'
import type { Product, CartItem, Order } from '@/types'

export const useShoppingStore = defineStore('shopping', {
  state: () => ({
    products: [
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
        name: 'MacBook Air M3',
        price: 39900,
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300',
        description: '輕薄強悍的筆記型電腦',
        category: '筆電'
      },
      {
        id: 3,
        name: 'AirPods Pro',
        price: 7490,
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300',
        description: '主動式降噪無線耳機',
        category: '音響'
      },
      {
        id: 4,
        name: 'iPad Pro',
        price: 29900,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
        description: '專業級平板電腦',
        category: '平板'
      },
      {
        id: 5,
        name: 'Apple Watch Series 9',
        price: 12900,
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300',
        description: '智慧手錶',
        category: '穿戴裝置'
      },
      {
        id: 6,
        name: 'Magic Keyboard',
        price: 4490,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300',
        description: '無線藍牙鍵盤',
        category: '配件'
      },
      {
        id: 7,
        name: 'Studio Display',
        price: 49900,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300',
        description: '27吋 5K 顯示器',
        category: '顯示器'
      },
      {
        id: 8,
        name: 'Mac Studio',
        price: 68900,
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300',
        description: '桌上型電腦',
        category: '桌電'
      },
      {
        id: 9,
        name: 'HomePod mini',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=300',
        description: '智慧音響',
        category: '音響'
      },
      {
        id: 10,
        name: 'AirTag',
        price: 990,
        image: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=300',
        description: '物品追蹤器',
        category: '配件'
      }
    ] as Product[],
    cartItems: [] as CartItem[],
    orders: [] as Order[]
  }),

  getters: {
    cartTotal: (state) => {
      return state.cartItems.reduce((total, item) => {
        return total + (item.product.price * item.quantity)
      }, 0)
    },
    cartItemCount: (state) => {
      return state.cartItems.reduce((count, item) => count + item.quantity, 0)
    }
  },

  actions: {
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