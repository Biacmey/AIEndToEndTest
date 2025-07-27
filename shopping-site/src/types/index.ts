export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  date: string
} 